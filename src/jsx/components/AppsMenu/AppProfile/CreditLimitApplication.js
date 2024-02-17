import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { nationalities, countryCodes } from "./appData.js"
import { addClientCreditLimit, clientGetCreditLimit, getProcessComments } from "../../../../util/APIUtils.js";
import { Modal } from 'react-bootstrap';
import { RotateSpinner } from "react-spinners-kit";
import TableExport from "./TableExport.jsx";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import swal from "sweetalert";
const StepOne = (props) => {
  const [postModal, setPostModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [disableInput, setdisableInput] = useState(false);
  const [isLoad, seLoad] = useState(false);
  const [postModal2, setPostModal2] = useState(false);
  const [comments, setComments] = useState([]);
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
    hasLien: '',
    loanAmount: 0,
    loancurrency: 'UGX',
    loanSource: '',
    sourceDescribe: ''



  });

  function getComments(data) {
    setComments([])
    getProcessComments(data)
      .then((response) => {
        setComments(response)
        //	setPostModal(false);
        //	swal('Good job!', 'Successfully Added', "success");

      })
      .catch((error) => {
        console.log(error);
        swal('Oops', error.message, "error");
      });
  }
  function openDetails2(data, process) {
    //	setPostModal(false)
    const getme = {
      process: process,
      processId: data.id
    }
    getComments(getme)
    setPostModal2(true)
  }

  function getBussunisessData() {
    seLoad(true)
    clientGetCreditLimit()
      .then((response) => {
        //  response.dob=new Date(response.dob)
        //response.vat=response.vat.toString().toLowerCase()
        if (response.id !== null) {
          setdisableInput(true)
        }
        if (response.limit !== null) {
          setAddFormData(response)
        }

        //setIncompObje

        seLoad(false)

      })
      .catch((error) => {
        seLoad(false)
        console.log(error);
        //swal('Oops', error.message, "error");
      });
  }

  useEffect(() => {
    getBussunisessData()

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
    addFormData.statusView = ""
    addFormData.limit = addFormData?.limit?.toString().split(",").join("")
    addFormData.invoices = addFormData?.invoices?.toString().split(",").join("")

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

    else if (addFormData.hasLoan === "yes" && addFormData.loanAmount === 0) {
      error = true;
      errorMsg = 'Please loan amount';
    }


    else if (addFormData.hasLoan === "yes" && addFormData.loanSource === '') {
      error = true;
      errorMsg = 'Please loan source';
    }


    else if (addFormData.hasLoan === "yes" && addFormData.loanSource === 'Other' && addFormData.sourceDescribe === '') {
      error = true;
      errorMsg = 'Please describe source';
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
          getBussunisessData()
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

  comments.map((data) => {
    data.type = data.type === "VERIFIED" ? <div style={{ color: "green" }}>{data.type} <i className="fa fa-check"></i></div> : (data.type === "DECLINED" ? <div style={{ color: "red" }}>{data.type} <i className="fa fa-times"></i></div> : data.type)
    data.dateAdded = new Date(data.dateAdded).toDateString()
  })

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
      <Dialog
        disableEnforceFocus
        //className="modal fade"
        //  className="fade bd-example-modal-lg"
        // fullscreen={true} 
        //dialogClassName="modal-90w"
        /// size="lg"
        fullWidth={true}
        maxWidth={"lg"}
        open={postModal2}
        onClose={setPostModal2}
      >

        <DialogTitle>
          <h4 >Approval Detail</h4>



          {/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
        </DialogTitle>
        <DialogContent

        >
          <TableExport

            hideDataExport={true}
            rows={comments}
            //rows={this.state.colors[1]==="primary"?finished: dataTemp}
            columns={[
              { name: 'dateAdded', title: 'Date' },
              { name: 'user', title: 'User' },
              { name: 'type', title: 'Action' },

              { name: 'comment', title: 'Comment' },
              // { name: 'actions', title: 'Actions' },
            ]}
            //  exportColumns={this.state.columns2}
            defaultExpandedGroups={[]}
            grouping={[]}
            defaultHiddenColumnNames={[]}
            defaultPageSize={0}
            hideSelectionExport
            infiniteScrolling
            fileName={"Directors"}


          />

        </DialogContent>

        <DialogActions style={{ width: "100%", overflow: "hidden" }}>

          <button type="button"
            className="btn shadow btn-xs btn-primary"

            onClick={() => setPostModal2(false)}
            data-dismiss="modal">
            Close
          </button>

        </DialogActions>
      </Dialog>
      <div className="card" style={{ padding: "30px" }}>
        <div className="row">
          <div className="col">
            <h4>Credit Limit Application</h4>
            <p>Apply for credit limit</p>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "30px" }}>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-lg-3 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Select credit limit currency</label>
              <div className="form-group mb-3">

                <select
                  disabled={disableInput}
                  value={addFormData.currency}
                  defaultValue={""}
                  name="currency"
                  onChange={handleAddFormChange}
                  className="form-control"
                >
                  <option disabled value="">Select currency</option>
                  <option value="Sole Proprietor">UGX</option>
                  <option value="Limited Liability Company">USD</option>

                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-5 mb-2">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Average of total value of invoices issued per month</label>
            <div className="contact-name">
              <input
                disabled={disableInput}
                type="text" className="form-control" autoComplete="off"
                value={numberWithCommas(addFormData.invoices)}
                name="invoices" required="required"
                onChange={handleAddFormChangeNumber}
                placeholder="Invoices total value"
              />
              <span className="validation-text"></span>
            </div>

          </div>

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Average credit period of invoices</label>
              <div className="form-group mb-3">

                <select
                  disabled={disableInput}
                  value={addFormData.credit}
                  defaultValue={""}
                  name="credit"
                  onChange={handleAddFormChange}
                  className="form-control"
                >
                  <option disabled value="">Select Average Credit</option>
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days</option>
                </select>
              </div>
            </div>
          </div>









          <div className="col-lg-8 mb-2">

            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Limit Requested (Minimum
                Ugshs 5,000,000
                )</label>
              <div className="contact-name">
                <div className="form-group mb-0">
                  <input
                    disabled={disableInput}
                    value={numberWithCommas(addFormData.limit)}
                    type="text" className="form-control" autoComplete="off"
                    name="limit" required="required"
                    onChange={handleAddFormChangeNumber}
                    placeholder="Limit Requested"
                  />
                </div>
              </div>
            </div>
          </div>


          {addFormData.limitApproved === null ? null :
            <div className="col-lg-4 mb-2">

              <div className="form-group mb-3">
                <label className="text-black font-w500">Credit Limit Amount Approved</label>
                <div className="contact-name">
                  <div className="form-group mb-0">
                    <input
                      disabled={disableInput}
                      value={numberWithCommas(addFormData.limitApproved)}
                      type="text" className="form-control" autoComplete="off"
                      name="limit" required="required"
                      onChange={handleAddFormChangeNumber}
                      placeholder="Limit Approved"
                    />
                  </div>
                </div>
              </div>
            </div>}










          <div className="col-lg-5 mb-2">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Do you have an existing debt/loan</label>
            <div className="contact-name">
              <div className="form-group mb-0">
                <label className="radio-inline me-3">
                  <input
                    disabled={disableInput}
                    required="required"
                    checked={addFormData.hasLoan === "yes"}
                    value="yes" onChange={handleAddFormChange} type="radio" name="hasLoan" /> Yes
                </label>
                <label className="radio-inline me-3">
                  <input
                    disabled={disableInput}
                    required="required"
                    checked={addFormData.hasLoan === "no"}
                    value="no" onChange={handleAddFormChange} type="radio" name="hasLoan" /> No
                </label>
              </div>
            </div>
          </div>

          {addFormData.hasLoan === "yes" ?
            <div className="row">
              <div className="col-lg-3 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Select Loan currency</label>
                  <div className="form-group mb-3">

                    <select
                      disabled={disableInput}
                      value={addFormData.loancurrency}
                      defaultValue={""}
                      name="loancurrency"
                      onChange={handleAddFormChange}
                      className="form-control"
                    >
                      <option disabled value="">Select currency</option>
                      <option value="UGX">UGX</option>
                      <option value="USD">USD</option>

                    </select>
                  </div>
                </div>
              </div>



              <div className={addFormData.loanSource === "Other" ? "col-lg-3 mb-2" : "col-lg-6 mb-2"}>

                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Loan Amount
                  </label>
                  <div className="contact-name">
                    <div className="form-group mb-0">
                      <input
                        disabled={disableInput}
                        value={numberWithCommas(addFormData.loanAmount)}
                        type="text" className="form-control" autoComplete="off"
                        name="loanAmount" required="required"
                        onChange={handleAddFormChangeNumber}
                        placeholder="Loan Amount"
                      />
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-lg-3 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Select Loan Source</label>
                  <div className="form-group mb-3">

                    <select
                      disabled={disableInput}
                      value={addFormData.loanSource}
                      defaultValue={""}
                      name="loanSource"
                      onChange={handleAddFormChange}
                      className="form-control"
                    >
                      <option disabled value="">Select Source</option>
                      <option value="Bank">Bank</option>
                      <option value="Money Lender">Money Lender</option>
                      <option value="Other">Other</option>

                    </select>
                  </div>
                </div>
              </div>


              {addFormData.loanSource === "Other" ?
                <div className="col-lg-3 mb-2">

                  <div className="form-group mb-3">
                    <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Describe Other Source
                    </label>
                    <div className="contact-name">
                      <div className="form-group mb-0">
                        <input
                          disabled={disableInput}
                          value={addFormData.sourceDescribe}
                          type="text" className="form-control" autoComplete="off"
                          name="sourceDescribe" required="required"
                          onChange={handleAddFormChange}
                          placeholder="Describe Other Source"
                        />
                      </div>
                    </div>
                  </div>
                </div> : null}

            </div> : null}



          <div className="col-lg-8 mb-2">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Is there a lien over your receivables or debenture over floating assets/debtors/receivables</label>
            <div className="contact-name">
              <div className="form-group mb-0">
                <label className="radio-inline me-3">
                  <input
                    disabled={disableInput}
                    required="required"
                    checked={addFormData.hasLien === "yes"}
                    value="yes" onChange={handleAddFormChange} type="radio" name="hasLien" /> Yes
                </label>
                <label className="radio-inline me-3">
                  <input
                    disabled={disableInput}
                    required="required"
                    checked={addFormData.hasLien === "no"}
                    value="no" onChange={handleAddFormChange} type="radio" name="hasLien" /> No
                </label>
              </div>
            </div>
          </div>









          <div className="col-lg-12 mb-12" style={{ textAlign: "left", marginTop: "30px" }}>
            <h4>Status : {addFormData.statusView = addFormData.status === "VERIFIED" ? <div style={{ color: "green" }}>{addFormData.status} <i className="fa fa-check"></i></div> : (addFormData.status === "REJECTED" ? <div style={{ color: "red" }}>{addFormData.status} <i className="fa fa-times"></i></div> : addFormData.status)}</h4>
            {isLoading ?
              <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
              <>
                {disableInput ?
                  <button style={{ width: "auto" }} className="btn btn-info" onClick={(e) => setdisableInput(false)} >
                    Edit Info

                  </button> :
                  <button style={{ width: "auto" }} className="btn btn-success" onClick={(e) => handleAddFormSubmit(e)} >
                    Save Info

                  </button>}

                {/* <button style={{ width: "auto", marginLeft: "10px" }} className="btn btn-primary" onClick={() => openDetails2(addFormData, "credit")}  >
                  View Approval Detail

                </button> */}
              </>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
