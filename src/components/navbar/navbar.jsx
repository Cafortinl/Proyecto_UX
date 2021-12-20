import React from 'react';
import { signOut } from 'firebase/auth';

function Navbar({auth}) {
    function logOut() {
        try {
            signOut(auth);
        } catch(error) {
            console.log(error);
        }
    }

    if (auth) {
        return (
        <nav className="navbar static-top navbar-dark bg-dark">
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">📚 NoteBooks</span>
            <button type="button" className="btn btn-primary me-3" onClick={logOut}>Log out</button>
        </div>
        </nav>
        );
    }

    return (
        <nav className="navbar static-top navbar-dark bg-dark">
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">📚 NoteBooks</span>
        </div>
        </nav>
    );
}
export default Navbar;