import React, { useState, useEffect } from "react";
import Select2 from 'react-select/creatable';
import DatePicker from "react-datepicker";
import { nationalities, countryCodes } from "./appData.js"
import {
  getReqFiles, getMoneyRates,
  getMyClientApplications, getBanks,
  uploadFiles, getClientFacilityClient,
  addApplicationInvoiceDiscount,
  addClientFacilityClient,
  clientGetApprovedClientBuyers
} from "../../../../util/APIUtils.js";
import { Modal } from 'react-bootstrap';
import { RotateSpinner } from "react-spinners-kit";
import { Button } from "react-bootstrap";
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePond } from 'react-filepond';
import swal from "sweetalert";
import TableExport from "./TableExport.jsx";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  Table,
} from "react-bootstrap";
import { SettingsApplications } from "@mui/icons-material";
const StepOne = (_props) => {
  const [postModal, setPostModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [showAll, setshowAll] = useState(false);


  const [isLoad, seLoad] = useState(false);
  const [postModal2, setpostModal2] = useState(false);
  const [colorc, setcolorc] = useState("black");
  const [applications, setApplications] = useState([]);
  const [requires, setRequires] = useState([]);
  const [approvedBuyers, setApprovedBuyers] = useState([]);
  const [rates, setRates] = useState([]);
  const [banks, setBanks] = useState([]);


  const [showPrev, setShowPrev] = useState(false);

  const [incompId, setIncomp] = useState(0);
  const [disableInput, setdisableInput] = useState(true);
  const country = countryCodes.map(data => (

    <option value={data.name} > {" " + data.name + " "}</option>
  ))

  const codes = countryCodes.map(data => (

    <option value={data.dial_code} > {" " + data.name + " (" + data.dial_code + " )"}</option>
  ))
  const [creditFacility, setFacility] = useState({});
  const [showFilePond, setshowFilePond] = useState(true);
  const [fileId, setFileId] = useState(0);
  const [control, setcontrol] = useState(0);



  const [addFormData, setAddFormData] = useState({
    id: null,
    periodId: null,
    buyer: '',
    currency: 'UGX',
    invoiceNo: '',
    recoveryMode: "select",
    discount: '',
    amount: '',
    banko: { 'value': "", 'label': "" },
    percent: 0,
    period: '',
    bankName: "",
    feeRate: '',
    discountFee: '',
    netDis: '',
    toDisburse: '',
    docs: [],
    acceptTerms: 'no',
    isnew: 'yes',
    tc: false,
    status: "",
    dateAdded: "",
    comments: [],
    bank: { id: null, bankId: null, name: "", number: "", branch: "", bankName: "" }



  });

  function alreadyExists(type) {
    let ans = false;

    for (let m = 0; m < addFormData.docs.length; m++) {
      const field = addFormData.docs[m];
      if (field.id === null && field.typeId === type) {
        ans = true;
        break;
      }

    }

    return ans;

  }


  function newApplication() {
    setdisableInput(false)
    const newApp = {
      id: null,
      periodId: null,
      buyer: '',
      currency: 'UGX',
      invoiceNo: '',
      discount: '',
      amount: '',
      percent: 0,
      period: '',
      feeRate: '',
      discountFee: '',
      netDis: '',
      docs: [],
      acceptTerms: 'no',
      isnew: 'yes',
      tc: false,
      status: "",
      dateAdded: "",
      comments: [],
      banko: { 'value': "", 'label': "" },
      bank: { id: null, bankId: null, name: "", number: "", branch: "", bankName: "" }



    }
    setAddFormData(newApp)

  }

  function setDocs(id, typeId) {
    const docsb = addFormData.docs
    docsb.push({ id: null, fileId: id, typeId: typeId })
    const newFormData = { ...addFormData };
    newFormData["docs"] = docsb;
    setAddFormData(newFormData);
  }

  function getApprovedBuyers() {
    seLoad(true)
    clientGetApprovedClientBuyers()
      .then((response) => {

        setApprovedBuyers(response)
        // setdisableInput(true)
        //setIncompObje

        seLoad(false)

      })
      .catch((error) => {
        seLoad(false)
        console.log(error);
        //swal('Oops', error.message, "error");
      });
  }

  function getRates() {
    getMoneyRates()
      .then((response) => {

        setRates(response)

      })
      .catch((error) => {
        console.log(error);
      });
  }


  function getReqeFiles() {
    getReqFiles()
      .then((response) => {

        setRequires(response)

      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getBanksHere() {
    getBanks()
      .then((response) => {

        setBanks(response)

      })
      .catch((error) => {
        console.log(error);
      });
  }


  function loadFacility() {
    getClientFacilityClient()
      .then((response) => {
        if (response.staus === "VERIFIED") {
          setshowAll(true)
        }

        if (response.clientFile.path !== null) {
          setFileId(0)
          setshowFilePond(false)
        }
        //  alert(JSON.stringify(response))
        setFacility(response)

      })
      .catch((error) => {
        console.log(error);
      });
  }



  function numberWithCommas(x) {
    if (x !== null && x !== undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
    }
  }
  function setAddFormDataOption(data) {
    data.isnew = data.isnew ? "yes" : "no"
    setAddFormData(data)
    setShowPrev(false)
    if (data.status === "VERIFIED") {
      // setdisableInput(false)
    }

  }
  function getBussunisessData() {
    seLoad(true)
    getMyClientApplications()
      .then((response) => {
        if (response.length > 0) {
          if (response[0].status === "VERIFIED") {
            // setdisableInput(true)
          }
          setdisableInput(true)
          response[0].type = response[0].status === "VERIFIED" ? <div style={{ color: "green" }}>{response[0].status} <i className="fa fa-check"></i></div> : (response[0].status === "DECLINED" ? <div style={{ color: "red" }}>{response[0].status} <i className="fa fa-times"></i></div> : response[0].status)
          response[0].isnew = response[0].isnew ? "yes" : "no"
          setAddFormData(response[0])
        }
        response.map((option) => {
          // option.dateAdded=new Date(option.dateAdded).toDateString()
          option.amount = numberWithCommas(option.amount)
          option.actions = <button className="btn btn-success" onClick={() => setAddFormDataOption(option)}  >
            Details

          </button>
        }

        );
        setApplications(response)

        // setdisableInput(true)
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
    loadFacility()
    getBanksHere()
    getReqeFiles()
    getRates()
    getApprovedBuyers()
    getBussunisessData()

  }, [control]);

  const years = range(2021, (new Date()).getFullYear());

  function range(start, end) {
    const theYears = []

    for (var m = start; m < end; m++) {
      theYears.push(m)
    }
    theYears.push(end);
    return theYears;
  }


  function openDetails2() {

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
    //alert("hey")
    addFormData.isnew = addFormData.isnew === "yes" ? true : false
    addFormData.discount = addFormData.discount.toString().split(",").join("")
    addFormData.amount = addFormData.amount.split(",").join("")
    addFormData.netDis
    console.log('net dis',addFormData.netDis)
    if (addFormData.recoveryMode === "select" || addFormData.recoveryMode === null) {
      error = true
      errorMsg = "Please select dicount fee recovery mode"
    }
    else {
      // alert(addFormData.recoveryMode)
    }

    if (!error) {




      // alert(JSON.stringify(addFormData))
      setLoading(true)


      addApplicationInvoiceDiscount(addFormData)
        .then((_response) => {
          setPostModal(false);
          swal('Good job!', 'Successfully updated data', "success");
          //    getTheDirectors()
          //props.setEmail(addFormData.email)
          getBussunisessData()
          location.reload()
          setLoading(false)
        })
        .catch((error) => {
          // alert(JSON.stringify(error))
          console.log(error);
          swal('Oops', error?.error, "error");
        });

      //  addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = '';         

    } else {
      // alert("else ama")
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


  const handleAddFormChangeTwo = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData.bank[fieldName] = fieldValue;

    console.log(newFormData)
    setAddFormData(newFormData);
  };


  const handleChange = (event) => {
    // event.preventDefault();    
    const fieldName = 'banko';
    let fieldValue = event;
    //console.log(fieldValue)
    const newFormData = { ...addFormData };
    newFormData.bank['bankName'] = fieldValue.value;
    newFormData[fieldName] = fieldValue;

    console.log(newFormData)
    setAddFormData(newFormData);
  };


  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    const newFormData = { ...addFormData };

    if (fieldName === "amount" || fieldName === "discount") {
      fieldValue = fieldValue.split(",").join("")
      if (!isNaN(fieldValue)) {
        if (fieldName === "discount") {
          const percent = ((fieldValue / newFormData.amount.split(",").join("")) * 100).toFixed(1)
          if (percent < 86) {
            if (percent < 51) {
              setcolorc("red")
            }
            else {
              setcolorc("green")
            }
            newFormData["percent"] = percent;

            fieldValue = numberWithCommas(fieldValue)
            newFormData[fieldName] = fieldValue;
          }
        }
        else {
          fieldValue = numberWithCommas(fieldValue)
          newFormData[fieldName] = fieldValue;
        }
      }
    }
    else {
      newFormData[fieldName] = fieldValue;
    }


    // if(fieldName==="percent" ){
    //   if(fieldValue<50 || fieldValue>100){
    //     fieldValue=50
    //   }
    // }


    // alert(fieldValue)





    if (fieldName === "period") {
      const arry = fieldValue.split("|")
      const rate = arry[0]
      const amt = addFormData.discount.toString().split(",").join("")
      const dFee = Math.round((amt * rate) / 100)
      newFormData["periodId"] = arry[1];
      newFormData["feeRate"] = rate;
      newFormData["discountFee"] = dFee;
      newFormData["netDis"] = amt - dFee;



    }

    if (fieldName === "recoveryMode") {
      const isUpfront = event.target.value === "Upfront"
      const theAmt = addFormData.discount.toString().split(",").join("")
      const theDis = addFormData.discountFee.toString().split(",").join("")
      // alert(isUpfront)
      if (isUpfront) {

        const theDiff = theAmt - theDis
        //  alert(theAmt+" and "+theDis+" and lastly "+theDiff)
        newFormData["netDis"] = theDiff
        newFormData["toDisburse"] = parseInt(addFormData.discount.toString().split(",").join(""))
      }
      else {
        // alert("here too")
        newFormData["netDis"] = addFormData.discount
        newFormData["toDisburse"] = parseInt(theAmt) + parseInt(theDis)
      }
    }


    setAddFormData(newFormData);
  };
  const colourOptions = []
  banks.map((option) => {
    (
      colourOptions.push({ 'value': option.name, 'label': option.name })
    )
  })

  return (
    <>
      {showAll ?
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
            open={showPrev}
            onClose={() => setShowPrev(false)}

          >


            <DialogTitle>
              <h4 >Previous Applications</h4>



              {/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
            </DialogTitle>
            <DialogContent

            >
              <TableExport

                hideDataExport={true}
                rows={applications}
                //rows={this.state.colors[1]==="primary"?finished: dataTemp}
                columns={[
                  { name: 'dateAdded', title: 'Date' },
                  { name: 'buyername', title: 'Buyer' },
                  { name: 'currency', title: 'Currency' },

                  { name: 'amount', title: 'Amount' },
                  { name: 'status', title: 'Status' },
                  { name: 'actions', title: 'Actions' },
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
            <DialogActions>
              {addFormData.tc !== undefined ?
                <div className="form-check custom-checkbox mb-3 checkbox-success">
                  <input
                    name="tc"
                    onChange={handleAddFormChange}
                    type="checkbox"
                    // defaultChecked
                    value={addFormData.tc.toString() === "false" ? true : false}

                    checked={addFormData.tc.toString() === "true"}
                    className="form-check-input"
                    id="customCheckBox3"
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox3"
                  >
                    I have read, understood and agreed to the terms & conditions
                  </label>



                </div> : null}
            </DialogActions>
          </Dialog>


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
            onClose={() => setpostModal2(false)}

          >


            <DialogTitle>




              {/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
            </DialogTitle>
            <DialogContent

            >

            </DialogContent>
            <DialogActions>

            </DialogActions>
          </Dialog>
          <div style={{ textAlign: "right" }}>
            <div style={{ float: "right", marginLeft: "40px" }}>
              <div className="row">
                <button style={{ maxWidth: "250px", float: "right" }} className="btn btn-success" onClick={(_e) => newApplication()} >
                  New Application

                </button>
              </div>
              <div className="row">
                <button style={{ maxWidth: "250px", float: "right", marginTop: "20px" }} className="btn btn-primary" onClick={(_e) => setShowPrev(true)} >
                  Previous Applications

                </button>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: "30px" }}>
            <div className="row">
              <div className="col">
                <h4>INVOICE DISCOUNTING</h4>
                <p>APPLICATION FOR NEW INVOICE DISCOUNTING/FINANCING {addFormData.status !== "" ? <b style={{ marginLeft: "10px", display: "flex" }}>Status: {addFormData.type} <font style={{ color: "black", marginLeft: "10px" }}>Date Submtied: {new Date(addFormData.dateAdded).toDateString()}</font></b> : null}
                </p>
                <div className="form-group mb-0">
                  <label className="radio-inline me-3">
                    <input
                      disabled={disableInput}
                      required="required"
                      checked={addFormData.isnew === "yes"}
                      value="yes" onChange={handleAddFormChange} type="radio" name="isnew" /> New Invoice Discounting
                  </label>
                  <label className="radio-inline me-3">
                    <input

                      disabled={disableInput}
                      required="required"
                      checked={addFormData.isnew === "no"}
                      value="no" onChange={handleAddFormChange} type="radio" name="isnew" /> Top Up Invoice Discounting
                  </label>
                </div>
              </div>
            </div>
          </div>



          <div className="card" style={{ padding: "30px" }}>
            <h4>FINANCING INSTRUCTIONS
            </h4>
            <div className="row" style={{ marginTop: "20px" }}>

              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Select Buyer</label>
                  <div className="form-group mb-3">

                    <select
                      disabled={disableInput}
                      value={addFormData.buyer}
                      defaultValue={""}
                      name="buyer"
                      onChange={handleAddFormChange}
                      className="form-control"
                    >
                      <option disabled value="">Select Buyer</option>
                      {approvedBuyers.map((option) => (
                        <option value={option.id}>{option.name}</option>))}

                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Select Currency</label>
                <div className="contact-name">
                  <select
                    disabled={disableInput}
                    value={addFormData.currency}
                    defaultValue={"UGX"}
                    name="currency"
                    onChange={handleAddFormChange}
                    className="form-control"
                  >
                    <option disabled value="">Select Currency</option>
                    <option value="UGX">UGX</option>
                    <option value="USD">USD</option>

                  </select>
                  <span className="validation-text"></span>
                </div>

              </div>

              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Invoice Number</label>
                  <div className="contact-name">
                    <input type="text"
                      disabled={disableInput}
                      value={addFormData.invoiceNo}
                      className="form-control" autoComplete="off"
                      name="invoiceNo" required="required"
                      onChange={handleAddFormChange}
                      placeholder="Invoice Number"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Total Invoice Amount</label>
                  <div className="contact-name">
                    <input type="text" className="form-control" autoComplete="off"
                      name="amount"
                      disabled={disableInput}
                      value={addFormData.amount}
                      onChange={handleAddFormChange}
                      placeholder="Total Invoice Amount"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: colorc }}>Discount Amount
                  </b>
                  </label>
                  <div className="contact-name">
                    <input type="text" className="form-control" autoComplete="off"
                      style={{ color: colorc }}
                      name="discount"
                      disabled={disableInput}
                      value={numberWithCommas(addFormData.discount)}
                      onChange={handleAddFormChange}
                      placeholder="Discount Amount"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>



              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500" ><b style={{ color: colorc }}>Discount Percentage</b>
                    <b style={{ color: colorc }}>(50%-85%):</b></label>
                  <div className="contact-name" >
                    <input type="text" className="form-control" autoComplete="off"
                      style={{ color: colorc }}
                      name="percent"
                      disabled={true}
                      value={addFormData.percent}
                      onChange={handleAddFormChange}
                      placeholder="Discount Percentage
                            (50%-100%):"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>






              <div className="col-lg-6 mb-2">

                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>Select Finance Period
                    (Max 45 days): </label>
                  <div className="contact-name">
                    <select
                      disabled={disableInput}
                      value={addFormData.period}
                      //	defaultValue={"UGX"}
                      name="period"
                      onChange={handleAddFormChange}
                      className="form-control"
                    >
                      <option  >Select Period</option>
                      {rates.map((option, key) => {
                        if (key < 4) {
                          return <option value={option.rate + "|" + option.id}>{option.period + " [ " + option.rate + "% ]"}</option>
                        }
                      }
                      )}


                    </select>
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-2">

                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>Discount Fee
                    Rate (%):
                  </label>
                  <div className="contact-name">
                    <div className="form-group mb-0">
                      <input
                        disabled={true}
                        value={addFormData.feeRate}
                        type="text" className="form-control" autoComplete="off"
                        name="feeRate" required="required"
                        onChange={handleAddFormChange}
                        placeholder="Discount Fee 
Rate (%):
 "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Discount Fee Amount
                  </label>
                  <div className="contact-name">
                    <input type="text"
                      disabled={true}
                      className="form-control"
                      value={numberWithCommas(addFormData.discountFee)}
                      autoComplete="off"
                      name="discountFee" required="required"
                      onChange={handleAddFormChange}
                      placeholder="Discount Fee Amount
"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>


              <div className="col-lg-6 mb-2">

                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>Select Discount Fee Recovery Mode
                  </label>
                  <div className="contact-name">
                    <select
                      disabled={disableInput}
                      value={addFormData.recoveryMode}
                      //	defaultValue={"UGX"}
                      name="recoveryMode"
                      onChange={(e) => {
                        handleAddFormChange(e)
                      }}
                      className="form-control"
                    >
                      <option  value={"select"} >Select Mode</option>
                      <option value={"Upfront"}>Upfront</option>
                      <option value={"At_Maturity"}>At Maurity</option>

                    </select>
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>


              <div className="col-lg-6 mb-2" key={control}>
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Net Disburse Amount </label>
                  <div className="contact-name">
                    <input
                      key={control}
                      disabled={true}
                      type="text" className="form-control" autoComplete="off"
                      name="netDis"
                      value={numberWithCommas(addFormData.netDis)}
                      onChange={handleAddFormChange}
                      placeholder="Net Disburse Amount"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>


              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Total Amount Payable </label>
                  <div className="contact-name">
                    <input
                      disabled={true}
                      type="text" className="form-control" autoComplete="off"
                      name="toDisburse"
                      value={numberWithCommas(addFormData.toDisburse)}
                      onChange={handleAddFormChange}
                      placeholder="Gross Discount Amount"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>














              {/* <div className="col-lg-12 mb-12" style={{textAlign:"left", marginTop:"30px"}}>
            {isLoading?
            <RotateSpinner  size={30} color="rgba(41, 106, 176,1)" loading={isLoading} />:
            <> {disableInput?
            <button style={{width:"auto"}}  className="btn btn-info" onClick={(e)=>setdisableInput(false)} >
           Edit Info

            </button>:
             <button style={{width:"auto"}}  className="btn btn-success" onClick={(e)=>handleAddFormSubmit(e)} >
             Save Info
  
              </button>}
            </>
            }
            </div> */}
            </div>
          </div>






          <div className="card" style={{ padding: "30px" }}>
            <h4>Bank Details
            </h4>
            <div className="row" style={{ marginTop: "20px" }}>

              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Select / Create Bank</label>
                  <div className="form-group mb-3">

                    <Select2
                      classNamePrefix="form-control"
                      //style={{borderRadius:5px}}
                      isClearable
                      onChange={handleChange}
                      value={addFormData.banko}
                      //  onInputChange={this.handleInputChange}
                      options={colourOptions}
                    />
                    {/* <select
                     disabled={disableInput}
					value={addFormData.bank.bankId}
					defaultValue={""}
					name="bankId"
					onChange={handleAddFormChangeTwo}
                      className="form-control"
                    >
                      <option  value="">Select Banks</option>
                      {banks.map((option) => (
                     <option value={option.id}>{option.name}</option>))}
	
                    </select> */}
                  </div>
                </div>
              </div>


              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Account Number</label>
                  <div className="contact-name">
                    <input type="text"
                      disabled={disableInput}
                      value={addFormData.bank.number}
                      className="form-control" autoComplete="off"
                      name="number" required="required"
                      onChange={handleAddFormChangeTwo}
                      placeholder="Account Number"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Account Name</label>
                  <div className="contact-name">
                    <input type="text" className="form-control" autoComplete="off"
                      name="name"
                      disabled={disableInput}
                      value={(addFormData.bank.name)}
                      onChange={handleAddFormChangeTwo}
                      placeholder="Account Name"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Branch</label>
                  <div className="contact-name">
                    <input type="text" className="form-control" autoComplete="off"
                      name="branch"
                      disabled={disableInput}
                      value={addFormData.bank.branch}
                      onChange={handleAddFormChangeTwo}
                      placeholder="Branch"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>







            </div>
          </div>






          <div className="card" style={{ padding: "30px" }}>
  <div className="row" style={{ marginTop: "20px" }}>
    <div className={addFormData.docs.length > 0 && addFormData.docs[0].id !== null ? "col-lg-5 mb-2" : "col-lg-12 mb-2"}>
      <h4>Document Attachments</h4>
      {disableInput ? <p>Application processed, cannot add more documents</p> :
        <div className="row">
          {requires.map((option) => (
            <div className="col-lg-4 mb-2" key={option.id}>
              <div>
                <b style={{color:"red"}}>*</b>
                <b style={{color:"blue"}}>{option.name}</b>
                <FilePond
                  acceptedFileTypes={['application/pdf', '.pdf']}
                  allowMultiple={false}
                  maxFileSize={'2MB'}
                  labelIdle={"Drag & Drop " + option.name + " here or <span class=&quot;filepond--label-action&quot;>Browse</span>."}
                  server={{
                    process: (fieldName, file, _metadata, load, _error, _progress, abort, _transfer, _options) => {
                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("name", fieldName);
                      formData.append("type", 6);
                      uploadFiles(formData)
                        .then((response) => {
                          setDocs(response.id, option.id)
                          load(response.id);
                        })
                        .catch((error) => {
                          alert(error);
                          alert(JSON.stringify(error))
                        });
                      return {
                        abort: () => {
                          abort();
                        }
                      };
                    },
                    revert: (_uniqueFileId, load, _error) => {
                      setIncomp(0)
                      load()
                    }
                  }}
                />
                <div style={{ marginTop: "5px" }}>
                  {option.fileId !== null ?
                    <a target="_blank" href={option.path}>
                      <button type="button" className="btn btn-primary shadow btn-xs" data-dismiss="modal">
                        View File Template
                      </button>
                    </a>
                    : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
    {addFormData.docs.length > 0 && addFormData.docs[0].id !== null ?
      <div className="col-lg-7 mb-2">
        <h4>Attachmented Documents</h4>
        <Table responsive className="primary-table-bordered">
          <thead className="thead-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {addFormData.docs.map((option, key) => (
              option.path !== undefined ?
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{option.type}</td>
                  <td>
                    <a target="_blank" href={option.path} download>
                      <Button variant="primary btn-xxs">View / Download Document</Button>
                    </a>
                  </td>
                </tr>
                : null
            ))}
          </tbody>
        </Table>
      </div>
      : null}
  </div>
</div>


    <div className="card" style={{ padding: "30px" }}>
      <h4> Submission
      </h4>
      <p>By subbmiting this form you agree to the terms and conditions </p>
      <div className="row" style={{ marginTop: "20px" }}>

        <div className="col-lg-12 mb-2">
          <h4 >Terms & Conditions</h4>
          <ol>
            <li>
              1. I/We confirm that the invoice(s)/similar documents submitted for discounting have not been paid and I/we have
              not and will not obtain any other financing pertaining to the underlying invoice/similar document from any other
              party.
            </li>
            <li>
              2. I/We undertake to indemnify Kamro in full and keep Kamro indemnified in full against all liabilities, losses, damages,
              costs, expenses, claims and demands which Kamro may suffer, incur or sustain by reason or on account of Kamro
              granting Invoice Discounting to us howsoever, including without limitation, all legal and other costs (on a full
              indemnity basis), charges and expenses Kamro may incur in connection with the enforcement, or attempted
              enforcement of Kamro’s rights under or in connection with these terms and conditions.
            </li>
            <li>
              3. /We irrevocably consent to the disclosure by Kamro, Kamro’s officers and agents, in any manner howsoever, of any
              account information relating to us including but not limited to details of our facilities, with Kamro to
              (i) Kamro’s head office, any of Kamro’s representatives, documents checking and processing centres and
              branch offices in any jurisdiction, affiliates,
              (ii) any regulatory or supervisory authority including fiscal authority in any jurisdiction,
              (iii) any potential assignee of Kamro or any other participant in any of Kamro’s rights and/or obligations in
              relation to our facilities,
              (iv) any guarantors, third party pledgers or security providers and Kamro’s agents and independent contractors,
              (v) any insurers with whom insurance cover is taken out in connection with our application, and
              (vi) any third party for use in connection with the provision of Kamros products or services.
            </li>
            <li>
              4. Each of the provisions of these terms and conditions shall be several and distinct from one another. If any one or
              more of the provisions contained in these terms and conditions shall be deemed invalid, unlawful or unenforceable
              in any respect under any applicable law, the validity, legality and enforceability of each of the remaining provisions
              contained herein shall not in any way be affected, prejudiced or impaired thereby.
            </li>
            <li>
              5. A person who is not a party to the terms herein has no right under the law of contracts to enforce any of the terms
              and conditions herein.
            </li>
            <li>
              6. These terms and conditions shall be governed by and construed in accordance with the laws of the Republic of the
              Uganda.
            </li>
            <li>
              7. I/We agree that Invoice Discounting shall be subject to such other terms and conditions as Kamro may from time
              to time specify. For the avoidance of doubt, these terms and conditions shall be read concurrently with the terms
              and conditions contained in the credit limit facility offer from Kamro
            </li>
          </ol>

          {addFormData.tc !== undefined ?
            <div className="form-check custom-checkbox mb-3 checkbox-success">
              {disableInput ? null :
                <> <input
                  name="tc"
                  onChange={handleAddFormChange}
                  type="checkbox"
                  // defaultChecked
                  value={addFormData.tc.toString() === "false" ? true : false}
                  key={addFormData.tc}
                  checked={addFormData.tc.toString() === "true"}
                  className="form-check-input"
                  id="customCheckBox3"
                  required
                />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox3"
                  >
                    I have read, understood and agreed to the terms & conditions
                  </label>
                </>}


            </div> : null}
          {/* <button style={{width:"auto"}}  className="btn btn-primary" onClick={(e)=>setpostModal2(true)} >
             View Terms & Conditions
  
              </button> */}
        </div>
        {disableInput ? null :
          <div className="col-lg-3 mb-2">
            {addFormData.bank.bankName === "" || (addFormData.tc !== undefined && addFormData.tc.toString() !== "true") ? <b style={{ color: "red" }}>Cannot submit form with missing information</b> :
              <button style={{ width: "auto" }} className="btn btn-success" onClick={(e) => handleAddFormSubmit(e)} >
                Submit Info

              </button>}
          </div>}
      </div>
    </div>


  {/* <div className="card" style={{padding:"30px"}}>
          <h4> Attached Documents
</h4>
         <div className="row" style={{marginTop:"20px"}}>

         
          </div>
          </div>
           */}

  {/* <div className="card" style={{ padding: "30px" }}>
    <h4> Verification & Approval
    </h4>
    <div className="row" style={{ marginTop: "20px" }}>

      <div className="col-lg-12 mb-2">
        {addFormData.comments.length > 0 ?
          <Table responsive className="primary-table-bordered">
            <thead className="thead-primary">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">User</th>
                <th scope="col">Action</th>
                <th scope="col">Comment</th>
              </tr>
            </thead>
            <tbody>
              {addFormData.comments.map((option, _key) => (
                <tr>
                  <th>{new Date(option.dateAdded).toDateString()}</th>
                  <td>{option.user}</td>
                  <td>{option.type}</td>
                  <td>{option.comment}</td>
                </tr>))}

            </tbody>
          </Table> : <b>** No verfication added yet **</b>}

      </div>
    </div>
  </div> */}


  {/* <div className="card" style={{padding:"30px"}}>
          <button style={{maxWidth:"250px"}}  className="btn btn-success" onClick={(e)=>setpostModal2(true)} >
            Previous Applications
  
              </button>
            </div> */}
          

      </section >:

<div className="card" style={{ padding: "30px" }}>
  <h4>Credit Limit Facility Agreement
  </h4>
  <div className="row" style={{ marginTop: "20px" }}>

    <p className="text-primary"><b>Download the agreement and sign it, then upload to the system the signed copy</b></p>
  </div>

  {creditFacility.adminFile?.path !== null ?
    <div className="row" style={{ marginTop: "20px" }}>


      <div className="col-md-4 mb-2">
        <label className="text-black font-w500"> Sent Agreement</label>
        <div className="">
          <a
            target="_blank"
            href={creditFacility.adminFile?.path} download>

            <Button
              variant="primary btn-xxs"
              style={{ width: "auto" }} className="btn btn-info"

            // onClick={(e)=> {return e.preventDefault()}}

            >
              Download Credit Facilty Agreement

            </Button>
          </a>

        </div>
      </div>


      <div className="col-md-4 mb-2">
        <label className="text-black font-w500"> Your Signed Agreement</label>
        <div className="">
          {creditFacility.clientFile?.path !== null ?
            <a
              target="_blank"
              href={creditFacility.clientFile?.path} download>

              <Button
                variant="primary btn-xxs"
                style={{ width: "auto" }} className="btn btn-info"
              // onClick={(e)=> {return e.preventDefault()}} 
              >
                Download Signed Credit Facilty Agreement

              </Button>
            </a> : null}

          {showFilePond ? <FilePond
            acceptedFileTypes={['application/pdf' , '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
          allowMultiple={false}
          maxFileSize={'2MB'}
//</GridItem>server=
        labelIdle="Drag &amp; Drop  Signed Credit Limit Facilitaion Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
      server={
        {
          process: (fieldName, file, _metadata, load, _error, _progress, abort, _transfer, _options) => {

            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", fieldName);
            formData.append("type", 6);
            uploadFiles(formData)
              .then((response) => {

                setFileId(response.id)
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
          revert: (_uniqueFileId, load, _error) => {
            //  removeFile(this.state.fid)
            setFileId(0)

            load()
          }
        }
      }></FilePond> : (

      <Button
        variant="warning btn-xxs"
        style={{ width: "auto", marginTop: "10px" }} className="ml-4" onClick={(_e) => setshowFilePond(true)} >
        Change File

      </Button>
    )}


  {fileId !== 0 ?
    (
      isLoading ?
        <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
        <Button
          variant="primary btn-xxs"
          style={{ width: "auto" }} onClick={(_e) => {
            setLoading(true)
            addClientFacilityClient({
              fileId: fileId


            })
              .then((_response) => {
                setLoading(false)
                swal('Facility Agreement Sent!', 'Successfully sent file', "success");
                loadFacility()

              })
              .catch((error) => {
                setLoading(false)
                console.log(error);
              });
          }} >
          Send to Pesasa

        </Button>) : null
  }

</div>
                   </div >


  <div className="col-md-4 mb-2">
    <label className="text-black font-w500"> Status</label>
    <div className="">
      {creditFacility.clientFile?.path === null ? "Not applicable" : creditFacility.staus}

    </div>
  </div>
                   </div >: null}

{
  creditFacility.adminFile?.path === null ?
    <div className="row" >

      <p > Waiting for the agreement to be sent. You will be notified once this is done and the agreement will appear here</p>
    </div> :

    null
}



         </div >
      }
      </>
   );
};

export default StepOne;
