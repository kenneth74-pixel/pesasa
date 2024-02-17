/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';
import Icon from "@mui/material/Icon";
/// Image
// import profile from "../../../images/profile/avatar.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {
  }
  render() {
    return (
		<div className="mm-wrapper">
			<ul className="metismenu" ref={(el) => (this.el = el)}>
				{this.props.children}
			</ul>
		</div>
    );
  }
}

const SideBar = () => {
	
  var d  = new Date();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);
  useEffect(() => {
    // var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    // btn.addEventListener("click", toggleFunc);
	
	//sidebar icon Heart blast
	var handleheartBlast = document.querySelector('.heart');
        function heartBlast() {
            return handleheartBlast.classList.toggle("heart-blast");
        }
       // handleheartBlast.addEventListener('click', heartBlast);
	
  }, []);
  //let scrollPosition = useScrollPosition();
  // For scroll
	const [hideOnScroll, setHideOnScroll] = useState(true)
	useScrollPosition(
		({ prevPos, currPos }) => {
		  const isShow = currPos.y > prevPos.y
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll]
	)
  
  /// Path
  let path = window.location?.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "",
      "dashboard-dark",
      "coin-details",
      "my-wallet",
      "transactions",
      "portofolio",
      "market-capital",
      "task",
    ],
    app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    email = ["email-compose", "email-inbox", "email-read"],
    shop = [
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "ecom-product-detail",
    ],
    charts = [
      "chart-rechart",
      "chart-flot",
      "chart-chartjs",
      "chart-chartist",
      "chart-sparkline",
      "chart-apexchart",
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-media-object",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",
      "uc-nestable",
      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ],
	redux = [
       "redux-form",
	   "redux-wizard",    
       "todo",
    ],
    widget = ["widget-basic"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      "form-pickers",
      "form-validation-jquery",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      {userDetails!==null?
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
			<Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                  // href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  {/* <img src={profile} width={20} alt="" /> */}
                  <div className="header-info ms-3">
						<span className="font-w600 ">Hi,<b>{userDetails.displayName}</b></span>
						<small className="text-end font-w400">{userDetails.email}</small>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu align="right" className="mt-2 dropdown-menu dropdown-menu-end">
                  <Link to="/app-profile" className="dropdown-item ai-icon">
                    <svg
                      id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary"
                      width={18} height={18} viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ms-2">Profile </span>
                  </Link>
                  {/* <Link to="/email-inbox" className="dropdown-item ai-icon">
                    <svg
                      id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success" width={18}
                      height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="ms-2">Inbox </span>
                  </Link> */}
				  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
              {/* <li className={path.includes("dashboard") ? "mm-active" : ""}>
            <Link to="/dashboard" className="ai-icon" >
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li> */}


          <li className={path.includes("loanApplications") ? "mm-active" : ""}>
            <Link to="/loanApplications" className="ai-icon" style={{display:"flex"}}>
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
         //   marginRight:"5px",
            marginTop:"0px",
          //  position:"absolute"
          }}
            
            >wallet</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Credit Applications</span>
            </Link>
          </li>

          <li className={path.includes("disbursements") ? "mm-active" : ""}>
            <Link to="/disbursements" className="ai-icon" style={{display:"flex"}}>
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
         //   marginRight:"5px",
            marginTop:"0px",
          //  position:"absolute"
          }}
            
            >money</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Disbursements</span>
            </Link>
          </li>

          
          <li className={path.includes("collections") ? "mm-active" : ""}>
            <Link to="/collections" className="ai-icon" style={{display:"flex"}}>
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
         //   marginRight:"5px",
            marginTop:"0px",
          //  position:"absolute"
          }}
            
            >apps</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Collections</span>
            </Link>
          </li>



          {/* <li className={path.includes("reports") ? "mm-active" : ""}>
            <Link to="/reports" className="ai-icon" style={{display:"flex"}}>
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
         //   marginRight:"5px",
            marginTop:"0px",
          //  position:"absolute"
          }}
            
            >list_alt</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Back Office</span>
            </Link>
          </li> */}

          {/* <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
            <ul >
              <li><Link className={`${path === "" ? "mm-active" : "dashboard"}`} to="/dashboard"> Dashboard Light</Link></li>
              <li><Link className={`${path === "dashboard-dark" ? "mm-active" : ""}`} to="/dashboard-dark"> Dashboard Dark</Link></li>
              <li><Link className={`${path === "coin-details" ? "mm-active" : ""}`} to="/coin-details">Coin Details</Link></li>
              <li><Link className={`${path === "my-wallet" ? "mm-active" : ""}`} to="/my-wallet">My Wallet</Link></li>
              <li><Link className={`${path === "transactions" ? "mm-active" : ""}`} to="/transactions">Transactions</Link></li>
              <li><Link className={`${path === "portofolio" ? "mm-active" : ""}`} to="/portofolio">Portofolio</Link></li>
              <li><Link className={`${path === "market-capital" ? "mm-active" : ""}`} to="/market-capital">Market Capital</Link></li>
              <li><Link className={`${path === "task" ? "mm-active" : ""}`} to="/task">Task</Link></li>
            </ul>
          </li> */}
          
          {/* <li className={`${charts.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-041-graph"></i>
              <span className="nav-text">Charts</span>
            </Link>
            <ul >
              <li>
                <Link
                  className={`${path === "chart-rechart" ? "mm-active" : ""}`}
                  to="/chart-rechart"
                >
					RechartJs
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "chart-chartjs" ? "mm-active" : ""}`}
                  to="/chart-chartjs"
                >
                  Chartjs
                </Link>
            </li> */}
             <li className={path.includes("companybuyers") ? "mm-active" : ""}>
            <Link to="/companybuyers" className="ai-icon" style={{display:"flex"}}>
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
         //   marginRight:"5px",
            marginTop:"0px",
          //  position:"absolute"
          }}
            
            >account_balance_wallet</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Buyers</span>
            </Link>
          </li>


          <li className={path.includes("clients") ? "mm-active" : ""}>
            <Link to="/clients" className="ai-icon" style={{display:"flex"}}>
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
          //  marginRight:"5px",
            marginTop:"0px",
          //  position:"absolute"
          }}
            
            >people</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Clients</span>
            </Link>
          </li>


          <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#"  style={{display:"flex"}}>
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
            marginRight:"5px",
            marginTop:"0px",
           // position:"absolute"
          }}
            
            >reports</Icon>
              <span className="nav-text">Reports</span>
            </Link>
            <ul >
         <li><Link className={`${path === "clientReports" ? "mm-active" : ""}`} to="/clientReports">Clients</Link></li>
         <li><Link className={`${path === "buyerReport" ? "mm-active" : ""}`} to="/buyerReport">Buyer Reports</Link></li>
         
         <li><Link className={`${path === "dashboardCollectionsReport" ? "mm-active" : ""}`} to="/dashboardCollectionsReport">Collections Reports</Link></li>
         <li><Link className={`${path === "portofolioReport" ? "mm-active" : ""}`} to="/portofolioReport">Portofolio Reports</Link></li>
         
         
         {/* <li><Link className={`${path === "exports" ? "mm-active" : ""}`} to="/exports">Report Exports</Link></li>   */}
              {/* <li><Link className={`${path === "clientReports" ? "mm-active" : ""}`} to="/loanApplications">Clients</Link></li> */}
              {/* <li><Link className={`${path === "required" ? "mm-active" : ""}`} to="/loanApplications">Buyers</Link></li>
              <li><Link className={`${path === "rates" ? "mm-active" : ""}`} to="/loanApplications">Finance</Link></li>
              <li><Link className={`${path === "regions" ? "mm-active" : ""}`} to="/loanApplications">Impact Report</Link></li> */}
            </ul>
          </li>

          <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#"  style={{display:"flex"}}>
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
            marginRight:"5px",
            marginTop:"0px",
           // position:"absolute"
          }}
            
            >settings</Icon>
              <span className="nav-text">Configurations</span>
            </Link>
            <ul >
              <li><Link className={`${path === "banks" ? "mm-active" : ""}`} to="/banks">Banks</Link></li>
              <li><Link className={`${path === "required" ? "mm-active" : ""}`} to="/required">Required Files</Link></li>
              <li><Link className={`${path === "rates" ? "mm-active" : ""}`} to="/rates">Discount Rates</Link></li>
              {/* <li><Link className={`${path === "exchange" ? "mm-active" : ""}`} to="/exchange">Exchange Rates</Link></li> */}
              <li><Link className={`${path === "regions" ? "mm-active" : ""}`} to="/regions">Regions</Link></li>
              <li><Link className={`${path === "dataImports" ? "mm-active" : ""}`} to="/dataImports">Data Imports</Link></li>
            </ul>
          </li>

          <li className={`${app.includes(path) ? "mm-active" : ""}`}  style={{marginBottom:"10px"}}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-050-info"></i>
              <span className="nav-text">System Users</span>
            </Link>
            <ul >
              <li><Link className={`${path === "directors" ? "mm-active" : ""}`} to="/directors">Staff</Link></li>
              {/* <li><Link  className={"disabled-link "+path === "post-details" ? "mm-active" : "" } to="/post-details">Clients</Link></li> */}
              {/* <li className={`${email.includes(path) ? "mm-active" : ""}`}><Link className="has-arrow" to="#" >Email</Link>
                <ul  className={`${email.includes(path) ? "mm-show" : ""}`}>
                  <li><Link className={`${ path === "email-compose" ? "mm-active" : ""}`} to="/email-compose">Compose</Link></li>
                  <li><Link className={`${path === "email-inbox" ? "mm-active" : ""}`} to="/email-inbox">Inbox</Link></li>
                  <li><Link className={`${path === "email-read" ? "mm-active" : ""}`} to="/email-read">Read</Link></li>
                </ul>
              </li>
              <li><Link className={`${path === "app-calender" ? "mm-active" : ""}`}to="/app-calender">Calendar</Link></li>
              <li className={`${shop.includes(path) ? "mm-active" : ""}`}><Link className="has-arrow" to="#" >Shop</Link>
                <ul  className={`${shop.includes(path) ? "mm-show" : ""}`}>
                  <li><Link className={`${ path === "ecom-product-grid" ? "mm-active" : ""}`} to="/ecom-product-grid">Product Grid</Link></li>
                  <li><Link className={`${ path === "ecom-product-list" ? "mm-active" : ""}`} to="/ecom-product-list">Product List</Link></li>
                  <li><Link className={`${ path === "ecom-product-detail" ? "mm-active" : "" }`} to="/ecom-product-detail">Product Details</Link></li>
                  <li><Link className={`${ path === "ecom-product-order" ? "mm-active" : "" }`} to="/ecom-product-order">Order</Link></li>
                  <li><Link className={`${ path === "ecom-checkout" ? "mm-active" : ""}`} to="/ecom-checkout">Checkout</Link></li>
                  <li><Link className={`${ path === "ecom-invoice" ? "mm-active" : "" }`} to="/ecom-invoice">Invoice</Link></li>
                  <li><Link className={`${ path === "ecom-customers" ? "mm-active" : "" }`} to="/ecom-customers">Customers</Link></li>
                </ul>
              </li> */}
            </ul>
          </li>


          {/* <li className={path.includes("banks") ? "mm-active" : ""}>
            <Link to="/banks" className="ai-icon" >
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
            marginRight:"5px",
            marginTop:"0px",
            position:"absolute"
          }}
            
            >account_balance</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Banks</span>
            </Link>
          </li>


          <li className={path.includes("required") ? "mm-active" : ""}>
            <Link to="/required" className="ai-icon" >
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
            marginRight:"5px",
            marginTop:"0px",
            position:"absolute"
          }}
            
            >attach_file</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Required Files</span>
            </Link>
          </li>

          <li className={path.includes("rates") ? "mm-active" : ""}>
            <Link to="/rates" className="ai-icon" >
            <Icon fontSize="medium" 
           style={{
          //  color :"green",
            marginRight:"5px",
            marginTop:"0px",
            position:"absolute"
          }}
            
            >trending_up</Icon>
              <span className="nav-text" style={{marginLeft:"35px"}}>Discount Rates</span>
            </Link>
          </li> */}
          
          
              
              {/*
              <li>
                <Link
                  className={`${path === "chart-sparkline" ? "mm-active" : ""}`}
                  to="/chart-sparkline"
                >
                  Sparkline
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "chart-apexchart" ? "mm-active" : ""}`}
                  to="/chart-apexchart"
                >
                  Apexchart
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${bootstrap.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-086-star"></i>
              <span className="nav-text">Bootstrap</span>
            </Link>
            <ul >
              <li>
                <Link
                  className={`${path === "ui-accordion" ? "mm-active" : ""}`}
                  to="/ui-accordion"
                >
                  Accordion
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-alert" ? "mm-active" : ""}`}
                  to="/ui-alert"
                >
                  Alert
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-badge" ? "mm-active" : ""}`}
                  to="/ui-badge"
                >
                  Badge
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-button" ? "mm-active" : ""}`}
                  to="/ui-button"
                >
                  Button
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-modal" ? "mm-active" : ""}`}
                  to="/ui-modal"
                >
                  Modal
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-button-group" ? "mm-active" : ""}`}
                  to="/ui-button-group"
                >
                  Button Group
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-list-group" ? "mm-active" : ""}`}
                  to="/ui-list-group"
                >
                  List Group
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-card" ? "mm-active" : ""}`}
                  to="/ui-card"
                >
                  Cards
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-carousel" ? "mm-active" : ""}`}
                  to="/ui-carousel"
                >
                  Carousel
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-dropdown" ? "mm-active" : ""}`}
                  to="/ui-dropdown"
                >
                  Dropdown
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-popover" ? "mm-active" : ""}`}
                  to="/ui-popover"
                >
                  Popover
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-progressbar" ? "mm-active" : ""}`}
                  to="/ui-progressbar"
                >
                  Progressbar
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-tab" ? "mm-active" : ""}`}
                  to="/ui-tab"
                >
                  Tab
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-typography" ? "mm-active" : ""}`}
                  to="/ui-typography"
                >
                  Typography
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-pagination" ? "mm-active" : ""}`}
                  to="/ui-pagination"
                >
                  Pagination
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-grid" ? "mm-active" : ""}`}
                  to="/ui-grid"
                >
                  Grid
                </Link>
              </li>
            </ul>
          </li>
			<li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
				<Link className="has-arrow ai-icon" to="#" >
					<i className="flaticon-045-heart"></i><span className="nav-text">Plugins</span>
				</Link>
				<ul >
				  <li><Link className={`${path === "uc-select2" ? "mm-active" : ""}`} to="/uc-select2">Select 2</Link></li>
				  <li><Link className={`${path === "uc-nestable" ? "mm-active" : ""}`} to="/uc-nestable">Nestedable</Link></li>
				  <li><Link className={`${path === "uc-noui-slider" ? "mm-active" : ""}`} to="/uc-noui-slider">Noui Slider</Link></li>
				  <li><Link className={`${path === "uc-sweetalert" ? "mm-active" : ""}`} to="/uc-sweetalert">Sweet Alert</Link></li>
				  <li><Link className={`${path === "uc-toastr" ? "mm-active" : ""}`} to="/uc-toastr">Toastr</Link></li>
				  <li><Link className={`${path === "map-jqvmap" ? "mm-active" : ""}`} to="/map-jqvmap">Jqv Map</Link></li>
				  <li><Link className={`${path === "uc-lightgallery" ? "mm-active" : ""}`} to="/uc-lightgallery">Light Gallery</Link></li>
				</ul>
			</li>
			<li className={`${redux.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow ai-icon" to="#" >
                        <i className="flaticon-087-stop"></i><span className="nav-text">Redux</span>
                    </Link>
                <ul>
                  <li><Link className={`${path === "todo" ? "mm-active" : ""}`} to="/todo">Todo</Link></li>
					  {/* <li><Link className={`${path === "redux-form" ? "mm-active" : ""}`} to="/redux-form">Redux Form</Link></li> */}
               {/*   <li><Link className={`${path === "redux-wizard" ? "mm-active" : ""}`} to="/redux-wizard">Redux Wizard</Link></li>
                </ul>
            </li>
          <li className={`${widget.includes(path) ? "mm-active" : ""}`}>
            <Link to="widget-basic" className="ai-icon" >
              <i className="flaticon-013-checkmark"></i>
              <span className="nav-text">Widget</span>
            </Link>
          </li>
          <li className={`${forms.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-072-printer"></i>
              <span className="nav-text forms">Forms</span>
            </Link>
            <ul >
              <li>
                <Link
                  className={`${path === "form-element" ? "mm-active" : ""}`}
                  to="/form-element"
                >
                  Form Elements
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "form-wizard" ? "mm-active" : ""}`}
                  to="/form-wizard"
                >
                  Wizard
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "form-editor-summernote" ? "mm-active" : ""
                  }`}
                  to="/form-editor-summernote"
                >
                  Summernote
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "form-pickers" ? "mm-active" : ""}`}
                  to="/form-pickers"
                >
                  Pickers
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "form-validation-jquery" ? "mm-active" : ""
                  }`}
                  to="/form-validation-jquery"
                >
                  Form Validate
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${table.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" ><i className="flaticon-043-menu"></i><span className="nav-text">Table</span></Link>
            <ul>
				<li>
					<Link className={`${ path === "table-filtering" ? "mm-active" : "" }`} to="/table-filtering">
						Table Filtering
					</Link>
				</li>
				<li>
					<Link className={`${ path === "table-sorting" ? "mm-active" : "" }`} to="/table-sorting">
						Table Sorting
					</Link>
				</li>
				<li>
					<Link className={`${ path === "table-bootstrap-basic" ? "mm-active" : "" }`} to="/table-bootstrap-basic">
						Bootstrap
					</Link>
				</li>
				<li>
					<Link className={`${ path === "table-datatable-basic" ? "mm-active" : ""}`} to="/table-datatable-basic">
						Datatable
					</Link>
				</li>
            </ul>
          </li>
          <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-022-copy"></i>
              <span className="nav-text">Pages</span>
            </Link>
            <ul >
              <li className={`${error.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#" >Error</Link>
                <ul>
                  <li><Link className={`${ path === "page-error-400" ? "mm-active" : "" }`} to="/page-error-400">Error 400</Link></li>
                  <li><Link className={`${ path === "page-error-403" ? "mm-active" : "" }`} to="/page-error-403">Error 403</Link></li>
                  <li><Link className={`${ path === "page-error-404" ? "mm-active" : "" }`} to="/page-error-404">Error 404</Link></li>
                  <li><Link className={`${ path === "page-error-500" ? "mm-active" : "" }`} to="/page-error-500">Error 500</Link></li>
                  <li><Link className={`${ path === "page-error-503" ? "mm-active" : "" }`} to="/page-error-503">Error 503</Link></li>
                </ul>
              </li>
              <li>
                <Link
                  className={`${
                    path === "page-lock-screen" ? "mm-active" : ""
                  }`}
                  to="/page-lock-screen"
                >
                  Lock Screen
                </Link>
              </li>
            </ul>
          </li> */}
        </MM>
		{/* <div className="copyright">
			<p><strong>Boltz Payment Admin Dashboard</strong> © {d.getFullYear()} All Rights Reserved</p>
			<p className="fs-12">Made with <span className="heart"></span> by DexignZone</p>
		</div> */}
      </PerfectScrollbar>:null}
    </div>
  );
};

export default SideBar;
