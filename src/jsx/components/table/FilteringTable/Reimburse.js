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
import Dashboard from "../../Dashboard/GeneralInfoDashBoard2.js"
import {
	verifyProcess, getApprovedClientApplications,
	deleteDisbursement,
	getClientDetail, reimburse, getReimbursesMapping, getProcessComments
} from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import InvoiceDiscountingDialog from "./InvoiceDiscountingDialog2.js"
import BankDetail from "./BankDetail"
import { RotateSpinner } from "react-spinners-kit";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import { format } from 'date-fns'
import ReactToPrint from "react-to-print";
//import './table.css';
import './filtering.css';
import { nationalities, countryCodes } from "./appData.js"

import DatePicker from "react-datepicker";
export const FilteringTable = () => {
	const [directors, setDirectors] = useState([]);
	const [detailsOnly, setdetailsOnly] = useState([]);
	const [amountCollected, setAmountCollected] = useState("");
	const [datetoSend, setDatetoSend] = useState(new Date());
	const [myId, setMyId] = useState(null);
	const [showEdit, setshowEdit] = useState(false);

	const [buyers, setBuyers] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [showDibursements, setShowDibursements] = useState(false);
	const [bussinessObje, setbussinessObje] = useState({});
	const [clientDetail, setclientDetail] = useState({ buyers: [], docs: [], directors: [], creditlimit: {} });
	const [luObje, setLuObje] = useState({});
	const [postModal2, setPostModal2] = useState(false);
	const [detailPart, setdetailPart] = useState({});
	const [comment, setcomment] = useState("");
	const [comments, setComments] = useState([]);
	const componentRef = React.useRef(null);
	const [range, setRange] = useState("currentMonth");
	let [addFormDataTwo, setAddFormDataTwo] = useState({
		startDate: new Date(),
		endDate: new Date(),
		days: "",
		name: "days",
		year: new Date().getFullYear(),
		month: -1,
	});
	const [hideDetail, sethideDetail] = useState(false);

	const [heretheNameToShow, theNameToShow] = useState("");
	const [hideMenu, setHideMenu] = useState(false);

	const [reimburses, setReimburses] = useState([]);


	const [showReimburses, setShowReimburses] = useState(false);
	const [reimburseTotal, setreimburseTotal] = useState(0);


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



	const years = ranges(2021, (new Date()).getFullYear());
	function ranges(start, end) {
		const theYears = []

		for (var m = start; m < end; m++) {
			theYears.push(m)
		}
		theYears.push(end);
		return theYears;
	}

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
		//loadgetClientDetail(data.id)
		setbussinessObje(data)
		setPostModal(true)
		//setisLoading(true)


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

	function deleteCollectionAsa(thei) {
		setisLoading(true)
		deleteDisbursement(thei)
			.then((response) => {
				setShowReimburses(false)
				setisLoading(false)
				swal('Success!', 'Successfully deleted disbursement', "success");
			})
			.catch((error) => {
				setisLoading(false)
				console.log(error);
				alert(error)
				// swal('Oops', error.message, "error");
			});
	}


	function getReimbursesHere(data, totalDisbursed) {
		setreimburseTotal(0)
		setReimburses([])
		getReimbursesMapping(data)
			.then((response) => {
				const toAdd = []
				// let total=0;
				response.map((option) => {
					// total=parseInt(parseInt(total)+parseInt(option.amount))
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)
					option.actions = <div>
						<button type="button"
							className="btn shadow btn-xs btn-secondary mt-4"

							onClick={() => {
								setshowEdit(true)
								setAmountCollected(option.amount)
								setDatetoSend(new Date(option.dateAdded))
								setMyId(option.id)
							}}
							data-dismiss="modal">
							Edit
						</button>

						{isLoading ?
							<RotateSpinner size={100} color="rgba(41, 106, 176,1)" /> :
							<button
								style={{ marginRight: "10px", marginLeft: "10px", left: "10px", right: "10px" }}
								type="button"
								className="btn shadow btn-xs btn-danger mt-4 ml-4 mr-4"

								onClick={() => {

									deleteCollectionAsa(option.id)
								}}
								data-dismiss="modal">
								Delete
							</button>
						}
					</div>

					toAdd.push(option)
				})
				setshowEdit(false)
				setreimburseTotal(totalDisbursed)
				setReimburses(toAdd)
			})
			.catch((error) => {
				setisLoading(false)
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

	function verifyInfo() {
		openDetails2(clientDetail.creditlimit, "credit")
	}



	function reloadMe(id) {
		addFormDataTwo.dataRange = range
		setisLoading(true)
		getApprovedClientApplications(addFormDataTwo)
			.then((response) => {
				// alert(response.)
				const dataReturn = []
				const detailsOnly = []
				response.dataReturn.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)
					if (id === option.id) {
						setbussinessObje(option)
					}
					dataReturn.push(option)
				})
				setDirectors(dataReturn)



				response.detailsOnly.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)

					detailsOnly.push(option)
				})
				setdetailsOnly(detailsOnly)



				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");
				setisLoading(false)

			})
			.catch((error) => {
				setisLoading(false)
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}

	function getBuyers() {
		addFormDataTwo.dataRange = range
		getApprovedClientApplications(addFormDataTwo)
			.then((response) => {
				// alert(JSON.stringify(response))

				const dataReturn = []
				const detailsOnly = []
				response.dataReturn.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)

					dataReturn.push(option)
				})
				setDirectors(dataReturn)



				response.detailsOnly.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)

					detailsOnly.push(option)
				})
				setdetailsOnly(detailsOnly)



				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				alert(JSON.stringify(error))
				// swal('Oops', error, "error");
			});
	}


	comments.map((data) => {
		data.type = data.type === "VERIFIED" ? <div style={{ color: "green" }}>{data.type} <i className="fa fa-check"></i></div> : (data.type === "DECLINED" ? <div style={{ color: "red" }}>{data.type} <i className="fa fa-times"></i></div> : data.type)
		data.dateAdded = format(new Date(data.dateAdded), 'dd-MMM-yyyy')
	})
	directors.map((data) => {
		//data.phone=data.code+data.phoneOne
		data.add = data.city + " , " + data.country
		data.combo = data.currency + " " + data.amount
		data.checkDays = <div><div>{data.status}</div>
			{data.daysPast > 0 ? <div>{data.daysPast} days past</div> : null}
		</div>
		//data.dateAdd=data.dateAdded.split("T")[0];
		data.actions = <div className="">
			{data.type === "CLIENT_ADDED" ? null :
				<>
					<div>
						<button type="button"
							className={data.progress === "Pending Disbursement" ? "btn btn-success shadow btn-xs " : "btn btn-primary shadow btn-xs "}

							onClick={() => openDetails(data)}
							data-dismiss="modal">
							{data.progress === "DISBURSED" ? "Details" : "Disburse"}
							{/* <i className="fa fa-eye"></i> */}
						</button>
					</div>

					<div className='mt-2'>
						<button type="button"
							className={"btn btn-success shadow btn-xs "}

							onClick={() => {


								getReimbursesHere(data.id, data.totalDisbursed)

								setShowReimburses(true)
								setLuObje(data)
							}}
							data-dismiss="modal">
							Disbursements
							{/* <i className="fa fa-eye"></i> */}
						</button>
					</div>

				</>

			}


		</div>
	})


	useEffect(() => {
		getBuyers()
		//chackboxFun();
	}, []);


	const handleBeforePrint = React.useCallback(() => {
		//console.log("`onBeforePrint` called");
		setHideMenu(false)

	}, []);

	const reactToPrintContent = React.useCallback(() => {
		return componentRef.current;
	}, [componentRef.current]);

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
				processId: detailPart.obj.id
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


	function sendReimburse() {
		// const pastDays=calculateDaysBetweenDates( reimburseData.dob2, new Date(props?.obj?.collectionDate))
		// const fineToPay=pastDays<0?(( (pastDays*-1 )*0.003*(props?.obj?.totalToDisburse-props?.obj?.paidSoFar)).toFixed(2)):0
		const amount = amountCollected.toString().split(",").join("")
		const dataSend = {
			id: myId,
			applicationId: null,
			amount: amount,
			dateAdded: datetoSend,
			isFullyDisbursed: true
		}
		// alert(JSON.stringify(dataSend))
		if (amountCollected === "") {
			swal('Oops', "Please add amount", "error");
		}
		else {
			setisLoading(true)
			reimburse(dataSend)
				.then((response) => {
					setshowEdit(false)
					setShowReimburses(false)
					setisLoading(false)
					//   setShowPrev(false);
					// setcomment("")
					swal('Success!', 'Successfully updated', "success");
					//   props.reloadMe(addFormData.id)

				})
				.catch((error) => {
					setisLoading(false)
					console.log(error);
					swal('Oops', error.message, "error");
				});
		}
		// alert(JSON.stringify(dataSend))
	}


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

				<DialogTitle style={{ zIndex: 100 }}>
					<h4 >Application Disbursements: Total: {numberWithCommas(reimburseTotal)}</h4>
					<p>Application Ref : {luObje.refference}</p>


					{showEdit ?
						<div className='row mt-4' style={{ width: "100%", overflow: "hidden", paddingBottom: "10px", paddingTop: "10px", borderTop: "1px solid #666" }}>
							<div className="col-xl-12 col-xxl-12 mb-4 mt-4">Edit Disbursement</div>
							<div className="col-xl-5 col-xxl-5">
								<div className="form-group mb-3">
									<label className="text-black font-w500">Disbursed Amount</label>
									<div className="contact-name">
										<input type="text" className="form-control" autoComplete="off"
											name="amount2"
											disabled={addFormData.progress === "COLLECTED"}
											value={numberWithCommas(amountCollected)}
											onChange={(e) => {
												const theAmt = e.target.value.split(",").join("")

												setAmountCollected(theAmt)
											}}
											placeholder="Collection Amount"
										/>
										<span className="validation-text"></span>
									</div>
								</div>
							</div>

							<div className="col-xl-5 col-xxl-5">
								<div className="form-group mb-0" style={{ zIndex: 100 }}>
									<label className="text-black font-w500">Disbursement Date</label>
									<DatePicker
										style={{ zIndex: 100 }}
										dateFormat='dd/MM/yyyy'
										disabled={addFormData.progress === "COLLECTED"}
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

										placeholder="Collection Date"
										name="dob"
										selected={datetoSend}
										//value={new Date()}
										onChange={setDatetoSend}
									/>
								</div>
							</div>

							<div className="col-xl-2 col-xxl-2  mt-4">
								{isLoading ?
									<RotateSpinner size={100} color="rgba(41, 106, 176,1)" /> :
									<button type="button"
										className="btn shadow btn-xs btn-success mt-4"

										onClick={() => sendReimburse()}
										data-dismiss="modal">
										Save
									</button>}
							</div>		  </div> : null}
					{/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
				</DialogTitle>
				<DialogContent
					style={{ zIndex: 10 }}
				>
					<div style={{ zIndex: -10 }}	>



						<TableExport
							style={{ zIndex: -10 }}
							hideDataExport={true}
							rows={reimburses}
							//rows={this.state.colors[1]==="primary"?finished: dataTemp}
							columns={[
								{ name: 'user', title: 'Added By' },
								{ name: 'refference', title: 'Disbursement Ref.' },
								{ name: 'dateAdded', title: 'Disbursement Date' },

								{ name: 'amount', title: 'Disbursement Amount' },

								{ name: 'mode', title: 'Payment Mode' },
								{ name: 'actions', title: 'Actions' },
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
					</div>
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
			<PageTitle activeMenu="Disbursements"
				motherMenu="Loans"
			/>

			{hideDetail ? null :
				<div>
					{!hideMenu ?
						<div style={{ textAlign: "center" }}>

							<button to={"#"} className="btn btn-success  shadow btn-xs "

								onClick={() => setHideMenu(true)}>
								{/* <i className="las la-calendar scale5 me-3"></i> */}
								Print Preview</button>
						</div> :
						<ReactToPrint
							//onBeforeGetContent={handleBeforePrint}
							onAfterPrint={handleBeforePrint}
							// onBeforePrint={handleBeforePrint}
							simple
							round
							trigger={() => (
								<p style={{ textAlign: "center" }}>
									<button to={"#"} className="btn btn-success shadow btn-xs ">Print</button>
								</p>
							)}
							content={reactToPrintContent}
						/>}
				</div>}

			{hideDetail ? <>
				<div
					//style={{width:"100%", marginBottom:"30px"}} 
					className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head"><h2 className="font-w600 mb-2 me-auto">Payments Details</h2> <button to={"#"} className="btn btn-primary mb-2 rounded"

						onClick={() => sethideDetail(false)}>
						{/* <i className="las la-calendar scale5 me-3"></i> */}
						Show Summary</button></div>
				{!postModal ?
					<div className="card">
						<div className="card-header">
							<div className="row" style={{ width: "100%" }}>
								<div className="col-xl-5 ">
									<h4 className="card-title">Disbursements for {heretheNameToShow}</h4>
								</div>



								<div className="col-xl-3">
									<button

										className="btn btn-primary mb-2 btn-xs " onClick={() => setShowDibursements(!showDibursements)}>Toggle Disbursements</button>
								</div>
							</div>
						</div>



						<div className="card-body">
							<div className="row" style={{ width: "100%" }}>
								{/* <div className="col-xl-3 ">
					<h4 className="card-title">Added Buyers</h4>
					</div> */}
								{directors.length === 0 ?
									<RotateSpinner size={100} color="rgba(41, 106, 176,1)" /> : null}
							</div>
							{showDibursements ?
								(detailsOnly.length > 0 ?
									<TableExport
										exportColumns={[
											{ name: 'user', title: 'Added By' },
											{ name: 'apprefference', title: 'Application Ref.' },
											{ name: 'refference', title: 'Disbursement Ref.' },
											{ name: 'dateAdded', title: 'Disbursement Date' },
											{ name: 'recoveryMode', title: 'Recovery Mode' },

											{ name: 'amount', title: 'Disbursement Amount' },
											//   { name: 'hasDiff', title: 'Has Difference' },
											//   { name: 'byHowMuch', title: 'Difference Amount' },

											{ name: 'mode', title: 'Payment Mode' },
											// { name: 'actions', title: 'Actions' },
										]}
										exportRow={detailsOnly}
										rows={detailsOnly}
										groupSummaryItems={[{ columnName: "user", type: "count" }]}
										totalSummaryItems={[{ columnName: "user", type: "count" }]}
										//rows={this.state.colors[1]==="primary"?finished: dataTemp}
										columns={[
											{ name: 'recoveryMode', title: 'Recovery Mode' },
											{ name: 'user', title: 'Added By' },
											{ name: 'apprefference', title: 'Application Ref.' },
											{ name: 'refference', title: 'Disbursement Ref.' },
											{ name: 'dateAdded', title: 'Disbursement Date' },

											{ name: 'amount', title: 'Disbursement Amount' },
											//   { name: 'hasDiff', title: 'Has Difference' },
											//   { name: 'byHowMuch', title: 'Difference Amount' },

											{ name: 'mode', title: 'Payment Mode' },
											// { name: 'actions', title: 'Actions' },
										]}
										//  exportColumns={this.state.columns2}
										defaultExpandedGroups={[]}
										grouping={[]}
										defaultHiddenColumnNames={['hasDiff', 'byHowMuch']}
										defaultPageSize={0}
										hideSelectionExport
										infiniteScrolling
										fileName={"Disbursements for " + heretheNameToShow}


									/> : "No data received yet, please be patient ....")
								:
								(directors.length > 0 ? <TableExport
									hideDataExport={true}
									rows={directors}
									//rows={this.state.colors[1]==="primary"?finished: dataTemp}
									columns={[

										{ name: 'dateAdded', title: 'Application Date' },
										{ name: 'refference', title: 'Application Ref.' },
										{ name: 'client', title: 'Client' },
										{ name: 'buyername', title: 'Buyer' },
										{ name: 'combo', title: 'Amount' },
										// { name: 'currency', title: 'Currency' },
										{ name: 'checkDays', title: 'Status' },
										{ name: 'progress', title: 'Progress' },
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


								/> : "No data received yet, please be patient ....")
							}

						</div>

					</div> : <InvoiceDiscountingDialog
						key={bussinessObje.status}
						reloadMe={reloadMe}
						setPostModal={setPostModal}
						obj={bussinessObje}
					/>}
			</>
				:
				<div ref={componentRef}>
					<Dashboard
						theNameToShow={theNameToShow}
						getBuyersInfo={getBuyers}
						setAddFormDataTwo={setAddFormDataTwo}
						setRange={setRange}
						key={hideMenu}
						hideMenu={hideMenu}
						hideDetail={sethideDetail}
					/>
				</div>}
		</>
	)

}
export default FilteringTable;