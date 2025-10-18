import React,{useState} from 'react'
import { API_URL } from '../../helpers_utilitys/ApiPath';

const Login = ({showWelcomeHandlerClick}) => {
  const [email, setEmail ] = useState("");
  const [ password , setPassword ] = useState("");


  const loginHandler = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}vendor/login`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password})
      })
      const data = await response.json();

      // If login failed, show error returned by server
      if (!response.ok) {
        console.error('Login failed:', data);
        alert(data.message || 'Login failed');
        return;
      }

      // login succeeded
      alert('login success');
      setEmail('');
      setPassword('');
      localStorage.setItem('loginToken', data.token);
      console.log('login data', data);
      showWelcomeHandlerClick && showWelcomeHandlerClick();

      const vendorId = data.vendorId;
      console.log('checking for vendorid', vendorId);
      if (vendorId) {
        const vendorResponse = await fetch(`${API_URL}/vendor/vendorDetails/${vendorId}`);
        if (vendorResponse.ok) {
          const vendorData = await vendorResponse.json();
          const vendorFirmId = vendorData.vendorFirmId || (vendorData.vendor && vendorData.vendor.firm && vendorData.vendor.firm.length > 0 ? vendorData.vendor.firm[0]._id : null);
          console.log('checking for firmId', vendorFirmId);

          if (vendorFirmId) {
            localStorage.setItem('firmId', vendorFirmId);
          }
          // it is in built for reloading the same page

          const vendorFirmName = vendorData && vendorData.vendor && vendorData.vendor.firm && vendorData.vendor.firm.length > 0 ? vendorData.vendor.firm[0].firmName : null;
          if (vendorFirmName) {
            localStorage.setItem('firmName', vendorFirmName);
          }

          // schedule reload after 10 seconds so UI updates after login
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } 
        else {
          const txt = await vendorResponse.text();
          console.error('Failed to fetch vendor details:', vendorResponse.status, txt);
          // still schedule a reload to apply token state
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      } else {
        // no vendorId returned; schedule reload to apply token state
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      console.error(error);
      alert(" login failed", error);
    }
  }
  return (
      <div className="loginSection">
        
        <form className='authForm' onSubmit={loginHandler}>
            <h3 className='header'>Vendor Login</h3> <br />
            <label>Email</label> 
            <br />
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" /><br />
            <label>Password</label><br />
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
            <br />

            <div className="btnSubmit">
                <button type='submit' >Submit</button>
            </div>
        </form>
        
      </div>
  )
}

export default Login
