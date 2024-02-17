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
import { verifyProcess, getAllClientApplicationsReport, getClientDetail, getProcessComments } from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import InvoiceDiscountingDialog from "./InvoiceDiscountingDialogReports.js"
import BankDetail from "./BankDetail"
import { RotateSpinner } from "react-spinners-kit";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
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
		getAllClientApplicationsReport()
			.then((response) => {
				response.map((option) => {
					option.dateAdded = new Date(option.dateAdded).toDateString()
					option.amount = numberWithCommas(option.amount)
					if (id === option.id) {
						setbussinessObje(option)
					}
				})
				setDirectors(response)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}

	function getBuyers() {
		getAllClientApplicationsReport()
			.then((response) => {
				response.map((option) => {
					option.dateAdded = new Date(option.dateAdded).toDateString()
					option.amount = numberWithCommas(option.amount)
					option.dd = option.detailProgress.dateAdded === null ? "None" : new Date(option.detailProgress.dateAdded).toDateString()
					option.rdd = option.repayDueDate === null ? "None" : new Date(option.repayDueDate).toDateString()
					option.ard = option.actualPayDate === null ? "None" : new Date(option.actualPayDate).toDateString()
					option.discountAmountC = numberWithCommas(option.discountAmount)
					option.discountAmountC = numberWithCommas(option.discountAmount)
					option.bankCharge = numberWithCommas(option.bankCharge)
					option.fine = numberWithCommas(Math.round(option.fine))

					// option.actions=  <button className="btn btn-success" onClick={()=> setAddFormDataOption(option)}  >
					// Details

					//  </button>
				})
				setDirectors(response)
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
	const exportData = []
	directors.map((data) => {
		//data.phone=data.code+data.phoneOne
		data.add = data.city + " , " + data.country
		//data.dateAdd=data.dateAdded.split("T")[0];
		//exportData.push(data)
		data.actions = <div className="d-flex">
			{data.type === "CLIENT_ADDED" ? null :
				<>
					<button type="button"
						className="btn btn-primary shadow btn-xs "

						onClick={() => openDetails(data)}
						data-dismiss="modal">
						{data.progress === "DISBURSED" ? "Collect" : "Details"}
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


	function changeSelection() { }

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
	const columnsG = [

		{ name: 'dateAdded', title: 'Date' },
		{ name: 'client', title: 'Client' },
		{ name: 'buyername', title: 'Buyer' },
		{ name: 'invoiceNo', title: 'Invoice No.' },
		{ name: 'currency', title: 'Currency' },
		{ name: 'amount', title: 'Amount' },
		{ name: 'dd', title: 'Disbursement Date' },
		{ name: 'tenor', title: 'Finance Tenor' },
		{ name: 'rdd', title: 'Repayment Due Date' },
		{ name: 'ard', title: 'Actual Repayment Date' },
		{ name: 'actualTenorDays', title: 'Actual Repayment Tenor' },
		{ name: 'pastDueDays', title: 'Number Of Past Due Days' },
		{ name: 'discountAmountC', title: 'Discount Amount' },
		{ name: 'naf', title: 'Net Advance Fees' },
		{ name: 'fine', title: 'Past Due Penalty Fee' },
		{ name: 'rebate', title: 'Rebate' },
		{ name: 'bankCharge', title: 'Bank Fees' },
		//{ name: 'cofp', title: 'Cost Of Funds %age' },
		//{ name: 'cofa', title: 'Cost Of Funds Amount' },
		//{ name: 'gp', title: 'Gross Profit' },
		{ name: 'comment', title: 'Comments' },
		{ name: 'status', title: 'Status' },
		{ name: 'progress', title: 'Progress' },
		{ name: 'actions', title: 'Actions' },
	]
	return (
		<>

			<PageTitle activeMenu="Reports"
				motherMenu="Loans"
			/>
			{!postModal ?
				<div className="card">
					<div className="card-header">
						<div className="row" style={{ width: "100%" }}>
							<div className="col-xl-5 ">
								<h4 className="card-title">Reports</h4>
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
						</div>

						<TableExport

							defaultHiddenColumnNames={[

							]}
							rows={directors}
							exportRow={exportData} // row without component (raw data)
							// grouping={[{ columnName: "sup" }]} // default grouping
							columns={columnsG} // Display columns
							exportColumns={columnsG} //prefared columns for export
							defaultPageSize={0} // if u have a prefered number of rows to be displayed
							//defaultSorting={[{ columnName: 'studentName', direction: 'asc' }]} // your default sorting e.g [{ columnName: 'city', direction: 'asc' }]

							defaultColumnWidths={[]} //enables resizing of columns [{ columnName: 'name', width: 350 }, columnName: 'reviewDate', width: 350  }, ]
							defaultOrder={[]} /// enables reodering of colums  e.g ['campus','program','abbreviation','studyTime','name','reviewDate','action']
							fileName={
								"Pesasa Back Office"
							} //name of the xlsx file
							selection={[]}
							// rightColumns={["action"]} //fixing right columns
							changeSelection={changeSelection}
							passSelection={(x) => this.passSelection(x)}
							// selection= {this.changeSelection}
							infiniteScrolling // for scrolling with in de table
							totalSummaryItems={[]}
							//             { columnName: 'creditUnit', type: 'max' },
							//             { columnName: 'creditUnit', type: 'sum' },
							//           ]}
							//           tableColumnExtensions={[{ columnName: 'creditUnit', align: 'right' },]}

							// summary for groupings
							groupSummaryItems={[]}
							showColumnsWhenGrouped //it show columns even after grouping




						//rows={directors}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						//columns={}
						//  exportColumns={this.state.columns2}
						// defaultExpandedGroups={[]}
						//  grouping ={[]}
						//   defaultHiddenColumnNames={[]}
						//    defaultPageSize={0}
						//   hideSelectionExport
						//      infiniteScrolling
						//  fileName={"Directors"}


						/>

					</div>

				</div> : <InvoiceDiscountingDialog
					key={bussinessObje.status}
					reloadMe={reloadMe}
					setPostModal={setPostModal}
					obj={bussinessObje}
				/>}
		</>
	)

}
export default FilteringTable;