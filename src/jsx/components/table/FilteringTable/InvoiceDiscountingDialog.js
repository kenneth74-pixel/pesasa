import React, { useState, useEffect } from "react";
import { countryCodes } from "../../AppsMenu/AppProfile/appData.js"
import {
  verifyProcessApplication, getBanks, getMoneyRates,
  updateConc, updateApplicationInvoiceDiscountAdmin
} from "../../../../util/APIUtils.js";
import { Button } from "react-bootstrap";
import { RotateSpinner } from "react-spinners-kit";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DatePicker from "react-datepicker";
import {
  Table,
} from "react-bootstrap";
const StepOne = (props) => {
  const [postModal, setPostModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLoad, seLoad] = useState(false);
  const [postModal2, setpostModal2] = useState(false);
  const [comment, setcomment] = useState("");
  const [percent, setpercent] = useState("");
  const [applications, setApplications] = useState([]);
  const [comments, setComments] = useState([]);
  const [docs, setdocs] = useState([]);
  const [showPrev, setShowPrev] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  const [colorc, setcolorc] = useState("black");
  const [showConc, setshowConc] = useState(false);

  const [rates, setRates] = useState([]);
  const [banks, setBanks] = useState([]);
  const [incompId, setIncomp] = useState(0);
  const [disableInput, setdisableInput] = useState(true);
  const country = countryCodes.map(data => (

    <option value={data.name} > {" " + data.name + " "}</option>
  ))

  const codes = countryCodes.map(data => (

    <option value={data.dial_code} > {" " + data.name + " (" + data.dial_code + " )"}</option>
  ))

  const [addFormData, setAddFormData] = useState({
    id: null,
    buyer: '',
    currency: 'UGX',
    invoiceNo: '',
    discount: '',
    amount: '',
    percent: 50,
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
    bank: {},
    dateAdded: new Date()



  });


  function newApplication() {
    const newApp = {
      id: null,
      buyer: '',
      currency: 'UGX',
      invoiceNo: '',
      discount: '',
      amount: '',
      percent: 50,
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
      comments: []



    }
    setAddFormData(newApp)

  }

  function setDocs(id) {
    const docsb = addFormData.docs
    docsb.push({ id: null, fileId: id })
    const newFormData = { ...addFormData };
    newFormData["docs"] = docsb;
    setAddFormData(newFormData);
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
  function getBussunisessData() {

    props.obj.type = props.obj.status === "VERIFIED" ? <div style={{ color: "green" }}>{props.obj.status} <i className="fa fa-check"></i></div> : (props.obj.status === "DECLINED" ? <div style={{ color: "red" }}>{props.obj.status} <i className="fa fa-times"></i></div> : props.obj.status)
    props.obj.isnew = props.obj.isnew ? "yes" : "no"
    setAddFormData(props.obj)
    console.log("the obj", props.obj)
    //  alert(JSON.stringify(props.obj))
  }

  useEffect(() => {
    getRates()
    getBanksHere()
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


  function openDetails2() {

  }


  const sendAddFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = '';
    //alert("hey")
    addFormData.isnew = addFormData.isnew === "yes" ? true : false
    addFormData.discount = addFormData.discount.toString().split(",").join("")
    addFormData.amount = addFormData.amount.split(",").join("")
    if (allowEdit) {
      addFormData.dateAdded = new Date(addFormData.dateAdded)
    }


    addFormData.actions = ""
    addFormData.checkDays = ""
    console.log(addFormData)


    if (!error) {




      // alert(JSON.stringify(addFormData))
      setisLoading(true)


      updateApplicationInvoiceDiscountAdmin(addFormData)
        .then((response) => {
          // setPostModal(false);
          swal('Success !', 'Successfully updated data', "success");
          //    getTheDirectors()
          //props.setEmail(addFormData.email)
          setAllowEdit(false)
          setisLoading(false)
        })
        .catch((error) => {
          setisLoading(false)
          // alert(JSON.stringify(error))
          console.log(error);
          swal('Oops', error?.error, "error");
        });

      //  addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = '';         

    } else {
      setisLoading(false)
      // alert("else ama")
      swal('Oops', errorMsg, "error");
    }
  };


  const handleDateChange = (event) => {
    //	alert(JSON.stringify(event))
    // event.preventDefault();    
    const fieldName = "dateAdded";
    const fieldValue = event;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };


  const handleAddFormSubmit = (data) => {
    //    event.preventDefault();
    var error = false;
    var errorMsg = '';
    if (comment === "") {
      error = true;
      errorMsg = 'Please add comment';
    }




    if (!error) {
      const submitData = {
        id: null,
        type: data,
        comment: comment,
        //  process:detailPart.process,
        processId: addFormData.id
      }

      console.log(submitData)
      //alert(JSON.stringify(submitData))
      setisLoading(true)
      verifyProcessApplication(submitData)
        .then((response) => {
          setisLoading(false)
          setShowPrev(false);
          setcomment("")
          swal('Good job!', 'Successfully Submitted', "success");
          props.reloadMe(addFormData.id)

        })
        .catch((error) => {
          setisLoading(false)
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

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    // alert(fieldName)
    const newFormData = { ...addFormData };
    if (fieldName === "amount" || fieldName === "discount") {
      // alert("the j")
      const mys = fieldValue.split(",").join("")
      if (!isNaN(mys)) {

        if (fieldName === "discount") {
          const percent = ((mys / newFormData.amount.split(",").join("")) * 100).toFixed(1)
          if (percent < 86) {
            if (percent < 51) {
              setcolorc("red")
            }
            else {
              setcolorc("green")
            }
            newFormData["percent"] = percent;

            newFormData[fieldName] = mys;


            // the other three
            const arry = addFormData.period.split("|")
            const rate = arry[0]
            const amt = mys
            const dFee = Math.round((amt * rate) / 100)
            const isUpfront = addFormData.recoveryMode === "Upfront"

            newFormData["discountFee"] = dFee
            newFormData["toDisburse"] = isUpfront ? amt : parseInt(parseInt(amt) + parseInt(dFee))
            newFormData["netDis"] = isUpfront ? amt - dFee : amt;
          }
        }
        else {
          const percent = ((newFormData.discount.toString().split(",").join("")) * 100 / mys).toFixed(1)


          if (percent < 86) {
            if (percent < 51) {
              setcolorc("red")
            }
            else {
              setcolorc("green")
            }
          }
          else {
            setcolorc("red")
          }

          newFormData[fieldName] = mys;


          newFormData["percent"] = percent;

        }








      }

    }
    else {
      newFormData[fieldName] = fieldValue;
    }


    if (fieldName === "period") {
      const arry = fieldValue.split("|")
      const rate = arry[0]
      const amt = addFormData.discount.toString().split(",").join("")
      const dFee = Math.round((amt * rate) / 100)
      const isUpfront = addFormData.recoveryMode === "Upfront"
      newFormData["periodId"] = arry[1];
      newFormData["feeRate"] = rate;
      newFormData["discountFee"] = dFee
      newFormData["toDisburse"] = isUpfront ? amt : parseInt(parseInt(amt) + parseInt(dFee))
      newFormData["netDis"] = isUpfront ? amt - dFee : amt;



    }

    if (fieldName === "recoveryMode") {
      // alert("hmm")
      const isUpfront = event.target.value === "Upfront"
      // alert(isUpfront)
      if (isUpfront) {
        // alert("here")
        newFormData["netDis"] = addFormData.discount - addFormData.discountFee
        newFormData["toDisburse"] = addFormData.discount
      }
      else {
        // alert("here too")
        newFormData["netDis"] = addFormData.discount
        newFormData["toDisburse"] = parseInt(addFormData.discount) + parseInt(addFormData.discountFee)
      }
    }


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
        open={showPrev}
        onClose={() => setShowPrev(false)}

      >


        <DialogTitle>
          <h4 >Application verification</h4>



          {/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
        </DialogTitle>
        <DialogContent

        >
          <div className='row ' style={{ width: "100%", overflow: "hidden", paddingBottom: "10px" }}>
            <div className="col-xl-6 col-xxl-6">
              <div className="form-group mb-3">
                {/* <label className="text-black font-w500">Comment </label> */}
                <div className="contact-name">
                  <TextField
                    onChange={(event) => setcomment(event.target.value)}
                    value={comment}
                    label="Comment" variant="standard" fullWidth />
                  {/* <input type="text"  className="form-control"  autoComplete="off"
													//value={comment}
														name="comment" required="required"
														//onChange={(event)=> setcomment(event.target.value)} 
														placeholder="Comment"
													/> */}
                  <span className="validation-text"></span>
                </div>
              </div>
            </div>
            <div className="col-md-2 mt-4 " style={{ textAlign: "center" }}>
              {isLoading ?
                <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
                <button type="button"
                  className="btn btn-danger shadow btn-xs "

                  onClick={() => handleAddFormSubmit("DECLINED")}
                  data-dismiss="modal">
                  Decline
                </button>}
            </div>


            <div className="col-md-2 mt-4  " style={{ textAlign: "center" }}>
              {isLoading ?
                <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
                <button type="button"
                  className="btn btn-success shadow btn-xs "

                  onClick={() => handleAddFormSubmit("VERIFIED")}
                  data-dismiss="modal">
                  Approve
                </button>}
            </div>



          </div>
        </DialogContent>
        <DialogActions>
          <button type="button"
            className="btn shadow btn-xs "

            onClick={() => setShowPrev(false)}
            data-dismiss="modal">
            Close
          </button>
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





      <Dialog
        disableEnforceFocus
        //className="modal fade"
        //  className="fade bd-example-modal-lg"
        // fullscreen={true} 
        //dialogClassName="modal-90w"
        /// size="lg"
        fullWidth={true}
        maxWidth={"xs"}
        open={showConc}
        onClose={() => setshowConc(false)}

      >


        <DialogTitle>
          <h4 >Add Concession Percentage</h4>



          {/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
        </DialogTitle>
        <DialogContent

        >
          <div className='row ' style={{ width: "100%", overflow: "hidden", paddingBottom: "10px" }}>
            <div className="col-xl-12 col-xxl-12">
              <div className="form-group mb-3">
                {/* <label className="text-black font-w500">Comment </label> */}
                <div className="contact-name">
                  <TextField
                    onChange={(event) => {
                      const val = event.target.value
                      if (!isNaN(val)) {
                        if (val < 101) {
                          setpercent(event.target.value)
                        }
                      }

                    }}
                    value={percent}
                    label="Concession Percentage" variant="standard" fullWidth />
                  {/* <input type="text"  className="form-control"  autoComplete="off"
													//value={comment}
														name="comment" required="required"
														//onChange={(event)=> setcomment(event.target.value)} 
														placeholder="Comment"
													/> */}
                  <span className="validation-text"></span>
                </div>
              </div>
            </div>






          </div>
        </DialogContent>
        <DialogActions>

          <div className="col-md-2   " style={{ textAlign: "center" }}>
            {isLoading ?
              <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
              <button type="button"
                className="btn btn-success shadow btn-xs "

                onClick={() => {
                  if (percent === "") {
                    swal('Missing value', "Please add percentage", "error");
                  }
                  else {
                    setisLoading(true)
                    updateConc({
                      conPercentage: percent,
                      id: addFormData.id
                    })
                      .then((response) => {
                        setisLoading(false)
                        setshowConc(false);
                        // setcomment("")
                        swal('Success', 'Successfully Submitted', "success");
                        let addF = addFormData;
                        addF.conPercentage = response.conPercentage
                        addF.discountFee = response.discountFee
                        addF.netDis = response.netDis
                        addF.feeRate = response.feeRate


                        setAddFormData(addF)
                        props.reloadMe(addFormData.id)

                      })
                      .catch((error) => {
                        setisLoading(false)
                        console.log(error);
                        swal('Oops', error.message, "error");
                      });
                  }
                }



                }
                data-dismiss="modal">
                Save
              </button>}
          </div>
          <button type="button"
            className="btn shadow btn-xs "

            onClick={() => setshowConc(false)}
            data-dismiss="modal">
            Close
          </button>
        </DialogActions>
      </Dialog>


      <div style={{ textAlign: "right" }}>
        <div style={{ float: "right", marginLeft: "40px" }}>

          <div className="row">
            <button style={{ maxWidth: "250px", float: "right" }} className="btn btn-warning" onClick={(e) => setshowConc(true)} >
              Add Concession

            </button>
          </div>

          <div className="row">
            {addFormData.verifiedByMe ? <small>You already recomended this application</small> :
              <button style={{ maxWidth: "250px", float: "right", marginTop: "20px" }} className="btn btn-success" onClick={(e) => setShowPrev(true)} >
                Verify Application

              </button>}
          </div>



          <div className="row">
            {allowEdit ?
              <button style={{ maxWidth: "250px", float: "right", marginTop: "20px" }} className="btn btn-secondary" onClick={(e) => setAllowEdit(false)} >
                Cancel Edit Application

              </button> :
              <button style={{ maxWidth: "250px", float: "right", marginTop: "20px" }} className="btn btn-secondary" onClick={(e) => setAllowEdit(true)} >
                Edit Application

              </button>}
          </div>



          <div className="row">
            <button style={{ maxWidth: "250px", float: "right", marginTop: "20px" }} className="btn btn-primary" onClick={(e) => props.setPostModal(false)} >
              Back To Applications

            </button>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "30px" }}>
        <div className="row">
          <div className="col">
            <h4>INVOICE DISCOUNTING APPLICATION DETAILS</h4>
            <p>APPLICATION FOR NEW INVOICE DISCOUNTING/FINANCING {addFormData.status !== "" ? <b style={{ marginLeft: "10px", display: "flex" }}>Status: {addFormData.type} <font style={{ color: "black", marginLeft: "10px" }}>Date Submtied: {new Date(addFormData.dateAdded).toDateString()}</font></b> : null}
            </p>
            <p>Application Ref: <b>{addFormData.refference}</b></p>
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
              <label className="text-black font-w500">Buyer</label>
              <div className="form-group mb-3">

                <input type="text"
                  disabled={disableInput}
                  value={addFormData.buyername}
                  className="form-control" autoComplete="off"
                  name="buyername" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Invoice Number"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-2">
            <label className="text-black font-w500">Currency</label>
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
                  disabled={disableInput && !allowEdit}
                  value={numberWithCommas(addFormData.amount)}
                  onChange={handleAddFormChange}
                  placeholder="Total Invoice Amount"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: colorc }}>Discount Amount</b></label>
              <div className="contact-name">
                <input type="text" className="form-control"
                  style={{ color: colorc }}
                  autoComplete="off"
                  name="discount"
                  disabled={disableInput && !allowEdit}
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
              <label className="text-black font-w500"><b style={{ color: allowEdit ? "orange" : "black" }}>Discount Percentage</b>
                (50%-85%):</label>
              <div className="contact-name">
                <input type="text" className="form-control" autoComplete="off"
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





        </div>

        <div className="row" style={{ marginTop: "20px" }}>





          <div className="col-lg-8 mb-2">
            <div className="row">
              <div className="col-lg-6 mb-2">

                {/* <div className="form-group mb-3">
<label className="text-black font-w500">Finance Period
(Max 90 days): </label>
<div className="contact-name">
<div className="form-group mb-0">
<input
 disabled={disableInput}
value={addFormData.period}
type="text"  className="form-control"  autoComplete="off"
name="period" required="required"
            onChange={handleAddFormChange}
placeholder="Finance Period
(Max 90 days): "
/>
</div>
</div>
</div> */}
                <div className="form-group mb-3">
                  <label className="text-black font-w500">Finance Period
                    (Max 90 days): </label>
                  <div className="contact-name">
                    <select
                      disabled={!allowEdit}
                      value={addFormData.period}
                      //	defaultValue={"UGX"}
                      name="period"
                      onChange={handleAddFormChange}
                      className="form-control"
                    >
                      <option  >Select Period</option>
                      {rates.map((option, key) => (
                        <option value={option.rate + "|" + option.id}>{option.period + " [ " + option.rate + "% ]"}</option>))}


                    </select>
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>





              <div className="col-lg-6 mb-2">

                <div className="form-group mb-3">
                  <label className="text-black font-w500">Discount Fee
                    Rate (%):
                  </label>
                  <div className="contact-name">
                    <div className="form-group mb-0">
                      <input
                        disabled={disableInput}
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
                  <label className="text-black font-w500">Concession (%):
                  </label>
                  <div className="contact-name">
                    <div className="form-group mb-0">
                      <input
                        disabled={disableInput}
                        value={addFormData.conPercentage}
                        type="text" className="form-control" autoComplete="off"
                        name="feeRate" required="required"
                        onChange={handleAddFormChange}
                        placeholder="Concession (%):
 "
                      />
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: allowEdit ? "orange" : "black" }}> Discount Fee Amount</b>
                  </label>
                  <div className="contact-name">
                    <input type="text"
                      disabled={disableInput}
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
                  <label className="text-black font-w500"><b style={{ color: allowEdit ? "orange" : "black" }}>Discount Fee Recovery Mode</b></label>
                  <div className="contact-name">
                    {!allowEdit ?
                      <input
                        disabled={true}
                        type="text" className="form-control" autoComplete="off"
                        // name="netDis" 
                        value={addFormData.recoveryMode}
                      // onChange={handleAddFormChange}
                      // placeholder="Net Disburse Amount "
                      /> :
                      <select
                        key={addFormData.recoveryMode}
                        // disabled={disableInput && !allowEdit}
                        value={addFormData.recoveryMode}
                        //	defaultValue={"UGX"}
                        name="recoveryMode"
                        onChange={(e) => {
                          handleAddFormChange(e)
                        }}
                        className="form-control"
                      >
                        <option disabled value={"select"} >Select Mode</option>
                        <option value={"Upfront"}>Upfront</option>
                        <option value={"At_Maturity"}>At Maturity</option>

                      </select>}
                    <span className="validation-text"></span>
                  </div>

                </div>
              </div>


              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: allowEdit ? "orange" : "black" }}>Net Disburse Amount</b></label>
                  <div className="contact-name">
                    <input
                      disabled={disableInput}
                      type="text" className="form-control" autoComplete="off"
                      name="netDis"
                      value={numberWithCommas(addFormData.netDis)}
                      onChange={handleAddFormChange}
                      placeholder="Net Disburse Amount "
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>



              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-black font-w500"><b style={{ color: allowEdit ? "orange" : "black" }}>Gross Discount Amount</b></label>
                  <div className="contact-name">
                    <input
                      disabled={disableInput}
                      type="text" className="form-control" autoComplete="off"
                      name="toDisburse"
                      value={numberWithCommas(addFormData.toDisburse)}
                      onChange={handleAddFormChange}
                      placeholder="Net Disburse Amount "
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
              </div>

              {allowEdit ?
                <div className="col-xl-6">
                  <div className="form-group mb-0" style={{ zIndex: 100 }}>
                    <label className="text-black font-w500">Application Date</label>
                    <DatePicker
                      style={{ zIndex: 100 }}
                      dateFormat='dd/MM/yyyy'

                      //   disabled={disableInput}
                      className="form-control"
                      renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                      }) => (
                        <div
                          style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            {"<"}
                          </button>
                          <select
                            value={(date.getFullYear())}
                            onChange={({ target: { value } }) => changeYear(value)}
                          >
                            {years.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <select
                            value={months[(date.getMonth())]}
                            onChange={({ target: { value } }) =>
                              changeMonth(months.indexOf(value))
                            }
                          >
                            {months.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            {">"}
                          </button>
                        </div>
                      )}

                      placeholder="Application Date"
                      name="dateAdded"
                      selected={new Date(addFormData.dateAdded)}
                      //value={new Date()}
                      onChange={handleDateChange}
                    />
                  </div>
                </div> : null}


              {allowEdit ?
                <div className="col-xl-6">
                  {isLoading ? <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
                    <button style={{ maxWidth: "250px", float: "right", marginTop: "20px" }} className="btn btn-success" onClick={(e) => sendAddFormSubmit(e)} >
                      Save Edits

                    </button>}
                </div> : null}



            </div>
          </div>



          <div className="col-lg-4 mb-2">
            <h4>Attachmented Documents
            </h4>
            <Table responsive className="primary-table-bordered">
              <thead className="thead-primary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {addFormData.docs.map((option, key) => (
                  option.path !== undefined ?
                    <tr>
                      <th>{key + 1}</th>
                      <td> {option.type} </td>
                      <td>
                        <a
                          target="_blank"
                          href={option.path} >
                          <Button


                            variant="primary btn-xxs">View / Download Document</Button></a>


                      </td>
                    </tr> : null))}

              </tbody>
            </Table>
          </div>
        </div>
      </div>




      {/* <div className="card" style={{padding:"30px"}}>
          <h4> Attached Documents
</h4>
         <div className="row" style={{marginTop:"20px"}}>

         
          </div>
          </div>
           */}




      <div className="card" style={{ padding: "30px" }}>
        <h4>Bank Details
        </h4>
        <div className="row" style={{ marginTop: "20px" }}>

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500">Bank</label>
              <div className="form-group mb-3">

                <select
                  disabled={true}
                  value={addFormData.bank.bankId}
                  defaultValue={""}
                  name="bankId"
                  //onChange={handleAddFormChangeTwo}
                  className="form-control"
                >
                  <option disabled value="">Select Bank</option>
                  {banks.map((option) => (
                    <option value={option.id}>{option.name}</option>))}

                </select>
              </div>
            </div>
          </div>


          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500">Account Number</label>
              <div className="contact-name">
                <input type="text"
                  disabled={true}
                  value={addFormData.bank.number}
                  className="form-control" autoComplete="off"
                  name="number" required="required"
                  //  onChange={handleAddFormChangeTwo}
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
                  disabled={true}
                  value={(addFormData.bank.name)}
                  //     onChange={handleAddFormChangeTwo}
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
                  disabled={true}
                  value={addFormData.bank.branch}
                  //     onChange={handleAddFormChangeTwo}
                  placeholder="Branch"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>







        </div>
      </div>







      <div className="card" style={{ padding: "30px" }}>
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
                  {addFormData.comments.map((option, key) => (
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
      </div>


      {/* <div className="card" style={{padding:"30px"}}>
          <button style={{maxWidth:"250px"}}  className="btn btn-success" onClick={(e)=>setpostModal2(true)} >
            Previous Applications
  
              </button>
            </div> */}


    </section>
  );
};

export default StepOne;
