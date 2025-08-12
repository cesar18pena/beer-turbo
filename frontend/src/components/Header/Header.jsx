import React from "react";
import "./Header.less";

// const avatarSrc = new URL("../../assets/Sin-título-1.jpg", import.meta.url)
//   .href;

const Header = ({ userName }) => (
  <header className="header">
    <div className="menu-icon">
      <span className="menu-bar" />
      <span className="menu-bar" />
      <span className="menu-bar" />
    </div>
    <div className="welcome">
      <div className="greeting">Hi {userName},</div>
      <h1>Welcome Back!</h1>
    </div>
    <div className="avatar">
      {/* <img src={avatarSrc} alt="User avatar" /> */}
    </div>
  </header>
);

export default Header;
