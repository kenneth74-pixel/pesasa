import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import swal from "sweetalert";
import { addBanks, getBanks, deleteBank } from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import { RotateSpinner } from "react-spinners-kit";

//import './table.css';
import './filtering.css';
import { nationalities, countryCodes } from "./appData.js"

import DatePicker from "react-datepicker";
export const FilteringTable = () => {
	const [directors, setDirectors] = useState([]);
	const [buyers, setBuyers] = useState([]);
	const [isLoading, setisLoading] = useState(false);
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


	function getBuyers() {
		getBanks()
			.then((response) => {
				//	alert(response)
				setBuyers(response)
				setDirectors(response)
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
			{data.type === "CLIENT_ADDED" ? null :
				<>
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

									deleteBank(data.id)
										.then(() => {
											swal("Poof!  record has been deleted!", {
												icon: "success",
											});
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
				</>

			}


		</div>
	})


	useEffect(() => {
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
	const handleAddFormSubmit = (event) => {
		event.preventDefault();
		var error = false;
		var errorMsg = '';
		addFormData.actions = ""
		if (addFormData.name === "") {
			error = true;
			errorMsg = 'Please fill bank name';
		}





		if (!error) {

			console.log(addFormData)
			//alert(JSON.stringify(addFormData))
			setisLoading(true)
			addBanks(addFormData)
				.then((response) => {
					setisLoading(false)
					setPostModal(false);
					swal('Good job!', 'Successfully Added', "success");
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

	return (
		<>
			<PageTitle activeMenu="Bank" motherMenu="Company Data" />
			<div className="card">
				<div className="card-header">
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-3 ">
							<h4 className="card-title">Banks</h4>
						</div>



						<div className="col-xl-3">
							<button

								className="btn btn-primary font-w600 mb-2 me-auto" onClick={() => addD()}>Add New Bank</button>
						</div>
					</div>
				</div>


				<div className="card-body">
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-3 ">
							<h4 className="card-title">Added Banks</h4>
						</div>
					</div>
					<TableExport
						hideDataExport={true}
						rows={directors}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						columns={[
							{ name: 'name', title: 'Name' },

							{ name: 'actions', title: 'Actions' },
						]}
						//  exportColumns={this.state.columns2}
						defaultExpandedGroups={[]}
						grouping={[]}
						defaultHiddenColumnNames={[]}
						defaultPageSize={0}
						hideSelectionExport
						infiniteScrolling
						fileName={"Banks"}


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
									<h4 className="modal-title fs-20">Add Bank</h4>
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
												<div className="col-xl-12 col-xxl-12">
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


											</div>

										</div>
									</div>
								</div>
								<div className="modal-footer">
									{isLoading ? <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
										<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>{addFormData.id === null ? "Add" : "Update"} Bank</button>}
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