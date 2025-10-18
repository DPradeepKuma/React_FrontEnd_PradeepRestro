import React,{useState} from 'react'
import { API_URL } from '../../helpers_utilitys/ApiPath';


const Register = ({showLoginHandlerClick}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);



const handelSubmit = async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch(`${API_URL}/vendor/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username,email,password})
    })

    const data = await response.json();
    
    if(response.ok){
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
      alert(" register response data success",data);
      showLoginHandlerClick();
    }
  } catch (error) {
    console.error( error);
    alert(" registration failed", error);
    
  }
}

  
  return (
    <div className='registerSection'>
      <form className='authForm' onSubmit={handelSubmit}>
            <h3 className='header'>Vendor Register</h3> <br />

            <label>Username</label> <br />
            <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your Name" /><br />

            <label>Email</label> <br />
            <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" /><br />

            <label>Password</label><br />
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" /><br />

            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register
