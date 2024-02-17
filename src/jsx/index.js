import React, { useContext, lazy } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";

/// Css
//import "swiper/css";
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from './pages/ScrollToTop';
// Admin Routes
const Clients = lazy(() => import('./components/table/FilteringTable/Clients.js'));
const LoanApplications = lazy(() => import('./components/table/FilteringTable/LoanApplications.js'));
const Directors = lazy(() => import('./components/table/FilteringTable/Directors'));
const Reimburse = lazy(() => import('./components/table/FilteringTable/Reimburse.js'));
const Collections = lazy(() => import('./components/table/FilteringTable/Collections.js'));
const CleintReportale = lazy(() => import('./components/table/FilteringTable/CleintReportale.js'));
const BuyerReport = lazy(() => import('./components/table/FilteringTable/BuyerReport.js'));
const PortofolioReport = lazy(() => import('./components/table/FilteringTable/PortofolioReport.js'));
const CompanyBuyers = lazy(() => import('./components/table/FilteringTable/CompanyBuyers.js'));
const Banks = lazy(() => import('./components/table/FilteringTable/Banks.js'));
const Regions = lazy(() => import('./components/table/FilteringTable/Regions.js'));
const Required = lazy(() => import('./components/table/FilteringTable/Required.js'));
const Rates = lazy(() => import('./components/table/FilteringTable/Rates.js'));
const ExchangeRates = lazy(() => import('./components/table/FilteringTable/ExchangeRates.js'));
const DataImports = lazy(() => import('./components/table/FilteringTable/DataImports.js'));
const DashboardCollectionsReport = lazy(() => import('./components/table/FilteringTable/CollectionsReport.js'));
const AppProfile = lazy(() => import('./components/AppsMenu/AppProfile/AppProfile'));


//User Routes
const Portofolio = lazy(() => import('./components/Dashboard/Portofolio'));
const InvoiceDiscounting = lazy(() => import('./components/AppsMenu/AppProfile/InvoiceDiscounting.js'));
const BussinessDetails = lazy(() => import('./components/AppsMenu/AppProfile/BussinessDetails'));
const Documents = lazy(() => import('./components/AppsMenu/AppProfile/Documents'));

const NotComplete = lazy(() => import('./components/AppsMenu/AppProfile/NotComplete'));

const ClientDirectors = lazy(() => import('./components/table/FilteringTable/ClientDirectors'));
const Buyers = lazy(() => import('./components/table/FilteringTable/Buyers.js'));
const CreditLimitApplication = lazy(() => import('./components/AppsMenu/AppProfile/CreditLimitApplication'));
const ClientProfile = lazy(() => import('./components/AppsMenu/AppProfile/ClientProfile'));










// import Reports from "./components/table/FilteringTable/Reports.js";




import { ThemeContext } from "../context/ThemeContext";

const Markup = () => {
let userType="CLIENT";
  if(localStorage.getItem("userType")) {
    userType= localStorage.getItem("userType");
    // console.log("hey check "+userType)
  }

  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    // { url: "", component: userType==="CLIENT"?Portofolio:MyWallet },
    //{ url: "dashboard", component: Home },
   // { url: "dashboard", component:  userType==="CLIENT"?Portofolio:MyWallet },
    { url: "dashboard", component:  userType==="CLIENT"?Portofolio:LoanApplications },
    // { url: "my-wallet", component: MyWallet },
    { url: "portofolio", component: Portofolio },
    { url: "documents", component: Documents },
    { url: "notComplete", component: NotComplete },
    

    /// Apps
    { url: "app-profile", component:userType==="CLIENT"?ClientProfile: AppProfile },
    { url: "bussinessdetails", component: BussinessDetails },
    { url: "invoiceDiscounting", component: InvoiceDiscounting },

  
    { url: 'banks', component: Banks},
    { url: 'regions', component: Regions},
    
    { url: 'required', component: Required},
    { url: 'rates', component: Rates},
    { url: 'exchange', component: ExchangeRates},
    { url: 'dataImports', component: DataImports},

    /// table
  { url: 'directors', component: userType==="CLIENT"? ClientDirectors: Directors },
  { url: 'buyers', component: Buyers},
  { url: 'clients', component: Clients},
  { url: 'loanApplications', component: LoanApplications},
  { url: 'disbursements', component:   Reimburse},
  { url: 'collections', component: Collections},
  { url: 'clientReports', component: CleintReportale},
  { url: 'buyerReport', component: BuyerReport},
  { url: 'portofolioReport', component: PortofolioReport},

  { url: 'dashboardCollectionsReport', component: DashboardCollectionsReport},

  // { url: 'reports', component: Reports},
  
  { url: 'creditLimit', component: CreditLimitApplication},
  
  { url: 'companybuyers', component: CompanyBuyers},
  

  ];
  let path = window.location?.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
	  <ScrollToTop />
    </>
  );
};

export default Markup;
