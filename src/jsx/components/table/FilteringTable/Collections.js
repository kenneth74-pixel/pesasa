import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactToPrint from "react-to-print";
import Modal from 'react-bootstrap/Modal';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import swal from "sweetalert";
import {
	verifyProcess, getReimbursedClientApplications,

	deleteCollection,
	getClientDetail, getProcessComments, getCollectionsMapping
} from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import InvoiceDiscountingDialog from "./InvoiceDiscountingDialog3.js"
import {
	collect
} from "../../../../util/APIUtils.js";
import { RotateSpinner } from "react-spinners-kit";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import { format } from 'date-fns'
import Dashboard from "../../Dashboard/GeneralInfoDashBoard3.js"
//import './table.css';
import './filtering.css';
import { nationalities, countryCodes } from "./appData.js"

import DatePicker from "react-datepicker";
export const FilteringTable = () => {
	const [directors, setDirectors] = useState([]);
	const [detailsOnly, setdetailsOnly] = useState([]);
	const [buyers, setBuyers] = useState([]);
	const [range, setRange] = useState("currentMonth");
	const [isLoading, setisLoading] = useState(false);
	const [amountCollected, setAmountCollected] = useState("");
	const [bussinessObje, setbussinessObje] = useState({});
	const [clientDetail, setclientDetail] = useState({ buyers: [], docs: [], directors: [], creditlimit: {} });
	const [showEdit, setshowEdit] = useState(false);
	const [postModal2, setPostModal2] = useState(false);
	const [detailPart, setdetailPart] = useState({});
	const [comment, setcomment] = useState("");
	const [comments, setComments] = useState([]);
	const [hideMenu, setHideMenu] = useState(false);
	const componentRef = React.useRef(null);
	const [hideDetail, sethideDetail] = useState(false);
	const [heretheNameToShow, theNameToShow] = useState("");
	const [showReimburses, setShowReimburses] = useState(false);
	const [showDibursements, setShowDibursements] = useState(false);
	const [luObje, setLuObje] = useState({});
	const [datetoSend, setDatetoSend] = useState(new Date());
	const [myId, setMyId] = useState(null);



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



	const [reimburses, setReimburses] = useState([]);
	let [addFormDataTwo, setAddFormDataTwo] = useState({
		startDate: new Date(),
		endDate: new Date(),
		days: "",
		name: "days",
		year: new Date().getFullYear(),
		month: -1,
	});
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

	function deleteCollectionAsa(thei) {
		setisLoading(true)
		deleteCollection(thei)
			.then((response) => {
				setShowReimburses(false)
				setisLoading(false)
				swal('Success!', 'Successfully deleted collection', "success");
			})
			.catch((error) => {
				setisLoading(false)
				console.log(error);
				alert(error)
				// swal('Oops', error.message, "error");
			});
	}

	function getCollectionsHere(data, totalDisbursed) {
		setAmountCollected(0)
		setReimburses([])
		getCollectionsMapping(data)
			.then((response) => {
				const toAdd = []
				// alert(JSON.stringify(data.collections))
				// let total=0;
				response.map((option) => {
					// total=parseInt(parseInt(total)+parseInt(option.amount))
					// option.fineToPay=numberWithCommas(option?.fineToPay?.toString().toFixed(2))
					option.collType = option.isPastDue ? "Past Due" : "Normal Collection"
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')

					option.actions = <div>
						<button type="button"
							className="btn shadow btn-xs btn-secondary mt-4"

							onClick={() => {
								setshowEdit(true)
								setAmountCollected(totalDisbursed)
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
					option.amount = numberWithCommas(option.amount)
					toAdd.push(option)
				})

				// setreimburseTotal(data.netDis-data.balanceToDisburse)
				setshowEdit(false)
				setReimburses(toAdd)
			})
			.catch((error) => {
				setisLoading(false)
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}



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


	function sendReimburse() {
		// const pastDays=calculateDaysBetweenDates( reimburseData.dob2, new Date(props?.obj?.collectionDate))
		// const fineToPay=pastDays<0?(( (pastDays*-1 )*0.003*(props?.obj?.totalToDisburse-props?.obj?.paidSoFar)).toFixed(2)):0
		const amount = amountCollected.toString().split(",").join("")
		const dataSend = {
			id: myId,
			applicationId: null,
			amount: amount,
			dateAdded: datetoSend,
			isFullyCollected: true
		}
		// alert(JSON.stringify(dataSend))
		if (amountCollected === "") {
			swal('Oops', "Please add amount", "error");
		}
		else {
			setisLoading(true)
			collect(dataSend)
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
		getReimbursedClientApplications()
			.then((response) => {
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
					option.collType = option.isPastDue ? "Past Due" : "Normal Collection"
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)

					detailsOnly.push(option)
				})
				setdetailsOnly(detailsOnly)

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}

	function getBuyers() {

		addFormDataTwo.dataRange = range
		getReimbursedClientApplications(addFormDataTwo)
			.then((response) => {

				const dataReturn = []
				const detailsOnly = []
				response.dataReturn.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)

					dataReturn.push(option)
				})
				setDirectors(dataReturn)



				response.detailsOnly.map((option) => {
					option.collType = option.isPastDue ? "Past Due" : "Normal Collection"
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)

					detailsOnly.push(option)
				})
				setdetailsOnly(detailsOnly)

			})
			.catch((error) => {
				console.log(error);
				// swal('Oops', error.message, "error");
			});
	}


	comments.map((data) => {
		data.type = data.type === "VERIFIED" ? <div style={{ color: "green" }}>{data.type} <i className="fa fa-check"></i></div> : (data.type === "DECLINED" ? <div style={{ color: "red" }}>{data.type} <i className="fa fa-times"></i></div> : data.type)
		data.dateAdded = new Date(data.dateAdded).toDateString()
	})
	directors.map((data) => {
		//data.phone=data.code+data.phoneOne

		data.collectionDateDisplay = format(new Date(data.collectionDate), 'dd-MMM-yyyy')
		data.displayDate = format(new Date(data.dateAdded), 'dd-MMM-yyyy')
		data.displayAmt = data.currency + " " + data.amount

		data.add = data.city + " , " + data.country
		//data.dateAdd=data.dateAdded.split("T")[0];
		data.actions = <div className="">
			{data.type === "CLIENT_ADDED" ? null :
				<>
					<button type="button"
						className="btn btn-primary shadow btn-xs "

						onClick={() => openDetails(data)}
						data-dismiss="modal">
						{data.progress === "DISBURSED" || data.progress === "PARTIALY_COLLECTED" ? "Collect" : "Details"}
						{/* <i className="fa fa-eye"></i> */}
					</button>

				</>

			}


			<div className='mt-2'>
				<button type="button"
					className={"btn btn-success shadow btn-xs "}

					onClick={() => {
						getCollectionsHere(data.id, data.totalDisbursed)


						setShowReimburses(true)
						setLuObje(data)
					}}
					data-dismiss="modal">
					Collections
					{/* <i className="fa fa-eye"></i> */}
				</button>
			</div>
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


					<p>Client : {luObje.client}</p>

					<p>Application Ref : {luObje.refference}</p>

					<div className="row">
						<div className="col-lg-6 mb-2">
							<p>First disburment date: <b>
								{format(luObje.firstDisburseDate !== undefined ? new Date(luObje?.firstDisburseDate) : new Date(), 'dd-MMM-yyyy')}
							</b></p>
						</div>
						<div className="col-lg-6 mb-2">
							<p>Amount Disbursed : <b>{numberWithCommas(luObje.totalDisbursed)}</b></p>
						</div>
						<div className="col-lg-6 mb-2">
							<p>Finance Period : <b>{luObje.financePeriod}</b></p>
						</div>
						<div className="col-lg-6 mb-2">
							<p>Collection Due Date : <b>{luObje.collectionDateDisplay}</b></p>
						</div>
						<small >Collections Total: {numberWithCommas(luObje.totalCollected)}</small>
						{showEdit ?
							<div className='row mt-4' style={{ width: "100%", overflow: "hidden", paddingBottom: "10px", paddingTop: "10px", borderTop: "1px solid #666" }}>
								<div className="col-xl-12 col-xxl-12 mb-4 mt-4">Edit Collection</div>
								<div className="col-xl-5 col-xxl-5">
									<div className="form-group mb-3">
										<label className="text-black font-w500">Collection Amount</label>
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
									<div className="form-group mb-0">
										<label className="text-black font-w500">Collection Date</label>
										<DatePicker dateFormat='dd/MM/yyyy'
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

					</div>
					{/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
				</DialogTitle>
				<DialogContent

				>
					<TableExport

						hideDataExport={true}
						rows={reimburses}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						columns={[
							{ name: 'user', title: 'Added By' },
							{ name: 'refference', title: 'Collection Ref.' },
							{ name: 'dateAdded', title: 'Collection Date' },

							{ name: 'amount', title: 'Collection Amount' },

							{ name: 'collType', title: 'Collection Type' },
							{ name: 'daysDue', title: 'Past Due Days' },
							{ name: 'fineToPay', title: 'Past due fine' },
							{ name: 'actions', title: 'Actions' },
						]}
						//  exportColumns={this.state.columns2}
						defaultExpandedGroups={[]}
						grouping={[]}
						defaultHiddenColumnNames={['refference']}
						defaultPageSize={0}
						hideSelectionExport
						infiniteScrolling
					// fileName={"Directors"}


					/>


					<p>First disburment date: <b>
						{format(luObje.firstDisburseDate !== undefined ? new Date(luObje?.firstDisburseDate) : new Date(), 'dd-MMM-yyyy')}
					</b></p>
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
			<PageTitle activeMenu="Collections"
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
					className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head"><h2 className="font-w600 mb-2 me-auto">Collections Details</h2> <button to={"#"} className="btn btn-primary mb-2 rounded"

						onClick={() => sethideDetail(false)}>
						{/* <i className="las la-calendar scale5 me-3"></i> */}
						Show Summary</button></div>

				{!postModal ?
					<div className="card">
						<div className="card-header">
							<div className="row" style={{ width: "100%" }}>
								<div className="col-xl-5 ">
									<h4 className="card-title">Collections  for {heretheNameToShow}</h4>
								</div>



								<div className="col-xl-3">
									<button

										className="btn btn-primary mb-2 btn-xs " onClick={() => setShowDibursements(!showDibursements)}>Toggle Collections</button>
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
										columns={[
											{ name: 'user', title: 'Added By' },
											{ name: 'apprefference', title: 'Application Ref.' },
											{ name: 'dateAdded', title: 'Collection Date' },
											{ name: 'recoveryMode', title: 'Recovery Mode' },
											{ name: 'amount', title: 'Collection Amount' },
											{ name: 'hasDiff', title: 'Has Difference' },
											{ name: 'byHowMuch', title: 'Difference Amount' },
											{ name: 'collType', title: 'Collection Type' },
											{ name: 'daysDue', title: 'Past Due Days' },
											{ name: 'fineToPay', title: 'Past due fine' },
											// { name: 'actions', title: 'Actions' },
										]}
										groupSummaryItems={[{ columnName: "user", type: "count" }]}
										totalSummaryItems={[{ columnName: "user", type: "count" }]}
										exportColumns={[
											{ name: 'user', title: 'Added By' },
											{ name: 'apprefference', title: 'Application Ref.' },
											{ name: 'dateAdded', title: 'Collection Date' },
											{ name: 'recoveryMode', title: 'Recovery Mode' },
											{ name: 'amount', title: 'Collection Amount' },
											{ name: 'hasDiff', title: 'Has Difference' },
											{ name: 'byHowMuch', title: 'Difference Amount' },

											{ name: 'collType', title: 'Collection Type' },
											{ name: 'daysDue', title: 'Past Due Days' },
											{ name: 'fineToPay', title: 'Past due fine' },
											// { name: 'actions', title: 'Actions' },
										]}
										exportRow={detailsOnly}
										rows={detailsOnly}
										//rows={this.state.colors[1]==="primary"?finished: dataTemp}
										//  exportColumns={this.state.columns2}
										defaultExpandedGroups={[]}
										grouping={[]}
										defaultHiddenColumnNames={[]}
										defaultPageSize={0}
										hideSelectionExport
										infiniteScrolling
										fileName={"Collections for " + heretheNameToShow}


									/> : "No data received yet, please be patient ....")
								:
								(directors.length > 0 ? <TableExport
									hideDataExport={true}
									rows={directors}
									//rows={this.state.colors[1]==="primary"?finished: dataTemp}
									columns={[

										{ name: 'displayDate', title: 'Application Date' },
										{ name: 'refference', title: 'Application Ref.' },
										{ name: 'client', title: 'Client' },
										{ name: 'buyername', title: 'Buyer' },
										{ name: 'displayAmt', title: 'Amount' },
										{ name: 'collectionDateDisplay', title: 'Collection Due Date' },
										{ name: 'status', title: 'Status' },
										{ name: 'hasPastDue', title: 'Has Past Due' },
										{ name: 'progress', title: 'Progress' },
										{ name: 'actions', title: 'Actions' },
									]}
									//  exportColumns={this.state.columns2}
									defaultExpandedGroups={[]}
									grouping={[]}
									defaultHiddenColumnNames={['status']}
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