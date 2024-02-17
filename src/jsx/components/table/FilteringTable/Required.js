import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import swal from "sweetalert";
import { addReqFiles, uploadFiles, getReqFiles, deleteReqFiles } from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import { RotateSpinner } from "react-spinners-kit";
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePond } from 'react-filepond';

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
		required: true,
		fileId: null,

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
				required: true,
				fileId: null
			}
		)
		setPostModal(true)
	}


	function getBuyers() {
		getReqFiles()
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
		data.file = data.fileId !== null ?
			<div className="d-flex">
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
			</div> : "None Attached"
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

									deleteReqFiles(data.id)
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
		addFormData.file = ""
		if (addFormData.name === "") {
			error = true;
			errorMsg = 'Please fill Required File name';
		}





		if (!error) {

			console.log(addFormData)
			//alert(JSON.stringify(addFormData))
			setisLoading(true)
			addReqFiles(addFormData)
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
			<PageTitle activeMenu="Required File" motherMenu="Company Data" />
			<div className="card">
				<div className="card-header">
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-3 ">
							<h4 className="card-title">Required Files</h4>
						</div>



						<div className="col-xl-3">
							<button

								className="btn btn-primary font-w600 mb-2 me-auto" onClick={() => addD()}>Add New Required File</button>
						</div>
					</div>
				</div>


				<div className="card-body">
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-3 ">
							<h4 className="card-title">Added Required Files</h4>
						</div>
					</div>
					<TableExport
						hideDataExport={true}
						rows={directors}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						columns={[
							{ name: 'name', title: 'Name' },
							{ name: 'file', title: 'Template' },

							{ name: 'actions', title: 'Actions' },
						]}
						//  exportColumns={this.state.columns2}
						defaultExpandedGroups={[]}
						grouping={[]}
						defaultHiddenColumnNames={[]}
						defaultPageSize={0}
						hideSelectionExport
						infiniteScrolling
						fileName={"Required Files"}


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
									<h4 className="modal-title fs-20">Add Required File</h4>
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
													{addFormData.fileId !== null ?
														<b>Template already attached, if another is added will replace old one</b> :
														//null
														<b>Attach Template (optional)</b>
													}
													<FilePond
														acceptedFileTypes={['application/pdf' : '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
													allowMultiple={false}
													maxFileSize={'2MB'}
//</GridItem>server=
												labelIdle="Drag &amp; Drop  Template Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
											server={
												{
													process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

														// fieldName is the name of the input field
														// file is the actual file object to send
														//     const formData = new FormData();
														//     formData.append(fieldName, file, file.name);

														//     const request = new XMLHttpRequest();

														//   request.open('POST', 'http://wantedbook.net/blissAPI/upload.php');
														//     // Should call the progress method to update the progress to 100% before calling load
														//     // Setting computable to false switches the loading indicator to infinite mode
														//     request.upload.onprogress = (e) => {
														//         progress(e.lengthComputable, e.loaded, e.total);
														//     };
														// let theid =0;
														//     // Should call the load method when done and pass the returned server file id
														//     // this server file id is then used later on when reverting or restoring a file
														//     // so your server knows which file to return without exposing that info to the client
														//     request.onload = function() {
														//         if (request.status >= 200 && request.status < 300) {
														//             // the load method accepts either a string (id) or an object
														//        //  alert((request.responseText))
														//          // console.log(request.responseText)
														//        //   alert(request.responseText)
														//             const returnObjc=JSON.parse(request.responseText)
														//            // load('https://www.opportunitybank.co.ug/backend/apiImages/uploads'+returnObjc.data);
														//             //alert(returnObjc.data)
														//            theid=returnObjc.id

														// 		   const fieldName ='fileId';
														// 		   const fieldValue =returnObjc.id;
														// 		   console.log("one");
														// 		   console.log(fieldValue)
														// 		   const newFormData = {...addFormData};
														// 		   newFormData[fieldName] = fieldValue;
														// 		   console.log("checkmate");
														// 		   console.log(newFormData)
														// 		   setAddFormData(newFormData);
														//            //setIncomp(returnObjc.id)

														//         }
														//         else {
														//             // Can call the error method if something is wrong, should exit after
														//             error('oh no');
														//         }
														//     }.bind(this);



														//     request.send(formData);

														const formData = new FormData();
														formData.append("file", file);
														formData.append("name", fieldName);
														formData.append("type", 6);
														uploadFiles(formData)
															.then((response) => {

																const fieldName = 'fileId';
																const fieldValue = response.id;
																console.log("one");
																console.log(fieldValue)
																const newFormData = { ...addFormData };
																newFormData[fieldName] = fieldValue;
																console.log("checkmate");
																console.log(newFormData)
																setAddFormData(newFormData);

																load(response.id);
															})
															.catch((error) => {
																alert(error);
																alert(JSON.stringify(error))
															});

														// Should expose an abort method so the request can be cancelled
														return {
															abort: () => {
																// This function is entered if the user has tapped the cancel button
																request.abort();

																// Let FilePond know the request has been cancelled
																abort();
															}
														};
													},
													revert: (uniqueFileId, load, error) => {
														//  removeFile(this.state.fid)
														// setIncomp(0)
														const fieldName = 'fileId';
														const fieldValue = null;
														const newFormData = { ...addFormData };
														newFormData[fieldName] = fieldValue;
														setAddFormData(newFormData);

														load()
													}
												}
											}></FilePond>
									</div>


								</div>










						</div>
					</div>
			</div>
			<div className="modal-footer">
				{isLoading ? <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
					<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>{addFormData.id === null ? "Add" : "Update"} Required File</button>}
				<button type="button" onClick={() => setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>
			</div>
		</form >
                            
						</div >
					</div >
				</Modal >
			</div >
		</>
	)
	
}
export default FilteringTable;