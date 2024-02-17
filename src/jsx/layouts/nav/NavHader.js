import React, { Fragment, useContext, useState , useEffect} from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import image from "../../../images/logo-blue.png";
import image2 from "../../../images/logo-white.png";
import white from "../../../images/small-white.png";
import blue from "../../../images/small-blue.png";

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } = useContext(
    ThemeContext
  );
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {background.value === "dark" || navigationHader !== "color_1" ? (
          <Fragment>
			<img src={toggle ? white:image2} style={{maxWidth:"14vw"}} />
          </Fragment>
        ) : (
          <Fragment>
				<img src={toggle ?blue: image} style={{maxWidth:"14vw"}} />
          </Fragment>
        )}
      </Link>

      {/* <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        
      </div> */}
      
    </div>
  );
};

export default NavHader;
