import React ,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const LogIn=()=>{
    const [email, setEmail]= React.useState('');
    const [password, setPassword]= React.useState('');
    
     const navigate=useNavigate();

     useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
        navigate('/')
        }

     },[]);

    const handlelogin=async ()=>{
        console.warn(email,password);
        let result = await fetch('http://localhost:5000/login',{
         method:'post',
         body:JSON.stringify({email,password}),
         headers:{
            'Content-Type':'application/json'
         }
        });
        result=await result.json();
        console.warn(result);
        if(result.auth){
         localStorage.setItem("user",JSON.stringify(result.user));
         localStorage.setItem("token",JSON.stringify(result.auth));
         alert('Admin logged in ');
         navigate('/')
        }
        else{
            alert("You are not Admin");
            navigate('/')
        }
    } 
 return (
    <div className='login'>
        <h1>Log In </h1>
        <input type="email"  className='inputbox' placeholder='Enter Email'
        onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input type="password"  className='inputbox' placeholder='Enter password'
        onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <button onClick={handlelogin} className='btn' >Admin Log In</button>
    </div>
 )
}

export default LogIn;