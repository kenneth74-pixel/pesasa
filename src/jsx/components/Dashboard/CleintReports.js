import React,{useState, useEffect} from 'react';
import ReactApexChart from "react-apexcharts";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown} from 'react-bootstrap';
import swal from "sweetalert";
import {getSummaryPayments, getSummaryPaymentsByYearOrMonth ,
	getSummaryPaymentsByDaysFig,
	getSummaryPaymentsByDateRange, getSummaryClients} from "../../../util/APIUtils.js";
import   DatePicker  from "react-datepicker";
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
	pMinDelay(import("../Boltz/Portfolio/CurrentApexDonut.js"), 1000)
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


const Portofolio = ({hideDetail, setRange, setAddFormDataTwo, getBuyersInfo}) =>{
	const [country1, setCountry1] = useState("Medan, IDN");	
	const [theData, setData] = useState({});
	const [summaryData, setSummaryData] = useState({});
	const [yearSum, setYearSum] = useState([]);
	const hideMenu=true;


	const 	options= {
		chart: {
			height: 250,
			type: "donut",
			toolbar: {
				show: false,
			},
		},
		dataLabels: {
			enabled: true
		},
		stroke: {
		  width: 0,
		},
		//colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3'],
		colors:['#096','#374C98'],
		labels:["Female", "Male"],
		legend: {
			position: 'bottom',
			show:false
		},
		responsive: [{
			breakpoint: 768,
			options: {
				chart: {
					height:200
				},
			}
		}]
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
		getYearSumm()
		// getBuyers()
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
		getSummaryPaymentsByDateRange(addFormData)
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
		getSummaryPaymentsByYearOrMonth(addFormData)
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
		getSummaryPaymentsByDaysFig(addFormData)
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

	


	function getYearSumm(){
		getSummaryClients()
		.then((response) => {
			//alert(JSON.stringify(response))
			setSummaryData(response)
			
			
		})
		.catch((error) => {
			alert(JSON.stringify(error))
			console.log(error);
			// swal('Oops', error, "error");
		});
	}
	return(
		<>
		{hideMenu?null:
			<div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
				<h2 className="font-w600 mb-2 me-auto">Clients Report</h2>
				{/* <Dropdown className=" weather-btn mb-2">
					<span className="fs-22 font-w600 d-flex"><i className="fa fa-cloud me-3 ms-3"></i>21</span>
					<Dropdown.Toggle variant="" as="div" className="form-control style-3 default-select">{country1} </Dropdown.Toggle>
					<Dropdown.Menu >
						<Dropdown.Item onClick={() => setCountry1("Medan, IDN")}>Medan, IDN</Dropdown.Item>
						<Dropdown.Item onClick={() => setCountry1("Jakarta, IDN")}>Jakarta, IDN</Dropdown.Item>
						<Dropdown.Item onClick={() => setCountry1("Surabaya, IDN")}>Surabaya, IDN</Dropdown.Item>
					 </Dropdown.Menu>
				</Dropdown> */}
				{/* <Link to={"#"} className="btn btn-primary mb-2 rounded" onClick={()=> loadParentData()}>
	
				Show Details</Link> */}
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
												<span className="validation-text">	Payments waiting for more than </span>
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
							<h4 className="mb-0 fs-20 text-black">Client Report</h4>
							<DropdownBlog />
						</div>
						<div className="card-body">
							<div className="bg-gradient-1 coin-holding flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">All Clients</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total: {summaryData.total}</b>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Male Clients: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.male}</h2>
										</div>
									</div>


									<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Female Clients: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.female}</h2>
										</div>
									</div>


									{/* <div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Blank Gender: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.notCaptured}</h2>
										</div>
									</div> */}

								</div>
								<div className="mb-2">
									<b className='text-black'>Ratio Of Male to Female Clients (Chart)</b>
								{ summaryData.female !== undefined ? <ReactApexChart
				   options={options}
				  series={ [summaryData.female, summaryData.male]}
				  type="donut"
				  height={200}
				/>: null
								}
									
								</div>
							</div>



							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Categories</h4>
											{/* <b className="mb-0 op-6" style={{color:"#000"}}>Total: {summaryData.youth}</b> */}
										</div>
									</div>
								</div>
								<div className="mb-2">
								<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Bussiness: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.bussiness}</h2>
										</div>
									</div>


									<div className="d-flex align-items-center">
										<div className="text-black">
											Individuals: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.individuals}</h2>
										</div>
									</div>


									
								</div>
								<div className="mb-2">
									<b className='text-black'>Ratio Of Bussiness to Individuals (Chart)</b>
							{summaryData.bussiness!== undefined?	<ReactApexChart
				   options={{
					chart: {
						height: 250,
						type: "donut",
						toolbar: {
							show: false,
						},
					},
					dataLabels: {
						enabled: true
					},
					stroke: {
					  width: 0,
					},
					//colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3'],
					colors:['#FF782C','#FFAB2D'],
					labels:["Bussiness", "Individuals"],
					legend: {
						position: 'bottom',
						show:false
					},
					responsive: [{
						breakpoint: 768,
						options: {
							chart: {
								height:200
							},
						}
					}]
				}}
				  series={ [summaryData.bussiness, summaryData.individuals]}
				  type="donut"
				  height={200}
				/> :null}
									
								</div>
							</div>



							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Youth Clients</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total: {summaryData.youth}</b>
										</div>
									</div>
								</div>
								<div className="mb-2">
								<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Male Youth Clients: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.maleYouth}</h2>
										</div>
									</div>


									<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Female Youth Clients: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.femaleYouth}</h2>
										</div>
									</div>


									{/* <div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Blank Gender: 
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.notGradedYouth}</h2>
										</div>
									</div> */}
								</div>
								<div className="mb-2">
									<b className='text-black'>Ratio Of Male to Female Youth Clients</b>
								{summaryData.femaleYouth !== undefined?
								<ReactApexChart
				   options={options}
				  series={ [summaryData.femaleYouth, summaryData.maleYouth]}
				  type="donut"
				  height={200}
				/>:null}
									
								</div>
							</div>
							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Age Groups</h4>
										
										</div>
									</div>
								</div>
								<div className="mb-2">
								<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											18 to 24 :
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.upto24}</h2>
										</div>
									</div>


									<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
										25 to 30 :
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.upto30}</h2>
										</div>
									</div>


									<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											31 to 40
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.upto40}</h2>
										</div>
									</div>



									<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											41 to 50
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.upto50}</h2>
										</div>
									</div>


									<div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Above 50
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.above50}</h2>
										</div>
									</div>


									{/* <div className="d-flex align-items-center">
										<div className="coin-bx-one text-black">
											Others
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{summaryData.noAge}</h2>
										</div>
									</div> */}


								</div>
								<div className="mb-2">
								<b className='text-black'>Pie Chart Of Client Age Range Groups</b>
								{summaryData.upto24 !== undefined?
								<ReactApexChart
				   options={{
					chart: {
						height: 250,
						type: "donut",
						toolbar: {
							show: false,
						},
					},
					dataLabels: {
						enabled: true
					},
					stroke: {
					  width: 0,
					},
					//colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3'],
					colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3', '#096'],
					labels:["18 to 24", "25 to 30", "31 to 40","41 to 50","Above 50"],
					legend: {
						position: 'bottom',
						show:false
					},
					responsive: [{
						breakpoint: 768,
						options: {
							chart: {
								height:200
							},
						}
					}]
				}}
				  series={ [summaryData.upto24, summaryData.upto30, summaryData.upto40, summaryData.upto50, summaryData.above50]}
				  type="donut"
				  height={200}
				/> : null}
								</div>
							</div>



							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Regions</h4>
											{/* <b className="mb-0 op-6" style={{color:"#000"}}>Total: {summaryData.youth}</b> */}
										</div>
									</div>
								</div>
						
							<div className="mb-2">
								

{summaryData?.regionStats?.map((option, key) => {return (
 key !== 4 ? <div className="d-flex align-items-center">
										<div className="text-black">
										{option.name} :
										</div>	
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">{option.clientsAvailable}</h2>
										</div>
									</div>:null)})}


									
								</div>
								{summaryData.regionStats!==undefined? 
								<div className="mb-2">
								<b className='text-black'>Pie Chart Of Client Groping By Regions</b>
								
								<ReactApexChart
				   options={{
					chart: {
						height: 250,
						type: "donut",
						toolbar: {
							show: false,
						},
					},
					dataLabels: {
						enabled: true
					},
					stroke: {
					  width: 0,
					},
					//colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3'],
					colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3'],
					labels:["Nothern Region", "Eastern Region", "Western Region","Central Region"],
					legend: {
						position: 'bottom',
						show:false
					},
					responsive: [{
						breakpoint: 768,
						options: {
							chart: {
								height:200
							},
						}
					}]
				}}
				  series={ [summaryData?.regionStats[0]?.clientsAvailable, summaryData?.regionStats[1]?.clientsAvailable, summaryData?.regionStats[2]?.clientsAvailable, summaryData?.regionStats[3]?.clientsAvailable]}
				  type="donut"
				  height={200}
				/>
								</div>:null}
							</div>
							{/* <div className="bg-gradient-4 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M31.486 0.00501884C14.9215 -0.294993 1.26772 12.893 0.967906 29.4562C0.668097 46.0194 13.8472 59.695 30.3992 59.995C46.9511 60.295 60.6174 47.107 60.9172 30.5313C61.217 13.9681 48.0379 0.292531 31.486 0.00501884ZM30.4991 54.3698C17.0702 54.1197 6.33949 42.9943 6.58933 29.5562C6.82667 16.1182 17.9446 5.38024 31.3735 5.61775C44.815 5.86776 55.5332 16.9932 55.2958 30.4313C55.0585 43.8693 43.928 54.6073 30.4991 54.3698Z" fill="#FF6803"/>
												<path d="M31.3361 8.11785C19.2812 7.90534 9.3001 17.5432 9.08773 29.6062C9.01653 33.4014 9.9272 36.9903 11.5786 40.1354H18.4505V18.602C18.4505 17.2857 20.2381 16.867 20.819 18.0483L30.9426 38.5629L41.0661 18.0495C41.647 16.867 43.4346 17.2857 43.4346 18.602V40.1354H50.2852C51.8218 37.2128 52.7362 33.9127 52.7974 30.3938C53.0098 18.3308 43.3909 8.34286 31.3361 8.11785Z" fill="#FF6803"/>
												<path d="M40.9362 41.3855V23.9573L32.0619 41.9392C31.6421 42.793 30.2418 42.793 29.822 41.9392L20.9489 23.9573V41.3855C20.9489 42.0755 20.3905 42.6355 19.6997 42.6355H13.1402C17.0264 48.0995 23.3449 51.7346 30.5491 51.8696C38.0405 52.0022 44.7263 48.327 48.77 42.6355H42.1854C41.4946 42.6355 40.9362 42.0755 40.9362 41.3855Z" fill="#FF6803"/>
											</svg>
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">Rejected Payments</h4>
											<b className="mb-0 op-6" style={{color:"#000"}}>Total: {theData.rejectedNumber}</b>
										</div>
									</div>
								</div>
								<div className="mb-2">
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
									
								</div>
							</div> */}
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
													Paid
												</span>
												
												
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#F7A62C"/>
													</svg>
													Pending Payment
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>:null}
					</div>
				</div>
{/* {yearSum.length>0?
				<div className={theData.length>0?"col-xl-8":"col-xl-12"}>
					<div className="row">
						
						<div className="col-xl-12">
						<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="fs-20 text-black mb-0">Yearly  Payments Totals Summary For the Year {addFormData.year}</h4>
								</div>
						<div className="card-body pb-0 pt-3">
							<div id="marketChart" className="market-line">
								<MarketLineApex yearSum={yearSum} key={randomFig} />
							</div>
						</div>
						</div>
						</div>
					</div>
				</div>:null} */}
			</div>		
		</>
	)
}
export default Portofolio; 