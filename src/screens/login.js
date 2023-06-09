import React, { useState } from 'react';
import { RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import { GrLogin } from 'react-icons/gr';
import auth from "../firebase.config"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const auth = getAuth();
    const navigate=useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/dashboard")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage);
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
                    width: "300px",
                    height: "220px"
                }}
            >
                <h2 style={{ marginBottom: '20px' }}>Sign In</h2>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <RiUserLine size={20} style={{ marginRight: '10px' }} />
                    <input
                        type="text"
                        placeholder="email"
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
                <button
                    onClick={handleSignIn}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        background: '#4f46e5',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16)',
                        marginTop: "20px"
                    }}
                >
                    <GrLogin size={20} style={{ marginRight: '8px' }} />
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignInForm;
