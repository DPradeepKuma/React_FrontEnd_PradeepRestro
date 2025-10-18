import React from 'react'

const NavBar = ({showLoginHandlerClick,showWelcomeHandlerClick,showRegisterHandlerClick,showLogOut,logOutHandler}) => {
  
  const firmName= localStorage.getItem("firmName");
  return (
  
  <div className="navSection">
    <div className="Company">
       <div className="homePageToVendor">
        <span onClick={showWelcomeHandlerClick}> Vendor Dashboard/home page</span>
       </div>
    </div>
    <div className="firmName">
      <h3>firmName :{firmName}</h3>
    </div>
    <div className="userAuth">
      {!showLogOut ? 
       <>
        <span onClick={showLoginHandlerClick}>Login / </span>
        <span onClick={showRegisterHandlerClick}>Register</span>
      </> : <span onClick={logOutHandler}>Logout</span> } 
    </div>
  </div>

  )
}

export default NavBar
