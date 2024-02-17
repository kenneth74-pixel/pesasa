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
import { verifyProcess, getAllClientApplicationsSeparated, getClientDetail, getProcessComments } from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import InvoiceDiscountingDialog from "./InvoiceDiscountingDialog.js"
import Dashboard from "../../Dashboard/GeneralInfoDashBoard.js"
import BankDetail from "./BankDetail"
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
import ReactToPrint from "react-to-print";
import DatePicker from "react-datepicker";
export const FilteringTable = () => {
	const [directors, setDirectors] = useState([]);
	const [oldData, setOldData] = useState([]);
	const [hideMenu, setHideMenu] = useState(false);
	const [range, setRange] = useState("currentMonth");
	const [buyers, setBuyers] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [showNew, setshowNew] = useState(true);
	const [theName, setName] = useState("");


	const [activeToggle, setActiveToggle] = useState("aboutMe");
	const [bussinessObje, setbussinessObje] = useState({});
	const [clientDetail, setclientDetail] = useState({ buyers: [], docs: [], directors: [], creditlimit: {} });
	const [viewMore, setviewMore] = useState(false);
	const [postModal2, setPostModal2] = useState(false);
	const [detailPart, setdetailPart] = useState({});
	const [comment, setcomment] = useState("");
	const [comments, setComments] = useState([]);
	const [hideDetail, sethideDetail] = useState(false);
	const componentRef = React.useRef(null);
	const reactToPrintContent = React.useCallback(() => {
		return componentRef.current;
	}, [componentRef.current]);
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
		addFormDataTwo.payload = range
		getAllClientApplicationsSeparated(addFormDataTwo)
			.then((response) => {
				response.newApps.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)
					if (id === option.id) {
						setbussinessObje(option)
					}
				})

				response.oldApps.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)
					if (id === option.id) {
						setbussinessObje(option)
					}
				})
				setDirectors(response.newApps)
				setOldData(response.oldApps)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}

	function getBuyers() {
		addFormDataTwo.dataRange = range
		//let sendMe={dataRange:range};
		//	alert("hey "+JSON.stringify(addFormDataTwo))
		getAllClientApplicationsSeparated(addFormDataTwo)
			.then((response) => {
				setName(response.name)
				//alert(JSON.stringify(response))
				response.newApps.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)
				})

				response.oldApps.map((option) => {
					option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
					option.amount = numberWithCommas(option.amount)
				})

				setDirectors(response.newApps)
				setOldData(response.oldApps)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				alert(JSON.stringify(error))
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}


	comments.map((data) => {
		data.type = data.type === "VERIFIED" ? <div style={{ color: "green" }}>{data.type} <i className="fa fa-check"></i></div> : (data.type === "DECLINED" ? <div style={{ color: "red" }}>{data.type} <i className="fa fa-times"></i></div> : data.type)
		data.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
	})
	directors.map((data) => {
		//data.phone=data.code+data.phoneOne
		data.add = data.city + " , " + data.country
		//data.dateAdd=data.dateAdded.split("T")[0];

		data.checkDays = <div><div>{data.status}</div>
			{data.daysPast > 0 ? <div>{data.daysPast} days past</div> : null}
		</div>
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


	const exportRowData = [];
	oldData.map((data) => {
		// console.log("check this ", data)
		const exportDude = {
			dateAdded: data.dateAdded,
			client: data.client,
			buyername: data.buyername,
			amount: data.amount,
			currency: data.currency,
			recoveryMode: data.recoveryMode,
			checkDays: data.checkDays,
			refference: data.refference
		}
		exportDude.actions = ""
		exportDude.checkDays = ""
		exportRowData.push(exportDude)
		//data.phone=data.code+data.phoneOne
		data.add = data.city + " , " + data.country
		//data.dateAdd=data.dateAdded.split("T")[0];

		data.checkDays = <div><div>{data.status}</div>
			{data.daysPast > 0 ? <div>{data.daysPast} days past</div> : null}
		</div>
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
		//getBuyers()
		//chackboxFun();
	}, []);


	const handleBeforePrint = React.useCallback(() => {
		//console.log("`onBeforePrint` called");
		setHideMenu(false)

	}, []);

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

			<PageTitle activeMenu="Applications"
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
					className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head"><h2 className="font-w600 mb-2 me-auto">Applications Details</h2> <button to={"#"} className="btn btn-primary mb-2 rounded"

						onClick={() => sethideDetail(false)}>
						{/* <i className="las la-calendar scale5 me-3"></i> */}
						Show Summary</button></div>
				<div style={{ width: "100%", textAlign: "right", marginBottom: "30px" }}>


				</div>
				{!postModal ?
					<div className="card">
						<div className="card-header">

							<div className="row" style={{ width: "100%" }}>
								{/* <div className="col-xl-9 "> </div>
				<div className="col-xl-3 "> 		</div> */}
								<div className="col-xl-5 ">
									<h4 className="card-title">Invoice Discount Applications</h4>
									<p style={{ color: "black" }}>Showing {showNew ? "Pending " : "Verified"} Records For {theName}</p>
									<h6>
										<div style={{ marginTop: "10px" }}>
											<button to={"#"} className="btn btn-primary  shadow btn-xs "

												onClick={() => setshowNew(true)}>
												{/* <i className="las la-calendar scale5 me-3"></i> */}
												View Pending</button>

											<button to={"#"} style={{ marginLeft: "10px" }} className="btn btn-success  shadow btn-xs "

												onClick={() => setshowNew(false)}>
												{/* <i className="las la-calendar scale5 me-3"></i> */}
												View Verified</button>
										</div>
									</h6>
								</div>



								{/* <div className="col-xl-3">
					<button
					
					 className="btn btn-primary font-w600 mb-2 me-auto" onClick={()=> addD()}>Add New Buyer</button>
					</div> */}


							</div>
						</div>



						<div className="card-body">
							<div className="row" style={{ width: "100%" }}>
								{/* <div className="col-xl-3 ">
					<h4 className="card-title">Added Buyers</h4>
					</div> */}
								{oldData.length === 0 && !showNew ?
									<RotateSpinner size={100} color="rgba(41, 106, 176,1)" /> : null}
							</div>

							{oldData.length === 0 && !showNew ?
								"No data received yet, please be patient ...." :
								<TableExport
									// hideDataExport={true}
									rows={showNew ? directors : oldData}
									//rows={this.state.colors[1]==="primary"?finished: dataTemp}
									columns={[

										{ name: 'dateAdded', title: 'Application Date' },
										{ name: 'refference', title: 'Application Refference' },
										{ name: 'client', title: 'Client' },
										{ name: 'buyername', title: 'Buyer' },
										{ name: 'amount', title: 'Amount' },
										{ name: 'currency', title: 'Currency' },
										{ name: 'recoveryMode', title: 'Recovery Mode' },
										{ name: 'checkDays', title: 'Status' },
										{ name: 'actions', title: 'Actions' },
									]}
									exportColumns={[{ name: 'dateAdded', title: 'Application Date' },
									{ name: 'refference', title: 'Application Refference' },

									{ name: 'client', title: 'Client' },
									{ name: 'buyername', title: 'Buyer' },
									{ name: 'amount', title: 'Amount' },
									{ name: 'currency', title: 'Currency' },
									{ name: 'recoveryMode', title: 'Recovery Mode' },
									{ name: 'checkDays', title: 'Status' }]}
									exportRow={exportRowData}
									defaultExpandedGroups={[]}
									grouping={[]}
									defaultHiddenColumnNames={[]}
									defaultPageSize={0}
									hideSelectionExport
									infiniteScrolling
									fileName={"Applications For " + theName}


								/>}

						</div>

					</div> : <InvoiceDiscountingDialog
						key={bussinessObje.status}
						reloadMe={reloadMe}
						setPostModal={setPostModal}
						obj={bussinessObje}
					/>}
			</> :
				<div ref={componentRef}>
					<Dashboard
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