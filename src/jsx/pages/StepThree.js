import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { nationalities, countryCodes } from "./appData.js"
import { addClientBussiness, getClientBussinessAuthTwo } from "../../util/APIUtils.js";
import { sectors } from "../../constants/index"
import { Modal } from 'react-bootstrap';
import { RotateSpinner } from "react-spinners-kit";
import Select from "react-select";
import swal from "sweetalert";
const StepOne = (props) => {
  const [postModal, setPostModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const country = countryCodes.map(data => (
    { value: data.name, label: data.name }
    // <option value={data.name} > {" "+data.name+" "}</option>
  ))

  const customStyles = {
    input: (provided) => ({
      ...provided,
      // 'padding':'40px',
      // "padding-top": "0.75rem",
      // "padding-bottom": "0.375rem",
      // "padding": "0.375rem 0.75rem"
      "padding-top": "12px",
      "padding-bottom": "12px",

    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#00aff0"

    }),
    control: (provided) => ({
      ...provided,
      // height: '48px !important',
      // 'line-height': '2rem center',
      border: 'black solid 1px !important',
    }),

  }

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
    country: '',
    city: '',
    town: '',
    street: '',
    vat: '',
    tin: '',
    turnover: '',
    depend: '',
    femaleEmp: '',
    ownerDisable: '',
    empDisable: '',
    unempEmployee: '',
    refemployee: '',
    empYouth: '',
    email: props.email


  });
  const years = range(1970, (new Date()).getFullYear());
  useEffect(() => {
    //alert(props.email)
    getDetailLoaded()

  }, []);

  function getDetailLoaded() {
    const email = localStorage.getItem('email');
    if (email) {
      const theData = { id: email }
      //alert(JSON.stringify(theData))
      getClientBussinessAuthTwo(email)
        .then((response) => {
          response.dob = new Date(response.dob)
          response.vat = response.vat === "Yes" ? "yes" : "no"
          console.log(response)
          setAddFormData(response)

          // //              response.vat=response.vat.toString().toLowerCase()
          //           response.tc="true"
          //           setAddFormData(response)
          //           setJstEdit(true)
          //           console.log(response)
          // setdisableInput(true)
          //setIncompObje

          // seLoad(false)

        })
        .catch((error) => {
          //   seLoad(false)
          alert(error)
          console.log(error);
          //swal('Oops', error.message, "error");
        });

    }
  }

  function range(start, end) {
    const theYears = []

    for (var m = start; m < end; m++) {
      theYears.push(m)
    }
    theYears.push(end);
    return theYears;
  }



  function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 2021);
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
    }
    //   else if(addFormData.type === ""){
    //       error = true;
    // errorMsg = 'Please add business type';
    //   }

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

    else if (addFormData?.turnover === "") {
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

    else if (addFormData.ownerDisable === "") {
      error = true;
      errorMsg = 'Please add total no. of owners disable';
    }

    else if (addFormData.empDisable === "") {
      error = true;
      errorMsg = 'Please add total no. of employees disable';
    }

    else if (addFormData.unempEmployee === "") {
      error = true;
      errorMsg = 'Please add total no. of previously unemployed employees';
    }

    else if (addFormData.refemployee === "") {
      error = true;
      errorMsg = 'Please add total no. of refugee employees';
    }

    else if (addFormData.empYouth === "") {
      error = true;
      errorMsg = 'Please add total no. of youth employed';
    }




    if (!error) {
      addFormData.turnover = addFormData.turnover.split(",").join()
      addFormData.email = props.email

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
          swal('Good job!', 'Successfully Saved, login into your account', "success");
          //    getTheDirectors()
          //props.setEmail(addFormData.email)
          props.history.push(
            {
              pathname: '/login',
              state: { email: addFormData.email }
            }
            // '/page-register'
          );
        })
        .catch((error) => {
          setLoading(false)
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
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    if (fieldName === "turnover") {
      fieldValue = fieldValue.split(",").join("")
      if (!isNaN(fieldValue)) {
        fieldValue = numberWithCommas(fieldValue)

        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
      }

    }
    // alert(fieldValue)
    else {
      newFormData[fieldName] = fieldValue;
      setAddFormData(newFormData);
    }
  };


  return (
    <section style={{ marginTop: "10px" }}>


      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-lg-3 mb-2">
          <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Name of Business</label>
          <div className="contact-name">
            <input type="text" className="form-control" autoComplete="off"
              value={addFormData.fname}
              name="fname" required="required"
              onChange={handleAddFormChange}
              placeholder="Name of Company"
            />
            <span className="validation-text"></span>
          </div>

        </div>



        <div className={addFormData?.sector?.toString().toLowerCase().includes("other") ? "col-lg-3 mb-2" : "col-lg-4 mb-2"}>
          <div className="form-group mb-3">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Sector</label>
            <div className="form-group mb-3">

              <select
                value={addFormData.sector}
                defaultValue={""}
                name="sector"
                style={{ color: addFormData.sector === "" ? "#00aff0" : "black" }}
                onChange={handleAddFormChange}
                className="form-control"
              >
                <option disabled value="">Select Sector</option>

                {sectors.map((option) => {
                  return <option value={option}>{option}</option>
                })}

              </select>
            </div>
          </div>
        </div>

        {addFormData?.sector?.toString().toLowerCase().includes("other") ?
          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-black font-w500">Other Sector</label>
              <div className="contact-name">
                <input type="text" className="form-control" autoComplete="off"
                  name="osector"
                  value={addFormData.osector}
                  onChange={handleAddFormChange}
                  placeholder="Other Sector"
                />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>
          : null}

        <div className="col-lg-4 mb-2">
          <div className="form-group mb-3">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Registration Date</label>
            <div className="contact-name">
              <div className="form-group mb-0">
                <DatePicker dateFormat='dd/MM/yyyy' className="form-control"
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

              <Select
                value={
                  addFormData.country === "" ? "" : { value: addFormData.country, label: addFormData.country }
                }
                onChange={(val) => {
                  const newFormData = { ...addFormData };
                  newFormData.country = val.value;
                  setAddFormData(newFormData);
                }}
                styles={customStyles}
                placeholder="Search & Select Country"
                classNamePrefix="form-control"
                //  className="form-control"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "0.75rem",
                  width: "100%",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#969ba0",
                  backgroundColor: "#fff",
                  display: "block",
                  appearance: "none",
                  backgroundClip: "padding-box",
                  transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                  colors: {
                    ...theme.colors,
                    primary: 'black',
                  },
                })}
                // value={selectedOption}
                // onChange={this.handleChange}
                options={country}
              />

              {/* <select
												value={addFormData.country}
					name="country"
					onChange={handleAddFormChange}
                      defaultValue={"Uganda"}
                      className="form-control"
                    >
                     {country}
                    </select> */}
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-2">
          <div className="form-group mb-3">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> City</label>
            <div className="contact-name">
              <input type="text" className="form-control"
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
              <input type="text" className="form-control" autoComplete="off"
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
              <input type="text" className="form-control" autoComplete="off"
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
          <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>Value Added Tax (VAT)</label>
          <div className="contact-name">
            <div className="form-group mb-0">
              <label className="radio-inline me-3">
                <input required="required"
                  checked={addFormData.vat === "yes"}
                  value="yes" onChange={handleAddFormChange} type="radio" name="vat" /> Yes
              </label>
              <label className="radio-inline me-3">
                <input required="required"
                  checked={addFormData.vat === "no"}
                  value="no" onChange={handleAddFormChange} type="radio" name="vat" /> No
              </label>
            </div>
          </div>
        </div>


        <div className="col-lg-4 mb-2">
          <div className="form-group mb-3">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>Tax Indentification Number (TIN)</label>
            <div className="contact-name">
              <input type="text"
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
                value={numberWithCommas(addFormData.turnover)}
                className="form-control" autoComplete="off"
                name="turnover" required="required"
                onChange={handleAddFormChange}
                placeholder="Annual Turnover/sales"
              />
              <span className="validation-text"></span>
            </div>
          </div>
        </div>

        {/* <div className="col-lg-4 mb-2">
          <div className="form-group mb-3">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>  Number of Owners with Disabilities</label>
            <div className="contact-name">
              <input type="number"
                // disabled={disableInput}
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
                // disabled={disableInput}
                value={addFormData.ownerDisable}
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
                value={addFormData.depend}
                className="form-control" autoComplete="off"
                name="depend" required="required"
                onKeyPress={(e) => {
                  if (e.code === 'Minus') {
                    e.preventDefault();
                  }
                }}
                onChange={handleAddFormChange}
                placeholder="Number of Total Employees"
              />
              <span className="validation-text"></span>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-2">
          <div className="form-group mb-3">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b>  Number of Youth Employed</label>
            <div className="contact-name">
              <input type="number"
                // disabled={disableInput}
                value={addFormData.empYouth}
                className="form-control" autoComplete="off"
                name="empYouth" required="required"
                onChange={handleAddFormChange}
                placeholder="Number of Youth Employed"
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
                value={addFormData.femaleEmp}
                className="form-control" autoComplete="off"
                name="femaleEmp" required="required"
                onKeyPress={(e) => {
                  if (e.code === 'Minus') {
                    e.preventDefault();
                  }
                }}


                onChange={(e) => {
                  if (parseInt(e.target.value) < parseInt(addFormData.depend)) {
                    //  alert("good"+e.target.value+" and  "+addFormData.depend)
                    handleAddFormChange(e)
                  }
                  else if (e.target.value === "") {
                    handleAddFormChange(e)

                  }
                  else {
                    //   alert("hmm")
                    e.preventDefault()
                    return false
                  }

                }}
                // onChange={handleAddFormChange}
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
                // disabled={disableInput}
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
                // disabled={disableInput}
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
                // disabled={disableInput}
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
            <button style={{ width: "auto" }} className="btn btn-success" onClick={(e) => handleAddFormSubmit(e)} >
              Save & Continue

            </button>}
        </div>
      </div>
    </section>
  );
};

export default StepOne;
