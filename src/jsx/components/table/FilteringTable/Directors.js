import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import swal from "sweetalert";
import { addDirector, getDirectors, deleteDirector, resetPasswordDirector } from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";


//import './table.css';
import './filtering.css';
import { nationalities, countryCodes } from "./appData.js"

import DatePicker from "react-datepicker";
export const FilteringTable = () => {
	const [directors, setDirectors] = useState([]);

	const [fakeDirec, setfakeDirec] = useState([
		{
			accountStatus: "ACTIVE",
			lastLogin: "14th Aug, 2023 8:31 PM",
			priv: "Admin (Full)",
			role: "CTO",
			email: "Kayemba.j@kamrocapital.com",
			lname: "Jonathan",
			fname: "Kayemba",
			addedBy: "Jonathan Kayemba",
			createdAt: "2021-08-13",
		},
		{
			accountStatus: "ACTIVE",
			lastLogin: "14th Aug, 2023 12:08 PM",
			priv: "Admin (Limited)",
			role: "Software Developer",
			email: "support@pesasa.net",
			lname: "Mark",
			fname: "Kugonza",
			addedBy: "Jonathan Kayemba",
			createdAt: "2021-09-13",
		},
		{
			accountStatus: "ACTIVE",
			lastLogin: "12th Aug, 2023 10:15 AM",
			priv: "Back Office (Full)",
			role: "CEO",
			email: "Kamanyi.r@kamrocapital.com",
			lname: "Robert",
			fname: "Kamanyi",
			addedBy: "Jonathan Kayemba",
			createdAt: "2021-12-07",
		},
		{
			accountStatus: "ACTIVE",
			lastLogin: "12th Aug, 2023 10:45 AM",
			priv: "Back Office (Full)",
			role: "COO",
			email: "waswa.s@kamrocapital.com",
			lname: "C-Section",
			fname: "(Approvers)",
			addedBy: "Jonathan Kayemba",
			createdAt: "2021-12-07",
		},
		{
			accountStatus: "ACTIVE",
			lastLogin: "14th Aug, 2023 05:09 PM",
			priv: "Back Office (Limited)",
			role: "ABSA",
			email: "info@kamrocapital.com ",
			lname: "Patience",
			fname: "Adong",
			addedBy: "Jonathan Kayemba",
			createdAt: "2022-01-18",
		}
	]);

	const [addFormData, setAddFormData] = useState({
		id: null,
		fname: '',
		lname: '',
		oname: '',
		gender: '',
		nationality: 'Ugandan',
		employeeStatus: 'Self Employed',
		nid: '',
		marital: 'Single',
		image: '',
		depend: '',
		email: '',
		number: '',
		town: '',
		street: '',
		code: '+256',
		country: 'Uganda',
		password: "changemenow",
		city: '',
		accountStatus: 'ACTIVE',
		dob: new Date()
	});


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
				nationality: 'Ugandan',
				nid: '',
				marital: 'Single',
				image: '',
				depend: '',
				email: '',
				number: '',
				town: '',
				street: '',
				code: '+256',
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
		data.acc = (<div>
			<div><b>Status:</b> {data.accountStatus}</div>
			{/* <div><b>Last Login:</b> {data.lastLogin}</div> */}
		</div>),
			data.user = (<div>
				<div><b>Name:</b> {data.lname + " " + data.fname}</div>
				<div>{data.email}</div>
			</div>)
		data.name = data.lname + " " + data.fname
		data.dateAdd = (
			<div>
				<div><b>Created At: </b> {data.dateAdded.split("T")[0]}</div>
				<div><b>Added By: </b> {data.addedBy}</div>
				{/* <div><b>Created At: </b> {data.dateAdded.split("T")[0]}</div>
<div><b>Added By: </b> {data.addedBy.split("T")[0]}</div> */}
			</div>
		);
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

							deleteDirector(data.id)
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



			<button
				style={{ marginLeft: "5px" }}
				onClick={() =>
					swal({
						title: "Resetting Password",
						text:
							"Once pasword is reset, you will not be able to recover the old password!",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					}).then((willDelete) => {
						if (willDelete) {

							resetPasswordDirector(data.id)
								.then((response) => {
									swal("Password has been reset!", {
										icon: "success",
									});
									getTheDirectors()

								})
								.catch((error) => {
									console.log(error);
									swal('Oops', error.message, "error");
								});

						} else {
							swal("Pasword not changed!");
						}
					})
				}
				className="btn btn-info shadow btn-xs sharp"
			>
				<i className="fa fa-refresh"></i>
				{/* <i className="fa fa-password"></i> */}
			</button>

		</div>
	})
	function getTheDirectors() {
		getDirectors()
			.then((response) => {
				// alert(JSON.stringify(response))
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

		<option value={data.dial_code} > {" " + data.name + " (" + data.dial_code + " )"}</option>
	))

	const country = countryCodes.map(data => (

		<option value={data.name} > {" " + data.name + " "}</option>
	))


	const nationalitiesMap = nationalities.map(data => (

		<option value={data} >{data}</option>
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

			addDirector(addFormData)
				.then((response) => {
					setPostModal(false);
					swal('Good job!', 'Successfully Added', "success");
					getTheDirectors()

				})
				.catch((error) => {
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


	return (
		<>
			<PageTitle activeMenu="Staff" motherMenu="System Users" />
			<div className="card">
				<div className="card-header">
					<div className="row">
						<div className="col-xl-3 col-xxl-6">
							<h4 className="card-title">Staff</h4>
						</div>
						<div className="col-xl-4 col-xxl-6">
							<Link className="btn btn-primary font-w600 mb-2 me-auto" onClick={() => addD()}>+ Add Staff</Link>
						</div>
					</div>
				</div>



				<div className="card-body">

					<TableExport
						hideDataExport={true}
						rows={directors}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						columns={[
							{ name: 'user', title: 'User' },
							{ name: 'dateAdd', title: 'Addition' },


							// { name: 'role', title: 'Role' },

							// { name: 'priv', title: 'Privillages' },

							{ name: 'acc', title: 'Accessibility' },
							{ name: 'actions', title: 'Actions' },
						]}
						//  exportColumns={this.state.columns2}
						defaultExpandedGroups={[]}
						grouping={[]}
						defaultHiddenColumnNames={['actions']}
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




											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Nationality</label>
														<div className="form-group mb-3">

															<select
																value={addFormData.nationality}
																name="nationality"
																onChange={handleAddFormChange}
																defaultValue={"Ugandan"}
																className="form-control"
																id="sel1"
															>
																{nationalitiesMap}
															</select>
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

															<select
																value={addFormData.code}
																name="code"
																onChange={handleAddFormChange}
																defaultValue={"+256"}
																className="form-control"
															>
																{codes}
															</select>
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



											<div className="row">
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


											</div>


										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>{addFormData.id === null ? "Add" : "Update"} Director</button>
									<button type="button" onClick={() => setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>
								</div>
							</form>

						</div>
					</div>
				</Modal>
			</div>
		</>
	)

}
export default FilteringTable;