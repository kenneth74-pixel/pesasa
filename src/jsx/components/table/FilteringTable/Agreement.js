import React, { useState, useEffect } from "react";
import { countryCodes } from "./appData.js"
import {
  addClientCreditLimit, getClientFacilityAdmin, addClientFacilityAdmin,

  verifyClientFacilityAdmin,
  uploadFiles
} from "../../../../util/APIUtils.js";
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePond } from 'react-filepond';
import { Button } from "react-bootstrap";
import { RotateSpinner } from "react-spinners-kit";
import swal from "sweetalert";
const StepOne = (props) => {
  const [postModal, setPostModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fileId, setIncomp] = useState(0);

  const [disableInput, setdisableInput] = useState(false);
  const [showFilePond, setshowFilePond] = useState(true);
  const [creditFacility, setFacility] = useState({});
  const country = countryCodes.map(data => (

    <option value={data.name} > {" " + data.name + " "}</option>
  ))

  const codes = countryCodes.map(data => (

    <option value={data.dial_code} > {" " + data.name + " (" + data.dial_code + " )"}</option>
  ))

  const [addFormData, setAddFormData] = useState({
    id: null,
    currency: '',
    invoices: '',
    credit: '',
    limit: '',
    hasLoan: '',
    hasLien: ''


  });



  useEffect(() => {
    loadFacility()
    setdisableInput(true)
    setAddFormData(props.data)

  }, []);


  function loadFacility() {
    getClientFacilityAdmin({ clientid: props.client.id })
      .then((response) => {
        if (response.adminFile.path !== null) {
          setIncomp(0)
          setshowFilePond(false)
        }
        //  alert(JSON.stringify(response))
        setFacility(response)

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const years = range(2021, (new Date()).getFullYear());

  function range(start, end) {
    const theYears = []

    for (var m = start; m < end; m++) {
      theYears.push(m)
    }
    theYears.push(end);
    return theYears;
  }





  const handleDateChange = (event) => {
    //	alert(JSON.stringify(event))
    // event.preventDefault();    
    const fieldName = "dob";
    const fieldValue = event;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };


  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = '';
    addFormData.limit = addFormData.limit.split(",").join("")
    addFormData.invoices = addFormData.invoices.split(",").join("")

    if (addFormData.currency === "") {
      error = true;
      errorMsg = 'Please choose credit limit currency';
    } else if (addFormData.invoices === "") {
      error = true;
      errorMsg = 'Please add average of total value of invoices issued per month';
    }

    else if (addFormData.credit === "") {
      error = true;
      errorMsg = 'Please add average credit period of invoices';
    }

    else if (addFormData.limit === "") {
      error = true;
      errorMsg = 'Please add limit Requested (Minimum Ugshs 5,000,000 )';

    }

    else if (addFormData.limit < 5000000) {
      error = true;
      errorMsg = 'Limit requested is below the 5,000,000 minimum';
    }

    else if (addFormData.hasLoan === "") {
      error = true;
      errorMsg = 'Please select if you have a loan';
    }

    else if (addFormData.hasLien === "") {
      error = true;
      errorMsg = 'Please indicate if there is a lien over your receivables or debenture over floating assets/debtors/receivables';
    }




    if (!error) {



      console.log(addFormData)
      //  	alert(JSON.stringify(addFormData))
      //    setLoading(true)
      //  props.history.push(
      //    {
      //        pathname: '/login',
      //        state: {  email:addFormData.email }
      //    }
      //   // '/page-register'
      //    );  

      addClientCreditLimit(addFormData)
        .then((response) => {
          setPostModal(false);
          swal('Good job!', 'Successfully saved data', "success");
          //    getTheDirectors()
          //props.setEmail(addFormData.email)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          swal('Oops', error.message, "error");
        });

      //  addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = '';         

    } else {
      swal('Oops', errorMsg, "error");
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function numberWithCommas(x) {
    if (x !== null && x !== undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
    }
  }

  const handleAddFormChangeNumber = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value.split(",").join("");
    // alert(fieldValue)
    if (!isNaN(fieldValue)) {
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
      setAddFormData(newFormData);
    }
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    // alert(fieldValue)
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  return (
    <section style={{ marginTop: "10px" }}>


      <div className="row">
        <div className="col">
          <h4>Credit Facility Agreement</h4>
        </div>
      </div>

      <div className="row" style={{ marginTop: "20px" }}>


        <div className="col-md-3 mb-2">
          <label className="text-black font-w500"> Sent Agreement</label>
          <div className="">

            {creditFacility.adminFile?.path !== null ?

              <a
                target="_blank"
                href={creditFacility.adminFile?.path} download>

                <b className="text-primary">View Agreement Sent</b>
              </a>
              : null}

            {showFilePond ? <FilePond
              acceptedFileTypes={['application/pdf' : '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
            allowMultiple={true}
            maxFileSize={'2MB'}
//</GridItem>server=
          labelIdle="Drag &amp; Drop  Credit Limit Facilitaion Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
        server={
          {
            process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

              // fieldName is the name of the input field
              // file is the actual file object to send
              const formData = new FormData();
              formData.append("file", file);
              formData.append("name", fieldName);
              formData.append("type", 6);
              uploadFiles(formData)
                .then((response) => {

                  setIncomp(response.id)
                  load(response.id);
                })
                .catch((error) => {
                  alert(error);
                  alert(JSON.stringify(error))
                });

              return {
                abort: () => {
                  // This function is entered if the user has tapped the cancel button
                  // request.abort();

                  // Let FilePond know the request has been cancelled
                  abort();
                }
              };
            },
            revert: (uniqueFileId, load, error) => {
              //  removeFile(this.state.fid)
              setIncomp(0)

              load()
            }
          }
        }></FilePond>:

      <Button
        variant="warning btn-xxs"
        style={{ width: "auto", marginLeft: "10px" }} className="ml-4" onClick={(e) => setshowFilePond(true)} >
        Change File

      </Button>
}

      {fileId !== 0 ?
        (
          isLoading ?
            <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
            <Button
              variant="primary btn-xxs"
              style={{ width: "auto" }} onClick={(e) => {
                setLoading(true)
                addClientFacilityAdmin({
                  clientid: props.client.id,
                  fileId: fileId,
                  staus: "PENDING_APPROVAL"

                })
                  .then((response) => {
                    setLoading(false)
                    swal('Facility Agreement Sent!', 'Successfully sent file', "success");
                    loadFacility()

                  })
                  .catch((error) => {
                    setLoading(false)
                    console.log(error);
                  });
              }} >
              Send to client

            </Button>) : null
      }
      <span className="validation-text"></span>
    </div>
               
            </div >
          
          
            <div  className="col-md-3 mb-2">

<div className="form-group mb-3">
<label className="text-black font-w500">Signed Agreement
</label>
<div className="contact-name">
<div className="form-group mb-0">
{creditFacility.clientFile?.path===null?"Client has not submited yet":

<a 
			 target="_blank"
			 href={creditFacility.clientFile?.path} download>

       <b className="text-primary">View Agreement Signed</b> 
       </a>
}
</div>
</div>
</div>
</div>



<div  className="col-md-3 mb-2">

<div className="form-group mb-3">
<label className="text-black font-w500">Status
</label>
<div className="contact-name">
<div className="form-group mb-0">
{creditFacility.clientFile?.path===null?"Not applicable":creditFacility.staus}
</div>
</div>
</div>
</div>



          
<div  className="col-md-3 mb-2">

<div className="form-group mb-3">
<label className="text-black font-w500">Actions
</label>
<div className="contact-name">
<div className="form-group mb-0">
  {isLoading?
    <RotateSpinner  size={30} color="rgba(41, 106, 176,1)" loading={isLoading} />:
<Button 
  variant="primary btn-xxs"
disabled={creditFacility.clientFile?.path===null}
style={{width:"auto"}}  className="btn btn-info" 


onClick={(e)=>{
  setLoading(true)
  verifyClientFacilityAdmin({id:creditFacility.id,
    staus:"VERIFIED"
  
  })
  .then((response) => {
    setLoading(false)
    swal('Facility Agreement Approved!', 'Successfully approved Credit Facility Agreement', "success");
   loadFacility()
    
  })
  .catch((error) => {
    setLoading(false)
    console.log(error);
  });
}}
>
            Approve
 
             </Button>}




             {isLoading?
    <RotateSpinner  size={30} color="rgba(41, 106, 176,1)" loading={isLoading} />:
<Button 
  variant="danger btn-xxs"
disabled={creditFacility.clientFile?.path===null}
style={{width:"auto", marginLeft:"10px"}}  className="btn btn-info" 


onClick={(e)=>{
  setLoading(true)
  verifyClientFacilityAdmin({id:creditFacility.id,
    staus:"REJECTED"
  
  })
  .then((response) => {
    setLoading(false)
    swal('Facility Agreement Rejected!', 'Successfully rejected Credit Facility Agreement', "success");
   loadFacility()
    
  })
  .catch((error) => {
    setLoading(false)
    console.log(error);
  });
}}
>
            Reject
 
             </Button>}
</div>
</div>
</div>
</div>


       
            </div >
      </section >
   );
};

export default StepOne;
