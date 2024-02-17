import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Icon from "@mui/material/Icon";
import { getClientBussiness } from "../../../util/APIUtils.js";
import { RotateSpinner } from "react-spinners-kit";
import Donut from "../Boltz/MyWallet/Donut";
import { ThemeContext } from "../../../context/ThemeContext";
import swal from "sweetalert";
const Portofolio = (props) => {
	const { background } = useContext(ThemeContext);
	const [individual, setIsIndividual] = useState(false);
	const [isLoad, seLoad] = useState(false);
	const [bussinessObject, setObject] = useState({});
	function getBussunisessData() {
		seLoad(true)
		getClientBussiness()
			.then((response) => {
				const isIn = response.type === "Individual" ? true : false
				setIsIndividual(isIn)
				let percent = 0
				if (isIn) {
					percent = !response.hasBuyers && !response.hasCreditLimit ?
						40 : !response.hasBuyers && !response.hasCreditLimit ?
							60 : response.hasBuyers && !response.hasCreditLimit ? 80 : response.hasCreditLimit ? 100 : 20
				}
				else {
					percent = response.completedFiles && !response.hasDirectors && !response.hasBuyers && !response.hasCreditLimit ?
						40 : response.hasDirectors && !response.hasBuyers && !response.hasCreditLimit ?
							60 : response.hasBuyers && !response.hasCreditLimit ? 80 : response.hasCreditLimit ? 100 : 20
				}


				setObject(response)
				let message = "Business details filling completed, next step is to add your company documents."
				if (response.completedFiles) {
					message = "Company documents addition completed, next step is to add your company directors."
				}
				else if (response.hasDirectors) {
					message = "You added some company directors, next step is to add some buyers."
				}

				else if (response.hasBuyers) {
					message = "You added some company buyers, you can now apply for credit limit."
				}


				// else{
				// 	alert(JSON.stringify())
				// }
				if (parseInt(percent) !== 100) {
					swal('Registration Progress', message, "success");
				}
				// alert(JSON.stringify(response))
				//setIncompObje

				seLoad(false)

			})
			.catch((error) => {
				seLoad(false)
				console.log(error);
				//swal('Oops', error.message, "error");
			});
	}

	useEffect(() => {
		// alert(props.seconds)
		getBussunisessData()

	}, []);
	const percent = bussinessObject.completedFiles && !bussinessObject.hasDirectors && !bussinessObject.hasBuyers && !bussinessObject.hasCreditLimit ?
		40 : bussinessObject.hasDirectors && !bussinessObject.hasBuyers && !bussinessObject.hasCreditLimit ?
			60 : bussinessObject.hasBuyers && !bussinessObject.hasCreditLimit ? 80 : bussinessObject.hasCreditLimit ? 100 : 20
	return (
		<>
			{isLoad ?
				<div className="row">

					<div style={{ textAlign: "center", width: "100%", }}>

						<div style={{ left: 0, right: 0, margin: "auto", width: "130px" }}>
							<RotateSpinner style={{ left: 0, right: 0, margin: "auto", }} size={130} color="rgba(41, 106, 176,1)" loading={isLoad} />

						</div>
					</div>
				</div> :
				<div className="row">
					<div className="col-xl-9 col-xxl-8">
						<div className="card">
							<div className="card-header border-0 pb-0">
								<h4 className="mb-0 fs-20 text-black">Company Registration</h4>

							</div>
							<div className="card-body">
								<PerfectScrollbar
									style={{ height: "auto" }}
									id="DZ_W_TimeLine1"
									className="widget-timeline dz-scroll style-1 height370 ps ps--active-y"
								>
									<ul className="timeline">
										{!individual ?
											<li>
												<div className="timeline-badge success"></div>
												<Link
													className="timeline-panel text-muted"
													to="/bussinessdetails"
												>
													<span>Business Details</span>
													<h6 className="mb-0" style={{ display: "flex", color: "green" }}>
														Business details filling completed{" "}
														<Icon fontSize="medium" style={{ fontSize: "24px", color: "green" }}>done</Icon>
													</h6>
													<div style={{ marginTop: "10px" }}>
														<Button variant="success btn-xxs">View Business Details</Button>
													</div>
												</Link>
											</li> : null}
										{!individual ?
											<li>
												<div className={bussinessObject.completedFiles ? "success timeline-badge" : "dark timeline-badge"}></div>
												<Link
													className="timeline-panel text-muted"
													to="/documents"
												>
													<span>Company Documents</span>
													<h6 className="mb-0" style={{ display: "flex", color: bussinessObject.completedFiles ? "green" : "" }}>
														{bussinessObject.completedFiles ?
															<>
																Company documents addition completed{" "}
																<Icon fontSize="medium" style={{ fontSize: "24px", color: "green" }}>done</Icon>
															</> :
															"Upload company legal documents."}

													</h6>
													<div style={{ marginTop: "10px" }}>
														{bussinessObject.completedFiles ? <Button variant="success btn-xxs">View Documents</Button> :
															<Button variant="primary btn-xxs">Add Documents</Button>}

													</div>


												</Link>
											</li> : null}

										{!individual && bussinessObject.type !== "Sole Proprietor" ?
											<li>
												<div className={bussinessObject.hasDirectors ? "success timeline-badge" : "dark timeline-badge"}></div>
												<div
													className="timeline-panel text-muted"

												>
													<span>Directors</span>
													<h6 className="mb-0" style={{ display: "flex", color: bussinessObject.completedFiles ? "green" : "" }}>
														{bussinessObject.hasDirectors ?
															<>
																You added some company directors{" "}
																<Icon fontSize="medium" style={{ fontSize: "24px", color: "green" }}>done</Icon>
															</> :
															" You can add company directors after the completing the step above"}

													</h6>
													{bussinessObject.completedFiles ?
														<Link
															className="timeline-panel text-muted"
															to="/directors"
														>
															<div style={{ marginTop: "10px" }}>
																{/* hasDirectors */}
																{bussinessObject.hasDirectors ? <Button variant="success btn-xxs">View Directors</Button> :
																	<Button variant="primary btn-xxs">Add Company Directors</Button>}


															</div></Link> : null}

												</div>
											</li> : null}
										<li>
											<div className={bussinessObject.hasBuyers ? "success timeline-badge" : "dark timeline-badge"}></div>
											<div
												className="timeline-panel text-muted"

											>
												<span>Buyers</span>
												<h6 className="mb-0" style={{ display: "flex", color: bussinessObject.hasBuyers ? "green" : "" }}>
													{bussinessObject.hasBuyers ?
														<>
															You added some company buyers{" "}
															<Icon fontSize="medium" style={{ fontSize: "24px", color: "green" }}>done</Icon>
														</> :
														" You can add your buyers after completing the steps above"}
												</h6>
												{bussinessObject.hasDirectors ?
													<Link
														className="timeline-panel text-muted"
														to="/buyers"
													>
														<div style={{ marginTop: "10px" }}>
															{/* hasDirectors */}
															{bussinessObject.hasBuyers ? <Button variant="success btn-xxs">View Buyers</Button> :
																<Button variant="primary btn-xxs">Add Buyers</Button>}


														</div></Link> : (
														bussinessObject.type === "Individual" || bussinessObject.type==="Sole Proprietor" && bussinessObject.completedFiles ? (
															<Link
																className="timeline-panel text-muted"
																to="/buyers"
															>
																<div style={{ marginTop: "10px" }}>
																	{/* hasDirectors */}
																	{bussinessObject.hasBuyers ? <Button variant="success btn-xxs">View Buyers</Button> :
																		<Button variant="primary btn-xxs">Add Buyers</Button>}


																</div></Link>
														) : null
													)}
											</div>
										</li>
										<li>
											<div className={bussinessObject.hasCreditLimit ? "success timeline-badge" : "dark timeline-badge"}></div>
											<div
												className="timeline-panel text-muted"

											>
												<span>Credit Limit</span>
												<h6 className="mb-0" style={{ display: "flex", color: bussinessObject.hasCreditLimit ? "green" : "" }}>
													{bussinessObject.hasCreditLimit ?
														<>
															You applied for credit limit{" "}
															<Icon fontSize="medium" style={{ fontSize: "24px", color: "green" }}>done</Icon>
														</> :
														" You can apply for credit limit here after completing the steps above"}
												</h6>
												{bussinessObject.hasBuyers ?
													<Link
														className="timeline-panel text-muted"
														to="/creditLimit"
													>
														<div style={{ marginTop: "10px" }}>
															{/* hasDirectors */}
															{bussinessObject.hasCreditLimit ? <Button variant="success btn-xxs">View Credit Limit Application</Button> :
																<Button variant="primary btn-xxs">Apply For Credit Limit</Button>}


														</div></Link> : null}
											</div>
										</li>

									</ul>
								</PerfectScrollbar>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-xxl-4">
						<div className="card">
							<div className="card-header ">
								<h4 className="mb-0 text-black fs-20">Company Brief</h4>

							</div>
							<div className="card-body">
								<div >

									<h4 className="font-w600 text-black name-text">{bussinessObject.fname}</h4>
									<span>{bussinessObject.email}</span>
									<p className="mb-0 mt-3 text-primary fs-16">Registration date: {new Date(bussinessObject.dob).toDateString()}</p>
									<div style={{ marginTop: "25px" }}>
										<div >Business Type:</div>
										<div ><h4 className="mb-0 text-black fs-20"> {bussinessObject.type}</h4></div>
									</div>

									<div style={{ marginTop: "25px" }}>
										<div >Business Sector:</div>
										<div ><h4 className="mb-0 text-black fs-20"> {bussinessObject.sector}</h4></div>
									</div>


									<div style={{ marginTop: "25px" }}>
										<div >Registration Number:</div>
										<div ><h4 className="mb-0 text-black fs-20"> {bussinessObject.regno}</h4></div>
									</div>

									{/* <div style={{marginTop:"25px"}}>
								<div >Company Registration Progress:</div>
								</div> */}

									{/* <div className="d-inline-block position-relative donut-chart-sale mb-3">
														{background.value === "dark" ? (
														  <Donut
															value={percent}
															backgroundColor="#FF6826"
															backgroundColor2="#F0F0F0"
														  />
														) : (
														  <Donut value={percent} backgroundColor="#2258bf" 
															backgroundColor2="rgba(240, 240, 240,1)"
														  />
														)}
														<small>{percent}%</small>
													</div> */}

								</div>
								<div style={{ marginTop: "25px" }}>
									<Link
										// className="timeline-panel text-muted"
										to="/bussinessdetails"
									>
										<Button variant="primary btn-xxs">View Details</Button></Link>
								</div>
							</div>
						</div>
					</div>
				</div>}
			{/* <div className="row"> */}
			{/* <div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
							<WalletTab  activeMenu ="Wallet Activity" />
						</div>
					</div>
				</div> */}
			{/* <div className="col-xl-6"> */}
			{/* <div className="row">
						<div className="col-xl-12">
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
												<span className="mb-0 ms-3">Succesfull Market</span>
											</span>
											<span className="d-flex align-items-center">
												<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect y="3.05176e-05" width="22.2609" height="16" rx="8" fill="#FF9574"/>
												</svg>
												<span className="mb-0 ms-3 fs-18 font-w500 text-black">46%</span>	
												<span className="mb-0 ms-3">Failed</span>
											</span>
											<span className="d-flex align-items-center">
												<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect width="22.2609" height="16" rx="8" fill="#C4C4C4"/>
												</svg>
												<span className="mb-0 ms-3 fs-18 font-w500 text-black">10%</span>	
												<span className="mb-0 ms-3">Waiting</span>
											</span>
										</div>
										<div id="WeeklysummaryChart">
											<SummarApexBar />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> */}

			{/* </div>
			</div>		 */}
		</>
	)
}
export default Portofolio; 