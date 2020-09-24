// import React, { useState } from 'react'
// import "./Login.css"
// import {auth} from "./firebase"
// import { useHistory } from 'react-router-dom';





// function Login() {
//     const [email,setEmail]=useState(' ');
//     const [password,setPassword]=useState(' ');
//     const history=useHistory();
//     const singhIn=(event)=>
// {
//     event.preventDefault();
//     //firebase login
//     auth
//     .signInWithEmailAndPassword()
//     .then(auth=>
//         history.push('./'))
//     .catch(error => alert(error.message))

// }
// const register= (event)=>
// {
//     event.preventDefault();
//     //firebase register
//     auth.createUserWithEmailAndPassword(email, password)
//     .then((auth)=>
//     {
//     console.log(auth)
//     if(auth)//push to home after creation of account
//     {
//         history.push('/');
//     }
//     })
// .catch(error=> alert(error.message))
// }

//     return (
//         <div className="login_page" >
//             <div className="login_container">
//                 <h1>sing-in</h1>
//     <form>
//         <h5>Email</h5>
//         <input type="text"  value={email} onChange= {(event)=>
//             setEmail(event.target.value)}/>
//         <h5>Password</h5>
//         <input type="password" value={password} onChange={(event)=>
//         setPassword(event.target.value)} />


//         <button type="submit"  onClick={ singhIn}
//         className="login_singin">login</button>
//     </form>
//     <button onClick={register}
//     className="register">Create a new account</button>
//     </div>
            
//         </div>
//     )
// }

// export default Login
import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
