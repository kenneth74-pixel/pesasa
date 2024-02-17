import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from './../constants';

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
};


const request2 = (options, bearer) => {
  const headers = new Headers({
    // 'Content-Type': 'application/json'
  })

 
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer '+localStorage.getItem(ACCESS_TOKEN))
}


  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
  .then(response =>
    response.json().then(json => {
      if(!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};


export function uploadFiles(data, tokem) {

  data.append('sectionDocumentOwner', 5);

  return request2({
      url: API_BASE_URL + "/document/uploadMultipleFilesNew",
      method: 'POST',
      body: data
  }, tokem);
}


export function uploadMultipleFilesNew(data, tokem) {

  data.append('sectionDocumentOwner', 5);

  return request2({
      url: API_BASE_URL + "/auth/uploadMultipleFilesNew",
      method: 'POST',
      body: data
  }, tokem);
}





export function login(loginRequest) {
  //alert(JSON.stringify(loginRequest))
  // alert(loginRequest.usernameOrEmail.value)
  // if(loginRequest.usernameOrEmail.value===undefined){
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}


export function sendPasswordCode(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/sendPasswordCode",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}


export function resetPassword(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/resetPassword",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}





export function addClient(loginRequest) {
  //alert(JSON.stringify(loginRequest))
  // alert(loginRequest.usernameOrEmail.value)
  // if(loginRequest.usernameOrEmail.value===undefined){
  return request({
    url: API_BASE_URL + "/auth/addClient",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}


export function getClientPhoneEmail(loginRequest) {
  //alert(JSON.stringify(loginRequest))
  // alert(loginRequest.usernameOrEmail.value)
  // if(loginRequest.usernameOrEmail.value===undefined){
  return request({
    url: API_BASE_URL + "/auth/getClientPhoneEmail",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}




export function addFile(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/addFile",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function verifyClientFacilityAdmin(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/verifyClientFacilityAdmin",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}
export function getClientFacilityAdmin(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/getClientFacilityAdmin",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}
export function getClientFacilityClient(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/getClientFacilityClient",
    method: 'GET'
  });
}
export function addClientFacilityClient(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/addClientFacilityClient",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}
export function addClientFacilityAdmin(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/addClientFacilityAdmin",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function uploadClientsData(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadClientsData",
    method: 'POST',
    body: loginRequest
  });
}

export function uploadNothernDistricts(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadNothernDistricts",
    method: 'POST',
    body: loginRequest
  });
}



export function uploadEasternDistricts(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadEasternDistricts",
    method: 'POST',
    body: loginRequest
  });
}


export function uploadWesternDistricts(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadWesternDistricts",
    method: 'POST',
    body: loginRequest
  });
}



export function uploadCentralDistricts(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadCentralDistricts",
    method: 'POST',
    body: loginRequest
  });
}



export function uploadApplicationInvoiceDiscount(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadApplicationInvoiceDiscount",
    method: 'POST',
    body: loginRequest
  });
}


export function uploadDisbursements(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadDisbursements",
    method: 'POST',
    body: loginRequest
  });
}

export function uploadCollections(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadCollections",
    method: 'POST',
    body: loginRequest
  });
}



export function uploadBuyersData(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadBuyersData",
    method: 'POST',
    body: loginRequest
  });
}




export function uploadMoreClientsData(loginRequest) {
  return request2({
    url: API_BASE_URL + "/document/uploadMoreClientsData",
    method: 'POST',
    body: loginRequest
  });
}




export function adminAddBuyer(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/adminAddBuyer",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}


export function clientAddExixtingBuyer(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/clientAddExixtingBuyer",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}




export function clientAddBuyer(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/clientAddBuyer",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}


export function deleteClientBuyer(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/deleteClientBuyer",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}

export function addClientCreditLimit(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/addClientCreditLimit",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}


export function getClientDetail(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/getClientDetail",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function addBanks(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/addBanks",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function addMoneyRates(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/addMoneyRates",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function deleteMoneyRates(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/deleteMoneyRates",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function deleteReqFiles(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/deleteReqFiles",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function addReqFiles(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/addReqFiles",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}



export function verifyProcess(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/verifyProcess",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function deleteBank(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/deleteBank",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}




export function getProcessComments(loginRequest) {
  return request({
    url: API_BASE_URL + "/document/getProcessComments",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function getFiguresByDaysBack(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryApplicationsByDaysFig",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function getSummaryPaymentsByDaysFig(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryPaymentsByDaysFig",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function getSummaryCollectionsByDaysFig(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryCollectionsByDaysFig",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function getPorifolioByDateRange(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getPorifolioByDateRange",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}





export function getSummaryPaymentsByYearOrMonth(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryPaymentsByYearOrMonth",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function getSummaryCollectionsByYearOrMonth(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryCollectionsByYearOrMonth",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}



export function addApplicationInvoiceDiscount(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/addApplicationInvoiceDiscount",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function updateApplicationInvoiceDiscountAdmin(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/updateApplicationInvoiceDiscountAdmin",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}



export function verifyProcessApplication(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/verifyProcess",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function updateConc(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/updateConc",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}



export function reimburse(loginRequest) {
  console.log("tusibbude", loginRequest)
  return request({
    url: API_BASE_URL + "/invoicediscounting/reimburse",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function collect(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/collect",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function addAppComment(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/addAppComment",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function addBankCharge(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/addBankCharge",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function getSummaryApplicationsByYearOrMonth(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryApplicationsByYearOrMonth",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function getSummaryApplicationsByDateRange(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryApplicationsByDateRange",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function getSummaryClients() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getClientSummary",
    method: 'GET'
  });
}



export function getSummaryPaymentsByDateRange(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryPaymentsByDateRange",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function getSummaryCollectionsByDateRange(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryCollectionsByDateRange",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function getSummaryApplicationsUpdatedByDateRange(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryApplicationsUpdatedByDateRange",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}






export function getSummaryPaymentsForWholeYear(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryPaymentsForWholeYear",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function getSummaryCollectionsForWholeYear(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryCollectionsForWholeYear",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}





export function getSummaryApplicationsForWholeYear(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryApplicationsForWholeYear",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function getAllClientApplicationsSeparated(loginRequest) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getAllClientApplicationsSeparated",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}




export function getMyClientApplications() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getMyClientApplications",
    method: 'GET'
  });
}

export function getAllClientApplications() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getAllClientApplications",
    method: 'GET'
  });
}

export function updateClientBuyers() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/updateClientBuyers",
    method: 'GET'
  });
}




export function getAllClientApplicationsReport() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getAllClientApplicationsReport",
    method: 'GET'
  });
}



export function getApprovedClientApplications(data) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getApprovedClientApplications",
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function getReimbursesMapping(data) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getReimbursesMapping",
    method: 'POST',
    body: JSON.stringify(data)
  });
}


export function getCollectionsMapping(data) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getCollectionsMapping",
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function deleteCollection(data) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/deleteCollection",
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function deleteDisbursement(data) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/deleteDisbursement",
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function getReimbursedClientApplications(data) {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getReimbursedClientApplications",
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function getSummaryApplications() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryApplications",
    method: 'GET'
  });
}


export function getSummaryPayments() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryPayments",
    method: 'GET'
  });
}

export function getSummaryCollections() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getSummaryCollections",
    method: 'GET'
  });
}





export function clientGetCreditLimit() {
  return request({
    url: API_BASE_URL + "/document/clientGetCreditLimit",
    method: 'GET'
  });
}

export function isLimitApproved() {
  return request({
    url: API_BASE_URL + "/document/isLimitApproved",
    method: 'GET'
  });
}


export function getBanks() {
  return request({
    url: API_BASE_URL + "/document/getBanks",
    method: 'GET'
  });
}

export function getRegions() {
  return request({
    url: API_BASE_URL + "/reports/getRegions",
    method: 'GET'
  });
}

export function getUngroupedDistricts() {
  return request({
    url: API_BASE_URL + "/reports/getUngroupedDistricts",
    method: 'GET'
  });
}


export function addDistrictToRegion(data) {
  return request({
    url: API_BASE_URL + "/reports/addDistrictToRegion",
    method: 'POST',
    body: JSON.stringify(data)
  });
}






export function getAllDistricts() {
  return request({
    url: API_BASE_URL + "/auth/getAllDistricts",
    method: 'GET'
  });
}

export function getLevelsOfEducation() {
  return request({
    url: API_BASE_URL + "/auth/getLevelsOfEducation",
    method: 'GET'
  });
}



export function getAllClients() {
  return request({
    url: API_BASE_URL + "/document/getAllClients",
    method: 'GET'
  });
}


export function getReqFiles() {
  return request({
    url: API_BASE_URL + "/document/getReqFiles",
    method: 'GET'
  });
}

export function getMoneyRates() {
  return request({
    url: API_BASE_URL + "/document/getMoneyRates",
    method: 'GET'
  });
}





export function addExchangeRate(data) {
  return request({
    url: API_BASE_URL + "/document/addExchangeRate",
    method: 'POST',
    body: JSON.stringify(data)
  });
}


export function getExchangeRates(data) {
  return request({
    url: API_BASE_URL + "/document/getExchangeRates",
    method: 'POST',
    body: JSON.stringify(data)
  });
}


export function deleteExchangeRate(data) {
  return request({
    url: API_BASE_URL + "/document/deleteExchangeRate",
    method: 'POST',
    body: JSON.stringify(data)
  });
}





export function clientGetBuyers() {
  return request({
    url: API_BASE_URL + "/document/clientGetBuyers",
    method: 'GET'
  });
}


export function adminGetBuyers() {
  return request({
    url: API_BASE_URL + "/document/adminGetBuyers",
    method: 'GET'
  });
}


export function getBuyersSummary() {
  return request({
    url: API_BASE_URL + "/invoicediscounting/getBuyersSummary",
    method: 'GET'
  });
}






export function clientGetClientBuyers() {
  return request({
    url: API_BASE_URL + "/document/clientGetClientBuyers",
    method: 'GET'
  });
}


export function getUserFiles() {
  return request({
    url: API_BASE_URL + "/document/getUserFiles",
    method: 'GET'
  });
}

export function getClientBussiness() {
  return request({
    url: API_BASE_URL + "/document/getClientBussiness",
    method: 'GET'
  });
  //}
}

export function clientGetApprovedClientBuyers() {
  return request({
    url: API_BASE_URL + "/document/clientGetApprovedClientBuyers",
    method: 'GET'
  });
  //}
}



export function getClientBussinessAuth(loginRequest) {
  //alert(JSON.stringify(loginRequest))
  // alert(loginRequest.usernameOrEmail.value)
  // if(loginRequest.usernameOrEmail.value===undefined){
  return request({
    url: API_BASE_URL + "/auth/getClientBussinessAuth",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}




export function addClientBussiness(loginRequest) {
  //alert(JSON.stringify(loginRequest))
  // alert(loginRequest.usernameOrEmail.value)
  // if(loginRequest.usernameOrEmail.value===undefined){
  return request({
    url: API_BASE_URL + "/auth/addClientBussiness",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}



export function getClientBussinessAuthTwo(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/getClientBussinessAuthTwo",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}




export function verifyCode(loginRequest) {
  //alert(JSON.stringify(loginRequest))
  // alert(loginRequest.usernameOrEmail.value)
  // if(loginRequest.usernameOrEmail.value===undefined){
  return request({
    url: API_BASE_URL + "/auth/verifyCode",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
  //}
}



export function getVerification(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/getVerification",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function resendCodes(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/resendCodes",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}




export function addClientDirector(loginRequest) {
  return request({
    url: API_BASE_URL + "/addClientDirector",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}



export function addDirector(loginRequest) {
  return request({
    url: API_BASE_URL + "/addDirector",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function deleteDirector(loginRequest) {
  return request({
    url: API_BASE_URL + "/deleteDirector",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}


export function deleteClientDirector(loginRequest) {
  return request({
    url: API_BASE_URL + "/deleteClientDirector",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}



export function resetPasswordDirector(loginRequest) {
  return request({
    url: API_BASE_URL + "/resetPasswordDirector",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function changePasswordUser(loginRequest) {
  return request({
    url: API_BASE_URL + "/changePasswordUser",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}



export function getDirectors() {
  return request({
    url: API_BASE_URL + "/getDirectors",
    method: 'GET'
  });
}


export function getClientDirectors() {
  return request({
    url: API_BASE_URL + "/getClientDirectors",
    method: 'GET'
  });
}



export function getDirectorInfo() {
  return request({
    url: API_BASE_URL + "/getDirectorInfo",
    method: 'GET'
  });
}


export function getClientInfo() {
  return request({
    url: API_BASE_URL + "/getClientInfo",
    method: 'GET'
  });
}




export function sendSignature(dataRequest) {
  return request({
    // url: "https://mis-former.ucu.ac.ug:8443/mis-solution/api/auth/addSignature",
    url: API_BASE_URL + "/auth/addSignature",
    method: 'POST',
    body: JSON.stringify(dataRequest)
  });
}

export function partialsignup(signRequest) {
  return request({
    url: API_BASE_URL + "/auth/prospectiveapplicantaccount",
    method: 'POST',
    body: JSON.stringify(signRequest)
  });
}

export function partialsignupstaff(signRequest) {
  return request({
    url: API_BASE_URL + "/auth/prospectiveapplicantaccountstaff",
    method: 'POST',
    body: JSON.stringify(signRequest)
  });
}

export function sponsorsignup(signRequest) {
  return request({
    url: API_BASE_URL + "/auth/sponsorsignup",
    method: 'POST',
    body: JSON.stringify(signRequest)
  });
}


export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: 'POST',
    body: JSON.stringify(signupRequest)
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
    method: 'GET'
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: 'GET'
  });
}

export function sendSponsorLink(dataToSend) {
  //const url =API_BASE_URL + "/sendSponsorLink/" + data+"alphaSplit"+email;
  //alert(url)
  return request({
    url: API_BASE_URL + "/sendSponsorLink",
    method: 'POST',
    body: JSON.stringify(dataToSend)
  });
}

export function getStudentInfo() {
  return request({
    url: API_BASE_URL + "/user/student",
    method: 'GET'
  });
}


export function getStudentInfoExt(studentId) {
  return request({
    url: API_BASE_URL + "/user/staffgetStu/" + studentId,
    method: 'GET'
  });
}


export function getStudentsInfo() {
  return request({
    url: API_BASE_URL + "/user/studentsSponsoredInfo",
    method: 'GET'
  });
}

export function getCheckedEmailAndStudent(email, student) {
  return request({
    url: API_BASE_URL + "/auth/sponsor/getCheckedEmailAndStudent/" + email + "plusAlpha" + student,
    method: 'GET'
  });
}


export function getStaffInfo() {
  return request({
    url: API_BASE_URL + "/user/staff",
    method: 'GET'
  });
}

export function getSemInfo() {
  return request({
    url: API_BASE_URL + "/acd/semester",
    method: 'GET'
  });
}


export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: API_BASE_URL + "/user/me",
    method: 'GET'
  });
}

export function getCurrentUserPermissions() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: API_BASE_URL + "/user/permissions/me",
    method: 'GET'
  });
}


export function getUserAlphaVersion() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: API_BASE_URL + "/user/getuseralphaversion",
    method: 'GET'
  });
}



export function upDateLastLoggedInDate() {
  return request({
    url: API_BASE_URL + "/user/updatelogdate",
    method: 'GET'
  });
}

export function getUserProfile(username) {
  return request({
    url: API_BASE_URL + "/users/" + username,
    method: 'GET'
  });
}

export function listOfStaff(usertype) {
  return request({
    url: API_BASE_URL + "/user/getAllUesrs/" + usertype,
    method: 'GET'
  });
}

export function getUserType() {
  return request({
    url: API_BASE_URL + "/user/getUserType",
    method: 'GET'
  });
}

export function getUserAccountStatus() {
  return request({
    url: API_BASE_URL + "/user/getuseraccountstatus",
    method: 'GET'
  });
}

export function getStudentStatus() {
  return request({
    url: API_BASE_URL + "/user/getstudentstatus",
    method: 'GET'
  });
}


export function getSystemUsers(Request) {
  return request({
    url: API_BASE_URL + "/user/getsystemusers",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function getSearchedSystemUsers(Request) {
  return request({
    url: API_BASE_URL + "/user/getsearchedsystemusers",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function getSearchedSystemStudents(Request) {
  return request({
    url: API_BASE_URL + "/user/getsearchedsystemstudents",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function getSystemStaffUsers(Request) {
  return request({
    url: API_BASE_URL + "/user/getsystemstaffusers",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function getSystemJobApplicantUsers(Request) {
  return request({
    url: API_BASE_URL + "/user/getsystemjobapplicantusers",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function getSearchedSystemStudentApplicants(Request) {
  return request({
    url: API_BASE_URL + "/user/getsearchedsystemstudentapplicants",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function getSystemStudentUsers(Request) {
  return request({
    url: API_BASE_URL + "/user/getsystemstudentusers",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}


export function getSystemStudentApplicantUsers(Request) {
  return request({
    url: API_BASE_URL + "/user/getsystemstudentapplicantusers",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function getSystemUsersSummary(Request) {
  return request({
    url: API_BASE_URL + "/user/getsystemuserssummary",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function createUserLDAPAccount(Request) {
  return request({
    url: API_BASE_URL + "/general/ldap/createLdapEntry",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function notifyUserLDAPDetails(Request) {
  return request({
    url: API_BASE_URL + "/general/ldap/notifyuserwithldapcredentials",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function notifyApplicantLDAPDetails(Request) {
  return request({
    url: API_BASE_URL + "/general/ldap/notifyapplicantwithusercredentials",
    method: 'POST',
    body: JSON.stringify(Request)
  });
} 

export function viewLDAPUserPassword(Request) {
  return request({
    url: API_BASE_URL + "/general/ldap/viewuserPassword",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}

export function deleteUserAccount(Request) {
  return request({
    url: API_BASE_URL + "/user/deleteuseraccount",
    method: 'POST',
    body: JSON.stringify(Request)
  });
}



///Robert Alumni
export function getAlumniInfo() {
  return request({
    url: API_BASE_URL + "/user/alumni",
    method: 'GET'
  });
}

export function getAlumniCount1() {
  return request({
    url: API_BASE_URL + "/alumni/alumnicount",
    method: 'GET',
    //body: JSON.stringify(dataToSend1)
  });

}



export function getAlumniCount(dataToSend1) {
  return request({
    url: API_BASE_URL + "/alumni/alumnicount2",
    method: 'POST',
    body: JSON.stringify(dataToSend1)
  });

}


export function getalumnicount21(dataToSend2) {
  return request({
    url: API_BASE_URL + "/alumni/alumnicount21",
    method: 'POST',
    body: JSON.stringify(dataToSend2)
  });

}
export function getEmployerInfo() {
  return request({
    url: API_BASE_URL + "/user/alumniemployer",
    method: 'GET'
  });
}
