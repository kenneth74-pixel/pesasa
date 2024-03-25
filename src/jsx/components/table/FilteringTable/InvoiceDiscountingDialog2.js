import React, { useState, useEffect } from "react";
import { countryCodes } from "../../AppsMenu/AppProfile/appData.js"
import {
  verifyProcessApplication, getBanks, reimburse
} from "../../../../util/APIUtils.js";
import { paymentModes } from "../../../../constants/index"
import { Button } from "react-bootstrap";
import { RotateSpinner } from "react-spinners-kit";
import TableExport from "./TableExport.jsx";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { format } from 'date-fns'
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
  const [applications, setApplications] = useState([]);
  const [comments, setComments] = useState([]);
  const [docs, setdocs] = useState([]);
  const [showPrev, setShowPrev] = useState(false);
  const [reimburses, setReimburses] = useState([]);
  const [showReimburses, setShowReimburses] = useState(false);
  const [reimburseTotal, setreimburseTotal] = useState(0);
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
    detailProgress: {},
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
    bank: {}



  });

  const [reimburseData, setreimburseData] = useState({
    dob: addFormData.collectionDate !== null && addFormData.collectionDate !== undefined && addFormData.collectionDate !== '' ? new Date(addFormData.collectionDate) : new Date(),
    amount: "",
    mode: "Bank"
  })
  function sendReimburse() {
    const amt = reimburseData.amount.toString().split(",").join("")
    const dataSend = {
      id: null,
      applicationId: addFormData.id,
      amount: amt,
      dateAdded: reimburseData.dob,
      mode: reimburseData.mode,
      isFullyDisbursed: parseInt(addFormData.balanceToDisburse) === parseInt(amt) ? true : false,
      isMse: true
    }
    if (reimburseData.amount === "") {
      swal('Oops', "Please add amount", "error");
    }
    else {
      // alert(dataSend.isFullyDisbursed+" "+addFormData.balanceToDisburse+" plus "+amt)

      setisLoading(true)
      console.log("banange", dataSend)
      reimburse(dataSend)
        .then((response) => {
          const newFormData = { ...addFormData };
          newFormData["reimburses"] = response;
          setAddFormData(newFormData);

          setisLoading(false)
          setShowPrev(false);
          // setcomment("")
          swal('Good job!', 'Successfully Submitted', "success");
          props.reloadMe(addFormData.id)
          props.setPostModal(false)
        })
        .catch((error) => {
          setisLoading(false)
          console.log(error);
          swal('Oops', error.message, "error");
        });
    }
    // alert(JSON.stringify(dataSend))
  }

  function mseReimburse() {
    const amt = reimburseData.amount.toString().split(",").join("")
    const dataSend = {
      id: null,
      applicationId: addFormData.id,
      amount: amt,
      dateAdded: reimburseData.dob,
      mode: reimburseData.mode,
      isFullyDisbursed: parseInt(addFormData.balanceToDisburse) === parseInt(amt) ? true : false,
      isMse: true

    }
    if (reimburseData.amount === "") {
      swal('Oops', "Please add amount", "error");
    }
    else {
      // alert(dataSend.isFullyDisbursed+" "+addFormData.balanceToDisburse+" plus "+amt)

      setisLoading(true)
      console.log("banange", dataSend)
      reimburse(dataSend)
        .then((response) => {
          const newFormData = { ...addFormData };
          newFormData["reimburses"] = response;
          setAddFormData(newFormData);

          setisLoading(false)
          setShowPrev(false);
          // setcomment("")
          swal('Good job!', 'Successfully Submitted', "success");
          props.reloadMe(addFormData.id)
          props.setPostModal(false)
        })
        .catch((error) => {
          setisLoading(false)
          console.log(error);
          swal('Oops', error.message, "error");
        });
    }
    // alert(JSON.stringify(dataSend))
  }


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

    const newFormData = { ...reimburseData };
    // newFormData['amount'] = props.obj.detailProgress.amount
    // newFormData['dob'] = props.obj.detailProgress.dateAdded===null?new Date():new Date(props.obj.detailProgress.dateAdded)
    setreimburseData(newFormData);

  }

  useEffect(() => {
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




  const handleDateChange = (event) => {
    //	alert(JSON.stringify(event))
    // event.preventDefault();    
    const fieldName = "dob";
    const fieldValue = event;
    const newFormData = { ...reimburseData };
    newFormData[fieldName] = fieldValue;
    setreimburseData(newFormData);
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
    let fieldValue = event.target.value;
    // alert(fieldValue)
    fieldValue = fieldValue.split(",").join("");
    const newFormData = { ...reimburseData };
    if (!isNaN(fieldValue)) {

      if (fieldValue > addFormData.balanceToDisburse) {
        swal('Invalid Input', "Disburse amount should not exceed " + numberWithCommas(addFormData.balanceToDisburse), "error");
      }
      else {
        newFormData[fieldName] = fieldValue
        setreimburseData(newFormData);
      }


    }
  };


  const changeHanldeAlt = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    // alert(fieldValue)
    const newFormData = { ...reimburseData };

    newFormData[fieldName] = fieldValue
    setreimburseData(newFormData);

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
        open={showReimburses}
        onClose={setShowReimburses}
      >

        <DialogTitle>
          <h4 >Application Disbursements: Total: {numberWithCommas(reimburseTotal)}</h4>



          {/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
        </DialogTitle>
        <DialogContent

        >
          <TableExport

            hideDataExport={true}
            rows={reimburses}
            //rows={this.state.colors[1]==="primary"?finished: dataTemp}
            columns={[
              { name: 'dateAdded', title: 'Date' },
              { name: 'user', title: 'User' },
              { name: 'amount', title: 'Amount' },

              { name: 'mode', title: 'Payment Mode' },
              // { name: 'actions', title: 'Actions' },
            ]}
            //  exportColumns={this.state.columns2}
            defaultExpandedGroups={[]}
            grouping={[]}
            defaultHiddenColumnNames={[]}
            defaultPageSize={0}
            hideSelectionExport
            infiniteScrolling
          // fileName={"Directors"}


          />

        </DialogContent>

        <DialogActions style={{ width: "100%", overflow: "hidden" }}>

          <button type="button"
            className="btn shadow btn-xs btn-primary"

            onClick={() => setShowReimburses(false)}
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
      <div style={{ textAlign: "left" }}>
        <div style={{ float: "left", marginRight: "40px", maxWidth: "250px" }}>
          <div className="row">
            <div className="form-group mb-3">
              <label className="text-black font-w500">Disbursement Amount (Balance Due Disbursement: {numberWithCommas(addFormData.balanceToDisburse)} )</label>
              {addFormData.balanceToDisburse !== 0 ?
                <div className="contact-name">
                  <input type="text" className="form-control" autoComplete="off"
                    name="amount"
                    //  disabled={addFormData.progress!=="COLLECTED"}
                    value={numberWithCommas(reimburseData.amount)}
                    onChange={handleAddFormChange}
                    placeholder="Disbursement Amount"
                  />
                  <span className="validation-text"></span>
                </div> : null}
            </div>

            {addFormData.balanceToDisburse !== 0 ?
              <div className="form-group mb-4">
                <label className="text-black font-w500">Payment Mode</label>
                <div className="contact-name">
                  <select
                    //  disabled={disableInput}
                    value={reimburseData.mode}
                    // defaultValue={"Bank"}
                    name="mode"
                    onChange={changeHanldeAlt}
                    className="form-control"
                  >
                    <option disabled value="">Select Payment Mode</option>
                    {paymentModes.map(data => {
                      return <option value={data}>{data}</option>
                    })
                    }


                  </select>
                  <span className="validation-text"></span>
                </div>

              </div> : null}
            {addFormData.balanceToDisburse !== 0 ?
              <div className="form-group mb-0">
                <b>Disburse Date : {addFormData.collectionDate !== null && addFormData.collectionDate !== undefined && addFormData.collectionDate !== '' ? format(new Date(addFormData.collectionDate), 'dd-MMM-yyyy') : "Not Set"}</b>
                <label className="text-black font-w500">Disbursement Date</label>
                <DatePicker dateFormat='dd/MM/yyyy'
                  maxDate={addFormData.collectionDate !== null && addFormData.collectionDate !== undefined && addFormData.collectionDate !== '' ? new Date(addFormData.collectionDate) : new Date()}
                  //  disabled={addFormData.progress!=="COLLECTED"}
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

                  placeholder="Disbursement Date"
                  name="dob"
                  selected={reimburseData.dob}
                  //value={new Date()}
                  onChange={handleDateChange}
                />
              </div> : null}
          </div>
          {addFormData.balanceToDisburse !== 0 ?
            <div className="row">
              {isLoading ?
                <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
                (
                  <>
                  <button style={{ maxWidth: "250px", marginLeft: "15px", float: "right", marginTop: "20px" }} className="btn btn-info" onClick={(e) => mseReimburse()} >
                      Mse Disbursement

                    </button>

                    <button style={{ maxWidth: "250px", marginLeft: "15px", float: "right", marginTop: "20px" }} className="btn btn-success" onClick={(e) => sendReimburse()} >
                      Disburse
                    </button>
                  </>
                )}
            </div> : null}
          <div className="row">
            <button style={{ maxWidth: "250px", marginLeft: "15px", float: "right", marginTop: "20px" }}
              className="btn btn-warning"
              onClick={() => {
                const data = addFormData
                const toAdd = []
                // let total=0;
                data.reimburses.map((option) => {
                  // total=parseInt(parseInt(total)+parseInt(option.amount))
                  option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
                  option.amount = numberWithCommas(option.amount)

                  toAdd.push(option)
                })

                setreimburseTotal(data.netDis - data.balanceToDisburse)
                setReimburses(toAdd)
                setShowReimburses(true)
              }}
            >
              Previous Disbursements
            </button>
          </div>

          <div className="row">
            <button style={{ maxWidth: "250px", marginLeft: "15px", float: "right", marginTop: "20px" }} className="btn btn-primary" onClick={(e) => props.setPostModal(false)} >
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
              <font style={{ color: "black", marginLeft: "10px" }}>Progress: {addFormData.progress}</font>
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

          <div className="col-lg-10 mb-2">
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
          <div className="col-lg-2 mb-2">
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

          <div className="col-lg-6 mb-2">
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

          <div className="col-lg-6 mb-2">
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
              <label className="text-black font-w500">Discount Amount</label>
              <div className="contact-name">
                <input type="text" className="form-control" autoComplete="off"
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
              <label className="text-black font-w500">Discount Percentage
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

                <div className="form-group mb-3">
                  <label className="text-black font-w500">Finance Period
                    (Max 90 days): </label>
                  <div className="contact-name">
                    <div className="form-group mb-0">
                      <input
                        disabled={disableInput}
                        value={addFormData.period}
                        type="text" className="form-control" autoComplete="off"
                        name="period" required="required"
                        onChange={handleAddFormChange}
                        placeholder="Finance Period
(Max 90 days): "
                      />
                    </div>
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
                  <label className="text-black font-w500"> Discount Fee Amount
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
                  <label className="text-black font-w500"> Net Disburse Amount</label>
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
