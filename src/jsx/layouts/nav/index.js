import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import ClientSideBar from "./ClientsSideBar";
import NavHader from "./NavHader";
import Header from "./Header";
const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  let userType="CLIENT";
  if(localStorage.getItem("userType")) {
    userType= localStorage.getItem("userType");
    // console.log("hey check "+userType)
  }

  return (
    <Fragment>
      <NavHader />
      <Header
        onNote={() => onClick("chatbox")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
      />
      {userType==="CLIENT"?<ClientSideBar/>:<SideBar />}
    </Fragment>
  );
};

export default JobieNav;
