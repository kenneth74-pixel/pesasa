import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import swal from "sweetalert";
import { addBanks, getRegions, addDistrictToRegion, getUngroupedDistricts, getAllDistricts } from "../../../../util/APIUtils.js";
import TableExport from "./TableExport.jsx";
import { RotateSpinner } from "react-spinners-kit";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from "react-select";

//import './table.css';
import './filtering.css';
import { nationalities, countryCodes } from "./appData.js"

import DatePicker from "react-datepicker";
export const FilteringTable = () => {

	const customStyles = {
		// height:400,
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
	const [buyers, setBuyers] = useState([]);
	const [ungrouped, setUngrouped] = useState([]);
	const [allDis, setAllDis] = useState([]);

	const [regionName, setregionName] = useState("");
	const [regionId, setRegionId] = useState(null);

	const [theDistricts, setTheDistricts] = useState([]);
	const [vewDistricts, setViewDistricts] = useState(false);




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

	function passSelection(selection) {
		this.setState(
			{
				selection: selection,
			},
			() => { }
		);
	}

	function updateData(userData) {
		setRegionId(userData.id)
		setregionName(userData.name)
		setPostModal(true)

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
		getRegions()
			.then((response) => {
				//	alert(response)
				response.push({ name: "Ungrouped Districts", districts: [] })
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


	function getUngrouped() {
		getUngroupedDistricts()
			.then((response) => {
				//	alert(response)
				setUngrouped(response)

				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}



	function getAllDis() {
		getAllDistricts()
			.then((response) => {
				//	alert(response)
				const toSet = []

				response.map(data => (
					toSet.push({ value: data.id, label: data.name })
					//  <option value={data} >{data}</option>
				))

				setAllDis(toSet)

				//	setPostModal(false);
				//	swal('Good job!', 'Successfully Added', "success");

			})
			.catch((error) => {
				console.log(error);
				swal('Oops', error.message, "error");
			});
	}





	directors.map((data, key) => {
		//data.phone=data.code+data.phoneOne
		data.add = data.city + " , " + data.country
		//data.dateAdd=data.dateAdded.split("T")[0];
		data.actions = <div className="d-flex">
			{parseInt(key) === parseInt(directors.length - 1) ?
				<button
					onClick={() => {
						setViewDistricts(true)
						setTheDistricts(ungrouped)
						setregionName(data.name)
					}
					}
					className="btn btn-info shadow btn-xs "
				>
					View Districts
				</button> :
				<>
					{data.districts.length > 0 ?
						<button
							onClick={() => {
								setViewDistricts(true)
								setTheDistricts(data.districts)
								setregionName(data.name)
							}
							}
							className="btn btn-info shadow btn-xs "
						>
							Districts
						</button> : null}

					<button type="button"
						style={{ marginLeft: data.districts.length > 0 ? "10px" : 0 }}
						className="btn btn-primary shadow btn-xs "
						onClick={() => updateData(data)} data-dismiss="modal">

						Add Districts
					</button>


				</>
			}



		</div>
	})




	useEffect(() => {
		getAllDis()
		getBuyers()
		getUngrouped()
		getAllDis()
		//chackboxFun();
	}, []);





	const codes = countryCodes.map(data => (

		<option value={data.dial_code} > {" " + data.name + " (" + data.dial_code + " )"}</option>
	))

	const country = countryCodes.map(data => (

		<option value={data.name} > {" " + data.name + " "}</option>
	))


	const [postModal, setPostModal] = useState(false);
	const [districtObje, setDistrictObje] = useState([]);

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
		const districtIds = []

		districtObje.map((data) => {
			districtIds.push(data.value)
		})

		// alert(JSON.stringify(districtObje))

		var error = false;
		var errorMsg = '';



		console.log(addFormData)
		//alert(JSON.stringify(addFormData))
		setisLoading(true)
		addDistrictToRegion({
			id: regionId,
			districtIds: districtIds
		})
			.then((response) => {
				setisLoading(false)
				setPostModal(false);
				swal('Good job!', 'Successfully Added', "success");
				response.push({ name: "Ungrouped Districts", districts: [] })
				setBuyers(response)
				setDirectors(response)
				getUngrouped()

			})
			.catch((error) => {
				setisLoading(false)
				console.log(error);
				swal('Oops', error.message, "error");
			});

		//  addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = '';         


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

			<Dialog
				disableEnforceFocus
				//className="modal fade"
				//  className="fade bd-example-modal-lg"
				// fullscreen={true} 
				//dialogClassName="modal-90w"
				/// size="lg"
				fullWidth={true}
				maxWidth={"md"}
				open={vewDistricts}
				onClose={setViewDistricts}
			>

				<DialogTitle>
					<h4 >Districts in {regionName}</h4>



					{/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
				</DialogTitle>
				<DialogContent

				>
					<TableExport

						rows={theDistricts}
						//rows={this.state.colors[1]==="primary"?finished: dataTemp}
						columns={[
							{ name: 'name', title: 'District Name' },

						]}
						//  exportColumns={this.state.columns2}
						exportColumns={[
							{ name: 'name', title: 'Name' },

						]}
						exportRow={theDistricts}
						defaultExpandedGroups={[]}
						grouping={[]}
						defaultHiddenColumnNames={[]}
						defaultPageSize={0}
						// hideSelectionExport
						selection={[]}
						changeSelection
						passSelection={passSelection}
						infiniteScrolling
						fileName={"Districts"}

						defaultColumnWidths={[]} //enables resizing of columns [{ columnName: 'name', width: 350 }, columnName: 'reviewDate', width: 350  }, ]
						defaultOrder={[]} /// enables reodering of colums  e.g ['campus','program','abbreviation','studyTime','name','reviewDate','action']


						totalSummaryItems={[]}
						//             { columnName: 'creditUnit', type: 'max' },
						//             { columnName: 'creditUnit', type: 'sum' },
						//           ]}
						//           tableColumnExtensions={[{ columnName: 'creditUnit', align: 'right' },]}

						// summary for groupings
						groupSummaryItems={[]}
						showColumnsWhenGrouped //it show columns even after grouping


					/>

				</DialogContent>

				<DialogActions style={{ width: "100%", overflow: "hidden" }}>

					<button type="button"
						className="btn shadow btn-xs btn-primary"

						onClick={() => setViewDistricts(false)}
						data-dismiss="modal">
						Close
					</button>

				</DialogActions>
			</Dialog>


			<PageTitle activeMenu="Regions" motherMenu="Company Data" />
			<div className="card">
				<div className="card-header">
					<div className="row" style={{ width: "100%" }}>
						<div className="col-xl-3 ">
							<h4 className="card-title">Regions</h4>
						</div>


						{/* 					
					<div className="col-xl-3">
					<button
					
					 className="btn btn-primary font-w600 mb-2 me-auto" onClick={()=> addD()}>Add New Bank</button>
					</div> */}
					</div>
				</div>


				<div className="card-body">
					{/* <div className="row" style={{width:"100%"}}>
				<div className="col-xl-3 ">
					<h4 className="card-title">Regions</h4>
					</div>
					</div> */}
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


				<Dialog
					disableEnforceFocus
					//className="modal fade"
					//  className="fade bd-example-modal-lg"
					// fullscreen={true} 
					//dialogClassName="modal-90w"
					/// size="lg"
					fullWidth={true}
					maxWidth={"lg"}
					open={postModal}
					onClose={setPostModal}
				>

					<DialogTitle>
						<h4 className="modal-title fs-20">Add Districts to {regionName}</h4>

					</DialogTitle>
					<DialogContent
						style={{ height: 400 }}
					>
						<i className="flaticon-cancel-12 close"></i>
						<div className="add-contact-box">
							<div className="add-contact-content">

								<div className="row">
									<div className="col-xl-12 col-xxl-12">
										<div className="form-group mb-3">
											<label>Select Districts</label>
											<Select
												isMulti
												value={
													districtObje
												}
												onChange={(val) => {
													setDistrictObje(val)
													//   const newFormData = {...addFormData};
													//   newFormData.nationality = val.value;
													//   setAddFormData(newFormData);
												}}
												styles={customStyles}
												placeholder="Search & Select District"
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
												options={allDis}
											/>
										</div>
									</div>


								</div>










							</div>
						</div>
					</DialogContent>
					<DialogActions style={{ width: "100%", overflow: "hidden" }}>
						{isLoading ? <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoading} /> :
							<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}> Save</button>}
						<button type="button" onClick={() => setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>
					</DialogActions>


				</Dialog>
			</div>
		</>
	)

}
export default FilteringTable;