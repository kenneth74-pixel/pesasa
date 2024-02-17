import React, {useState, useEffect} from "react";
import { verifyCode, getClientPhoneEmail, getVerification, resendCodes } from "../../util/APIUtils.js";
import { RotateSpinner  } from "react-spinners-kit";
import swal from "sweetalert";
import Icon from "@mui/material/Icon";

let timeoutId=null

const StepTwo = (props) => {
   const [isLoading, setLoading] = useState(false);
   const [loading2, setLoading2] = useState(false);
   

   const [theObj, setTheObj] = useState({});
   const [verificationData, setVerification] = useState({});
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
   
   const [addFormData, setAddFormData ] = useState({
		email:props.email,
      phoneCode:"",
        code:''})

   const handleAddFormChange = (event) => {
      event.preventDefault();    
      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;
     // alert(fieldValue)
      const newFormData = {...addFormData};
      newFormData[fieldName] = fieldValue;
      setAddFormData(newFormData);
  };



  const getAllVerification = ()=> {
   const email = localStorage.getItem('email');
   if(email){
   getVerification(email)
   .then((response) => {
      setLoading(false)
      setVerification(response)
      //alert(JSON.stringify(response))
      console.log(response)
      if(response.isBothVerified){
if(parseInt(response.bussinessType)===1){
   props.history.push(
      {
          pathname: '/login',
          state: {  email:props.email }
      })

}
   else{ 
      props.pushTo(2)
   }     

      }

   })
   .catch((error) => {
     setLoading(false)
console.log(error);
swal('Oops', error.message, "error");
   });
}
  }
  
  const handleGetEmail = (email)=> {
   const addFormData={
      email:email
   }
   getClientPhoneEmail(addFormData)
   .then((response) => {
setTheObj(response)

   })
   .catch((error) => {
     setLoading(false)
console.log(error);
// swal('Oops', error?.message, "error");
   });
  }

  useEffect(() => {
   getAllVerification()
   handleGetEmail(props.email);
     // Disable the button initially
     setIsButtonDisabled(true);

     // Enable the button after 1 minute
      timeoutId = setInterval(() => {
       setCountdown((prevCountdown) => prevCountdown - 1);
     }, 1000); // Update countdown every 1000 milliseconds (1 second)
 
     // Clear the interval when the component is unmounted
     return () => {
       clearInterval(timeoutId);
     };

  
}, []);


useEffect(() => {
   // Enable the button when the countdown reaches 0
   if (countdown === 0) {
      clearInterval(timeoutId);
     setIsButtonDisabled(false);
     setCountdown(60)
   }
 }, [countdown]);


  const handleAddFormSubmit = (event)=> {
   event.preventDefault();
   var error = false;
var errorMsg = '';
   if(addFormData.code === ""){
       error = true;
 errorMsg = 'Please fill in the verfication code';
   }



   if(!error){
      const email = localStorage.getItem('email');
      addFormData.email=props.email
      addFormData.isEmail=true;
      addFormData.id=email
 
 console.log(addFormData)
//	alert(JSON.stringify(addFormData))
 setLoading(true)
 verifyCode(addFormData)
       .then((response) => {
   //setPostModal(false);
   swal('Good job!', 'Successfully verfied email', "success");
   getAllVerification()

       })
       .catch((error) => {
         setLoading(false)
   console.log(error);
   swal('Oops', error.message, "error");
       });
      
     //  addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = '';         
       
   }else{
 swal('Oops', errorMsg, "error");
}
}; 


const handleAddFormSubmit2 = (event)=> {
   event.preventDefault();
   var error = false;
var errorMsg = '';
   if(addFormData.phoneCode === ""){
       error = true;
 errorMsg = 'Please fill in the verfication code';
   }



   if(!error){
      const email = localStorage.getItem('email');
      addFormData.code=addFormData.phoneCode;
      addFormData.isEmail=false;
      addFormData.id=email
      addFormData.email=theObj.phone.split(" ").join("")
 
 console.log(addFormData)
//	alert(JSON.stringify(addFormData))
 setLoading(true)
 verifyCode(addFormData)
       .then((response) => {
   //setPostModal(false);
   swal('Good job!', 'Successfully verfied phone number', "success");
   setLoading(false)
   getAllVerification()
   
//props.pushTo(2)
       })
       .catch((error) => {
         setLoading(false)
   console.log(error);
   swal('Oops', error.message, "error");
       });
      
     //  addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = '';         
       
   }else{
 swal('Oops', errorMsg, "error");
}
}; 



   return (
      <section>
         <div className="row">
            {/* <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Company Name*</label>
                  <input
                     type="text"
                     name="firstName"
                     className="form-control"
                     placeholder="Cellophane Square"
                     required
                  />
               </div>
            </div> */}
            <div className="col-lg-5 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Email Address*</label>
                  <input
                  disabled={true}
                  value={props.email}
                     type="email"
                     className="form-control"
                     id="emial1"
                    // placeholder="example@example.com.com"
                     required
                  />
               </div>
            </div>

            {verificationData.isEmailVerified?null:
            <div className="col-lg-4 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Input email verfication code*</label>
                  <input
                     type="text"
                     name="code"
                     onChange={handleAddFormChange}
                     className="form-control"
                     placeholder="email verification code"
                     required
                  />
               </div>
            </div>
}

            <div className="col-lg-3 mb-2">
               <div className="form-group mb-3">
               {isLoading?
            <RotateSpinner  size={30} color="rgba(41, 106, 176,1)" loading={isLoading} />:
            (
               verificationData.isEmailVerified?<> 
                <div style={{color:"green", marginTop:"30px"}}>
               Email Verified <Icon fontSize="medium" 
            //    style={{
            //   //  color :"green",
            //     marginRight:"5px",
            //     marginTop:"0px",
            //     position:"absolute"
            //   }}
                
                >done</Icon>
                </div></>:
            <button style={{width:"auto", marginTop:"30px"}}  className="btn btn-success" onClick={(e)=>handleAddFormSubmit(e)} >
           Verify Email

            </button>)}
               </div>
            </div>
         </div>



         <div className="row">
           
            <div className={verificationData.isPhoneVerified?"col-sm-5 mb-2":"col-sm-5 mb-2"}>
               <div className="form-group mb-3">
                  <label className="text-label">Phone Number*</label>
                  <input
                  disabled={true}
                  value={theObj.phone}
                     type="email"
                     className="form-control"
                     id="emial1"
                    // placeholder="example@example.com.com"
                     required
                  />
               </div>
            </div>
            {verificationData.isPhoneVerified?null:
            <div className="col-sm-4 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Input phone verfication code*</label>
                  <input
                     type="text"
                     name="phoneCode"
                     onChange={handleAddFormChange}
                     className="form-control"
                     placeholder="phone verification code"
                     required
                  />
               </div>
            </div>}
            <div className={verificationData.isPhoneVerified?"col-sm-4 mb-2":"col-sm-3 mb-2"}>
               <div className="form-group mb-3">
               {isLoading?
            <RotateSpinner  size={30} color="rgba(41, 106, 176,1)" loading={isLoading} />:
           (verificationData.isPhoneVerified?
            <> <div style={{color:"green", marginTop:"30px"}}>
               Phone Verified <Icon fontSize="medium" 
            //    style={{
            //   //  color :"green",
            //     marginRight:"5px",
            //     marginTop:"0px",
            //     position:"absolute"
            //   }}
                
                >done</Icon>
                </div></>:
            <button style={{width:"auto", marginTop:"30px"}}  className="btn btn-success" onClick={(e)=> {handleAddFormSubmit2(e)}} >
           Verify Phone

            </button>)}
               </div>
            </div>
         </div>
         <div className="row">
         <div className="col-lg-12 mb-2">
         {isButtonDisabled? <b>Didn't recieve the codes? Click this button to re-send the codes in {countdown} seconds </b>:null}  
           {loading2?  <RotateSpinner  size={30} color="rgba(41, 106, 176,1)" loading={loading2} />: <button 
            disabled={isButtonDisabled}
            style={{width:"auto", marginLeft:"10px"}}  className="btn btn-success" onClick={(e)=>
{
    setIsButtonDisabled(true);
   setCountdown(60)
   setLoading2(true)
   resendCodes({phone:theObj.phone, email:props.email})
   .then((response) => {

      setLoading2(false)

      // Enable the button after 1 minute
       timeoutId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Update countdown every 1000 milliseconds (1 second)
  

   })
   .catch((error) => {
      setLoading2(false)
     setLoading(false)
console.log(error);
swal('Oops', error.message, "error");
   });
}

} >
           Resend Codes

            </button>}
            </div>
            </div>
         <div className="row">
         <div className="col-lg-3 mb-2">
               <div className="form-group mb-3">
            <button style={{width:"auto", marginTop:"30px"}}  className="btn btn-primary" onClick={(e)=>
props.pushTo(0)} >
           Previous Step

            </button>
               </div>
            </div>
         </div>
      </section>
   );
};

export default StepTwo;
