import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { Row, Card, Col, Alert, Button, Badge, Media } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { connect, useDispatch } from 'react-redux';
import { Link , useLocation} from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../store/actions/AuthActions';
import { login, sendPasswordCode , resetPassword} from "./../../util/APIUtils.js";
import { ACCESS_TOKEN } from "./../../constants";
// image
//import logo from "../../images/logo-full-white.png";
import swal from "sweetalert";
import loginbg from "./../../images/bg8.png";
import logo2 from './../../images/logo-white.png';
import { RotateSpinner  } from "react-spinners-kit";
function Login (props) {
	const location = useLocation();
	const theEmail=location.state?.email 
	const notifyTopCenter = () => {
		toast.warn("✔️ Top Center !", {
		  position: "top-center",
		  autoClose: 5000,
		  hideProgressBar: false,
		  closeOnClick: true,
		  pauseOnHover: true,
		  draggable: true,
		  progress: undefined,
		});
	  };
	  const [isLoading, setisLoading] = useState(false);
	  const [isPasswordReset, setisPasswordReset] = useState(false);
  const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
	const [code, setCode] = useState("");
	
    const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [showPassword3, setShowPassword3] = useState(false);

	const [cpassword, setcPassword] = useState('');
	function  isNullOrEmpty(str){
		//alert(str)
		if(str===null || str===undefined){
		  return true
		}
		else{
		 return !str.toString() || !str.toString().trim();
		}
	  }
	function handleReset(){
		if(isNullOrEmpty(email)){
			return swal("Email or Phone Number Missing", "Please first fill in your email or phone number", "error");
		}
		setisLoading(true)
		const loginRequest = {
			email: email
		  }; 
		  sendPasswordCode(loginRequest)
		  .then((response) => {
			if(response.success){
				setisLoading(false)
				setisPasswordReset(true)
				swal("Great", "We have sent a password reset code to your email and phone for resetting your password", "success");
			}
			else{
				setisLoading(false)
				swal("Request Error !", response.message, "error");	
			}
		  })
		  .catch((error) => {
			//alert(JSON.stringify(error))
			setisLoading(false)
			swal("Ooops", "Sorry, an error occured", "error");
		  })

		
	}

	function handleResetPassword(e){
		e.preventDefault();
		setisLoading(true)
		const loginRequest = {
			email: email,
			code:code,
			password:password
		  }; 
		  if(email===""){
			swal("Ooops", "Please add email", "error");
		  }
		  else if(code===""){
			swal("Ooops", "Please add code", "error");
		  }
		  else if(password===""){
			swal("Ooops", "Please add password", "error");
		  }

		  else if(password!==cpassword){
			swal("Ooops", "Passwords do not match", "error");
		  }
		  else{
		  resetPassword(loginRequest)
		  .then((response) => {
			setisLoading(false)
			setisPasswordReset(false)
			swal("Great", "Password successfully reset, you can now login to your account with the new password.", "success");
			
		  })
		  .catch((error) => {
			setisLoading(false)
			swal("Ooops", "Sorry, invalid password reset code", "error");
		  })
		}

		
	}
	
	useEffect(() => {
		//  window.scrollTo(0, 0);
		//alert(data)
		if(theEmail!==undefined && theEmail!==null  ){
	
		  setEmail(theEmail)
		}
	
		}, []);

	// const [email, setEmail] = useState('demo@example.com');
    // let errorsObj = { email: '', password: '' };
    // const [errors, setErrors] = useState(errorsObj);
    // const [password, setPassword] = useState('123456');

	const handleLogin = () => {
		const loginRequest = {
		  usernameOrEmail: email,
		  password: password
		};
	
		//alert(JSON.stringify(loginRequest))
	
		login(loginRequest)
		.then((response) => {
		
			// alert(response.waitingTime)
	
			// this.setState({ isLoading: false })
			// this.props.changeState(true);
			if(response.accessToken===null){
				swal("Ooops", "Sorry, invalid user name or password", "error");
			}
			else if (response.success === false) {
				swal("Ooops", "Sorry, invalid user name or password", "error");
		//    alert('Sorry, invalid user name or password')
			  //openSnackbar({ message: 'Sorry, invalids user name or password', type: false });
			}
			else{
			//  alert("logged in")
			localStorage.setItem(ACCESS_TOKEN, response.accessToken);
			dispatch(loadingToggleAction(true));	
        dispatch(loginAction(email, password, props.history));
			//navigate("/dashboard")
		  
		  
		  }
		   // this.props.onLogin(response.message);
		 
		})
		.catch((error) => {
		// 	<Alert
		// 	variant={"danger"}
		// 	className="alert-dismissible fade show"
		//   >
			
		// 	<strong>{"hello"}</strong> 
			
		//   </Alert>
		// alert('Sorry, invalids user name or password')
		swal("Ooops", "Sorry, invalid user name or password", "error");
			toast.warn("✔️ Top Center !", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			  });
			//notifyTopCenter()
		 //  alert(JSON.stringify(error))
		  //alert("error dudes"+error)
		//  alert(error)
		
		});
	
	  };

    const dispatch = useDispatch();

	function signup(){
		localStorage.clear()
		props.history.push(
			{
				pathname: '/page-register',
				//state: { key1: 'page1', email:email }
			}
		   // '/page-register'
			);  
	}

    function onLogin(e) {
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
        if (error) {
			return ;
		}

		//localStorage.setItem(ACCESS_TOKEN, response.accessToken);
		dispatch(loadingToggleAction(true));	
	dispatch(loginAction(email, password, props.history));
		//handleLogin()
		
    }

  return (
	
		
		<div className="page-wraper">
				<div className="page-content bg-white login-style2" style={{
					backgroundImage:"linear-gradient(to bottom, rgba(41, 106, 176, 0.7), rgba(0, 0, 0, 0.83)), url(" + loginbg + ")",
					//backgroundImage:"url("+ loginbg +")",
					 backgroundSize:"cover"
					
					}}>
					<div className="section-full">
						<div className="container">
							<div className="row">
								<div className="col-lg-6 col-md-6 d-flex">
									<div className="text-white max-w400 align-self-center">
										<div className="logo">
											<Link to={"#"}><img style={{maxHeight:"120px"}} src={logo2} alt="" /></Link>
										</div>
										<h2 className="mb-2 text-white font-w700">Welcome to Pesasa</h2>
										<p className="mb-4">Quick and Simple credit for small and growing businesses</p>
										{/* <ul className="d-flex ">
											<li><Link to={''} className="me-3 text-white "><i className="fa fa-facebook"></i></Link></li>
											<li><Link to={''} className="me-3 text-white "><i className="fa fa-google-plus"></i></Link></li>
											<li><Link to={''} className="me-3 text-white "><i className="fa fa-linkedin"></i></Link></li>
											<li><Link to={''} className="me-3 text-white "><i className="fa fa-instagram"></i></Link></li>
											<li><Link to={''} className="me-3 text-white"><i className="fa fa-twitter"></i></Link></li>
										</ul> */}
									</div>
								</div>
								<div className="col-lg-6 col-md-6">
									<div className="login-2 submit-resume p-4 seth">
										<div className="nav">
										{isPasswordReset?
										<form onSubmit={handleResetPassword} className="col-12 p-a0 ">
										<p className="font-weight-600">If you have an account with us, please log in.</p>
										{props.errorMessage && (
											<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
												{props.errorMessage}
											</div>
										)}
										{props.successMessage && (
											<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
												{props.successMessage}
											</div>
										)}


										<div className="form-group mb-3">
											<label>E-Mail Address Or Phone number *</label>
											<div className="input-group">
												<input type="email" className="form-control" 
													placeholder="Type Your Email Address"  
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
												{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
											</div>
										</div>
										
											<div className="form-group mb-3">
											<label>Reset Code * (Check your email or phone for the reset code)</label>
											<div className="input-group">
												<input
													type="code"
													className="form-control"
													value={code}
													placeholder="Password reset code"
													onChange={(e) =>
														setCode(e.target.value)
													}
												/>
												{/* {errors.password && <div className="text-danger fs-12">{errors.password}</div>} */}
											</div>
										</div>
										<div className="form-group mb-3">
											<label>Enter New Password</label>
											<div className="input-group">
												<input
												style={{borderTopRightRadius:15, borderBottomRightRadius:15}}
													type={showPassword2?"text":"password"}
													className="form-control"
													value={password}
													placeholder="Type Your Password"
													onChange={(e) =>
														setPassword(e.target.value)
													}
												/>
													<span style={{position:"absolute", 
														// backgroundColor:"green",
														zIndex:200, right:0, paddingRight:15, color:"black", cursor:"pointer", paddingTop:15}}
														
														onClick={(e) =>
															setShowPassword2(!showPassword2)
														}
														>
															{showPassword2?
															<i className="fa fa-eye-slash"></i>
															:
															<i className="fa fa-eye"></i>
}
															
															</span>
												{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
											</div>
										</div>
											<div className="form-group mb-3">
											<label>Confirm Password *</label>
											<div className="input-group">
												<input
												style={{borderTopRightRadius:15, borderBottomRightRadius:15}}
													type={showPassword3?"text":"password"}
													className="form-control"
													value={cpassword}
													placeholder="Confirm Password"
													onChange={(e) =>
														setcPassword(e.target.value)
													}
												/>
												<span style={{position:"absolute", 
														// backgroundColor:"green",
														zIndex:200, right:0, paddingRight:15, color:"black", cursor:"pointer", paddingTop:15}}
														
														onClick={(e) =>
															setShowPassword3(!showPassword3)
														}
														>
															{showPassword3?
															<i className="fa fa-eye-slash"></i>
															:
															<i className="fa fa-eye"></i>
}
															
															</span>
												{/* {errors.password && <div className="text-danger fs-12">{errors.password}</div>} */}
											</div>
										</div>


										<div className="text-center">
											<button className="btn btn-primary btn-md float-start"
											onClick={(event) =>  handleResetPassword()}
											>Reset Password</button>
											<div
											style={{cursor:"pointer"}}
											to="page-register" 
											
											onClick={(event) => setisPasswordReset(false)}
											className="btn-link forget-pass mt-3 float-end"> Cancel Reset</div> 
										</div>

									
									</form>
										
										
										:
											<form onSubmit={onLogin} className="col-12 p-a0 ">
												<p className="font-weight-600">If you have an account with us, please log in.</p>
												{props.errorMessage && (
													<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
														{props.errorMessage}
													</div>
												)}
												{props.successMessage && (
													<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
														{props.successMessage}
													</div>
												)}


												<div className="form-group mb-3">
													<label>E-Mail Address Or Phone number *</label>
													<div className="input-group">
														<input type="text" className="form-control" 
															placeholder="Type Your Email Address"  
															value={email}
															onChange={(e) => setEmail(e.target.value.toString().split(" ").join(""))}
														/>
														{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
													</div>
												</div>
												{isPasswordReset?
													<div className="form-group mb-3">
													<label>Reset Code * (Check your email for a reset code)</label>
													<div className="input-group">
														<input
															type="code"
															className="form-control"
															value={code}
															placeholder="Password reset code"
															onChange={(e) =>
																setCode(e.target.value)
															}
														/>
														{/* {errors.password && <div className="text-danger fs-12">{errors.password}</div>} */}
													</div>
												</div>:null
											}
												<div className="form-group mb-3">
													<label>{isPasswordReset?"Enter New Password":"Password *"}</label>
													<div className="input-group">
														<input
														style={{borderTopRightRadius:15, borderBottomRightRadius:15}}
															type={showPassword?"text":"password"}
															className="form-control"
															value={password}
															// right={}
															placeholder="Type Your Password"
															onChange={(e) =>
																setPassword(e.target.value)
															}
														/>
														<span style={{position:"absolute", 
														// backgroundColor:"green",
														zIndex:200, right:0, paddingRight:15, color:"black", cursor:"pointer", paddingTop:15}}
														
														onClick={(e) =>
															setShowPassword(!showPassword)
														}
														>
															{showPassword?
															<i className="fa fa-eye-slash"></i>
															:
															<i className="fa fa-eye"></i>
}
															
															</span>
														{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
													</div>
												</div>
												{isPasswordReset?
													<div className="form-group mb-3">
													<label>Confirm Password *</label>
													<div className="input-group">
														<input
															type="password"
															className="form-control"
															value={cpassword}
															placeholder="Confirm Password"
															onChange={(e) =>
																setcPassword(e.target.value)
															}
														/>
														
														{/* {errors.password && <div className="text-danger fs-12">{errors.password}</div>} */}
													</div>
												</div>:null
											}

{isPasswordReset?
												<div className="text-center">
													<button className="btn btn-primary btn-md float-start"
													onClick={(event) =>  handleResetPassword()}
													>Reset Password</button>
													<div
													style={{cursor:"pointer"}}
													to="page-register" 
													
													onClick={(event) => setisPasswordReset(false)}
													className="btn-link forget-pass mt-3 float-end"> Cancel Reset</div> 
												</div>
												:
												<div >
													<table style={{width:"100%"}}>
														<tr><td></td><td><button className="btn btn-primary btn-md "
													
													style={{right:0, width:"100%"}}
													onClick={(event) =>  handleLogin()}
													> <i className="fa fa-sign-in"></i>  Login </button></td></tr>
													<tr style={{paddingTop:"20px"}}><td style={{paddingTop:"50px"}}><p style={{top:0}}>Have no account?</p></td><td> <button  
													onClick={(event) =>  signup()}
													style={{textDecoration:"none", border:"none", 
													marginTop:"30px",
													width:"100%",
													 right:"-20px"}}
													//to="page-register" 
													className="btn btn-primary btn-md "><i className="fa fa-unlock-alt"></i>  Sign up here</button> </td></tr>
													</table>
													
											
												</div>}

											
											</form>}
										</div>
										{!isPasswordReset?
										<div style={{textAlign:"left", 
										cursor:"pointer",
										color:"orange", marginTop:"10px"}}>
											{isLoading?  <RotateSpinner  size={30} color="rgba(41, 106, 176,1)" loading={isLoading} />:
													<div className="btn-link forget-pass mt-3 float-start"
													onClick={(event) =>  handleReset()}
													>Forgot password? Click here to reset</div>}
													
												</div>:null}
									</div>
								</div>
							</div>
						</div>
						
					</div>
					<footer className="login-footer">
						<div className="container">
							<div className="row m-0">
								<div className="col-12 p-0 text-center text-white op8">
									<span className="float-sm-start float-none mb-sm-0 mb-1 d-sm-inline-block d-block">© Copyright by Pesasa
									{/* <Link className=" text-white op8" to={""}>Pesasa </Link> */}
									 </span>
									<span className="float-sm-end float-none">
										All rights reserved.
									</span>
								</div>
							</div>
						</div>
					</footer>
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
export default connect(mapStateToProps)(Login);
