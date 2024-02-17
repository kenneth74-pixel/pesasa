import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ motherMenu, activeMenu, pageContent , buttonComponent}) => {
  let path = window.location?.pathname.split("/");

  return (
    <div className="row page-titles mx-0">
		{ /* <div className="col-sm-6 p-md-0">
			<div className="welcome-text">
			  <h4>Hi, welcome back!</h4>
			  <p className="mb-0">
				{pageContent ? pageContent : "Your business dashboard template"}
			  </p>
			</div>
		  </div>
		  <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
			<ol className="breadcrumb">
			  <li className="breadcrumb-item">
				<Link to={`/${path[path.length - 1]}`}>{motherMenu}</Link>
			  </li>
			  <li className="breadcrumb-item active c">
				<Link to={`/${path[path.length - 1]}`}>{activeMenu}</Link>
			  </li>
			</ol>
		  </div> */}
		  <div className={buttonComponent?"row mt-3":""}>
			<ol className="breadcrumb col-sm-6">
				<li className="breadcrumb-item active"><Link to={`/${path[path.length - 1]}`}>{motherMenu}</Link></li>
				<li className="breadcrumb-item  "><Link to={`/${path[path.length - 1]}`}>{activeMenu}</Link></li>
			</ol>

			<div style={{marginTop:-10, top:-10}} className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">{buttonComponent}</div>
			</div>
    </div>
  );
};

export default PageTitle;
