import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import swal from "sweetalert";
import {
	clientAddBuyer,
	clientAddExixtingBuyer,
	clientGetBuyers, clientGetClientBuyers, deleteClientBuyer, getProcessComments
} from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import { RotateSpinner } from "react-spinners-kit";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
//import './table.css';
import './filtering.css';
import { nationalities, countryCodes } from "./appData.js"
import { sectors } from "../../../../constants/index"

import DatePicker from "react-datepicker";
export const FilteringTable = () => {
	const [directors, setDirectors] = useState([]);
	const [buyers, setBuyers] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [postModal2, setPostModal2] = useState(false);
	const [comments, setComments] = useState([]);
	const [addFormData, setAddFormData] = useState({
		id: null,
		buyerId: null,
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
		userData.actions = ""
		console.log(userData)
		if (!userData.isApproved) {
			setAddFormData(userData)
			setPostModal(true)
		}
		else {
			setAddFormData(userData)
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
				buyerId: null,
				terms: 'choose',
				code: '+256',
				code2: '+256'
			}
		)
		setPostModal(true)
	}


	function getBuyers() {
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
				buyerId: 'nobuyer',
				terms: 'choose',
				code: '+256',
				code2: '+256'
			}
		)
		clientGetBuyers()
			.then((response) => {
				setBuyers(response)
				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}


	directors.map((data) => {
		//data.phone=data.code+data.phoneOne
		data.add = data.city + " , " + data.country
		//data.dateAdd=data.dateAdded.split("T")[0];
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

							deleteClientBuyer(data.clientBuyerId)
								.then(() => {
									swal("Poof! Buyer record has been deleted!", {
										icon: "success",
									});
									getTheDirectors()
									getBuyers()

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
				onClick={() => openDetails2(data, "buyers")}
				data-dismiss="modal">

				<i className="fa fa-eye"></i>
			</button>


		</div>
	})
	function getTheDirectors() {
		clientGetClientBuyers()
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
		getBuyers()
		//chackboxFun();
	}, []);





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

	const handleAddFormSubmit2 = (event) => {
		event.preventDefault();
		var error = false;
		var errorMsg = '';
		addFormData.actions = ""

		if (!error) {
			//alert(addFormData.contactPersonOne)
			// const newContacts = [...contacts, newContact];
			//setContacts(newContacts);
			console.log(addFormData)
			//alert(JSON.stringify(addFormData))
			setisLoading(true)
			clientAddExixtingBuyer(addFormData)
				.then((response) => {
					setisLoading(false)
					setPostModal(false);
					swal('Good job!', 'Successfully Added', "success");
					getTheDirectors()
					getBuyers()

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



	const handleAddFormSubmit = (event) => {
		event.preventDefault();
		var error = false;
		var errorMsg = '';
		addFormData.actions = ""
		if (addFormData.name === "") {
			error = true;
			errorMsg = 'Please fill buyer name';
		}
		else if (addFormData.sector === "") {
			error = true;
			errorMsg = 'Please fill buyer sector.';
		}
		else if (addFormData.city === "") {
			error = true;
			errorMsg = 'Please add city';
		}
		else if (addFormData.contactPersonOne === "") {
			error = true;
			errorMsg = 'Please add contact person name';
		}


		else if (addFormData.designationOne === "") {
			error = true;
			errorMsg = 'Please add contact person designation';
		}

		else if (addFormData.phoneOne === "") {
			error = true;
			errorMsg = 'Please add contact person phone';
		}


		else if (addFormData.terms === "choose") {
			error = true;
			errorMsg = 'Please choose payment terms';
		}



		if (!error) {
			//alert(addFormData.contactPersonOne)
			// const newContacts = [...contacts, newContact];
			//setContacts(newContacts);
			addFormData.contactEmailOne = addFormData.contactEmailOne + addFormData.code
			addFormData.contactEmailTwo = addFormData.contactEmailTwo + addFormData.code2
			console.log(addFormData)
			//alert(JSON.stringify(addFormData))
			setisLoading(true)
			clientAddBuyer(addFormData)
				.then((response) => {
					setisLoading(false)
					setPostModal(false);
					swal('Good job!', 'Successfully Added', "success");
					getTheDirectors()
					getBuyers()

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
			<PageTitle activeMenu="Buyers" motherMenu="Company Data" />
			<div className="card">
				<div className="" style={{ margin: "40px" }}>
					<div className="row" style={{ width: "100%" }}>
						{/* <div className="col-xl-3 ">
					<h4 className="card-title">Company Buyer</h4>
					</div> */}
						<div className="col-xl-6 ">

							{/* <Link className="btn btn-primary font-w600 mb-2 me-auto" onClick={()=> addD()}>+ Add New Buyer</Link> */}
							<div className="form-group mb-3">
								<label className="text-black font-w500">Select Buyer From Existing Buyers</label>
								<div className="form-group mb-3">

									<select
										value={addFormData.buyerId}
										defaultValue={"nobuyer"}
										name="buyerId"
										onChange={handleSelectChange}
										className="form-control"
									>
										<option selected="selected" value="select">Select Buyer</option>
										{buyers.length === 0 ?
											<option disabled value="nobuyer">No buyers found</option> :

											buyersOptions


										}
										{/* <option value="create" >
						Add/Create New Buyer</option> */}
									</select>
								</div>
							</div>
						</div>
						<div className="col-xl-3 ">
							<div className="form-group mb-3">
								<label className="text-black font-w500">Select Terms</label>
								<div className="form-group mb-3">

									<select
										value={addFormData.terms}
										defaultValue={"choose"}
										name="terms"
										onChange={handleAddFormChange}
										className="form-control"
									>
										<option value="choose"> {"Choose Terms"}</option>
										{/* <option value="<=15 Days"> {"<=15 Days"}</option>
					 <option value="<=30 Days">{"<=30 Days"}</option>
					 <option value="<=60 Days">{"<=60 Days"}</option>
					 <option value="<=90 Days"> {"<=90 Days"}</option> */}
										<option value="Less than 7 days"> {"Less than 7 days"}</option>
										<option value="8 – 15 days"> {"8 – 15 days"}</option>
										<option value="16 – 30 days"> {"16 – 30 days"}</option>
										<option value="31 – 60 days"> {"31 – 60 days"}</option>
										<option value="61 – 90 days"> {"61 – 90 days"}</option>
										<option value="Greater than 90 days"> {"Greater than 90 days"}</option>
									</select>
								</div>
							</div>
						</div>

						<div className="col-xl-3">
							<button
								style={{ marginTop: "25px" }}
								disabled={addFormData.buyerId === null || addFormData.terms === 'choose' || addFormData.buyerId === "select"}
								className="btn btn-primary font-w600 mb-2 me-auto" onClick={(e) => handleAddFormSubmit2(e)}>Save</button>
						</div>
					</div>
					<div className="row" style={{ width: "100%" }}>

						<div className="col-xl-6" style={{ marginTop: "40px" }}>
							<font style={{ color: "#000", }} className="mt-2">In case your buyer is not in the above buyer list, kindly add your buyer </font>
						</div>
						<div className="col-xl-3 ">
							<button
								style={{ marginTop: "25px" }}
								// disabled={addFormData.buyerId===null ||  addFormData.terms==='choose' || addFormData.buyerId==="select"}
								className="btn btn-primary font-w600 me-auto" onClick={(e) => addD()}>Add New Buyer</button>
						</div>
					</div>
				</div>


				<div className="card-body">
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-3 ">
							<h4 className="card-title">Added Buyers</h4>
						</div>
					</div>
					<TableExport
						hideDataExport={true}
						rows={directors}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						columns={[
							{ name: 'name', title: 'Name' },
							{ name: 'sector', title: 'Sector' },
							{ name: 'terms', title: 'Terms' },
							{ name: 'contactPersonOne', title: 'Contact Person' },
							{ name: 'designationOne', title: 'Designation' },
							{ name: 'phoneOne', title: 'Phone' },
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

				<Modal
					//className="modal fade"
					className="fade bd-example-modal-lg"

					size="lg"
					show={postModal} onHide={setPostModal} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">Add Buyer</h4>
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
														<label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Name</label>
														<div className="contact-name">
															<input type="text" className="form-control" autoComplete="off"
																value={addFormData.name}
																name="name" required="required"
																onChange={handleAddFormChange}
																placeholder=" Name"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>

												<div className="col-xl-6 col-xxl-6">

													<div className="form-group mb-3">
														<label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Sector</label>
														<div className="form-group mb-3">

															<select
																value={addFormData.sector}
																defaultValue={""}
																name="sector"
																onChange={handleAddFormChange}
																className="form-control"
															>
																<option disabled value="">Select Sector</option>
																{sectors.map((data) => {
																	return <option value={data}>{data}</option>
																})}

															</select>
														</div>
													</div>
												</div>
											</div>



											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Other Sector</label>
														<div className="contact-name">
															<input type="text"
																value={addFormData.osector}
																className="form-control" autoComplete="off"
																name="osector" required="required"
																onChange={handleAddFormChange}
																placeholder="Other Sector"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>

												<div className="col-xl-6 col-xxl-6">

													<div className="form-group mb-3">
														<label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Country</label>
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
											</div>




											<div className="row">
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500"><b style={{ color: "red" }}>*</b> City</label>
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
											</div>




											<div className="row">
												<div className="col-xl-12 col-xxl-12">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Street Address / Village</label>
														<div className="contact-name">
															<input type="text" className="form-control" autoComplete="off"
																name="streetaddress"
																value={addFormData.streetaddress}
																onChange={handleAddFormChange}
																placeholder="Street Address / Village"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>


											</div>



											<div className="row">
												<div className="col-xl-12 col-xxl-12" style={{ marginTop: "40px" }}>

													<div className="form-group mb-3">
														<label className="text-black font-w500">First Contact Person</label>

													</div>
												</div>
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Name Of Contact Person</label>
														<div className="contact-name">
															<input type="text"
																value={addFormData.contactPersonOne}
																className="form-control" autoComplete="off"
																name="contactPersonOne" required="required"
																onChange={handleAddFormChange}
																placeholder="Contact Person"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>



												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Designation</label>
														<div className="contact-name">
															<input type="text"
																value={addFormData.designationOne}
																className="form-control" autoComplete="off"
																name="designationOne" required="required"
																onChange={handleAddFormChange}
																placeholder="Designation"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>


											</div>



											<div className="row">

												<div className="col-xl-3 col-xxl-3">
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

												<div className="col-xl-4 col-xxl-4">

													<div className="form-group mb-3">
														<label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Phone Number</label>
														<div className="contact-name">
															<div className="form-group mb-0">
																<input type="number"
																	value={addFormData.phoneOne}
																	className="form-control" autoComplete="off"
																	name="phoneOne" required="required"
																	onChange={handleAddFormChange}
																	placeholder="Phone No."
																/>
															</div>
														</div>
													</div>
												</div>

												<div className="col-xl-5 col-xxl-5">

													<div className="form-group mb-3">
														<label className="text-black font-w500">Email</label>
														<div className="contact-name">
															<input type="text"
																value={addFormData.contactEmailOne}
																className="form-control" autoComplete="off"
																name="contactEmailOne" required="required"
																onChange={handleAddFormChange}
																placeholder="Email"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>
											</div>













											<div className="row">
												<div className="col-xl-12 col-xxl-12" style={{ marginTop: "40px" }}>

													<div className="form-group mb-3">
														<label className="text-black font-w500">Second Contact Person</label>

													</div>
												</div>
												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Name Of Contact Person</label>
														<div className="contact-name">
															<input type="text"
																value={addFormData.contactPersonTwo}
																className="form-control" autoComplete="off"
																name="contactPersonTwo" required="required"
																onChange={handleAddFormChange}
																placeholder="Contact Person"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>



												<div className="col-xl-6 col-xxl-6">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Designation</label>
														<div className="contact-name">
															<input type="text"
																value={addFormData.designationTwo}
																className="form-control" autoComplete="off"
																name="designationTwo" required="required"
																onChange={handleAddFormChange}
																placeholder="Designation"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>


											</div>



											<div className="row">

												<div className="col-xl-3 col-xxl-3">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Country Code</label>
														<div className="form-group mb-3">

															<select
																value={addFormData.code2}
																name="code2"
																onChange={handleAddFormChange}
																defaultValue={"+256"}
																className="form-control"
															>
																{codes}
															</select>
														</div>
													</div>
												</div>

												<div className="col-xl-4 col-xxl-4">

													<div className="form-group mb-3">
														<label className="text-black font-w500"> Phone Number</label>
														<div className="contact-name">
															<div className="form-group mb-0">
																<input type="number"
																	value={addFormData.phoneTwo}
																	className="form-control" autoComplete="off"
																	name="phoneTwo" required="required"
																	onChange={handleAddFormChange}
																	placeholder="Phone No."
																/>
															</div>
														</div>
													</div>
												</div>

												<div className="col-xl-5 col-xxl-5">

													<div className="form-group mb-3">
														<label className="text-black font-w500">Email</label>
														<div className="contact-name">
															<input type="text"
																value={addFormData.contactEmailTwo}
																className="form-control" autoComplete="off"
																name="contactEmailTwo" required="required"
																onChange={handleAddFormChange}
																placeholder="Email"
															/>
															<span className="validation-text"></span>
														</div>
													</div>
												</div>
											</div>


											<div className="row">
												<div className="col-xl-12 col-xxl-12" style={{ marginTop: "40px" }}>

													<div className="form-group mb-3">
														<label className="text-black font-w500"><b style={{ color: "red" }}>*</b> Payment Terms</label>

													</div>
												</div>

												<div className="col-xl-6 ">
													<div className="form-group mb-3">
														<label className="text-black font-w500">Select Terms</label>
														<div className="form-group mb-3">

															<select
																value={addFormData.terms}
																defaultValue={"choose"}
																name="terms"
																onChange={handleAddFormChange}
																className="form-control"
															>
																<option value="choose"> {"Choose Terms"}</option>
																<option value="<=15 Days"> {"<=15 Days"}</option>
																<option value="<=30 Days">{"<=30 Days"}</option>
																<option value="<=60 Days">{"<=60 Days"}</option>
																<option value="<=90 Days"> {"<=90 Days"}</option>
															</select>
														</div>
													</div>
												</div>
											</div>



										</div>
									</div>
								</div>
								<div className="modal-footer">
									{isLoading ? <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
										<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>{addFormData.id === null ? "Add" : "Update"} Buyer</button>}
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