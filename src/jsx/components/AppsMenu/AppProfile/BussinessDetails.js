import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { nationalities, countryCodes } from "./appData.js"
import { addClientBussiness, getClientBussiness } from "../../../../util/APIUtils.js";
import { Modal } from 'react-bootstrap';
import { RotateSpinner } from "react-spinners-kit";
import swal from "sweetalert";
const StepOne = (props) => {
  const [postModal, setPostModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoad, seLoad] = useState(false);
  const [disableInput, setdisableInput] = useState(false);
  const country = countryCodes.map(data => (

    <option value={data.name} > {" " + data.name + " "}</option>
  ))

  const codes = countryCodes.map(data => (

    <option value={data.dial_code} > {" " + data.name + " (" + data.dial_code + " )"}</option>
  ))

  const [addFormData, setAddFormData] = useState({
    id: null,
    fname: '',
    type: '',
    otype: '',
    sector: '',
    osector: '',
    dob: null,
    regno: '',
    country: 'Uganda',
    city: '',
    town: '',
    street: '',
    vat: '',
    tin: '',
    turnover: '',
    depend: '',
    femaleEmp: '',
    ownerDisable:'',
    empDisable:'',
    unempEmployee:'',
    refemployee:'',
    email: props.email


  });
  function getBussunisessData() {
    seLoad(true)
    getClientBussiness()
      .then((response) => {
        response.dob = new Date(response.dob)
        response.vat = response.vat.toString().toLowerCase()
        setAddFormData(response)
        setdisableInput(true)
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
    addFormData.actions = ""
    if (addFormData.fname === "") {
      error = true;
      errorMsg = 'Please fill business name';
    } else if (addFormData.type === "") {
      error = true;
      errorMsg = 'Please add business type';
    }

    else if (addFormData.sector === "") {
      error = true;
      errorMsg = 'Please add business sector';
    }

    else if (addFormData.sectordob === null) {
      error = true;
      errorMsg = 'Please add Registration date';

    }

    else if (addFormData.regno === "") {
      error = true;
      errorMsg = 'Please add registration number';
    }

    else if (addFormData.city === "") {
      error = true;
      errorMsg = 'Please add city';
    }

    else if (addFormData.town === "") {
      error = true;
      errorMsg = 'Please add town';
    }

    else if (addFormData.vat === "") {
      error = true;
      errorMsg = 'Please add VAT option';
    }

    else if (addFormData.tin === "") {
      error = true;
      errorMsg = 'Please add TIN number';
    }

    else if (addFormData.turnover === "") {
      error = true;
      errorMsg = 'Please add annual turn over!';
    }


    else if (addFormData.depend === "") {
      error = true;
      errorMsg = 'Please add total no. of employees';
    }


    else if (addFormData.femaleEmp === "") {
      error = true;
      errorMsg = 'Please add total no. of female employees';
    }




    if (!error) {



      console.log(addFormData)
      //	alert(JSON.stringify(addFormData))
      setLoading(true)
      //  props.history.push(
      //    {
      //        pathname: '/login',
      //        state: {  email:addFormData.email }
      //    }
      //   // '/page-register'
      //    );  

      addClientBussiness(addFormData)
        .then((response) => {
          setPostModal(false);
          swal('Good job!', 'Successfully updated data', "success");
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
            <h4>Business Details</h4>
            <p>Your business information</p>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "30px" }}>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-lg-4 mb-2">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Name of Business</label>
            <div className="contact-name">
              <input type="text" className="form-control" autoComplete="off"
                disabled={disableInput}
                value={addFormData.fname}
                name="fname" required="required"
                onChange={handleAddFormChange}
                placeholder="Name of Company"
              />
              <span className="validation-text"></span>
            </div>

          </div>
          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Type Of Business</label>
              <div className="form-group mb-3">

                <select
                  disabled={disableInput}
                  value={addFormData.type}
                  defaultValue={""}
                  name="type"
                  onChange={handleAddFormChange}
                  className="form-control"
                >
                  <option disabled value="">Select Type</option>
                  <option value="Sole Proprietor">Sole Proprietor</option>
                  <option value="Limited Liability Company">Limited Liability Company</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Group">Group</option>
                  <option value="Other (Specify)">Other (Specify)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500">Other Type</label>
              <div className="contact-name">
                <input type="text"
                  disabled={disableInput}
                  value={addFormData.otype}
                  className="form-control" autoComplete="off"
                  name="otype" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Other Type"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Sector</label>
              <div className="form-group mb-3">

                <select
                  disabled={disableInput}
                  value={addFormData.sector}
                  defaultValue={""}
                  name="sector"
                  onChange={handleAddFormChange}
                  className="form-control"
                >
                  <option disabled value="">Select Type</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Health">Health</option>
                  <option value="Other (Specify)">Other (Specify)</option>
                </select>
              </div>
            </div>
          </div>


          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500">Other Sector</label>
              <div className="contact-name">
                <input type="text" className="form-control" autoComplete="off"
                  name="osector"
                  disabled={disableInput}
                  value={addFormData.osector}
                  onChange={handleAddFormChange}
                  placeholder="Other Sector"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>


          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Registration Date</label>
              <div className="contact-name">
                <div className="form-group mb-0">
                  <DatePicker dateFormat='dd/MM/yyyy'
                    disabled={disableInput}
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

                    placeholder="Registration Date"
                    name="dob"
                    selected={addFormData.dob}
                    //value={new Date()}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
          </div>


          <div className="col-lg-4 mb-2">

            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Registration No.</label>
              <div className="contact-name">
                <div className="form-group mb-0">
                  <input
                    disabled={disableInput}
                    value={addFormData.regno}
                    type="text" className="form-control" autoComplete="off"
                    name="regno" required="required"
                    onChange={handleAddFormChange}
                    placeholder="Registration No."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Country</label>
              <div className="contact-name">
                <select
                  disabled={disableInput}
                  value={addFormData.country}
                  name="country"
                  onChange={handleAddFormChange}
                  defaultValue={"Uganda"}
                  className="form-control"
                >
                  {country}
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> City</label>
              <div className="contact-name">
                <input type="text"
                  disabled={disableInput}
                  className="form-control"
                  value={addFormData.city}
                  autoComplete="off"
                  name="city" required="required"
                  onChange={handleAddFormChange}
                  placeholder="City"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>


          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Town</label>
              <div className="contact-name">
                <input
                  disabled={disableInput}
                  type="text" className="form-control" autoComplete="off"
                  name="town"
                  value={addFormData.town}
                  onChange={handleAddFormChange}
                  placeholder="Town"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>


          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500">Street Address / Village</label>
              <div className="contact-name">
                <input
                  disabled={disableInput}
                  type="text" className="form-control" autoComplete="off"
                  name="street"
                  value={addFormData.street}
                  onChange={handleAddFormChange}
                  placeholder="Street Address / Village"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-2">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> VAT</label>
            <div className="contact-name">
              <div className="form-group mb-0">
                <label className="radio-inline me-3">
                  <input
                    disabled={disableInput}
                    required="required"
                    checked={addFormData.vat === "yes"}
                    value="yes" onChange={handleAddFormChange} type="radio" name="vat" /> Yes
                </label>
                <label className="radio-inline me-3">
                  <input

                    disabled={disableInput}
                    required="required"
                    checked={addFormData.vat === "no"}
                    value="no" onChange={handleAddFormChange} type="radio" name="vat" /> No
                </label>
              </div>
            </div>
          </div>



          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> TIN</label>
              <div className="contact-name">
                <input type="text"
                  disabled={disableInput}
                  value={addFormData.tin}
                  className="form-control" autoComplete="off"
                  name="tin" required="required"
                  onChange={handleAddFormChange}
                  placeholder="TIN"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Annual Turnover/sales</label>
              <div className="contact-name">
                <input type="text"
                  disabled={disableInput}
                  value={addFormData.turnover}
                  className="form-control" autoComplete="off"
                  name="turnover" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Annual Turnover/sales"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>

{/* 
          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>  No of Owners with Disabilities</label>
              <div className="contact-name">
                <input type="number"
                  disabled={disableInput}
                  value={addFormData.ownerDisable}
                  className="form-control" autoComplete="off"
                  name="ownerDisable" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Number of Owners with Disability"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div> */}

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>Is owner a Person with Disability</label>
              <div className="form-group mb-3">

                <select
                  disabled={disableInput}
                  value={addFormData.ownerDisable
                }
                  defaultValue={""}
                  name="ownerDisable"
                  onChange={handleAddFormChange}
                  className="form-control"
                >
                  <option disabled value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>



          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>  Number of Total Employees</label>
              <div className="contact-name">
                <input type="number"
                  disabled={disableInput}
                  value={addFormData.depend}
                  className="form-control" autoComplete="off"
                  name="depend" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Number of Total Employees"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>

          

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>  Number of Female Employees</label>
              <div className="contact-name">
                <input type="number"
                  disabled={disableInput}
                  value={addFormData.femaleEmp}
                  className="form-control" autoComplete="off"
                  name="femaleEmp" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Number of Female Employees"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>


         <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>Number of Refugee Employees</label>
              <div className="contact-name">
                <input type="number"
                  disabled={disableInput}
                  value={addFormData.refemployee}
                  className="form-control" autoComplete="off"
                  name="refemployee" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Number of Refugee Employees"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>  Number of Employees with Disabilities</label>
              <div className="contact-name">
                <input type="number"
                  disabled={disableInput}
                  value={addFormData.empDisable}
                  className="form-control" autoComplete="off"
                  name="empDisable" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Number of Employees with Disabilities"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>


          <div className="col-lg-4 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>  Number of Previously Unemployed Employees</label>
              <div className="contact-name">
                <input type="number"
                  disabled={disableInput}
                  value={addFormData.unempEmployee}
                  className="form-control" autoComplete="off"
                  name="unempEmployee" required="required"
                  onChange={handleAddFormChange}
                  placeholder="Number of Previously Unemployed Employees"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>


          <div className="col-lg-12 mb-12" style={{ textAlign: "left", marginTop: "30px" }}>
            {isLoading ?
              <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
              <> {disableInput ?
                <button style={{ width: "auto" }} className="btn btn-info" onClick={(e) => setdisableInput(false)} >
                  Edit Info

                </button> :
                <button style={{ width: "auto" }} className="btn btn-success" onClick={(e) => handleAddFormSubmit(e)} >
                  Save Info

                </button>}
              </>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
