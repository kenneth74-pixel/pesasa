import React,{useState, useEffect} from "react";
import { Link , useLocation} from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import Multistep from "react-multistep";
import { useIdleTimer } from 'react-idle-timer'
import StepOne from "./StepOne";
import StepContent from '@mui/material/StepContent';
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
// image
import logo from "../../images/logo-blue.png";
import loginbg from "./../../images/bg8.png";
function Register(props) {
  const location = useLocation();
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [activeStep, setActiveStep] = React.useState(0);
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const [isIndividual, setisIndividual] = useState(false);
    
    const data = location.state?.key1
    const theEmail=location.state?.email 
    const bussinessType=location.state?.bussinessType 
    // function pushTo(index){
    //   setActiveStep()
    // }
    const onIdle = () => {
      // setState('Idle')
      // alert("am idle")
      props.history.push(
        {
            pathname: '/login',
            // state: {  email:addFormData.email }
        }
       // '/page-register'
        );  
     }

    const { getRemainingTime } = useIdleTimer({
      onIdle,
     // onActive,
      // onAction,
      timeout: 60_000*3,
      throttle: 500
    })

   
  

    useEffect(() => {
    //  window.scrollTo(0, 0);
    // alert(bussinessType)
    if(data==="page1"){

      setActiveStep(1)
      setEmail(theEmail)
      if(bussinessType!==undefined){
        if(parseInt(bussinessType)===1){
          setisIndividual(true)
        }
      }
    }
    else if(data==="page2"){

      setActiveStep(2)
      setEmail(theEmail)
    }
    }, []);

    const steps = [
      { name: "Personal Info", component: <StepOne pushTo={setActiveStep}
      setisIndividual={setisIndividual}
       setEmail={setEmail} /> },
      { name: "Email & Phone Verification", component: <StepTwo pushTo={setActiveStep} email={email} history={props.history} /> },
      { name: "Business Details", component: <StepThree email={email} history={props.history} /> },
   //   { name: "Email Setup", component: <StepFour /> },
    ];
    const steps2 = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    const prevStyle = {
      background: "#F7FAFC",
      borderWidth: "0px",
      color: "#333333",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "600",
      padding: "12px 18px",
      border: "1px solid #EEEEEE",
      marginRight: "1rem",
    };
    const nextStyle = {
      background: "#4885ed",
      borderWidth: "0px",
      color: "#fff",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "600",
      padding: "12px 18px",
    };

    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(signupAction(email, password, props.history));
    }
    if(isIndividual) {steps.splice(2, 1);}
  return (
    <div className="authincation h-100 p-meddle">
      <div className="page-content bg-white login-style2" style={{
					backgroundImage:"linear-gradient(to bottom, rgba(41, 106, 176, 0.7), rgba(0, 0, 0, 0.83)), url(" + loginbg + ")",
					//backgroundImage:"url("+ loginbg +")",
					 backgroundSize:"cover"
					
					}}>
      <div className="container h-100" style={{paddingTop:"40px"}}>
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-12">
            <div className="authincation-content" >
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      {/* <Link to="/login"> */}
                        <img  style={{maxHeight:"120px"}} src={logo} alt="" />
                      {/* </Link> */}
                    </div>
                    <h4 className="text-center mb-4 ">Create your account to get access</h4>
					{props.errorMessage && (
						<div className=''>
							{props.errorMessage}
						</div>
					)}
					{props.successMessage && (
						<div className=''>
							{props.successMessage}
						</div>
					)}
                  {/* <form
                onSubmit={(e) => e.preventDefault()}
                id="step-form-horizontal"
                className="step-form-horizontal"
              > */}
                {/* <Multistep
               activeStep={1}
                  showNavigation={true}
                  steps={steps}
                  prevStyle={prevStyle}
                  nextStyle={nextStyle}
                /> */}
                 <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label.name}</StepLabel>
              <StepContent style={{width:"100%"}}>
                
              {label.component}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
              {/* </form> */}
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);

