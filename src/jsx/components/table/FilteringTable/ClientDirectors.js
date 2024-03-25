import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import swal from "sweetalert";
import { addClientDirector, getClientDirectors, deleteClientDirector, getProcessComments } from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import { RotateSpinner } from "react-spinners-kit";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button } from "react-bootstrap";
import Select from "react-select";
//import './table.css';
import './filtering.css';
import { nationalities, countryCodes } from "./appData.js"

import DatePicker from "react-datepicker";
export const FilteringTable = () => {

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
	const [directors, setDirectors] = useState([]);
	const [postModal2, setPostModal2] = useState(false);
	const [comments, setComments] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [addFormData, setAddFormData] = useState({
		id: null,
		fname: '',
		lname: '',
		employeeStatus: '',
		oname: '',
		gender: '',
		nationality: '',
		nid: '',
		marital: 'Single',
		image: '',
		depend: '',
		email: '',
		number: '',
		town: '',
		street: '',
		code: '',
		country: 'Uganda',
		password: "changemenow",
		city: '',
		accountStatus: 'ACTIVE',
		dob: new Date()
	});

	function getComments(data) {
		setComments([])
		getProcessComments(data)
			.then((response) => {
				setComments(response)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
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
	}


	function updateData(userData) {
		userData.dob = new Date(userData.dob)
		console.log(userData)
		setAddFormData(userData)
		setPostModal(true)
	}
	function addD() {

		setAddFormData(
			{
				id: null,
				fname: '',
				lname: '',
				oname: '',
				gender: '',
				nationality: '',
				nid: '',
				marital: 'Single',
				image: '',
				depend: '',
				email: '',
				number: '',
				town: '',
				street: '',
				code: '',
				country: 'Uganda',
				password: "changemenow",
				city: '',
				accountStatus: 'ACTIVE',
				dob: new Date()
			}
		)
		setPostModal(true)
	}

	directors.map((data, key) => {

		data.name = data.lname + " " + data.fname
		data.dateAdd = data.dateAdded.split("T")[0];
		data.actions = <div className="d-flex">
			<button type="button"
				className="btn btn-primary shadow btn-xs sharp me-1"
				onClick={() => updateData(data)} data-dismiss="modal">

				<i className="fa fa-pencil"></i>
			</button>
			{/* <Link
                          href="#"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                         
                        </Link> */}
			<button
				onClick={() =>
					swal({
						title: "Are you sure?",
						text:
							"Once deleted, you will not be able to recover this information!",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					}).then((willDelete) => {
						if (willDelete) {

							deleteClientDirector(data.id)
								.then((response) => {
									swal("Poof! Director record has been deleted!", {
										icon: "success",
									});
									getTheDirectors()

								})
								.catch((error) => {
									console.log(error);
									swal('Oops', error.message, "error");
								});

						} else {
							swal("Your information is safe!");
						}
					})
				}
				className="btn btn-danger shadow btn-xs sharp"
			>
				<i className="fa fa-trash"></i>
			</button>

			<button type="button"
				style={{ marginLeft: "5px" }}
				className="btn btn-success shadow btn-xs sharp me-1"
				onClick={() => openDetails2(data, "directors")}
				data-dismiss="modal">

				<i className="fa fa-eye"></i>
			</button>

			{/* <Button 
            onClick={()=> openDetails2(data, "directors")} 
           
         style={{marginLeft:"10px"}}
           variant="success btn-xxs">View Approval Detail</Button> */}


		</div>
	})
	function getTheDirectors() {
		getClientDirectors()
			.then((response) => {
				setDirectors(response)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}

	useEffect(() => {
		getTheDirectors()
		//chackboxFun();
	}, []);



	function range(start, end) {
		const theYears = []

		for (var m = start; m < end; m++) {
			theYears.push(m)
		}
		theYears.push(end);
		return theYears;
	}

	function getYear(date) {

	}
	const years = range(1920, (new Date()).getFullYear());
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

	const codes = countryCodes.map(data => (
		{ value: data.dial_code, label: data.name + " (" + data.dial_code + " )" }
		// <option value={data.dial_code} > {" "+data.name+" ("+data.dial_code+" )"}</option>
	))

	const country = countryCodes.map(data => (

		<option value={data.name} > {" " + data.name + " "}</option>
	))


	const nationalitiesMap = nationalities.map(data => (
		{ value: data, label: data }
		//  <option value={data} >{data}</option>
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


	function calculateAge(birthday) { // birthday is a date
		var ageDifMs = Date.now() - birthday;
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 2021);
	}

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	}

	//Add Submit data
	const handleAddFormSubmit = (event) => {
		event.preventDefault();
		var error = false;
		var errorMsg = '';
		addFormData.actions = ""
		const age = calculateAge(addFormData.dob);
		// alert(addFormData.dob + " and " + age)
		if (addFormData.fname === "") {
			error = true;
			errorMsg = 'Please fill First name';
		} else if (addFormData.lname === "") {
			error = true;
			errorMsg = 'Please fill Surname name.';
		}
		else if (addFormData.gender === "") {
			error = true;
			errorMsg = 'Please add gender';
		}
		else if (addFormData.nid === "") {
			error = true;
			errorMsg = 'Please add National Identification No. (NIN) / Passport No';
		}

		// else if(age<18){
		// 	error = true;
		// 	errorMsg = 'Age cannot be below 18, check date of birth';

		// }

		else if (addFormData.depend === "") {
			error = true;
			errorMsg = 'Please add no. of dependants';
		}


		else if (addFormData.email === "") {
			error = true;
			errorMsg = 'Please add email';
		}

		else if (!validateEmail(addFormData.email)) {

			error = true;
			errorMsg = 'Invalid email address';
		}

		else if (addFormData.number === "") {
			error = true;
			errorMsg = 'Please add phone number';
		}



		else if (addFormData.city === "") {
			error = true;
			errorMsg = 'Please add city of residence';
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
			setisLoading(true)
			addClientDirector(addFormData)
				.then((response) => {
					setisLoading(false)
					setPostModal(false);
					swal('Good job!', 'Successfully Added', "success");
					getTheDirectors()

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

	const handleDateChange = (event) => {
		//	alert(JSON.stringify(event))
		// event.preventDefault();    
		const fieldName = "dob";
		const fieldValue = event;
		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;
		setAddFormData(newFormData);
	};

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance


	const { globalFilter, pageIndex } = state
	comments.map((data) => {
		data.type = data.type === "VERIFIED" ? <div style={{ color: "green" }}>{data.type} <i className="fa fa-check"></i></div> : (data.type === "DECLINED" ? <div style={{ color: "red" }}>{data.type} <i className="fa fa-times"></i></div> : data.type)
		data.dateAdded = new Date(data.dateAdded).toDateString()
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
				open={postModal2}
				onClose={setPostModal2}
			>

				<DialogTitle>
					<h4 >Approval Detail</h4>



					{/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
				</DialogTitle>
				<DialogContent

				>
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

				</DialogContent>

				<DialogActions style={{ width: "100%", overflow: "hidden" }}>

					<button type="button"
						className="btn shadow btn-xs btn-primary"

						onClick={() => setPostModal2(false)}
						data-dismiss="modal">
						Close
					</button>

				</DialogActions>
			</Dialog>
			<PageTitle activeMenu="Directors" motherMenu="Company Staff" />
			<div className="card">
				<div className="card-header">
					<div className="row">
						<div className="col-xl-3 col-xxl-6">
							<h4 className="card-title">Company Directors</h4>
						</div>
						<div className="col-xl-3 col-xxl-6">
							<Link className="btn btn-primary font-w600 mb-2 me-auto" onClick={() => addD()}>+ Add New Director</Link>
						</div>
					</div>
				</div>



				<div className="card-body">

					<TableExport
						hideDataExport={true}
						rows={directors}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						columns={[
							{ name: 'dateAdd', title: 'Date Added' },
							{ name: 'addedBy', title: 'Added By' },
							{ name: 'name', title: 'Name' },
							{ name: 'email', title: 'Email' },

							{ name: 'accountStatus', title: 'Status' },
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

				<Modal
					//className="modal fade"
					className="fade bd-example-modal-lg"

					size="lg"
					show={postModal} onHide={setPostModal} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">Add Director</h4>
									<button type="button" className="btn-close" onClick={() => setPostModal(false)} data-dismiss="modal"></button>
								</div>
								<div className="modal-body">
									<i className="flaticon-cancel-12 close"></i>
									<div className="add-contact-box">
										<div className="add-contact-content">
											{/* <div className="image-placeholder">	
												<div className="avatar-edit">
													<input type="file" onChange={fileHandler} id="imageUpload" 
														onClick={(event) => setFile(event.target.value)}
													/> 					
													<label htmlFor="imageUpload" name=''  ></label>
												</div>
												<div className="avatar-preview">
													<div id="imagePreview">
														<img id="saveImageFile" src={file? URL.createObjectURL(file) : user} 
															alt={file? file.name : null}
														/>
													</div>
												</div>
											</div>  */}
											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">First Name</label>
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
												</div>

												<div className="col-xl-6 col-xxl-6">

													<div className="form-group mb-3">
														<label className="text-black font-w500">Surname</label>
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
												</div>
											</div>



											<div className="row">
												<div className="col-xl-6 col-xxl-6">
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

												<div className="col-xl-6 col-xxl-6">

													<div className="form-group mb-3">
														<label className="text-black font-w500">Gender</label>
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
												</div>
											</div>


											<div className="col-xl-6 col-xxl-6">

												<div className="form-group mb-3">
													<label className="text-black font-w500">Employement Type / Status (self employed)</label>
													<div className="contact-name">
														<input type="text"
															value={addFormData.employeeStatus}
															className="form-control" autoComplete="off"
															name="Emstatus" required="required"
															onChange={handleAddFormChange}
															placeholder="Employement Status"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
											</div>




											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Nationality</label>
														<div className="form-group mb-3">

															<Select
																value={
																	addFormData.nationality === "" ? "" : { value: addFormData.nationality, label: addFormData.nationality }
																}
																onChange={(val) => {
																	const newFormData = { ...addFormData };
																	newFormData.nationality = val.value;
																	setAddFormData(newFormData);
																}}
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
																options={nationalitiesMap}
															/>

															{/* <select
					value={addFormData.nationality}
					name="nationality"
					onChange={handleAddFormChange}
                      defaultValue={"Ugandan"}
                      className="form-control"
                      id="sel1"
                    >
                     {nationalitiesMap}
                    </select> */}
														</div>
													</div>
												</div>

												<div className="col-xl-6 col-xxl-6">

													<div className="form-group mb-3">
														<label className="text-black font-w500">National Identification No. (NIN) / Passport No</label>
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

											</div>


											{/* <div className="row">
				<div className="col-xl-6 col-xxl-6">
											 <div className="form-group mb-3">
												<label className="text-black font-w500">Tax Identification Number (TIN)</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autoComplete="off"
													value={addFormData.tin}
														name="tin" required="required"
                                                        onChange={handleAddFormChange}
														placeholder="Tax Identification Number (TIN)"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											</div>

											<div className="col-xl-6 col-xxl-6">

                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Surname</label>
												<div className="contact-name">
													<input type="text" 
													value={addFormData.lname}
													className="form-control"  autoComplete="off"
														name="lname" required="required"
                                                        onChange={handleAddFormChange}
														placeholder="Surname"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											</div>
											</div> */}





											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Marital Status</label>
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
												</div>

												<div className="col-xl-6 col-xxl-6">

													<div className="form-group mb-3">
														<label className="text-black font-w500">Date Of Birth</label>
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

																	placeholder="D.O.B"
																	name="dob"
																	selected={addFormData.dob}
																	//value={new Date()}
																	onChange={handleDateChange}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>



											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">No. Of Dependants</label>
														<div className="contact-name">
															<input type="number"
																value={addFormData.depend}
																className="form-control" autoComplete="off"
																name="depend" required="required"
																onChange={handleAddFormChange}
																placeholder="No. Of Dependants"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>

												<div className="col-xl-6 col-xxl-6">

													<div className="form-group mb-3">
														<label className="text-black font-w500">Email</label>
														<div className="contact-name">
															<input type="text"
																value={addFormData.email}
																className="form-control" autoComplete="off"
																name="email" required="required"
																onChange={handleAddFormChange}
																placeholder="Email"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>
											</div>



											<div className="row">
												<div className="col-xl-4 col-xxl-4">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Country Code</label>
														<div className="form-group mb-3">

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

															{/* <select
					value={addFormData.code}
					name="code"
					onChange={handleAddFormChange}
                      defaultValue={"+256"}
                      className="form-control"
                    >
                     {codes}
                    </select> */}
														</div>
													</div>
												</div>

												<div className="col-xl-8 col-xxl-8">

													<div className="form-group mb-3">
														<label className="text-black font-w500">Phone Number</label>
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

											<div className="row">
												<div className="col-xl-4 col-xxl-4">
													<h3>Address</h3>
												</div>
											</div>


											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Country</label>
														<div className="contact-name">
															<select
																value={addFormData.country}
																name="country"
																onChange={handleAddFormChange}
																defaultValue={"Uganda"}
																className="form-control"
															>
																{country}
															</select>
														</div>
													</div>
												</div>

												<div className="col-xl-6 col-xxl-6">

													<div className="form-group mb-3">
														<label className="text-black font-w500">City</label>
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
											</div>



											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Town</label>
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

												<div className="col-xl-6 col-xxl-6">

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
											</div>



											{/* <div className="row">
					<div className="col-xl-6 col-xxl-6">
											 <div className="form-group mb-3">
												<label className="text-black font-w500">Account Status</label>
												<div className="form-group mb-3">
                    
                    <select
					defaultValue={'ACTIVE'}
					name="accountStatus"
					value={addFormData.accountStatus}
					onChange={handleAddFormChange}
                      className="form-control"
                    >
                     <option value="ACTIVE">Active</option>
					 <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
											</div>
											</div>

										
											</div> */}


										</div>
									</div>
								</div>
								<div className="modal-footer">
									{isLoading ? <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
										<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>{addFormData.id === null ? "Add" : "Update"} Director</button>}
									<button type="button" onClick={() => setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>
								</div>
							</form>

						</div>
					</div >
				</Modal >
			</div >
		</>
	)

}
export default FilteringTable;