import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { nationalities, countryCodes } from "./appData.js"
import { addClientCreditLimit } from "../../../../util/APIUtils.js";
import { Modal } from 'react-bootstrap';
import { RotateSpinner } from "react-spinners-kit";
import swal from "sweetalert";
const StepOne = (props) => {
  const [postModal, setPostModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [disableInput, setdisableInput] = useState(false);
  const [isLoad, seLoad] = useState(false);
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
    setdisableInput(true)
    setAddFormData(props.data)

  }, []);

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

      <div className="card" style={{ padding: "30px" }}>
        <div className="row">
          <div className="col">
            <h4>Bank Account</h4>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "30px" }}>
        <div className="row" style={{ marginTop: "20px" }}>


          <div className="col-md-6 mb-2">
            <label className="text-black font-w500"> Account Name</label>
            <div className="contact-name">
              <input
                disabled={disableInput}
                type="text" className="form-control" autoComplete="off"
                //	value={numberWithCommas(addFormData.invoices)}
                name="invoices" required="required"
                onChange={handleAddFormChangeNumber}
                placeholder="Account Name"
              />
              <span className="validation-text"></span>
            </div>

          </div>


          <div className="col-md-6 mb-2">

            <div className="form-group mb-3">
              <label className="text-black font-w500">Account Number
              </label>
              <div className="contact-name">
                <div className="form-group mb-0">
                  <input
                    disabled={disableInput}
                    //value={numberWithCommas(addFormData.limit)}
                    type="text" className="form-control" autoComplete="off"
                    name="limit" required="required"
                    onChange={handleAddFormChangeNumber}
                    placeholder="Account Number"
                  />
                </div>
              </div>
            </div>
          </div>



          <div className="col-md-6 mb-2">

            <div className="form-group mb-3">
              <label className="text-black font-w500">Name of Bank
              </label>
              <div className="contact-name">
                <div className="form-group mb-0">
                  <input
                    disabled={disableInput}
                    //value={(addFormData.limit)}
                    type="text" className="form-control" autoComplete="off"
                    name="limit" required="required"
                    onChange={handleAddFormChangeNumber}
                    placeholder="Name of Bank"
                  />
                </div>
              </div>
            </div>
          </div>




          <div className="col-md-6 mb-2">

            <div className="form-group mb-3">
              <label className="text-black font-w500">Branch
              </label>
              <div className="contact-name">
                <div className="form-group mb-0">
                  <input
                    disabled={disableInput}
                    //value={(addFormData.limit)}
                    type="text" className="form-control" autoComplete="off"
                    name="limit" required="required"
                    onChange={handleAddFormChangeNumber}
                    placeholder="Branch"
                  />
                </div>
              </div>
            </div>
          </div>















          <div className="col-lg-12 mb-12" style={{ textAlign: "left", marginTop: "30px" }}>
            {isLoading ?
              <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
              <>
                <button disabled style={{ width: "auto" }} className="btn btn-success" onClick={(e) => handleAddFormSubmit(e)} >
                  Verify Info

                </button>
              </>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
