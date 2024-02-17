import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import swal from "sweetalert";
import {
	verifyProcess, getAllClients, getClientDetail,
	uploadMoreClientsData,
	getProcessComments, uploadClientsData,
	uploadBuyersData, uploadApplicationInvoiceDiscount,
	updateClientBuyers,
	uploadCollections,
	uploadDisbursements,
	uploadNothernDistricts,
	uploadEasternDistricts,
	uploadWesternDistricts,
	uploadCentralDistricts
} from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import CreditLimitApplication from "./CreditLimitApplication"
import BankDetail from "./BankDetail"
import Agreement from "./Agreement"

import { RotateSpinner } from "react-spinners-kit";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import { format } from 'date-fns'
//import './table.css';
import './filtering.css';
import { nationalities, countryCodes } from "./appData.js"

import DatePicker from "react-datepicker";
export const FilteringTable = () => {
	const [directors, setDirectors] = useState([]);
	const [buyers, setBuyers] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [activeToggle, setActiveToggle] = useState("aboutMe");
	const [bussinessObje, setbussinessObje] = useState({});
	const [clientDetail, setclientDetail] = useState({ buyers: [], docs: [], directors: [], creditlimit: {} });
	const [viewMore, setviewMore] = useState(false);
	const [postModal2, setPostModal2] = useState(false);
	const [detailPart, setdetailPart] = useState({});
	const [comment, setcomment] = useState("");
	const [comments, setComments] = useState([]);
	const [amount, setAmount] = useState(0);


	const [addFormData, setAddFormData] = useState({
		id: null,
		name: '',
		sector: '',
		osector: '',
		country: 'Uganda',
		city: '',
		town: '',
		streetaddress: '',
		contactPersonOne: '',
		phoneOne: '',
		designationOne: '',
		contactEmailOne: '',
		contactPersonTwo: '',
		phoneTwo: '',
		designationTwo: '',
		contactEmailTwo: '',
		clientBuyerId: null,
		terms: 'choose',
		code: '+256',
		code2: '+256'
	});



	function openDetails2(data, process) {
		//	setPostModal(false)
		const getme = {
			process: process,
			processId: data.id
		}
		getComments(getme)
		setPostModal2(true)
		setdetailPart({ process: process, obj: data })
	}

	function openDetails(data) {
		loadgetClientDetail(data.id)
		setbussinessObje(data)
		setPostModal(true)
		setisLoading(true)


	}
	function updateData(userData) {
		userData.actions = ""
		console.log(userData)
		if (!userData.isApproved) {
			setAddFormData(userData)
			setPostModal(true)
		}
	}
	function addD() {

		setAddFormData(
			{
				id: null,
				name: '',
				sector: '',
				osector: '',
				country: 'Uganda',
				city: '',
				town: '',
				streetaddress: '',
				contactPersonOne: '',
				phoneOne: '',
				designationOne: '',
				contactEmailOne: '',
				contactPersonTwo: '',
				phoneTwo: '',
				designationTwo: '',
				contactEmailTwo: '',
				clientBuyerId: null,
				terms: 'choose',
				code: '+256',
				code2: '+256'
			}
		)
		setPostModal(true)
	}



	function loadgetClientDetail(id) {
		getClientDetail(id)
			.then((response) => {
				setclientDetail(response)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}

	function getComments(data) {
		setComments([])
		getProcessComments(data)
			.then((response) => {
				setComments(response)
				setisLoading(false)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				setisLoading(false)
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}

	function verifyInfo(amount) {
		setAmount(amount)
		openDetails2(clientDetail.creditlimit, "credit")
	}

	function getBuyers() {
		getAllClients()
			.then((response) => {
				setBuyers(response)

				const clients = []


				response.map((data) => {
					data.onBoardDate = format(new Date(data.onBoardDate), 'dd-MMM-yyyy')
					clients.push(data)
				})
				setDirectors(clients)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}


	comments.map((data) => {
		data.type = data.type === "VERIFIED" ? <div style={{ color: "green" }}>{data.type} <i className="fa fa-check"></i></div> : (data.type === "DECLINED" ? <div style={{ color: "red" }}>{data.type} <i className="fa fa-times"></i></div> : data.type)
		data.dateAdded = new Date(data.dateAdded).toDateString()
	})
	directors.map((data) => {
		//data.phone=data.code+data.phoneOne
		data.add = data.city + " , " + data.country
		//data.dateAdd=data.dateAdded.split("T")[0];
		data.actions = <div className="d-flex">
			{data.type === "CLIENT_ADDED" ? null :
				<>
					<button type="button"
						className="btn btn-primary shadow btn-xs "

						onClick={() => openDetails(data)}
						data-dismiss="modal">
						view
						{/* <i className="fa fa-eye"></i> */}
					</button>

				</>

			}


		</div>
	})


	useEffect(() => {
		getBuyers()
		//chackboxFun();
	}, []);

	function handleUpload({ target }) {
		uploadSpreadSheet(target);
	};
	function uploadSpreadSheet(target) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadClientsData(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded client data', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}


	function uploadSpreadSheet3(target) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadBuyersData(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded client data', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}


	function uploadSpreadSheet4({ target }) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadApplicationInvoiceDiscount(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded client applications', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}


	function uploadSpreadSheet5({ target }) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadDisbursements(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded disbursements', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}


	function uploadSpreadSheet6({ target }) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadCollections(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded collections', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}


	function uploadNothern({ target }) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadNothernDistricts(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded districts', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}


	function uploadEastern({ target }) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadEasternDistricts(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded districts', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}


	function uploadWestern({ target }) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadWesternDistricts(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded districts', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}



	function uploadCentral({ target }) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadCentralDistricts(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded districts', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}


	function updateTheBuyers() {
		setisLoading(true)


		updateClientBuyers()
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully updated client buyers', "success");
				setisLoading(false)

			})
			.catch((error) => {
				setisLoading(false)
			});


	}





	function handleUpload3({ target }) {
		uploadSpreadSheet3(target);
	};



	function handleUpload2({ target }) {
		uploadSpreadSheet2(target);
	};
	function uploadSpreadSheet2(target) {
		setisLoading(true)

		var file = new FormData();
		var spreadSheet = target.files[0];
		file.append("file", spreadSheet);
		//  file.append("uploadStudentAccountPayLoad", blob);


		uploadMoreClientsData(file)
			.then((response) => {
				//  alert(response.message)
				swal('Success', 'Successfully uploaded bussiness data', "success");
				setisLoading(false)
				getBuyers()
			})
			.catch((error) => {
				setisLoading(false)
			});


	}



	function numberWithCommas(x) {
		if (x !== null && x !== undefined) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		} else {
			return 0;
		}
	}

	const codes = countryCodes.map(data => (

		<option value={data.dial_code} > {" " + data.name + " (" + data.dial_code + " )"}</option>
	))

	const country = countryCodes.map(data => (

		<option value={data.name} > {" " + data.name + " "}</option>
	))


	const [postModal, setPostModal] = useState(false);
	const columns = useMemo(() => COLUMNS, [])
	const data = useMemo(() => MOCK_DATA, [])
	//useTable
	const tableInstance = useTable({
		columns,
		data,
		initialState: { pageIndex: 0 }
	}, useFilters, useGlobalFilter, usePagination)
	const [contacts, setContacts] = useState([]);




	//Add Submit data
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
				process: detailPart.process,
				processId: detailPart.obj.id,
				amount: amount
			}

			//console.log(addFormData)
			//alert(JSON.stringify(submitData))
			setisLoading(true)
			verifyProcess(submitData)
				.then((response) => {
					setisLoading(false)
					setPostModal2(false);
					setcomment("")
					swal('Good job!', 'Successfully Submitted', "success");
					loadgetClientDetail(bussinessObje.id)

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

	const handleAddFormChange = (event) => {
		event.preventDefault();
		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;
		setAddFormData(newFormData);
	};


	const handleSelectChange = (event) => {
		event.preventDefault();
		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		//alert(fieldValue)
		if (fieldValue === "create") {
			//alert("kale")
			addD()
		}
		else {
			const newFormData = { ...addFormData };
			newFormData[fieldName] = fieldValue;
			setAddFormData(newFormData);
		}
	};


	const {
		state,
	} = tableInstance


	const { globalFilter, pageIndex } = state
	const buyersOptions = []

	buyers.map((data) => {
		buyersOptions.push(
			<option disabled={data.amOwner} value={data.id}>{data.name} {data.amOwner ? "(Already Added)" : ""}</option>
		)
	})

	clientDetail.directors.map((data) => {
		data.status = data.status === "VERIFIED" ? <div style={{ color: "green" }}>{data.status} <i className="fa fa-check"></i></div> : (data.status === "REJECTED" ? <div style={{ color: "red" }}>{data.status} <i className="fa fa-times"></i></div> : data.status)
		data.actions = <div className="d-flex">
			<button type="button"
				className="btn btn-primary shadow btn-xs "

				onClick={() => openDetails2(data, "directors")}
				data-dismiss="modal">
				view details
				{/* <i className="fa fa-eye"></i> */}
			</button>

		</div>
	})

	clientDetail.buyers.map((data) => {
		data.status = data.status === "VERIFIED" ? <div style={{ color: "green" }}>{data.status} <i className="fa fa-check"></i></div> : (data.status === "REJECTED" ? <div style={{ color: "red" }}>{data.status} <i className="fa fa-times"></i></div> : data.status)
		data.actions = <div className="d-flex">
			<button type="button"
				className="btn btn-primary shadow btn-xs "

				onClick={() => openDetails2(data, "buyers")}
				data-dismiss="modal">
				view details
				{/* <i className="fa fa-eye"></i> */}
			</button>

		</div>
	})


	clientDetail.docs.map((data) => {
		data.status = data.status === "VERIFIED" ? <div style={{ color: "green" }}>{data.status} <i className="fa fa-check"></i></div> : (data.status === "REJECTED" ? <div style={{ color: "red" }}>{data.status} <i className="fa fa-times"></i></div> : data.status)
		data.view = <div className="d-flex">
			<a
				target="_blank"
				href={data.path} >
				<button type="button"
					className="btn btn-success shadow btn-xs "


					data-dismiss="modal">

					view documnet

					{/* <i className="fa fa-eye"></i> */}
				</button>
			</a>
		</div>

		data.actions = <div className="d-flex">
			<button type="button"
				className="btn btn-primary shadow btn-xs "

				onClick={() => openDetails2(data, "docs")}
				data-dismiss="modal">
				view details
				{/* <i className="fa fa-eye"></i> */}
			</button>

		</div>
	})

	return (
		<>
			<PageTitle activeMenu="Management"
				motherMenu="Data Uploads"
			/>
			<div className="card">
				<div className="card-header">
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-3 ">
							<h4 className="card-title">Upload Data</h4>
						</div>



						{/* <div className="col-xl-3">
					<button
					
					 className="btn btn-primary font-w600 mb-2 me-auto" onClick={()=> addD()}>Add New Buyer</button>
					</div> */}
					</div>


					{/* <input
                        accept=".csv"
                        className="mb-4"
                        id="contained-button-file"
                        type="file"
                        onChange={handleUpload}
                      /> */}


				</div>





				<div className="card-body">
					<div className="row" style={{ width: "100%" }}>
						{isLoading ?
							<RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
							null}
					</div>
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-4 ">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}>Step 1 : </b>Upload Client Bio-data Here</label>
								<div className="form-group ">
									<input
										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={handleUpload}
									/>
								</div>
							</div>
						</div>




						<div className="col-xl-4 ">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}>Step 2 : </b>Upload Client Bussiness Information Here</label>
								<div className="form-group ">
									<input
										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={handleUpload2}
									/>
								</div>
							</div>
						</div>


						<div className="col-xl-4 ">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}>Step 3 : </b>Upload Buyers Information Here</label>
								<div className="form-group ">
									<input
										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={handleUpload3}
									/>
								</div>
							</div>
						</div>
					</div>


					<div className="row mt-4" style={{ width: "100%" }}>
						<div className="col-xl-4 ">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}>Step 4 : </b>Upload Client Invoice Discount Applications Here</label>
								<div className="form-group ">
									<input
										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={uploadSpreadSheet4}
									/>
								</div>
							</div>
						</div>





						<div className="col-xl-4 ">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}>Step 5 : </b>Upload Client Disbursements Here</label>
								<div className="form-group ">
									<input
										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={uploadSpreadSheet5}
									/>
								</div>
							</div>
						</div>


						<div className="col-xl-4 ">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}>Step 6 : </b>Upload Client Collections Here</label>
								<div className="form-group ">
									<input

										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={uploadSpreadSheet6}
									/>
								</div>
							</div>
						</div>






						{/* disticts regions */}


						<div className="col-xl-3 mt-4 pt-4">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}></b>Upload Nothern Region Districts Here</label>
								<div className="form-group ">
									<input

										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={uploadNothern}
									/>
								</div>
							</div>
						</div>

						<div className="col-xl-3 mt-4 pt-4">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}></b>Upload Eastern Region Districts Here</label>
								<div className="form-group ">
									<input

										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={uploadEastern}
									/>
								</div>
							</div>
						</div>



						<div className="col-xl-3 mt-4 pt-4">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}></b>Upload Western Region Districts Here</label>
								<div className="form-group ">
									<input

										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={uploadWestern}
									/>
								</div>
							</div>
						</div>



						<div className="col-xl-3 mt-4 pt-4">
							<div className="form-group ">
								<label className="text-black font-w500"><b style={{ color: "#096" }}></b>Upload Central Region Districts Here</label>
								<div className="form-group ">
									<input

										accept=".csv"
										className="mb-4"
										id="contained-button-file"
										type="file"
										onChange={uploadCentral}
									/>
								</div>
							</div>
						</div>


						<div className="col-xl-4 mt-4 pt-4">
							{isLoading ?
								<RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
								<button type="button"
									className="btn btn-primary shadow btn-xs "

									onClick={() => updateTheBuyers()}
									data-dismiss="modal">
									Update Client Buyers
									{/* <i className="fa fa-eye"></i> */}
								</button>}


						</div>







					</div>


				</div>

			</div>
		</>
	)

}
export default FilteringTable;