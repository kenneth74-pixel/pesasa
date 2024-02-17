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
	uploadCollections,
	uploadDisbursements
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
	const [ExstClient, setExstClient] = useState([]);
	const [verifiedClients, setVerifiedClients] = useState(true);


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
				clients.sort((a, b) => b.id - a.id)

				// setDirectors(clients)
				filterClients(clients)

				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}


	function filterClients(array) {
		const existing_clients = []
		const non_verifiedClients = []
		const filteredClients = Object.keys(array).reduce(function (result, key) {

			if (array[key].status !== "PENDING_APPROVAL") {
				// result[key] = array[key];
				existing_clients.push(array[key])
			}

			return result;
		}, {});
		Object.keys(array).reduce(function (result, key) {
			if (array[key].status === "PENDING_APPROVAL") {
				// result[key] = array[key];
				non_verifiedClients.push(array[key])
			}

			return result;
		}, {});
		// setDirectors(array)
		
			setDirectors(existing_clients)
			// console.log('clients data: ', existing_clients);
		 
			setExstClient(non_verifiedClients)
			// console.log('non clients data: ', non_verifiedClients);

		// console.log('clients data: ', array);

	}

	const handleClients = () => {
		setVerifiedClients(false);
	}
	const handleVerifiedClients = () => {
		setVerifiedClients(true);
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

	ExstClient.map((data) => {
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
				motherMenu="Clients"
			/>
			<div className="card">
				<div className="card-header">
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-3 ">
							<h4 className="card-title">Clients</h4>
						</div>
						{
							verifiedClients ? (
								<div className="col-xl-4">
									<button

										className="btn btn-primary font-w500 mb-2 me-auto" onClick={() => handleClients()}>View Verified Clients</button>
								</div>
							) : (
								<div className="col-xl-4">
									<button

										className="btn btn-primary font-w500 mb-2 me-auto" onClick={() => handleVerifiedClients()}>View non  Verified Clients</button>
								</div>
							)
						}

					</div>






				</div>
				{
					verifiedClients ? (
						<div className="card-body">
							<div className="row" style={{ width: "100%" }}>
								{/* <div className="col-xl-3 ">
					<h4 className="card-title">Added Buyers</h4>
					</div> */}
							</div>
							<TableExport
								hideDataExport={true}
								rows={ExstClient}
								//rows={this.state.colors[1]==="primary"?finished: dataTemp}
								columns={[

									{ name: 'onBoardDate', title: 'On Board Date' },
									{ name: 'refference', title: 'Client Ref.' },
									{ name: 'fname', title: 'Name' },
									{ name: 'type', title: 'Type' },
									{ name: 'sector', title: 'Sector' },
									{ name: 'applicationNo', title: 'Applications' },
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

						</div>
					) : (
						<div className="card-body">
							<div className="row" style={{ width: "100%" }}>
								{/* <div className="col-xl-3 ">
					<h4 className="card-title">Added Buyers</h4>
					</div> */}
							</div>
							<TableExport
								hideDataExport={true}
								rows={directors}
								//rows={this.state.colors[1]==="primary"?finished: dataTemp}
								columns={[

									{ name: 'onBoardDate', title: 'On Board Date' },
									{ name: 'refference', title: 'Client Ref.' },
									{ name: 'fname', title: 'Name' },
									{ name: 'type', title: 'Type' },
									{ name: 'sector', title: 'Sector' },
									{ name: 'applicationNo', title: 'Applications' },
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

						</div>
					)
				}
				<div className="card-body">
					<div className="row" style={{ width: "100%" }}>
						{/* <div className="col-xl-3 ">
					<h4 className="card-title">Added Buyers</h4>
					</div> */}
					</div>
					{/* <TableExport
						hideDataExport={true}
						rows={directors}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						columns={[

							{ name: 'onBoardDate', title: 'On Board Date' },
							{ name: 'refference', title: 'Client Ref.' },
							{ name: 'fname', title: 'Name' },
							{ name: 'type', title: 'Type' },
							{ name: 'sector', title: 'Sector' },
							{ name: 'applicationNo', title: 'Applications' },
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


					/> */}

				</div>

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
						<h4 >Verification Detail</h4>



						{/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
					</DialogTitle>
					<DialogContent
						style={{ width: "100%", overFlow: "hidden" }}
					>
						{/* <h4 className="modal-title fs-20">Verification Detail</h4> */}

						{detailPart.process === "directors" ?
							<>
								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body" >
											<h5 className="m-b-5">
												Name
											</h5>
											<p className="mb-0">{detailPart.obj.fname}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Gender
											</h5>
											<p className="mb-0">{detailPart.obj.gender}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Nationality
											</h5>
											<p className="mb-0">{detailPart.obj.nationality}</p>
										</div>

									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												National Identification No. (NIN) / Passport No
											</h5>
											<p className="mb-0">{detailPart.obj.nid}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Marital Status
											</h5>
											<p className="mb-0">{detailPart.obj.marital}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Date of Birth
											</h5>
											<p className="mb-0">{detailPart.obj.dob !== undefined ? new Date(detailPart.obj.dob).toDateString() : ""}</p>
										</div>

									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												No.of Dependants
											</h5>
											<p className="mb-0">{detailPart.obj.depend}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Email
											</h5>
											<p className="mb-0">{detailPart.obj.email}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Phone
											</h5>
											<p className="mb-0">{detailPart.obj.number}</p>
										</div>

									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Country
											</h5>
											<p className="mb-0">{detailPart.obj.country}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												City Address 1
											</h5>
											<p className="mb-0">{detailPart.obj.city}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Town Address 1
											</h5>
											<p className="mb-0">{detailPart.obj.town}</p>
										</div>

									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Street Address / Village
											</h5>
											<p className="mb-0">{detailPart.obj.street}</p>
										</div>

									</div>


								</div>
							</>
							: null}





						{detailPart.process === "buyers" ?
							<>
								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body" >
											<h5 className="m-b-5">
												Name
											</h5>
											<p className="mb-0">{detailPart.obj.name}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Sector
											</h5>
											<p className="mb-0">{detailPart.obj.sector}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Other Sector
											</h5>
											<p className="mb-0">{detailPart.obj.osector}</p>
										</div>

									</div>
								</div>

								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Country
											</h5>
											<p className="mb-0">{detailPart.obj.country}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												City Address 1
											</h5>
											<p className="mb-0">{detailPart.obj.city}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Town Address 1
											</h5>
											<p className="mb-0">{detailPart.obj.town}</p>
										</div>

									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Street Address / Village
											</h5>
											<p className="mb-0">{detailPart.obj.street}</p>
										</div>

									</div>


								</div>

								<div class="row mt-4">
									<div className="col-md-4 ">
										<h4 ><u>First Contact Person</u></h4>
									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Name Of Contact Person
											</h5>
											<p className="mb-0">{detailPart.obj.contactPersonOne}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Designation
											</h5>
											<p className="mb-0">{detailPart.obj.designationOne}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Phone Number
											</h5>
											<p className="mb-0">{detailPart.obj.phoneOne}</p>
										</div>

									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Email
											</h5>
											<p className="mb-0">{detailPart.obj.contactEmailOne}</p>
										</div>

									</div>


								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">
										<h4 ><u>Second Contact Person</u></h4>
									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Name Of Contact Person
											</h5>
											<p className="mb-0">{detailPart.obj.contactPersonTwo}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Designation
											</h5>
											<p className="mb-0">{detailPart.obj.designationTwo}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Phone Number
											</h5>
											<p className="mb-0">{detailPart.obj.phoneTwo}</p>
										</div>

									</div>
								</div>


								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Email
											</h5>
											<p className="mb-0">{detailPart.obj.contactEmailTwo}</p>
										</div>

									</div>


								</div>



							</>
							: null}








						{detailPart.process === "docs" ?
							<>
								<div class="row mt-4">
									<div className="col-md-4 ">

										<div className="media-body" >
											<h5 className="m-b-5">
												Document Type
											</h5>
											<p className="mb-0">{detailPart.obj.type}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												View Document
											</h5>
											<p className="mb-0">{detailPart.obj.view}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Status
											</h5>
											<p className="mb-0">{detailPart.obj.status}</p>
										</div>

									</div>
								</div>




							</>
							: null}





						{detailPart.process === "credit" ?
							<>
								<div class="row mt-4">
									{/* <div className="col-md-4 ">
								
								<div className="media-body" >
									<h5 className="m-b-5">
									Credit limit currency
									</h5>
									<p className="mb-0">{clientDetail.creditlimit.currency}</p>
								</div>
								
								</div> */}

									<div className="col-md-5 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Average of total value of invoices issued per month
											</h5>
											<p className="mb-0">{numberWithCommas(clientDetail.creditlimit.invoices)}</p>
										</div>

									</div>

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Average credit period of invoices
											</h5>
											<p className="mb-0">{clientDetail.creditlimit.credit}</p>
										</div>

									</div>


									<div className="col-md-3 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Limit Requested  (Min. UGX: 5M)
											</h5>
											<p className="mb-0">{numberWithCommas(clientDetail.creditlimit.limit)}</p>
										</div>

									</div>
								</div>


								<div class="row mt-4" style={{ borderBottom: "solid 1px #CCC", paddingBottom: "10px" }}>
									{/* <div className="col-md-4 ">
								
								<div className="media-body" >
									<h5 className="m-b-5">
									Credit limit currency
									</h5>
									<p className="mb-0">{clientDetail.creditlimit.currency}</p>
								</div>
								
								</div> */}

									<div className="col-md-4 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Has an existing debt/loan ?
											</h5>
											<p className="mb-0">{clientDetail.creditlimit.hasLoan}</p>
										</div>

									</div>

									<div className="col-md-8 ">

										<div className="media-body">
											<h5 className="m-b-5">
												Has a lien over  receivables or debenture over floating assets/debtors/receivables?
											</h5>
											<p className="mb-0">{clientDetail.creditlimit.hasLien}</p>
										</div>

									</div>



								</div>



							</>
							: null}


						<div class="row mt-4">
							<h4 className="modal-title fs-20">Process History</h4>
						</div>
						<div style={{ width: "100%", overFlow: "hidden" }}>
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
						</div>
					</DialogContent>
					<DialogActions style={{ width: "100%", overflow: "hidden" }}>
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


							<div className="col-md-2 mt-4  " style={{ textAlign: "center" }}>
								<button type="button"
									className="btn shadow btn-xs "

									onClick={() => setPostModal2(false)}
									data-dismiss="modal">
									Close
								</button>
							</div>

						</div>
					</DialogActions>
				</Dialog>


				<Dialog
					disableEnforceFocus
					//className="modal fade"
					//  className="fade bd-example-modal-lg"
					// fullscreen={true} 
					//dialogClassName="modal-90w"
					/// size="lg"
					fullScreen={true}
					//	maxWidth={"lg"}
					open={postModal}
					onClose={setPostModal}
				>

					<div className="modal-header">
						<h4 className="modal-title fs-20">Client Business Detail</h4>
						<button type="button" className="btn-close" onClick={() => setPostModal(false)} data-dismiss="modal"></button>
					</div>
					<DialogContent>

						<div className="mb-4 ">

							<div className='p-4' style={{ boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)", height: "auto" }}>
								<div className="profile-news">
									<div className="row" >
										<div className="col-md-3 ">

											<div className="media-body">
												<h5 className="m-b-5">
													Name of Business
												</h5>
												<p className="mb-0">{bussinessObje.fname}</p>
											</div>
										</div>

										<div className="col-md-3 ">

											<div className="media-body">
												<h5 className="m-b-5">
													Type of Business
												</h5>
												<p className="mb-0">{bussinessObje.type}</p>
											</div>
										</div>


										<div className="col-md-3 ">

											<div className="media-body">
												<h5 className="m-b-5">
													Other Type
												</h5>
												<p className="mb-0">{bussinessObje.otype}</p>
											</div>
										</div>



										<div className="col-md-3 ">

											<div className="media-body">
												<h5 className="m-b-5">
													Sector
												</h5>
												<p className="mb-0">{bussinessObje.sector}</p>
											</div>
										</div>





									</div>











									{!viewMore ? null :
										<div className="row  mt-5">
											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Other Sector
													</h5>
													<p className="mb-0">{bussinessObje.osector}</p>
												</div>
											</div>

											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Registration Date
													</h5>
													<p className="mb-0">{bussinessObje.dob !== undefined && bussinessObje.dob !== null ? new Date(bussinessObje.dob).toDateString() : ""}</p>
												</div>
											</div>


											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Registration No.
													</h5>
													<p className="mb-0">{bussinessObje.regno}</p>
												</div>
											</div>



											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Country
													</h5>
													<p className="mb-0">{bussinessObje.country}</p>
												</div>
											</div>
										</div>}







									{!viewMore ? null :
										<div className="row  mt-5">
											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														City
													</h5>
													<p className="mb-0">{bussinessObje.city}</p>
												</div>
											</div>

											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Town
													</h5>
													<p className="mb-0">{bussinessObje.town}</p>
												</div>
											</div>


											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Street Address / Village
													</h5>
													<p className="mb-0">{bussinessObje.street}</p>
												</div>
											</div>



											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Has VAT
													</h5>
													<p className="mb-0">{bussinessObje.fname}</p>
												</div>
											</div>
										</div>}







									{!viewMore ? null :
										<div className="row  mt-5">
											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														TIN
													</h5>
													<p className="mb-0">{bussinessObje.tin}</p>
												</div>
											</div>

											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Annual Turnover/sales
													</h5>
													<p className="mb-0">{bussinessObje.turnover}</p>
												</div>
											</div>


											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Number of Total Employees
													</h5>
													<p className="mb-0">{bussinessObje.depend}</p>
												</div>
											</div>



											<div className="col-md-3 ">

												<div className="media-body">
													<h5 className="m-b-5">
														Number of Female Employees
													</h5>
													<p className="mb-0">{bussinessObje.femaleEmp}</p>
												</div>
											</div>
										</div>}




									<div className="row  mt-5">
										<div className="col-md-3 ">
											{!viewMore ?
												<button type="button"
													className="btn btn-primary shadow btn-xs "

													onClick={() => setviewMore(true)}
													data-dismiss="modal">
													view more
													{/* <i className="fa fa-eye"></i> */}
												</button> :
												<button type="button"
													className="btn btn-primary shadow btn-xs "

													onClick={() => setviewMore(false)}
													data-dismiss="modal">
													view less
													{/* <i className="fa fa-eye"></i> */}
												</button>}
										</div>
									</div>

								</div>
							</div>
						</div>

						<div className="card-body pt-3" style={{ boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)", }}>
							<div className="profile-news" >
								<div className="custom-tab-1">
									<ul className="nav nav-tabs">
										<li className="nav-item" onClick={() => setActiveToggle("aboutMe")}>
											<Link to="#about-me" data-toggle="tab" className={`nav-link ${activeToggle === "aboutMe" ? "active show" : ""}`}>Directors</Link>
										</li>
										<li className="nav-item" onClick={() => setActiveToggle("posts")}>
											<Link to="#my-posts" data-toggle="tab" className={`nav-link ${activeToggle === "posts" ? "active show" : ""}`}>Buyers</Link>
										</li>

										<li className="nav-item">
											<Link to="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${activeToggle === "setting" ? "active show" : ""}`}>Credit Application</Link>
										</li>


										<li className="nav-item">
											<Link to="#docs" data-toggle="tab" onClick={() => setActiveToggle("docs")} className={`nav-link ${activeToggle === "docs" ? "active show" : ""}`}>Documents</Link>
										</li>


										<li className="nav-item">
											<Link to="#bank" data-toggle="tab" onClick={() => setActiveToggle("bank")} className={`nav-link ${activeToggle === "bank" ? "active show" : ""}`}>Bank</Link>
										</li>



										<li className="nav-item">
											<Link to="#agreement" data-toggle="tab" onClick={() => setActiveToggle("agreement")} className={`nav-link ${activeToggle === "agreement" ? "active show" : ""}`}>Credit Facility Agreement</Link>
										</li>


									</ul>
								</div>

								<div className="tab-content">
									<div className={`tab-pane fade ${activeToggle === "aboutMe" ? "active show" : ""}`} >
										<div className="my-post-content pt-3">
											<TableExport
												hideDataExport={true}
												rows={clientDetail.directors}
												//rows={this.state.colors[1]==="primary"?finished: dataTemp}
												columns={[
													{ name: 'fname', title: 'Name' },
													{ name: 'nationality', title: 'Nationality' },
													{ name: 'gender', title: 'Gender' },
													{ name: 'email', title: 'Email' },
													{ name: 'number', title: 'Phone' },
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
											//  fileName={"Directors"}


											/>
										</div>
									</div>

									<div className={`tab-pane fade ${activeToggle === "posts" ? "active show" : ""}`} >
										<div className="my-post-content pt-3">
											<TableExport
												hideDataExport={true}
												rows={clientDetail.buyers}
												//rows={this.state.colors[1]==="primary"?finished: dataTemp}
												columns={[
													{ name: 'name', title: 'Name' },
													{ name: 'sector', title: 'Sector' },
													{ name: 'streetaddress', title: 'Address' },
													{ name: 'contactPersonOne', title: 'Contact Person' },
													{ name: 'designationOne', title: 'Designation' },
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
											//  fileName={"Directors"}


											/>
										</div>
									</div>


									<div className={`tab-pane fade ${activeToggle === "setting" ? "active show" : ""}`} >
										<div className="my-post-content pt-3">
											<CreditLimitApplication
												key={clientDetail.creditlimit.status}
												verifyInfo={verifyInfo}
												data={clientDetail.creditlimit}
											/>
										</div>
									</div>


									<div className={`tab-pane fade ${activeToggle === "docs" ? "active show" : ""}`} >
										<div className="my-post-content pt-3">
											<TableExport
												hideDataExport={true}
												rows={clientDetail.docs}
												//rows={this.state.colors[1]==="primary"?finished: dataTemp}
												columns={[
													{ name: 'type', title: 'Document Type' },
													{ name: 'view', title: 'View / Download' },
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
											//  fileName={"Directors"}


											/>
										</div>
									</div>


									<div className={`tab-pane fade ${activeToggle === "bank" ? "active show" : ""}`} >
										<div className="my-post-content pt-3">
											<BankDetail
												data={{}}
											/>
										</div>
									</div>

									<div className={`tab-pane fade ${activeToggle === "agreement" ? "active show" : ""}`} >
										<div className="my-post-content pt-3">
											<Agreement
												client={bussinessObje}
												data={{}}
											/>
										</div>
									</div>




								</div>
							</div>
						</div>

					</DialogContent>




				</Dialog>
			</div>
		</>
	)

}
export default FilteringTable;