import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown} from 'react-bootstrap';
import swal from "sweetalert";
import {getSummaryCollections, 
	getSummaryApplicationsUpdatedByDateRange, getSummaryCollectionsForWholeYear} from "../../../util/APIUtils.js";
import   DatePicker  from "react-datepicker";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { RotateSpinner  } from "react-spinners-kit";
let currentYear= new Date().getFullYear();

const myYears=[]
	const end= new Date().getFullYear()
	for(var m=2021; m<end; m++)
	{
		myYears.push(<option value={m} >{m}</option>)
	}
	myYears.push(<option value={end} >{end}</option>);

const years = range(2021, (new Date()).getFullYear());

function range(start,end){
	const theYears=[]
	
	for(var m=start; m<end; m++)
	{
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
  
const CurrentApexDonut = loadable(() =>
	pMinDelay(import("../Boltz/Portfolio/CurrentApexDonut"), 1000)
);





const DropdownBlog = ()=>{
	
	

	return(
		<>
			<Dropdown className="dropdown custom-dropdown mb-0">
				<Dropdown.Toggle variant="" as="div" className="btn sharp tp-btn dark-btn i-false" >	
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</Dropdown.Toggle>	
				<Dropdown.Menu className="dropdown-menu dropdown-menu-right" >
					<Dropdown.Item >Details </Dropdown.Item>
					<Dropdown.Item className="text-danger">Cancel </Dropdown.Item>		
				</Dropdown.Menu>			
			</Dropdown>
		</>
	)
}


const Portofolio = ({hideDetail, hideMenu, setRange, setAddFormDataTwo, getBuyersInfo, theNameToShow}) =>{
	const [showReimburses, setShowReimburses] = useState(false);	
	const [theData, setData] = useState({});
	const [randomFig, setRandom] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
	const [yearSum, setYearSum] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	

	const [addFormData, setAddFormData ] = useState({
		startDate:new Date(),
		endDate:new Date(),
		days:"",
		name:"days",
		year:new Date().getFullYear(),
		month:-1,
    }); 


	
	const handleDateChange = (event) => {
		//	alert(JSON.stringify(event))
			// event.preventDefault();    
			 const fieldName = "startDate";
			 const fieldValue = event;
			const newFormData = {...addFormData};
			newFormData[fieldName] = fieldValue;
			setAddFormData(newFormData);
		 };


		 const handleDateChange2 = (event) => {
			//	alert(JSON.stringify(event))
				// event.preventDefault();    
				 const fieldName = "endDate";
				 const fieldValue = event;
				const newFormData = {...addFormData};
				newFormData[fieldName] = fieldValue;
				setAddFormData(newFormData);
			 };
		 

	useEffect(() => {
		//alert("het")
		getYearSumm(new Date().getFullYear())
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
	  
	  function pickData2(){
		setisLoading(true)
		setRange("dateRange")
		setAddFormDataTwo(addFormData)
		//getSummaryApplicationsByYearOrMonth(addFormData)
		getSummaryApplicationsUpdatedByDateRange(addFormData)
		.then((response) => {
			setisLoading(false)
			//alert(JSON.stringify(response))
			setData(response)
			setShowReimburses(false)
		//	setPostModal(false);
		//	swal('Good job!', 'Successfully Added', "success");
			
		})
		.catch((error) => {
			setisLoading(false)
			console.log(error);
			swal('Oops', error.message, "error");
		});
	}


	

	  function getBuyers(){
		getSummaryCollections()
		.then((response) => {
			//alert(JSON.stringify(response))
			setData(response)
		//	setPostModal(false);
		//	swal('Good job!', 'Successfully Added', "success");
			
		})
		.catch((error) => {
			console.log(error);
			// swal('Oops', error.message, "error");
		});
	}

	function getYearSumm(year){
		getSummaryCollectionsForWholeYear(year)
		.then((response) => {
			//alert(JSON.stringify(response))
			setYearSum(response)
			setRandom(Math.random())
			currentYear=year
		//	setPostModal(false);
		//	swal('Good job!', 'Successfully Added', "success");
			
		})
		.catch((error) => {
			console.log(error);
			swal('Oops', error.message, "error");
		});
	}
	return(
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
									<h4 >Filter Data</h4>



								
								</DialogTitle>
								<DialogContent
							
								 >

<div className="col-xl-12 col-xxl-12">
					<div className="card">
						
						<div
						style={{padding:"20px"}}
						// className="card-body"
						>
						

						

						<div className="row" style={{
							height:"400px",
							//background:"#096",
						//	borderBottom:"1px solid #CCC", marginBottom:"20px", paddingBottom:"20px",
							marginTop:"10px",
							 width:"100%"}}>
								<b style={{color:"black"}}><u>Filter By Date Range</u></b>
					<div className="col-xl-6 col-xxl-6">
											
					<div className="form-group mb-0">
                      <label className="text-black font-w500">Start Date</label>
												<DatePicker dateFormat='dd/MM/yyyy' 
                        
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

												placeholder="Start Date"
												name="startDate"
												selected={addFormData.startDate}
												//value={new Date()}
												onChange={handleDateChange}
												/> 
                  			</div>
											</div>


											<div className="col-xl-6 col-xxl-6">
											<div className="form-group mb-0">
                      <label className="text-black font-w500">End Date</label>
												<DatePicker dateFormat='dd/MM/yyyy' 
                        
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

												placeholder="End Date"
												name="endDate"
												selected={addFormData.endDate}
												//value={new Date()}
												onChange={handleDateChange2}
												/> 
                  			</div>
											</div>

											<div className={"col-xl-6 col-xxl-6"}>
											{isLoading?  <RotateSpinner  size={30} color="rgba(41, 106, 176,1)" loading={true} />:
											<button type="button" 
		 className="btn btn-primary shadow btn-xs "
		style={{marginLeft:"15px", marginTop:"15px"}}
		onClick={()=> pickData2()}
		data-dismiss="modal">
Pick Data
		{/* <i className="fa fa-eye"></i> */}
		</button>}
											</div>
											</div>



					</div>

					</div>
				</div>

								 </DialogContent>
								 <DialogActions>

								 <button type="button" 
		 className="btn btn-success shadow btn-xs "
		style={{marginLeft:"15px", marginTop:"15px"}}
		onClick={()=> setShowReimburses(false)}
		data-dismiss="modal">
Close

		{/* <i className="fa fa-eye"></i> */}
		</button>

								 </DialogActions>
								 </Dialog>
		{hideMenu?null:
			<div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
				<h2 className="font-w600 mb-2 me-auto">Collections Report</h2>
				{/* <Dropdown className=" weather-btn mb-2">
					<span className="fs-22 font-w600 d-flex"><i className="fa fa-cloud me-3 ms-3"></i>21</span>
					<Dropdown.Toggle variant="" as="div" className="form-control style-3 default-select">{country1} </Dropdown.Toggle>
					<Dropdown.Menu >
						<Dropdown.Item onClick={() => setCountry1("Medan, IDN")}>Medan, IDN</Dropdown.Item>
						<Dropdown.Item onClick={() => setCountry1("Jakarta, IDN")}>Jakarta, IDN</Dropdown.Item>
						<Dropdown.Item onClick={() => setCountry1("Surabaya, IDN")}>Surabaya, IDN</Dropdown.Item>
					 </Dropdown.Menu>
				</Dropdown> */}
				<Link to={"#"} className="btn btn-primary mb-2 rounded" onClick={()=> setShowReimburses(true)}>
					{/* <i className="las la-calendar scale5 me-3"></i> */}
				Filter Data</Link>
			</div>
}
			<div className="row">
			
				<div  className={hideMenu?"col-xl-12 col-xxl-12":"col-xl-12 col-xxl-12"} >
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h4 className="mb-0 fs-20 text-black">Collections Report For {theData.name}</h4>
							<DropdownBlog />
						</div>
						<div className="card-body">


							<div className="bg-gradient-1 coin-holding flex-wrap" style={{flexDirection:"row"}}>
								<div className="mb-2 coin-bx" style={{flex:1}}>
									<div className="d-flex align-items-center">
										
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Total Collections</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total Volume: {theData.allNumber}</b>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Principal Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.all?.toFixed(2))}</h2>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Fees Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.totalAmountFees?.toFixed(2))}</h2>
										</div>
									</div>
								</div>

								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Penalty Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.totalAmountFines?.toFixed(2))}</h2>
										</div>
									</div>
								</div>
							</div>






								<div className="bg-gradient-1 mt-4 coin-holding flex-wrap" style={{flexDirection:"row"}}>
								<div className="mb-2 coin-bx" style={{flex:1}}>
									<div className="d-flex align-items-center">
										
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Fully Paid</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total Volume: {theData.approvedNumber}</b>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Principal Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.approved?.toFixed(2))}</h2>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Fees Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.totalApprovedAmountFees?.toFixed(2))}</h2>
										</div>
									</div>
								</div>

								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Penalty Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.totalApprovedAmountFines?.toFixed(2))}</h2>
										</div>
									</div>
								</div>
							</div>





							<div className="bg-gradient-1 mt-4 coin-holding flex-wrap" style={{flexDirection:"row"}}>
								<div className="mb-2 coin-bx" style={{flex:1}}>
									<div className="d-flex align-items-center">
										
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Partial Payments</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total Volume: {theData.pendingNumber}</b>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Principal Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.pending?.toFixed(2))}</h2>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Fees Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.totalPendingFees?.toFixed(2))}</h2>
										</div>
									</div>
								</div>

								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Penalty Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-2">UGX.{numberWithCommas(theData.totalPendingFines?.toFixed(2))}</h2>
										</div>
									</div>
								</div>
							</div>


					



						
						</div>
					</div>
				</div>
				
			</div>	
			<div className="row">
			
				<div className="col-xl-4">
					
					<div className="row">
						
						{theData.length>0?
						<div className="col-xl-12 col-xxl-12 col-md-12">
							<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="mb-0 fs-20 text-black">Current Graph</h4>
									<DropdownBlog />
								</div>
								<div className="card-body py-2 text-center">
									<div id="pieChart" className="d-inline-block">
										<CurrentApexDonut key={theData.approvedNumber} theData={theData} />
									</div>
									<div className="chart-items">
										<div className=" col-xl-12 col-sm-12">
											<div className="row text-black text-start fs-13 mt-4">
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#096"/>
													</svg>
													Paid
												</span>
												
												
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#F7A62C"/>
													</svg>
													Pending Collection
												</span>

												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#F00"/>
													</svg>
													Overdue Collection
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>:null}
					</div>
				</div>

				
			</div>		
		</>
	)
}
export default Portofolio; 