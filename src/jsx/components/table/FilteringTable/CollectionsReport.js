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
import { verifyProcess, getReimbursedClientApplications, getClientDetail, getProcessComments } from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import InvoiceDiscountingDialog from "./InvoiceDiscountingDialog3.js"
import BankDetail from "./BankDetail"
import { RotateSpinner } from "react-spinners-kit";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import { format } from 'date-fns'
import Dashboard from "../../Dashboard/DashboardCollectionsReport.js"
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
	const [activeToggle, setActiveToggle] = useState("aboutMe");
	const [bussinessObje, setbussinessObje] = useState({});
	const [clientDetail, setclientDetail] = useState({ buyers: [], docs: [], directors: [], creditlimit: {} });
	const [viewMore, setviewMore] = useState(false);
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

	const [reimburses, setReimburses] = useState([]);
	let [addFormDataTwo, setAddFormDataTwo] = useState({
		startDate: new Date(),
		endDate: new Date(),
		days: "",
		name: "days",
		// year: new Date().getFullYear(),
		year: 2023,
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
		getReimbursedClientApplications()
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
				swal('Oops', error.message, "error");
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

			{data.collections.length > 0 ?
				<div className='mt-2'>
					<button type="button"
						className={"btn btn-success shadow btn-xs "}

						onClick={() => {
							const toAdd = []
							// alert(JSON.stringify(data.collections))
							// let total=0;
							data.collections.map((option) => {
								// total=parseInt(parseInt(total)+parseInt(option.amount))
								option.fineToPay = numberWithCommas(option.fineToPay.toFixed(2))
								option.collType = option.isPastDue ? "Past Due" : "Normal Collection"
								option.dateAdded = format(new Date(option.dateAdded), 'dd-MMM-yyyy')
								option.amount = numberWithCommas(option.amount)
								// option.refference=option.refference
								toAdd.push(option)
							})

							// setreimburseTotal(data.netDis-data.balanceToDisburse)
							setReimburses(toAdd)
							setShowReimburses(true)
							setLuObje(data)
						}}
						data-dismiss="modal">
						Collections
						{/* <i className="fa fa-eye"></i> */}
					</button>
				</div> : null}
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
			</div>
		</>
	)

}
export default FilteringTable;