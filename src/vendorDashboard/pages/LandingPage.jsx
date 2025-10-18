import React , {useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/forms/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct ] = useState(false);
  const [showWelcome, setShowWelcome ] = useState(false);
  const [showAllProducts , setShowAllProducts] = useState(false);
  const [showLogOut , setShowLogOut ] = useState(false);
  const [showFirmTitle , setShowFirmTitle] =useState(true);


  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true);
    }

  },[])

  useEffect(()=>{
    const firmName = localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false);
    }
  },[])

  // Listen for auth or firm changes so reloads or event dispatches don't leave the UI in an invalid state
  useEffect(()=>{
    const onAuthChanged = (e) => {
      const detail = e && e.detail ? e.detail : {};
      if(detail.token){
        setShowLogOut(true);
        localStorage.setItem('loginToken', detail.token);
      }
      if(detail.firmId){
        localStorage.setItem('firmId', detail.firmId);
      }
      if(detail.firmName){
        localStorage.setItem('firmName', detail.firmName);
        setShowFirmTitle(false);
      }
      // hide login/register panels whenever auth changes
      setShowLogin(false);
      setShowRegister(false);
    };

    const onFirmAdded = (e) => {
      const detail = e && e.detail ? e.detail : {};
      if(detail.firmId){
        localStorage.setItem('firmId', detail.firmId);
        if(detail.firmName) {
          localStorage.setItem('firmName', detail.firmName);
          setShowFirmTitle(false);
        }
        setShowLogin(false);
        setShowRegister(false);
      }
    };

    window.addEventListener('auth-changed', onAuthChanged);
    window.addEventListener('firm-added', onFirmAdded);

    return () => {
      window.removeEventListener('auth-changed', onAuthChanged);
      window.removeEventListener('firm-added', onFirmAdded);
    };
  },[])

  const logOutHandler = ()=>{
    const confirmed = window.confirm("Are you sure you want to log out?");
    if(!confirmed) return;
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogOut(false);
    setShowFirmTitle(true);
    // optional: force a reload for a clean app state
    // window.location.reload();
  }

const showLoginHandlerClick = ()=>{
  setShowLogin(true);
  setShowRegister(false);
  setShowFirm(false);
  setShowProduct(false);
  setShowWelcome(false);
  setShowAllProducts(false);
}

const showRegisterHandlerClick = ()=>{
  setShowRegister(true);
  setShowLogin(false);
  setShowFirm(false);
  setShowProduct(false);
  setShowWelcome(false);
  setShowAllProducts(false);
}

const showFirmHandlerClick = ()=>{
  if(showLogOut){
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(true);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  }
  else{
    alert("Please login ");
    setShowLogin(true);
    setShowRegister(false);
  }
}

const showProductHandlerClick = ()=>{
if(showLogOut){
  setShowRegister(false);
  setShowLogin(false);
  setShowFirm(false);
  setShowProduct(true);
  setShowWelcome(false);
  setShowAllProducts(false);

}
else{
    alert("Please login ");
    setShowLogin(true);
    setShowRegister(false);
  }
}

const showWelcomeHandlerClick = ()=>{
  setShowRegister(false);
  setShowLogin(false);
  setShowFirm(false);
  setShowProduct(false);
  setShowWelcome(true);
  setShowAllProducts(false);
}

const showAllProductshandlerClick = ()=>{
  if(showLogOut){
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(true);

  }
    else{
    alert("Please login ");
    setShowLogin(true);
    setShowRegister(false);
  }
  
}



  return (
    <div>
      <>
        <section className='landingSection'>
            <NavBar showLoginHandlerClick={showLoginHandlerClick} showRegisterHandlerClick={showRegisterHandlerClick}
            showLogOut ={showLogOut} logOutHandler={logOutHandler} showWelcomeHandlerClick={showWelcomeHandlerClick}/>
            <div className="collectionSection">

                <SideBar showFirmHandlerClick={showFirmHandlerClick} showProductHandlerClick={showProductHandlerClick}
                showAllProductshandlerClick={showAllProductshandlerClick} showFirmTitle={showFirmTitle} />
                {showLogin && <Login showWelcomeHandlerClick={showWelcomeHandlerClick}/>}
                {showRegister && <Register showLoginHandlerClick={showLoginHandlerClick}/>}
                {showFirm && showLogOut && <AddFirm/>}
                {showProduct && showLogOut && <AddProduct/>}
                {showWelcome && showLogOut && <Welcome/>}
                {showAllProducts && showLogOut && <AllProducts/>}
                {/* <Login /> */}
                {/* <Register /> */}
                {/* <AddFirm /> */}
                {/* <AddProduct /> */}
                {/* {<AllProducts/>} */}
            </div>
           
        </section>
      </>
    </div>
  )
}

export default LandingPage
