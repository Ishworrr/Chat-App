import React from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";

const LeftSidebar = () => {
  return (
    <div>
      <div className="ls">
        <div className="ls-top">
          <div className="ls-nav">
            <img src={assets.logo} className="logo" alt="" />
            <div className="menu">
              <img src={assets.menu_icon} alt="" />
              <div className="sub-menu">
                <p>Edit Profile</p>
                <hr />
                <p>logout</p>
              </div>
            </div>
          </div>
          <div className="ls-search">
            <img src={assets.search_icon} alt="" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="ls-list">
          {Array(12)
            .fill("100")
            .map((item, index) => (
              <div key={index} className="friends">
                <img src={assets.profile_img} alt="" />
                <div>
                  <p>Richard</p>
                  <span>Hey, hru?</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
