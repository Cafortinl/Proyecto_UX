import React, {useState} from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {useUser,} from 'reactfire';
import '../navbar/navbar.jsx';
import Navbar from '../navbar/navbar.jsx';
import NoteAdmin from '../notes/noteAdmin.jsx';

function User() {
    const { status, data: user } = useUser();
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    if (status === 'loading') {
        return <span>loading...</span>;
    }

    async function signIn() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            setErrMsg('');
        } catch(error) {
            console.log(error.code);
            switch(error.code) {
                case 'auth/email-already-in-use':
                    setErrMsg('This email is already in use');
                    break;
                case 'auth/weak-password':
                    setErrMsg('The password must be at least 6 characters long');
                    break;
            }
        }
    }

    async function logIn() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            setErrMsg('');
        } catch(error) {
            console.log(error.code);
            switch(error.code) {
                case 'auth/wrong-password':
                    setErrMsg('Wrong email or password');
                    break;
                case 'auth/user-not-found':
                    setErrMsg('Email not found, try signing in');
                    break;
            }
        }
    }

    function showErrMsg() {
        if  (errMsg === '') {
            return;
        }

        return(
            <div class="alert alert-danger" role="alert">
            {errMsg}
            </div>
        );
    }

    if (user) {
        return (
            <div>
                <Navbar auth={auth}/>
                <br/>
                <NoteAdmin username={user.email} />
            </div>
        );
    }

    return (
        <div>
        <Navbar/>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">

                    <h3 className="mb-5">Log in with email</h3>

                    <div className="form-outline mb-4">
                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                    </div>

                    <div className="form-outline mb-4">
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                    </div>
                    {showErrMsg()}
                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={logIn}>Log in</button>

                    <hr className="my-4"/>

                    <button className="btn btn-lg btn-block btn-primary" type="submit" onClick={signIn}>Sign in</button>

                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
export default User;