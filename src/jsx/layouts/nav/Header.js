import React from "react";

import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import LogoutPage from './Logout';
import profile from "../../../images/profile/avatar.png";
/// Image
//import profile from "../../../images/profile/pic1.jpg";
import { Dropdown } from "react-bootstrap";

const Header = ({ onNote }) => {
 
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
			
            </div>
            <ul className="navbar-nav header-right main-notification">
              
			

              <Dropdown as="li" style={{borderRadius:"50%"}} className="nav-item dropdown   header-profile">
                
              <Dropdown.Toggle
               style={{borderRadius:"50%", textAlign:"center"}}
                  className="nav-link i-false c-pointer ai-icon "
                  variant=""
                  as="a"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
				<img src={profile} style={{marginTop:"1px"}} width={30} alt="" />  </Dropdown.Toggle>	

                <Dropdown.Menu >
                  <Link to="/app-profile" className="dropdown-item ">
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
                  
				  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
			  	 
			  
		
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
