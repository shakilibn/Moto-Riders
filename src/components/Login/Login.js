import React from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Button } from 'react-bootstrap';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [newUser, setNewUser] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /^\S+@\S+\.\S+$/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        
        if (isFieldValid) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo);
        }
    }

    const handleFacebookSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                var user = result.user;
                const { displayName, email } = user;
                const newUserInfo = { ...loggedInUser };
                newUserInfo.isSignedIn = true;
                newUserInfo.name = displayName;
                newUserInfo.email = email;
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                const { displayName, email } = user;
                const newUserInfo = { ...loggedInUser };
                newUserInfo.isSignedIn = true;
                newUserInfo.name = displayName;
                newUserInfo.email = email;
                setLoggedInUser(newUserInfo);
                history.replace(from);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    updateUserInfo(loggedInUser.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                });
        }
        if (!newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const { displayName, email } = user;
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.isSignedIn = true;
                    newUserInfo.name = displayName;
                    newUserInfo.email = email;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                });
        }
    }

    const updateUserInfo = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(() => {
            console.log("user name updated successfully");
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className="d-flex justify-content-center mt-5 p-5">
            <div className="input-area">
                <div className="login-card p-5">
                    <p style={{ color: 'red' }}>{loggedInUser.error}</p>
                    {loggedInUser.success && <p style={{ color: 'green' }}>{newUser && "User Created Successfully"}</p>}
                    {newUser ? <h2 className="mb-5">Create an account</h2> : <h2 className="mb-5">Login</h2>}

                    <form onSubmit={handleSubmit}>
                        {newUser && <input className="mb-3 form-control" type="text" onBlur={handleBlur} name="name" id="name" placeholder="Name" />}

                        <input className="mb-3 form-control" type="text" onBlur={handleBlur} name="email" id="email" placeholder="UserName or Email" />

                        <input className="mb-3 form-control" type="password" onBlur={handleBlur} name="password" id="password" placeholder="Password" />

                        {/* <input type="password" onBlur={handleBlur} name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                    <br /> */}

                        {/* <input className="mb-3" type="submit" value={newUser ? "Create an account" : "Login"} /><br /> */}
                        <Button type="submit" block>{newUser ? "Create an account" : "Login"}</Button>
                        <br />
                        <p>{newUser ? "Already" : "Don't"} have an account ? <Link onClick={() => setNewUser(!newUser)}>{newUser ? "Login" : "Create an account"}</Link></p>
                    </form>
                </div>
                <div className="social-site-area text-center m-3">
                    <Button className="mb-2" onClick={handleFacebookSignIn} variant="primary" size="lg" block>Continue with Facebook</Button>
                    <Button onClick={handleGoogleSignIn} variant="primary" size="lg" block>Continue with Google</Button><br />
                </div>
            </div>
        </div>
    );
};

export default Login;