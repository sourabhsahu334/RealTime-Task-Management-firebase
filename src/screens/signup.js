import React, { useState } from 'react';
import { RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import { GrLogin } from 'react-icons/gr';
import auth from "../firebase.config"
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";
const SignUpForm = () => {

    const auth = getAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email , setEmail]=useState('');
  const [confirmpassword,setconfirmpassword]=useState('');
  const navigate = useNavigate();
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async() => {
  
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const id=userCredential.user.uid;
            console.log(user);
            const db = getDatabase();
            
            const newobject = {
              arrayData:[],
              name:user.email
            }
      
          
            set(ref(db, `/User/`), {
                [id]: newobject
            }).then(() => console.log("done")).catch((error) => {
                console.log(error);
            });
            navigate("/login")
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage,error);
        });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #ff5f6d, #ffc371)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '8px',
          background: '#fff',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
          width:"300px",
          height:"350px"
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <RiUserLine size={20} style={{ marginRight: '10px' }} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            style={{ padding: '8px', borderRadius: '4px', border: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <EmailIcon fontsize={20} style={{ marginRight: '10px' }} />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <RiLockPasswordLine size={20} style={{ marginRight: '10px' }} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            style={{ padding: '8px', borderRadius: '4px', border: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <RiLockPasswordLine size={20} style={{ marginRight: '10px' }} />
          <input
            type="password"
            placeholder="Password"
            value={confirmpassword}
            onChange={(e)=>{setconfirmpassword(e.target.value)}}
            style={{ padding: '8px', borderRadius: '4px', border: 'none' }}
          />
        </div>
        <button
          disabled={password!==confirmpassword}
          onClick={handleSignIn}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 16px',
            borderRadius: '4px',
            background: password==confirmpassword?'#4f46e5':"#dc143c",
            color: '#fff',
            border: 'none',
            cursor: password==confirmpassword && 'pointer',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16)',
            marginTop:"20px" 
          }}
        >
          <GrLogin size={20} style={{ marginRight: '8px'}} />
          Sign Up
        </button>
        <p>{ password!==confirmpassword && "passwords are not matching"}</p>
      </div>
    </div>
  );
};

export default SignUpForm;
