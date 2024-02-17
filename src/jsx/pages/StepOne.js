import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePond } from 'react-filepond';
import {
  //nationalities, 
  countryCodes
} from "./appData.js"
import { addClient, getClientBussinessAuth, uploadMultipleFilesNew, getAllDistricts, getLevelsOfEducation } from "../../util/APIUtils.js";
import { Modal } from 'react-bootstrap';
import { RotateSpinner } from "react-spinners-kit";
import swal from "sweetalert";
const StepOne = (props) => {
  const [postModal, setPostModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [jstEdit, setJstEdit] = useState(false);
  const [allDis, setAllDis] = useState([]);


  const [levels, setLevels] = useState([])

  const country = countryCodes.map(data => (
    { value: data.name, label: data.name }
    // <option value={data.name} > {" "+data.name+" "}</option>
  ))

  const codes = countryCodes.map(data => (
    { value: data.dial_code, label: data.name + " (" + data.dial_code + " )" }
    // <option value={data.dial_code} > {" "+data.name+" ("+data.dial_code+" )"}</option>
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


  const [disName, setDisName] = useState("");
  const [addFormData, setAddFormData] = useState({
    id: null,
    fname: '',
    lname: '',
    empType: '',
    yearsInBussiness:'',
    levelOfEducation: "",
    oname: '',
    gender: '',
    nationality: '',
    districtId: null,
    idId: null,
    otype: '',
    nid: '',
    tc: false,
    marital: '',
    image: '',
    type: "",
    depend: '',
    email: '',
    aemail: '',
    number: '',
    town: '',
    street: '',
    director: "",
    code: '',
    country: '',
    password: "",
    city: '',
    accountStatus: 'ACTIVE',
    dob: new Date()
  });
  const years = range(1920, (new Date()).getFullYear());

  const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Antiguans",
    "Argentinean",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Barbudans",
    "Batswana",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djibouti",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinea-Bissauan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Herzegovinian",
    "Honduran",
    "Hungarian",
    "I-Kiribati",
    "Icelander",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kittian and Nevisian",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivan",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mosotho",
    "Motswana",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "New Zealander",
    "Ni-Vanuatu",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "North Korean",
    "Northern Irish",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamer",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian or Tobagonian",
    "Tunisian",
    "Turkish",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Venezuelan",
    "Vietnamese",
    "Welsh",
    "Yemenite",
    "Zambian",
    "Zimbabwean"
  ]

  function range(start, end) {
    const theYears = []

    for (var m = start; m < end; m++) {
      theYears.push(m)
    }
    theYears.push(end);
    return theYears;
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  useEffect(() => {
    getLevels()
    getAllDis()
    getBussunisessData()

  }, []);



  function getBussunisessData() {
    const email = localStorage.getItem('email');
    if (email) {
      const theData = { id: email }
      //alert(JSON.stringify(theData))
      getClientBussinessAuth(theData)
        .then((response) => {
          response.dob = new Date(response.dob)
          //              response.vat=response.vat.toString().toLowerCase()
          response.tc = "true"
          setAddFormData(response)
          setJstEdit(true)
          console.log(response)
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

  function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 2021);
  }




  function getLevels() {
    getLevelsOfEducation()
      .then((response) => {
        response.sort((a, b) => a.enumInt - b.enumInt)

        setLevels(response)

      })
      .catch((error) => {
        console.log(error);
        swal('Oops', error.message, "error");
      });
  }



  function getAllDis() {
    getAllDistricts()
      .then((response) => {
        //	alert(response)
        const toSet = []

        response.map(data => (
          toSet.push({ value: data.id, label: data.name })
          //  <option value={data} >{data}</option>
        ))

        setAllDis(toSet)


      })
      .catch((error) => {
        console.log(error);
        swal('Oops', error.message, "error");
      });
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
    // alert(JSON.stringify(addFormData))
    event.preventDefault();
    var error = false;
    var errorMsg = '';
    addFormData.actions = ""
    const age = calculateAge(addFormData.dob);
    if (addFormData.fname === "") {
      error = true;
      errorMsg = 'Please fill First name';
    } else if (addFormData.lname === "") {
      error = true;
      errorMsg = 'Please fill Surname name.';
    }

    else if (addFormData.empType === "") {
      error = true;
      errorMsg = 'Please fill employement type.';
    }

    else if (addFormData.gender === "") {
      error = true;
      errorMsg = 'Please add gender';
    }
    else if (addFormData.nid === "") {
      error = true;
      errorMsg = 'Please add National Identification No. (NIN) / Passport No';
    }


    else if (addFormData.idId === null) {
      error = true;
      errorMsg = 'Please upload picture of ID / Passport No';
    }


    else if (addFormData.levelOfEducation === "") {
      error = true;
      errorMsg = 'Please select highest level of education';
    }



    // else if(age<18){
    //   error = true;
    //   errorMsg = 'Age cannot be below 18, check date of birth';

    // }



    else if (addFormData.depend === "") {
      error = true;
      errorMsg = 'Please add no. of dependants';
    }

    else if (addFormData.type === "") {
      error = true;
      errorMsg = 'Please add business type';
    }



    else if (addFormData?.type?.toString().toLowerCase().includes("other") && addFormData.otype === '') {
      error = true;
      errorMsg = 'Please specify the other business type';
    }





    else if (addFormData.country === "") {
      error = true;
      errorMsg = 'Please select country';
    }



    else if (addFormData.districtId === null && addFormData.country.includes("Uganda")) {
      error = true;
      errorMsg = 'Please select district';
    }

    else if (addFormData.nationality === "") {
      error = true;
      errorMsg = 'Please select nationality';
    }


    else if (addFormData.email === "") {
      error = true;
      errorMsg = 'Please add email';
    }

    else if (!validateEmail(addFormData.email)) {

      error = true;
      errorMsg = 'Invalid email address';
    }


    else if (addFormData.code === "") {
      error = true;
      errorMsg = 'Please add phone number country code';
    }

    else if (addFormData.number === "") {
      error = true;
      errorMsg = 'Please add phone number';
    }



    else if (addFormData.city === "") {
      error = true;
      errorMsg = 'Please add city of residence';
    }

    else if (addFormData.password === "" && !jstEdit) {
      error = true;
      errorMsg = 'Please add password!';
    }

    else if ((addFormData.password !== addFormData.cpassword) && !jstEdit) {
      error = true;
      errorMsg = 'Passwords do not match!';
    }


    else if (addFormData.tc.toString() === "false") {
      error = true;
      errorMsg = 'First agree to the terms & conditions!';
    }



    if (!error) {

      const newContact = {
        id: addFormData.id,
        Cust_Id: addFormData.Cust_Id,
        Date_Join: addFormData.Date_Join,
        Cust_Name: addFormData.Cust_Name,
        Location: addFormData.Location,
        image: addFormData.image,
      };
      // const newContacts = [...contacts, newContact];
      //setContacts(newContacts);

      console.log(addFormData)
      //	alert(JSON.stringify(addFormData))
      setLoading(true)
      addClient(addFormData)
        .then((response) => {
          setPostModal(false);
          localStorage.setItem('email', response.id);
          swal('Good job!', 'Successfully Saved, verfication step next', "success");
          //    getTheDirectors()
          props.setEmail(addFormData.email)
          props.pushTo(1)
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
  function verifyEmail(value) {
    var emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }


  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    if (fieldName === "number") {
      fieldValue = fieldValue.replace(/^0+/, '')
    }

    if (fieldName === "type" && fieldValue === 'Individual') {
      props.setisIndividual(true)
    }
    else {
      props.setisIndividual(false)
    }
    // alert(fieldValue)
    //  if(fieldName==="depend"){
    //    if(fieldValue>0){

    //   const newFormData = {...addFormData};
    //   newFormData[fieldName] =fieldValue;
    //   setAddFormData(newFormData);
    //    }
    //  }
    //  else{
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
    //  }
  };

  const options = []
  nationalities.map((option) => {
    options.push({ value: option, label: option })
  })
  return (
    <section style={{ marginTop: "10px" }}>
      <Modal
        fullScreen={true}
        //className="modal fade"
        // className="fade bd-example-modal-lg"

        size="lg"
        show={postModal} onHide={setPostModal} >

        <div style={{ padding: "40px", color: "black" }}>
          <div style={{ textAlign: "center" }}> <h2 style={{ textAlign: "center" }}>Terms and Conditions</h2></div>
          {/* <p><b>1. Definitions</b></p>
        <p >In this Agreement, the following words and
expressions shall, unless inconsistent with or
otherwise indicated by the context, have the
following meanings and cognate expressions shall
have corresponding meanings; -</p>
    
    
        <p>

<b>‘Account’ </b>means the facility (invoice discounting)
account opened in our books and referred to in the
Client profile and credit limit Application.</p>
    
        <p style={{marginBottom: "20px"}}><b>‘Agreement’</b> means together the Client’s profile and
credit limit Application, facility offer and their Terms
and Conditions, all as maybe amended, substituted
or novated from time to time.
</p>
    
    
        <p><b>‘Application’</b> means the Client’s application to
create a profile on the InvoFin Platform and / or the
invoice discounting application.
</p>
    
        <p style={{marginBottom: "20px"}}> <b>‘Approved Buyer(s)’</b>means a company or entity
that is pre-approved by Kamro and which the Client
can supply good/services to and present a
corresponding invoice for financing.
</p>
    
    
        <p><b>‘Business Day’</b> means a day on which Kamro is
ordinarily open to effect the transactions
contemplated in these terms being weekdays from
Monday to Friday between 8.00am and 5.00pm and
on Saturday 9.00am to 12.00noon.
</p>
    
    
        <p style={{marginBottom: "20px"}}><b>‘Client’</b>, ‘you’ or ‘your’ means the applicant
together with the co-applicant (if any) named in the
Application and his or their personal representative
and heirs.
</p>
    
    
        <p><b>‘Commencement date’</b> means the date of
execution of this agreement or any other date as
shall be agreed upon by the parties hereto in the
agreement.
</p> */}

          <h3>1. Definitions</h3>
          <p>In this Agreement, the following words and expressions shall, unless inconsistent with or otherwise indicated by
            the context, have the following meanings and cognate expressions shall have corresponding meanings; -</p>
          <p><strong>'Account'</strong> means the facility (invoice discounting) account opened in our books and
            referred to in the Client profile and credit limit Application.</p>
          <p><strong>'Agreement'</strong> means together the Client's profile and credit limit Application,
            facility offer and their Terms and Conditions, all as maybe amended, substituted or novated from time to
            time.</p>
          <p>
            <strong>'Application'</strong> means the Client's application to create a profile on the
            InvoFin Platform and / or the invoice discounting application.
          </p>
          <p>
            <strong>'Approved Buyer(s)'</strong>means a company or entity that is pre-approved by Kamro and
            which the Client can supply good/services to and present a corresponding invoice for financing.
          </p>
          <p>
            <strong><em>'</em>Business Day'</strong> means a day on which Kamro is ordinarily open to effect the
            transactions contemplated in these terms being weekdays from Monday to Friday between 8.00am and 5.00pm and on
            Saturday 9.00am to 12.00noon. <em></em>
          </p>
          <p>
            <strong>'Client', 'you' or 'your'</strong> means the applicant together with
            the co-applicant (if any) named in the Application and his or their personal representative and heirs.
          </p>
          <p>
            '<strong>Commencement date'</strong> means the date of execution of this agreement or any other date
            as shall be agreed upon by the parties hereto in the agreement.</p>
          <p>
            <strong>'Conditions'</strong> means these general terms Conditions as varied from time to time by
            Kamro.
          </p>
          <p>
            <strong>'Debt'</strong> means any amounts due to the client from an approved buyer as invoiced by
            the client.
          </p>
          <p>
            <strong><em>'</em>Overdue' and/or 'past due'</strong>means any unpaid discount amount
            after the expiry of the finance tenor/period. <strong></strong>
          </p>
          <p>
            <strong>'Pricing'</strong> means the fee charged in correspondence with the financing tenor for
            financed invoices
          </p>
          <p>
            <strong>'Rebate' or 'Reimbursement amount'</strong> means the amount reimbursed to the
            client less the discount amount and related fees after Kamro has received payment from the approved buyer for
            the financed invoice.
          </p>
          <p>
            <strong>'Related Fees'</strong> means any amounts due associated with or arising from the
            transaction such as penalty fees.
          </p>
          <p><strong>'Repayment/Settlement Date'</strong> means the due date for payment of the discounted amount as
            prescribed in the finance tenor. Should the Repayment/Settlement date fall on a non-business day, then the next
            business day shall be applicable.</p>
          <p>
            <strong>'Guarantor'</strong> means a person who undertakes to pay, the amount owing in terms of this
            Agreement in the event of default by the Borrower.
          </p>
          <p>
            <strong>'Terms'</strong> means the terms and conditions contained in the Facility Offer and these
            Conditions.
          </p>
          <p>
            <strong>'Headings'</strong> &ndash; The headings herein are inserted for convenience of reference
            only and will not affect the construction or interpretation of this Agreement.
          </p>
          <p>
            <strong>'Counterparts'</strong> &ndash; This Agreement may be executed in any number of
            counterparts, each of which when so executed will be deemed to be an original and such counterparts together
            will constitute one and the same agreement.
          </p>
          <p>
            <strong>'Default/Penalty rate'</strong> means the rate charged over and above the applicable rate
            for exceeding the finance tenor/period for the financed invoices.
          </p>
          <p>
            <strong>'Discount fee'</strong> means the amount charged for discounting a financed invoice, which
            is deducted from the discount amount.
          </p>
          <p>
            <strong>'Discount fee rate'</strong> means the rate charged for financing an invoice as a percentage
            of the Discount Amount
          </p>
          <p>
            <strong>'Discount Percentage'</strong>means the approved percentage of the invoice that is to be financed
          </p>

          <p><strong>'Discount Amount'</strong> means the amount that is available to the client after applying
            the discount percentage to the financed invoice.
          </p>
          <p>
            <strong>'Early Repayment'</strong> means the full settlement or repayment of the discount amount
            before the expiry of the applied finance tenor. Only applicable to tenors beyond thirty (30) days.
          </p>
          <p>
            <strong>'Limit facility offer'</strong> means the offer by Kamro in writing to make available to the
            client the invoice discounting facility upon acceptance of the terms.
          </p>
          <p>
            <strong>'Finance Tenor/Period'</strong> means the duration for which the discount amount is utilized
            by the client, at the end of which the discount amount is supposed to be repaid<strong></strong>
          </p>
          <p>
            <strong>'Invoice'</strong> means the invoice to an approved buyer submitted by the client for
            financing/discounting and may include a financed invoice or replacement invoice
          </p>
          <p>
            <strong>'Kamro' 'we', 'us' or 'our'</strong> means KAMRO CAPITAL
            LTD and its successors and assignees.
          </p>
          <p>
            <strong>'Joint Obligations'</strong>– If more than one person constitutes the Client, the agreements of, and all
            obligations and covenants to be performed and observed by, the Client hereunder will be the joint and several
            obligations and covenants of each of the persons comprising the Client and any request or authorization given to
            Kamro by any of the persons comprising the Client will be deemed to be the joint and several requests or
            authorizations of each of the persons comprising the Client. If there is a Guarantor and more than one person
            constitutes the Guarantor the agreements of, and all obligations and covenants to be performed and observed by,
            the Guarantor hereunder will be the joint and several obligations and covenants of each of the persons
            comprising the Guarantor.
          </p>
          <p>
            <strong>'Entire Agreement'</strong><p>– If more than one person constitutes the Client, the agreements of, and all
              obligations and covenants to be performed and observed by, the Client hereunder will be the joint and several
              obligations and covenants of each of the persons comprising the Client and any request or authorization given to
              Kamro by any of the persons comprising the Client will be deemed to be the joint and several requests or
              authorizations of each of the persons comprising the Client. If there is a Guarantor and more than one person
              constitutes the Guarantor the agreements of, and all obligations and covenants to be performed and observed by,
              the Guarantor hereunder will be the joint and several obligations and covenants of each of the persons
              comprising the Guarantor.
            </p>

            <h3>2. Duration of this Agreement</h3>
            <p>2.1 This Agreement shall start on the Commencement Date and will continue until;</p>
            <ol type="i">
              <li>Terminated by either Kamro or the Client giving to the other not less than 30 days’ notice or</li>
              <li>Terminated by Kamro at any time after the occurrence of a Termination Event.</li>
            </ol>

            <h3>3. Invoice Discounting</h3>
            <p>3.1 Upon approval of the Client’s application by Kamro and execution of the facility offer, the Client shall
              after supplying to an approved buyer, furnish Kamro with an invoice addressed to the approved buyer but with
              Kamro’s account details as payee.</p>
            <p>3.2 Kamro shall then discount the invoice to a tune of between 50% - 85% and pay unto the client an amount
              (hereinafter referred to as ‘discount amount’) less the discount fee applicable which is retained by Kamro</p>
            <p>3.3 Upon payment of the invoice by the approved buyer, Kamro shall deduct the discount amount together with the
              discount fee (for replacement invoices) and any other fees and/or charges as may have accrued from this
              transaction and refund the balance or rebate to the Client.</p>

            <h3>4. Pricing</h3>
            <p>4.1 The Purchase price of each invoice shall be the fees recoverable upfront from the invoice discounting
              transaction whose rate shall vary at the specified rate per tenor or period.</p>
            <p>4.2 Kamro shall after approving the discount percentage, proceed to deduct and retain the discount fee at the
              rate applicable to the transaction and only pay unto the Client the outstanding amount of the discounted
              invoice.</p>

            <h3>5. Facility Limits</h3>
            <p>5.1 Kamro may, at its sole discretion, establish a facility Limit in relation to a client. In considering the
              establishment of a facility Limit, Kamro (or its Assignee) may investigate the financial status of the Client
              and the Client must provide Kamro with the information that Kamro requires. The Client shall not reveal to any
              person, including any of its customers, the existence, amount or condition of any facility Limit. If no facility
              Limit is established with respect to a Client, the facility Limit (as the case may be) shall be regarded as nil.
            </p>
            <p>5.2 The Client represents and warrants that the information provided by it under or in connection with this
              Agreement is complete, true and correct and the Client is not aware of any fact which has not been disclosed in
              writing to Kamro which might affect the completeness or accuracy of such information. Any facility Limit will
              only be valid for so long as such information remains unchanged. If the Client later becomes aware of any change
              to the information provided or the Client has knowledge of any negative or adverse information, financial
              difficulty or the threatened Insolvency of any approved buyer, the Client undertakes to immediately inform Kamro
              in writing.</p>

            <h3>6. Disputes</h3>
            <p>6.1 If any approved buyer raises a dispute in relation to a Debt owed or a Contract of Sale/supply, then:</p>
            <ol type="a">
              <li>the Client must promptly give full details to Kamro; and</li>
              <li>the Client must do their best to procure the settlement of such Dispute promptly; but</li>
              <li>Kamro may also settle or compromise (or require the Client to settle or compromise) the Dispute on such
                terms as Kamro may acting in good faith and in its reasonable discretion decide and the Client will be bound
                by such settlement or compromise.</li>
            </ol>

            <h3>7. Representations and Warranties</h3>
            <p>7.1 The Client represents and warrants to Kamro that: -</p>
            <ol type="a">
              <li>the Client has the legal capacity, powers and authority to execute and perform this Agreement, and the
                making and performance of this Agreement and the transactions contemplated hereby will not violate any
                provision of (a) any law, regulation, order or decree of any governmental authority, agency or court or (b)
                its constitution or (c) any agreement, contract, mortgage, charge, debenture or other undertaking to which
                the Client is a party nor might such making and performance with or without the passage of time or the
                giving of notice of other conditions, constitute any breach or event of default under any of the foregoing
                or result in the creation, imposition or enforceability of any security interest or encumbrance over any of
                its assets;</li>
              <li>prior to the execution of this Agreement, the Client has disclosed to Kamro every fact or matter known to
                the Client which the Client knew or ought to have known might influence Kamro in its decision whether or not
                to enter into this Agreement and, if so, as to the terms of this Agreement.</li>
              <li>this Agreement and transactions contemplated hereby constitute legal, valid and binding obligations of the
                Client in accordance with their terms under all applicable laws.</li>
              <li>each Invoice is valid, genuine, undisputed, sustainable and an enforceable obligation and an indebtedness of
                the approved buyer and represents an actual and bona fide sale and completed delivery of Goods or services
                made in the Client’s ordinary and regular course of business and in conformity with the description of the
                Client’s business, the terms of payment and other provisions stipulated in the relevant Contract of Sale
                and/or invoice (including without limitation the quality, quantity, shipment date, ports and transshipment
                and the like);</li>
              <li>each Contract of Sale is legal, valid and enforceable in all respects under all applicable laws and
                regulations and constitutes binding obligations on the approved buyer in accordance with its terms and the
                approved buyer is liable for the payment of the amount stated in each invoice in accordance with the terms.
              </li>
              <li>each Contract of Sale shall contain such standard terms and conditions as acceptable to Kamro, including the
                provisions specifying the nature and quantity of the Goods as well as terms of payment and the condition
                which reserves title and ownership of the relevant Goods to the Client pending payment of the purchase price
                of the Goods.</li>
              <li>the Client has not sold, encumbered, transferred or otherwise disposed of any Debt accruing from any invoice
                to any person other than Kamro and the Debt/invoice is free and clear of any encumbrance or any third-party
                rights or claims and Kamro's ownership in the Debt/invoiced amount is valid and perfected in all relevant
                jurisdictions without any Encumbrance or any third-party rights or claims;</li>
              <li>the Client has an unqualified right to assign and transfer to Kamro full ownership of each Debt/invoiced
                amount free from any Encumbrance or any third-party rights or claims, and such assignment or transfer is
                enforceable against the approved buyer and any other relevant third party and does not violate any
                applicable law and does not constitute a breach of the Client’s obligation under any agreement to which it
                is a party;</li>
              <li>ate and payment terms of the relevant Goods and if the Goods are services, the nature and terms of services
                rendered.</li>
              <li>each invoice is or will be issued by the Client within the Maximum Invoicing Period and each Debt is
                evidenced by a debt instrument or documents which together show that (i) the Goods have been ordered by the
                approved buyer, (ii) the sale of Goods has been invoiced, and (iii) the Goods have been duly Delivered to
                the approved buyer;</li>
              <li>the Client receives the purchase order(s) in respect of the Goods under each invoice directly from the
                approved buyer(s) and has duly and fully performed and discharged its obligations under the Contracts of
                Sale (including all such duties, forwarder's fees, storage and shipping charges and insurances and other
                expenses as are the responsibilities of the Client under the Contracts of Sale).</li>
              <li>each of the Client and the relevant approved buyer has duly complied with each Contract of Sale and is not
                in breach of its respective obligations thereunder or any applicable law or regulation.</li>
              <li>no payment has been received by the Client (or its agent) in respect of the invoice except for the payment
                already notified by the Client to Kamro in writing on or prior to the Notification of such invoice part
                payment to Kamro.</li>
              <li>no approved buyer is or will be a Client's Associate.</li>
              <li>all information supplied or to be supplied to Kamro in connection with this Agreement, each Contract of
                Sale, each invoice and each approved buyer is and will be true, accurate, timely and complete in all
                respects and the Client is not aware of any fact which has not been disclosed in writing to Kamro which
                might have a material effect on any such information and the Client is not aware of any event that may
                reasonably be expected to result in non-payment or delay in payment of the invoice;</li>
              <li>no Dispute has arisen, and no approved buyer has repudiated, rescinded, or claimed damages in respect of any
                Contract of Sale and no Debt is or will be the subject of any counterclaim, set-off or other equity, or is
                or will be subject to any credit, discount or allowance except as shown on the face of the relevant invoice;
              </li>
              <li>no Termination Event or prospective Termination Event has occurred.</li>
              <li>the Client will not, directly or indirectly, use any benefit derived from this Agreement to fund any
                activities or business of or with any Person, including an approved buyer, or in any country or territory,
                that is, or whose government is, the subject of Sanctions; or in any other manner that would result in a
                violation of Sanctions by any Person;</li>
              <li>the Client certifies its compliance in all material respects with foreign and domestic laws and regulations,
                including Sanctions, pertaining to each jurisdiction in which it operates and to each Debt.</li>
            </ol>
            <p>7.2 The Client also represents and warrants to Kamro that the foregoing representations and warranties in
              condition
              7.1 above will be true and accurate throughout the term of this Agreement with reference to the facts and
              circumstances subsisting from time to time.</p>

            <h3>8. Termination</h3>
            <p>8.1 Kamro shall have the right to terminate this Agreement immediately by notice to the Client at any time if any
              of the following Termination Events happens: -</p>
            <ol type="a">
              <li>the Client breaches any term of this Agreement.</li>
              <li>any of the representations or warranties given by the Client in this Agreement and/or any other agreement or
                document relating to the Debts is inaccurate or untrue.</li>
              <li>the Client becomes Insolvent.</li>
              <li>any person that has given Kamro a guarantee or indemnity in respect of the Client’s obligations under this
                Agreement becomes Insolvent or terminates that guarantee, indemnity or security;</li>
              <li>there is any change in the ownership, control, constitution or composition of the Client which Kamro, at its
                sole discretion, considers material.</li>
              <li>there is any adverse change in the overall financial condition or business performance of the Client which
                Kamro, at its sole discretion, considers material.</li>
              <li>the Client ceases or threatens to cease to carry on business.</li>
              <li>distress, execution or similar proceedings is or are levied against the Client.</li>
              <li>any provision of this Agreement and/or any other agreement or document executed by the Client relating to
                the Invoice(s) ceases to be in full force and effect or the Client contests or repudiates in any manner the
                validity or enforceability of any provision of this Agreement and/or any other agreement or document
                executed by the Client relating to the invoice(s) or denies that it has any or further liability or
                obligation under this Agreement and/or any other agreement or document executed by the Client relating to
                the invoice(s);
                any other event occurs, or circumstance arises which, in Kamro's sole opinion, is likely to adversely affect
                the Client’s ability to comply with its obligations under this Agreement.</li>
            </ol>

            <h3>9. Limitation on Liability</h3>
            <p>Kamro shall not be liable to the Client for any action taken or not taken by it unless directly caused by Kamro's
              gross negligence or willful misconduct.</p>

            <h3>10. Variation</h3>
            <p>Kamro may at any time, at its sole discretion, by notice to the Client unilaterally vary, amend or replace all or
              any of the terms of this Agreement, including without limitation, any facility Limit. Any such variation shall
              take effect from a date specified by Kamro in the notice, but no such variation under this condition will affect
              any Debts coming into existence and directly arising from Goods/services Delivered before the effective date of
              the notice of variation.</p>

            <h3>11. Client’s Instructions</h3>
            <p>11.1 Kamro is authorized to act on the instructions of the Authorized Person(s).</p>
            <p>11.2 Kamro may, at its discretion, accept instructions believed by it to have emanated from the Authorized
              Person(s) and, if it acts in good faith on such instructions, such instructions shall be binding on the Client
              and Kamro shall not be liable for doing so, whether or not the instructions were given by the Authorized
              Person(s) and Kamro shall not be under any duty to verify the identity of the person(s) giving those
              instructions.</p>
            <p>11.3 Kamro reserves the right to refuse to act on the instructions of the Client if, in its opinion, there are
              grounds for doing so</p>

            <h3>12. Indemnity</h3>
            <p>12.1 The Client shall indemnify Kamro (on a full indemnity basis) against all losses, liabilities, damages, costs
              and expenses which Kamro may incur in connection with this Agreement or as a consequence of any breach by the
              Client of any of its obligations under this Agreement.</p>
            <p>12.2 The Client will indemnify and keep indemnified Kamro (on a full indemnity basis) against any claim or
              counterclaim of whatsoever nature by an approved buyer in respect of or arising out of an invoice and all costs
              and expenses suffered or incurred by Kamro in connection with or arising out of any such claim, and the Client
              shall pay to Kamro, without any deduction whatsoever, the amount of all losses, damages, costs, charges and
              expenses so suffered or incurred by Kamro</p>
            <p>12.3 The Client shall pay to Kamro the amount of all costs, charges and expenses of whatsoever nature which may
              be incurred by Kamro or its Assignee or any other person in collecting or enforcing or attempting to collect or
              enforce the Invoice, or in performing any of the obligations assumed by the Client under this Agreement.</p>
            <p>12.4 The Client will indemnify Kamro for all losses, costs, damages, claims, actions, suits, demands and
              liabilities (together, the “Losses”) suffered or incurred by or brought against Kamro arising out of or relating
              to any Compliance Action, unless such Losses are solely and directly caused by the gross negligence or willful
              misconduct of Kamro.</p>

            <h3>13. Personal Guarantee.</h3>
            <p>13.1 Each Guarantor, jointly and severally (if more than one), absolutely and unconditionally guarantee the
              prompt payment to Kamro, including its successors and assignees, of any and all Obligations incurred by the
              Client pursuant to the Agreement (this "Personal Guarantee").</p>
            <p>13.2 Each Guarantor further agrees to repay the Obligations on demand, without requiring Kamro first to enforce
              payment against the client. This is a guarantee of payment and not of collection.</p>
            <p>13.3 This is an absolute, unconditional, primary, and continuing obligation and will remain in full force and
              effect until the first to occur of the following:(a) all of the Obligations have been indefeasibly paid in full,
              and Kamro has terminated this Personal Guaranty, or (b) 30 days after the date on which written notice of
              revocation is actually received and accepted by Kamro.</p>
            <p>13.4 No revocation will affect:</p>
            <ol type="i">
              <li>the then existing liabilities of the revoking Guarantor under this Personal Guaranty.</li>
              <li>Obligations created, contracted, assumed, acquired or incurred prior to the effective date of such
                revocation.</li>
              <li>Obligations created, contracted, assumed, acquired or incurred after the effective date of such revocation
                pursuant to any agreement entered into or commitment obtained prior to the effective date of such
                revocation; or</li>
              <li>any Obligations then or thereafter arising under the agreements or instruments then in effect and then
                evidencing the obligations.</li>
            </ol>
            <p>13.5 Each Guarantor represents and warrants that he/she/it is a legal resident of Uganda.</p>

            <h3>14. Collection of debts</h3>
            <p>14.1 Kamro shall have the exclusive right (but shall not be obliged) to collect and enforce payment of any Debt
              in such manner as it may decide. Kamro or the Assignee may, at the cost and expense of the Client, take such
              action as Kamro or the Assignee thinks fit to enforce its rights in any Debt. Upon request of Kamro or the
              Assignee, the Client shall also, at the Client’s own cost and expense, take such action as Kamro or the Assignee
              requires for collection of any Debt including without limitation employing or nominating any third-party agent
              to collect payment of any Debt or to carry out debt collection activities. The Client undertakes to ensure that
              the approved buyer(s) will pay all their Debts to Kamro or as Kamro may direct.</p>

            <h3>15. Governing law and jurisdiction</h3>
            <p>
              This agreement shall be governed by and construed in accordance with Ugandan law and it is hereby irrevocably agreed
              for the exclusive benefit of Kamro that the Courts of Uganda are to have jurisdiction to settle any disputes which
              may arise out of or in connection with this agreement and that nothing in this clause shall limit Kamro’s right to
              take proceedings against the Client in any other Court of competent jurisdiction or Arbitrator, nor shall the taking
              or proceedings in one or more jurisdictions preclude the taking of proceedings in any other jurisdiction, whether
              concurrently or not.
            </p>
          </p>
          <div></div>

          <div className="form-check custom-checkbox mb-3 checkbox-success">
            <input
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



          </div>
          <button style={{ width: "auto" }} className="btn btn-success" onClick={() => setPostModal(false)} >
            Save & Continue

          </button>
        </div>


      </Modal>

      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-lg-4 mb-2">
          <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> First Name</label>
          <div className="contact-name">
            <input type="text" className="form-control" autoComplete="off"
              value={addFormData.fname}
              name="fname" required="required"
              onChange={handleAddFormChange}
              placeholder="First Name"
            />
            <span className="validation-text"></span>
          </div>

        </div>
        <div className="col-lg-4 mb-2">
          <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Surname</label>
          <div className="contact-name">
            <input type="text"
              value={addFormData.lname}
              className="form-control" autoComplete="off"
              name="lname" required="required"
              onChange={handleAddFormChange}
              placeholder="Surname"
            />
            <span className="validation-text"></span>
          </div>
        </div>
        <div className="col-lg-4 mb-2">
          <div className="form-group mb-3">
            <label className="text-black font-w500">Other Name</label>
            <div className="contact-name">
              <input type="text"
                value={addFormData.oname}
                className="form-control" autoComplete="off"
                name="oname" required="required"
                onChange={handleAddFormChange}
                placeholder="Other Name"
              />
              <span className="validation-text"></span>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-2">
          <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Gender</label>
          <div className="contact-name">
            <div className="form-group mb-0">
              <label className="radio-inline me-3">
                <input required="required"
                  checked={addFormData.gender === "male"}
                  value="male" onChange={handleAddFormChange} type="radio" name="gender" /> Male
              </label>
              <label className="radio-inline me-3">
                <input required="required"
                  checked={addFormData.gender === "female"}
                  value="female" onChange={handleAddFormChange} type="radio" name="gender" /> Female
              </label>
            </div>
          </div>
        </div>




        <div className="col-xl-4 col-xxl-4">

          <div className="form-group mb-3">
            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> National Identification No. (NIN) / Passport No</label>
            <div className="contact-name">
              <div className="form-group mb-0">
                <input
                  value={addFormData.nid}
                  type="text" className="form-control" autoComplete="off"
                  name="nid" required="required"
                  onChange={handleAddFormChange}
                  placeholder="ID No."
                />
              </div>
            </div>
          </div>
        </div>



        <div className="col-xl-4 col-xxl-4">
          <label><b style={{ color: "red" }}>*</b> Picture of ID / Passport</label>
          <FilePond

            acceptedFileTypes={['image/png', '.jpg','image/jpeg']}

          allowMultiple={false}
          maxFileSize={'2MB'}
// </GridItem>server=
        labelIdle="Drag &amp; Drop  ID / Passport Picture Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
      server={
        {
          process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", fieldName);
            formData.append("type", 6);
            uploadMultipleFilesNew(formData)
              .then((response) => {

                // setFileId(response.id)

                const newFormData = { ...addFormData };
                newFormData['idId'] = response.id;
                setAddFormData(newFormData);


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
            const newFormData = { ...addFormData };
            newFormData['idId'] = null;
            setAddFormData(newFormData);
            load();
          }
        }
      }></FilePond>
                      </div >

                      <div className="col-lg-4 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Highest Level Of Education</label>
                            <div className="form-group mb-3">

                              <select
                                value={addFormData.levelOfEducation}
                                // defaultValue={"Single"}
                                name="levelOfEducation"
                                onChange={handleAddFormChange}
                                className="form-control"
                              >
                                <option disabled value="">Select Level Of Education</option>

                                {levels.map(data => {
                                  return <option value={data.value}>{data.value}</option>;
                                })}


                              </select>
                            </div>
                          </div>
                        </div><div className="col-lg-4 mb-2">
                            <div className="form-group mb-3">
                              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Marital Status</label>
                              <div className="form-group mb-3">

                                <select
                                  value={addFormData.marital}
                                  defaultValue={"Single"}
                                  name="marital"
                                  onChange={handleAddFormChange}
                                  className="form-control"
                                >
                                  <option value="Single">Single</option>
                                  <option value="Married">Married</option>
                                  <option value="Divorced">Divorced</option>
                                </select>
                              </div>
                            </div>
                          </div><div className="col-lg-4 mb-2">
                            <div className="form-group mb-3">
                              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Date Of Birth</label>
                              <div className="contact-name">
                                <div className="form-group mb-0">
                                  <DatePicker dateFormat='yyyy-MM-dd' className="form-control"
                                    renderCustomHeader={({
                                      date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled,
                                    }) => (
                                      <div
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
                                          onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
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

                                    placeholder="D.O.B"
                                    name="dob"
                                    selected={addFormData.dob}
                                    //value={new Date()}
                                    onChange={handleDateChange} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="form-group mb-3">
                              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> No. Of Dependants</label>
                              <div className="contact-name">
                                <input type="number"
                                  min="0"
                                  // onKeyPress={preventMinus}
                                  onKeyPress={(e) => {
                                    if (e.code === 'Minus') {
                                      e.preventDefault();
                                    }
                                  } }
                                  value={addFormData.depend}
                                  className="form-control" autoComplete="off"
                                  name="depend" required="required"
                                  onChange={handleAddFormChange}
                                  placeholder="No. Of Dependants" />
                                <span className="validation-text"></span>
                              </div>
                            </div>
                          </div><div className={addFormData?.type?.toString().toLowerCase().includes("other") ? "col-lg-4 mb-2" : "col-lg-4 mb-2"}>
                            <div className="form-group mb-3">
                              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Type Of Business</label>
                              <div className="form-group mb-3">

                                <select

                                  value={addFormData.type}
                                  defaultValue={""}
                                  style={{ color: addFormData.type === "" ? "#00aff0" : "black" }}
                                  name="type"
                                  onChange={handleAddFormChange}
                                  className="form-control"
                                >
                                  <option disabled value="">Select Type</option>
                                  <option value="Individual">Individual</option>
                                  <option value="Sole Proprietor">Sole Proprietor</option>
                                  <option value="Limited Liability Company">Limited Liability Company</option>
                                  <option value="Partnership">Partnership</option>
                                  <option value="Group / Cooperatives">Group / Coparatives</option>
                                  <option value="Other (Specify)">Other (Specify)</option>
                                  {/* <option value="Trade & Commerce">Trade & Commerce</option>
    <option value="Transport & Communication">Transport & Communication</option>
    <option value="Industry/Manufacturing">Industry/Manufacturing</option>
    <option value="Services">Services</option>
    <option value="Real Estate">Real Estate</option>
    <option value="Other (Specify)">Other (Specify)</option> */}
                                </select>
                              </div>
                            </div>
                          </div>


{
  addFormData?.type?.toString().toLowerCase().includes("other") ?
    <div className="col-lg-4 mb-2">
      <div className="form-group mb-3">
        <label className="text-black font-w500">Other Type</label>
        <div className="contact-name">
          <input type="text"
            value={addFormData.otype}
            className="form-control" autoComplete="off"
            name="otype" required="required"
            onChange={handleAddFormChange}
            placeholder="Other Type"
          />
          <span className="validation-text"></span>
        </div>
      </div>
    </div> : null
}


<div className="col-lg-4 mb-2">
                            <div className="form-group mb-3">
                              <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Years in Bussiness</label>
                              <div className="contact-name">
                                <input type="number"
                                  min="0"
                                  // onKeyPress={preventMinus}
                                  onKeyPress={(e) => {
                                    if (e.code === 'Minus') {
                                      e.preventDefault();
                                    }
                                  } }
                                  value={addFormData.yearsInBussiness}
                                  className="form-control" autoComplete="off"
                                  name="yearsInBussiness" required="required"
                                  onChange={handleAddFormChange}
                                  placeholder="Years in Bussiness" />
                                <span className="validation-text"></span>
                              </div>
                            </div>
                          </div>

<div className="col-lg-4 mb-2">
          <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Employement Type</label>
          <div className="contact-name">
            <input type="text"
              value={addFormData.empType}
              className="form-control" autoComplete="off"
              name="empType" required="required"
              onChange={handleAddFormChange}
              placeholder="Employement type"
            />
            <span className="validation-text"></span>
          </div>
        </div>


            <div className="col-lg-4 mb-4">
  <div className="form-group mb-3">
    <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Country</label>
    <div className="contact-name">
      <Select
        value={addFormData.country === "" ? "" : { value: addFormData.country, label: addFormData.country }}
        onChange={(val) => {
          const newFormData = { ...addFormData };
          newFormData.country = val.value;
          setAddFormData(newFormData);
        } }
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
        options={country} />

    </div>
  </div>
</div><div className="col-lg-4 mb-4">
    <div className="form-group mb-3">
      <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> District</label>
      <div className="contact-name">
        <Select
          value={addFormData.districtId === null ? "" : { value: addFormData.districtId, label: disName }}
          onChange={(val) => {
            const newFormData = { ...addFormData };
            newFormData.districtId = val.value;
            setAddFormData(newFormData);
            setDisName(val.label);
          } }
          styles={customStyles}
          placeholder="Search & Select District"
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
          options={allDis} />

      </div>
    </div>
  </div><div className="col-xl-4 col-xxl-4">
    <div className="form-group mb-3">
      <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Nationality</label>
      <div className="contact-name">
        <Select
          value={addFormData.nationality === "" ? "" : { value: addFormData.nationality, label: addFormData.nationality }}
          onChange={(val) => {
            const newFormData = { ...addFormData };
            newFormData.nationality = val.value;
            setAddFormData(newFormData);
          } }
          styles={customStyles}
          placeholder="Search & Select Nationality"
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
          options={options} />

        {/* <input type="text"  className="form-control"  autoComplete="off"
        name="nationality"
        value={addFormData.nationality}
        onChange={handleAddFormChange}
        placeholder="Nationality"
    /> */}
        <span className="validation-text"></span>
      </div>
    </div>
  </div><div className="col-lg-4 mb-2">
    <div className="form-group mb-3">
      <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> City</label>
      <div className="contact-name">
        <input type="text" className="form-control"
          value={addFormData.city}
          autoComplete="off"
          name="city" required="required"
          onChange={handleAddFormChange}
          placeholder="City" />
        <span className="validation-text"></span>
      </div>
    </div>
  </div><div className="col-lg-4 mb-2">
    <div className="form-group mb-3">
      <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Town</label>
      <div className="contact-name">
        <input type="text" className="form-control" autoComplete="off"
          name="town"
          value={addFormData.town}
          onChange={handleAddFormChange}
          placeholder="Town" />
        <span className="validation-text"></span>
      </div>
    </div>
  </div><div className="col-lg-6 mb-2">
    <div className="form-group mb-3">
      <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Street Address / Village</label>
      <div className="contact-name">
        <input type="text" className="form-control" autoComplete="off"
          name="street"
          value={addFormData.street}
          onChange={handleAddFormChange}
          placeholder="Street Address / Village" />
        <span className="validation-text"></span>
      </div>
    </div>
  </div><div className="col-lg-6 mb-2">
    <div className="form-group mb-3">
      <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Email</label>
      <div className="contact-name">
        <input type="email"
          style={{ color: verifyEmail(addFormData.email) ? "black" : "red" }}
          value={addFormData.email}
          className="form-control" autoComplete="off"
          name="email" required="required"
          onChange={handleAddFormChange}
          placeholder="Email" />
        <span className="validation-text"></span>
      </div>
    </div>
  </div>


{/* <div className="col-lg-4 mb-2">
                                 <div className="form-group mb-3">
												<label className="text-black font-w500">Alternative Email</label>
												<div className="contact-name">
													<input type="text"
													value={addFormData.aemail}
													className="form-control"  autoComplete="off"
														name="aemail" required="required"
                                                        onChange={handleAddFormChange}
														placeholder="Alternative Email"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                 </div> */}

<div className="row" style={{ textAlign: "left" }}>
  <div className="col-xl-4 col-xxl-4" style={{ textAlign: "left" }}>
    <div className="form-group mb-3" style={{ textAlign: "left" }}>
      <label className="text-black font-w500" style={{ textAlign: "left" }}><b style={{ color: "red" }}>*</b> Country Code</label>
      <div className="form-group mb-3">

        {/* <select
					value={addFormData.code}
					name="code"
					onChange={handleAddFormChange}
                      defaultValue={"+256"}
                      className="form-control"
                    >
                     {codes}
                    </select> */}

        <Select
          value={
            addFormData.code === "" ? "" : { value: addFormData.code, label: addFormData.code }
          }
          onChange={(val) => {
            const newFormData = { ...addFormData };
            newFormData.code = val.value;
            setAddFormData(newFormData);
          }}
          styles={customStyles}
          placeholder="Search & Select Country Code"
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
          options={codes}
        />

      </div>
    </div>
  </div>

  <div className="col-xl-8 col-xxl-8">

    <div className="form-group mb-3">
      <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Phone Number</label>
      <div className="contact-name">
        <div className="form-group mb-0">
          <input type="number"
            value={addFormData.number}
            className="form-control" autoComplete="off"
            name="number" required="required"
            onChange={handleAddFormChange}
            placeholder="Phone No."
          />
        </div>
      </div>
    </div>
  </div>
</div>

{
  jstEdit ? null :
    <div className="col-lg-8 mb-2">
      <div className="form-group mb-3">
        <label >
          <p className="text-black font-w500">  <b style={{ color: "red" }}>*</b> Create Password</p>
          <div style={{ fontSize: 12, color: "black" }}>👉 Must be a minimum of eight (8) characters</div>
          <div style={{ fontSize: 12, color: "black" }}>👉 Must not be adictionary word or proper name</div>
          <div style={{ fontSize: 12, color: "black" }}>👉 Must contain one special character (@#$%*&+=) , one numeric, one small case and one upper case</div>
        </label>
        <div className="contact-name">
          <input type="password" className="form-control"
            value={addFormData.password}
            autoComplete="off"
            name="password" required="required"
            onChange={handleAddFormChange}
            placeholder="Password"
          />
          <span className="validation-text"></span>
        </div>
      </div>
    </div>
}

{
  jstEdit ? null :
    <div className="col-lg-4 mb-4 pt-4">
      <div className="form-group pt-4 mt-4">
        <label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Confirm Password </label>
        <div className="contact-name">
          <input type="password" className="form-control"
            value={addFormData.cpassword}
            autoComplete="off"
            name="cpassword" required="required"
            onChange={handleAddFormChange}
            placeholder="Confirm Password"
          />
          <span className="validation-text"></span>
        </div>
      </div>
    </div>
}




<div className="col-lg-4 mb-2">
  <label className="text-black font-w500"> <b style={{ color: "red" }}>*</b> Are you a director (company) / Executive (cooperative) ?</label>
  <div className="contact-name">
    <div className="form-group mb-0">
      <label className="radio-inline me-3">
        <input required="required"
          checked={addFormData.director === "yes"}
          value="yes" onChange={handleAddFormChange} type="radio" name="director" /> Yes
      </label>
      <label className="radio-inline me-3">
        <input required="required"
          checked={addFormData.director === "no"}
          value="no" onChange={handleAddFormChange} type="radio" name="director" /> No
      </label>
    </div>
  </div>
</div>


{
  jstEdit ? null :
    <div className="col-lg-4 mb-2" style={{ textAlign: "left" }}>
      <b style={{ color: "red" }}>*</b>
      <button style={{ width: "auto" }} className="btn btn-primary" onClick={() => setPostModal(true)} >
        Open terms & conditions

      </button>
    </div>
}
<div className="col-lg-12 mb-12" style={{ textAlign: "left", marginTop: "30px" }}>
  {isLoading ?
    <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
    <button style={{ width: "auto" }} className="btn btn-success" onClick={(e) => { handleAddFormSubmit(e) }} >
      Save & Continue

    </button>}
</div>
         </div >
      </section >
   );
};

export default StepOne;
