import { lazy, Suspense, useEffect, useState } from 'react';
import swal from "sweetalert";
/// Components
import Index from "./jsx";
import { connect, useDispatch } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { Button, Modal } from "react-bootstrap";

const SignUp = lazy(() => import('./jsx/pages/Registration'));
const Login = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 2000);
  });
});

function App(props) {
  const dispatch = useDispatch();
  const [remainingTime, setremainingTime] = useState("");
  const [stopControl, setStop] = useState(false);
  const [seconds, setremainingTimeSec] = useState(59);
  const [minutesRem, setremainingTimeMins] = useState(59);

  const [basicModal, setBasicModal] = useState(true);
  const [resetMode, setResetMode] = useState(0);

  let counter = null
  useEffect(() => {
    checkAutoLogin(dispatch, props.history);
    // controlTimer() 
    counter = setInterval(() => {
      checkTime();
    }, 1000);




  }, [dispatch, props.history, resetMode]);


  function checkTime() {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails?.expireDate);
    let todaysDate = new Date();
    const timer = expireDate.getTime() - todaysDate.getTime();
    if (timer < 1500) {
      // setResetMode(Math.random())
      // setStop(true)
      setBasicModal(true)
      // clearInterval(counter);
    }
    // alert(timer)
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(timer / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timer % (1000 * 60)) / 1000);

    const dateToday = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    // if(!isNaN(minutes) && !isNaN(seconds) &&  !stopControl && minutes<1 && seconds<20)
    // {
    //     // setStop(true)
    // setBasicModal(true)


    // }
    // if(stopControl && !(seconds<20) && ! (minutes<1)){
    //      setStop(false)
    //  setBasicModal(false)  
    // }

    setremainingTimeMins(minutes)
    setremainingTimeSec(seconds)
    setremainingTime(dateToday)



  }

  let routes = (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/page-register' component={SignUp} />

    </Switch>
  );
  if (props.isAuthenticated) {
    return (
      <>

        <Suspense fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }
        >
          {/* <>{remainingTime} </> */}
          <Modal className="fade" show={basicModal && seconds < 20 && minutesRem < 1}>
            <Modal.Header>
              <Modal.Title>System Timeout</Modal.Title>
              <Button
                variant=""
                className="btn-close"
                onClick={() => setBasicModal(false)}
              >

              </Button>
            </Modal.Header>
            <Modal.Body>{"The system will log you out in " + seconds + " seconds."}


            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => setBasicModal(false)}
                variant="danger light"
              >
                Close
              </Button>
              {/* <Button variant="primary">Save changes</Button> */}
            </Modal.Footer>
          </Modal>
          <Index seconds={seconds} minutesRem={minutesRem} />
        </Suspense>
      </>
    );

  } else {
    return (
      <div className="vh-100">
        <Suspense fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }
        >

          {routes}
        </Suspense>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));

