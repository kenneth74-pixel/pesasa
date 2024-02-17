import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown} from 'react-bootstrap';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import swal from "sweetalert";
import {getSummaryApplications, getSummaryApplicationsByYearOrMonth ,
	getFiguresByDaysBack,
	 getSummaryApplicationsByDateRange, getSummaryApplicationsForWholeYear} from "../../../util/APIUtils.js";
import   DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const MarketLineApex = loadable(() =>
	pMinDelay(import("../Boltz/Home/MarketLineApex"), 1000)
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
	const [country1, setCountry1] = useState("Medan, IDN");	
	const [theData, setData] = useState({});
	const [randomFig, setRandom] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
	const [yearSum, setYearSum] = useState([]);
	const [showPrev, setShowPrev] = useState(false);
	
	
function loadParentData(){
	let isFunction = typeof theNameToShow === 'function'
	if(isFunction){
		theNameToShow(theData.name)
	}
	
	getBuyersInfo()
	hideDetail(true)
}

	const [addFormData, setAddFormData ] = useState({
		startDate:new Date(),
		endDate:new Date(),
		days:"",
		name:"days",
		year:new Date().getFullYear(),
		month:-1,
    }); 

	const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };

	
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
		setRange("dateRange")
		setAddFormDataTwo(addFormData)
		//getSummaryApplicationsByYearOrMonth(addFormData)
		getSummaryApplicationsByDateRange(addFormData)
		.then((response) => {
			//alert(JSON.stringify(response))
			setData(response)
		//	setPostModal(false);
		//	swal('Good job!', 'Successfully Added', "success");
			
		})
		.catch((error) => {
			console.log(error);
			swal('Oops', error.message, "error");
		});
	}
	  function pickData(){
		setRange("yearOrMonth")
		setAddFormDataTwo(addFormData)
		getSummaryApplicationsByYearOrMonth(addFormData)
		.then((response) => {
			//alert(JSON.stringify(response))
			if(currentYear!==addFormData.year){
			//	alert("hey")
				getYearSumm(addFormData.year)
			}
			setData(response)
		//	setPostModal(false);
		//	swal('Good job!', 'Successfully Added', "success");
			
		})
		.catch((error) => {
			console.log(error);
			swal('Oops', error.message, "error");
		});
	}

	function pickData3(){
		//alert(JSON.stringify(addFormData))
		setRange("daysNumber")
		setAddFormDataTwo(addFormData)
		getFiguresByDaysBack(addFormData)
		.then((response) => {
			//alert(JSON.stringify(response))
			
			setData(response)
		//	setPostModal(false);
		//	swal('Good job!', 'Successfully Added', "success");
			
		})
		.catch((error) => {
			console.log(error);
			swal('Oops', error.message, "error");
		});
	}

	

	  function getBuyers(){
		getSummaryApplications()
		.then((response) => {
			//alert(JSON.stringify(response))
			setData(response)
		//	setPostModal(false);
		//	swal('Good job!', 'Successfully Added', "success");
			
		})
		.catch((error) => {
			console.log(error);
			swal('Oops', error.message, "error");
		});
	}

	function getYearSumm(year){
		getSummaryApplicationsForWholeYear(year)
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
				  open={showPrev} 
          onClose={()=> setShowPrev(false)} 
				 
				   >
          
					
					<DialogTitle>
									<h4 >Password Change</h4>



									{/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
								</DialogTitle>
								<DialogContent>
									<p>Your password expired within 60 calendar days, you are required to create a new password for your next login </p>
							
				<div className='row'> 
				<div className="col-lg-8 mb-2">
            <div className="form-group mb-3">
												<label >
                        <p className="text-black font-w500">  <b style={{color:"red"}}>*</b> Create New Password</p>
						<div style={{fontSize:12, color:"black"}}>👉 Must not be indentical to the previous ten (10) passwords</div> 
                          <div style={{fontSize:12, color:"black"}}>👉 Must be a minimum of eight (8) characters</div>
                          <div style={{fontSize:12, color:"black"}}>👉 Must not be adictionary word or proper name</div>
                          <div style={{fontSize:12, color:"black"}}>👉 Must contain one special character (@#$%*&+=) , one numeric, one small case and one upper case</div>
                          </label>
                                    <div className="contact-name">
<input type="password"  className="form-control"
value={addFormData.password}
autoComplete="off"
name="password" required="required"
            onChange={handleAddFormChange}
placeholder="Password"
/>
<span className="validation-text"></span>
</div>
											</div>
            </div>


           
            <div className="col-lg-4 mt-3 pt-4">
            <div className="form-group pt-4 mt-4">
												<label className="text-black font-w500"><b style={{color:"red"}}>*</b> Confirm Password </label>
                                    <div className="contact-name">
<input type="password"  className="form-control"
value={addFormData.cpassword}
autoComplete="off"
name="cpassword" required="required"
            onChange={handleAddFormChange}
placeholder="Confirm Password"
/>
<span className="validation-text"></span>
</div>
											</div>
            </div>

				</div>
                  </DialogContent>
                  <DialogActions>
				  <button to={"#"} 	 className="btn btn-primary  shadow btn-xs "

onClick={()=> setShowPrev(false)}>
				{/* <i className="las la-calendar scale5 me-3"></i> */}
			Submit</button>
            </DialogActions>
                  </Dialog>



		{hideMenu?null:
			<div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
				<h2 className="font-w600 mb-2 me-auto">Applications Summary</h2>
				{/* <Dropdown className=" weather-btn mb-2">
					<span className="fs-22 font-w600 d-flex"><i className="fa fa-cloud me-3 ms-3"></i>21</span>
					<Dropdown.Toggle variant="" as="div" className="form-control style-3 default-select">{country1} </Dropdown.Toggle>
					<Dropdown.Menu >
						<Dropdown.Item onClick={() => setCountry1("Medan, IDN")}>Medan, IDN</Dropdown.Item>
						<Dropdown.Item onClick={() => setCountry1("Jakarta, IDN")}>Jakarta, IDN</Dropdown.Item>
						<Dropdown.Item onClick={() => setCountry1("Surabaya, IDN")}>Surabaya, IDN</Dropdown.Item>
					 </Dropdown.Menu>
				</Dropdown> */}
				<Link to={"#"} className="btn btn-primary mb-2 rounded" onClick={()=> loadParentData()}>
					{/* <i className="las la-calendar scale5 me-3"></i> */}
				Show Details</Link>
			</div>
}
			<div className="row">
				{hideMenu?null:
			<div className="col-xl-4 col-xxl-4">
					<div className="card">
						<div className="card-header border-0">
							<h4 className="mb-0 text-black fs-20">Data Filters</h4>
							{/* <DropdownBlog /> */}
						</div>
						<div
						style={{padding:"20px"}}
						// className="card-body"
						>
							<div  style={{borderBottom:"1px solid #CCC", marginBottom:"20px", paddingBottom:"20px"}} >
						<div className="form-group ">
							<b style={{color:"black"}}><u>Filter By No. Of Days</u></b>
												{/* <label className="text-black font-w500">Find applica</label> */}
												<div className="contact-name">
												<span className="validation-text">	Applications waiting for less than </span>
												<div >
												<div className="row">
												<div className="col-xl-6 col-xxl-6">
												<label className="text-black font-w500">Number</label>
												<div className="contact-name">
													<input type="text"  className="form-control"
													//className="form-control"
													  autoComplete="off"
														name="days" 
														value={numberWithCommas(addFormData.days)}
                                                       onChange={handleAddFormChange}
														placeholder="No. "
													/>
													{/* <span className="validation-text"> days</span> */}
</div></div>
													<div className="col-xl-6 col-xxl-6">
											 <div className="form-group ">
												<label className="text-black font-w500">Select Type</label>
												<div className="form-group ">
                    
                    <select
					value={addFormData.name}
					name="name"
				onChange={handleAddFormChange}
                      defaultValue={"days"}
                      className="form-control"
                      id="sel1"
                    >
                     <option value={"days"} >Days</option>
					 <option value={"weeks"} >Weeks</option>
					 <option value={"months"} >Months</option>
					 <option value={"years"} >Years</option>
					
                    </select>
                  </div>
											</div>
											</div>
											</div>
													<button type="button" 
		 className="btn btn-primary shadow btn-xs "
		style={{marginLeft:"15px", marginTop:"15px"}}
		 onClick={()=> pickData3()}
		data-dismiss="modal">
Pick Data
		{/* <i className="fa fa-eye"></i> */}
		</button>
		</div>
												</div>
												
											</div>

											
							
											</div>

						

						<div className="row" style={{
							//background:"#096",
							borderBottom:"1px solid #CCC", marginBottom:"20px", paddingBottom:"20px",
							marginTop:"10px",
							 width:"100%"}}>
								<b style={{color:"black"}}><u>Filter By Year / Month</u></b>
					<div className="col-xl-6 col-xxl-6">
											 <div className="form-group ">
												<label className="text-black font-w500">Year</label>
												<div className="form-group ">
                    
                    <select
					value={addFormData.year}
					name="year"
				onChange={handleAddFormChange}
                      defaultValue={new Date().getFullYear()}
                      className="form-control"
                      id="sel1"
                    >
                   {myYears}
                    </select>
                  </div>
											</div>
											</div>


											<div className="col-xl-6 col-xxl-6">
											 <div className="form-group ">
												<label className="text-black font-w500">Month</label>
												<div className="form-group ">
                    
                    <select
					value={addFormData.month}
					name="month"
					onChange={handleAddFormChange}
                      defaultValue={-1}
                      className="form-control"
                      id="sel1"
                    >
						<option value={-1} >None</option>
                     <option value={0} >January</option>
					 <option value={1} >Febuary</option>
					 <option value={2} >March</option>
					 <option value={3} >April</option>
					 <option value={4} >May</option>
					 <option value={5} >June</option>
					 <option value={6} >July</option>
					 <option value={7} >August</option>
					 <option value={8} >September</option>
					 <option value={9} >October</option>
					 <option value={10} >November</option>
					 <option value={11} >December</option>
                    </select>
                  </div>
											</div>
											</div>

											<div className="col-xl-6 col-xxl-6">
											<button type="button" 
		 className="btn btn-primary shadow btn-xs "
		style={{marginLeft:"15px", marginTop:"15px"}}
		onClick={()=> pickData()}
		data-dismiss="modal">
Pick Data
		{/* <i className="fa fa-eye"></i> */}
		</button>
											</div>
											</div>



											<div className="row" style={{
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
											<button type="button" 
		 className="btn btn-primary shadow btn-xs "
		style={{marginLeft:"15px", marginTop:"15px"}}
		onClick={()=> pickData2()}
		data-dismiss="modal">
Pick Data
		{/* <i className="fa fa-eye"></i> */}
		</button>
											</div>
											</div>
					</div>

					</div>
				</div>}
				<div  className={hideMenu?"col-xl-12 col-xxl-12":"col-xl-8 col-xxl-8"} >
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h4 className="mb-0 fs-20 text-black">Applications Totals For {theData.name}</h4>
							<DropdownBlog />
						</div>
						<div className="card-body">
							<div className="bg-gradient-1 coin-holding flex-wrap"  style={{flexDirection:'row'}}>
								<div className="mb-2 coin-bx"  style={{flex:1}}>
									<div className="d-flex align-items-center">
										
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">All Credit Applications</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total: {theData.allNumber}</b>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Total Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">UGX.{numberWithCommas(theData.all)}</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									{/* <div className="d-flex align-items-center">
										<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 13C1.91797 11.9157 4.89728 8.72772 6.5 7L12.5 10L19.5 1" stroke="#2BC155" stroke-width="2" stroke-linecap="round"/>
										</svg>
										<p className="mb-0 ms-2 text-success">45%</p>
										<p className="mb-0 ms-2 font-w400 text-black">This Week</p>	
									</div> */}
								</div>
							</div>
							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap" style={{flexDirection:'row'}}>
								<div className="mb-2 coin-bx" style={{flex:1}}>
									<div className="d-flex align-items-center">
										
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Pending Applications</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total: {theData.pendingNumber}</b>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Total Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">UGX.{numberWithCommas(theData.pending)}</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
						
								</div>
							</div>
							<div className="bg-gradient-3 coin-holding mt-4 flex-wrap" style={{flexDirection:'row'}}>
								<div className="mb-2 coin-bx" style={{flex:1}}>
									<div className="d-flex align-items-center">
										
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Approved Applications</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total:{theData.approvedNumber}</b>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Total Cost: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">UGX.{numberWithCommas(theData.approved)}</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									{/* <div className="d-flex align-items-center">
										<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 13C1.91797 11.9157 4.89728 8.72772 6.5 7L12.5 10L19.5 1" stroke="#2BC155" stroke-width="2" stroke-linecap="round"/>
										</svg>
										<p className="mb-0 ms-2 text-success">45%</p>
										<p className="mb-0 ms-2 font-w400 text-black">This Week</p>	
									</div> */}
								</div>
							</div>
							<div className="bg-gradient-4 coin-holding mt-4 flex-wrap" style={{flexDirection:'row'}}>
								<div className="mb-2 coin-bx" style={{flex:1}}>
									<div className="d-flex align-items-center">
										
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Rejected Applications</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total: {theData.rejectedNumber}</b>
										</div>
									</div>
								</div>
								<div className="mb-2" style={{flex:1}}>
									<div className="d-flex align-items-center">
										<div className="coin-bx-one">
											Total Cost :
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">UGX.{numberWithCommas(theData.rejected)}</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									{/* <div className="d-flex align-items-center">
										<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 13C1.91797 11.9157 4.89728 8.72772 6.5 7L12.5 10L19.5 1" stroke="#2BC155" stroke-width="2" stroke-linecap="round"/>
										</svg>
										<p className="mb-0 ms-2 text-success">45%</p>
										<p className="mb-0 ms-2 font-w400 text-black">This Week</p>	
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>	
			<div className="row">
			
				<div className="col-xl-4">
					<div className="row">
						{/* <div className="col-xl-12">
							<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="fs-20 text-black mb-0">Weekly Summary</h4>
								</div>
								<div className="card-body py-0">
									<div className="d-flex align-items-center justify-content-between">
										<div>
											<span className="d-flex align-items-center">
												<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect width="22.2609" height="16" rx="8" fill="#13B440"/>
												</svg>
												<span className="mb-0 ms-3 fs-18 font-w500 text-black">30%</span>	
												<span className="mb-0 ms-3">Approved</span>
											</span>
											<span className="d-flex align-items-center">
												<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect y="3.05176e-05" width="22.2609" height="16" rx="8" fill="#FF9574"/>
												</svg>
												<span className="mb-0 ms-3 fs-18 font-w500 text-black">46%</span>	
												<span className="mb-0 ms-3">Rejected</span>
											</span>
											<span className="d-flex align-items-center">
												<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect width="22.2609" height="16" rx="8" fill="#C4C4C4"/>
												</svg>
												<span className="mb-0 ms-3 fs-18 font-w500 text-black">10%</span>	
												<span className="mb-0 ms-3">Pending</span>
											</span>
										</div>
										<div id="WeeklysummaryChart">
											<SummarApexBar />
										</div>
									</div>
								</div>
							</div>
						</div> */}
					</div>
					<div className="row">
						{/* <div className="col-xl-6 col-xxl-12 col-md-6">
							<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="mb-0 fs-20 text-black">Current Graph</h4>
									<DropdownBlog />
								</div>
								<div className="card-body py-2">
									<CurrentApexBar />
								</div>
							</div>
						</div> */}
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
													Approved
												</span>
												{/* <span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#374B96"/>
													</svg>
													Litecoin
												</span> */}
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#F00"/>
													</svg>
													Rejected
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#F7A62C"/>
													</svg>
													Pending
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						:null}
					</div>
				</div>
{yearSum.length>0?
					<div className={theData.length>0?"col-xl-8":"col-xl-12"}>
					<div className="row">
						<div className="col-xl-12">
						<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="fs-20 text-black mb-0">Yearly Application Requests Totals Summary For the Year {addFormData.year}</h4>
								</div>
						<div className="card-body pb-0 pt-3">
							<div id="marketChart" className="market-line">
								<MarketLineApex yearSum={yearSum} key={randomFig} />
							</div>
						</div>
						</div>
						</div>
					</div>
				</div>:null}
			</div>		
		</>
	)
}
export default Portofolio; 