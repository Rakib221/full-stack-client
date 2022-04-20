import React, { useContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ImGoogle } from 'react-icons/im';
import { BsFacebook } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import firebaseConfig from './firebase.config';
import './SignUpAndSignIn.css';
import { UserContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const SignUpAndSignIn = () => {
    const [user, setUser] = useState({
        newUser: false,
        isGoogleSignIn: false,
        isFacebookSignIn: false,
        isGithubSignIn: false,
        success: false,
        signUpSuccess: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: false,
        error: '',
        alert: ''
    })
    // const [user, setUser] = useState({
    //     isSignIn: false,
    //     name: '',
    //     photo: '',
    //     email: ''
    // })

    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
  
    const { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    const handleSignInByGoogle = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, photoUrl, email } = result.user;
                console.log(displayName, photoUrl, email);
                const signedInUser = {
                    isGoogleSignIn: true,
                    name: displayName,
                    photo: photoUrl,
                    email: email,
                    error: '',
                    success: true,
                }
                setUser(signedInUser);
                // history.replace(from);

            }).catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
                const email = error.email;
                console.log(email);
                const credential = error.credential;
                console.log(credential);
                const newUserErrorInfo = { ...user };
                newUserErrorInfo.error = errorMessage;
                newUserErrorInfo.success = false;
                setUser(newUserErrorInfo);
            });
    }

    const handleSignOutByGoogle = () => {
        firebase.auth().signOut().then(() => {
            const signOutUser = {
                isGoogleSignIn: false,
                name: '',
                photo: '',
                email: '',
                password: '',
                error: '',
                success: true
            }
            setUser(signOutUser);
            // history.replace(from);
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            const email = error.email;
            console.log(email);
            const credential = error.credential;
            console.log(credential);
            const newUserErrorInfo = { ...user };
            newUserErrorInfo.error = errorMessage;
            newUserErrorInfo.success = false;
            setUser(newUserErrorInfo);
        });
    }

    const handleChange = () => {
        if (user.newUser === false) {
            const isNewUser = { ...user };
            isNewUser.newUser = true;
            setUser(isNewUser);
        }
        else {
            const isNewUser = { ...user };
            isNewUser.newUser = false;
            setUser(isNewUser);
        }
    }

    const handleBlur = (e) => {
        // console.log( e.target.name,e.target.value);
        let isValidFieldForm;
        if (e.target.name === 'name') {
            isValidFieldForm = e.target.value;
        }
        if (e.target.name === "email") {
            isValidFieldForm = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordHasAtLeastOneNumber = /\d{1}/.test(e.target.value);
            isValidFieldForm = isPasswordValid && isPasswordHasAtLeastOneNumber;
        }
        if (e.target.name === 'confirmPassword') {
            if (user.password === e.target.value) {
                const confirmNewPassword = { ...user };
                confirmNewPassword[e.target.name] = true;
                confirmNewPassword.alert = '';
                setUser(confirmNewPassword);
            }
            else {
                const confirmNewPasswordNotMatch = { ...user };
                confirmNewPasswordNotMatch.alert = 'Password not matched';
                setUser(confirmNewPasswordNotMatch);
            }
        }

        if (isValidFieldForm) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (user.newUser && user.name && user.email && user.password && user.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    // var user = userCredential.user;
                    // ...
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.signUpSuccess = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    // console.log(userCredential.name);
                })
                .catch((error) => {
                    // var errorCode = error.code;
                    var errorMessage = error.message;
                    const newUserErrorInfo = { ...user };
                    newUserErrorInfo.error = errorMessage;
                    newUserErrorInfo.signUpSuccess = false;
                    setUser(newUserErrorInfo);
                    // ..
                });
        }

        else if (!user.newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    // var user = userCredential.user;
                    // ...
                    const newUserInfo = { ...user };
                    newUserInfo.name = userCredential.user.displayName;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    // console.log(newUserInfo.name);
                    setUser(newUserInfo);
                    setLoggedAndSignedInUser(newUserInfo);
                    history.replace(from);
                    console.log(userCredential.user.displayName);
                })
                .catch((error) => {
                    // var errorCode = error.code;
                    var errorMessage = error.message;
                    const newUserErrorInfo = { ...user };
                    newUserErrorInfo.error = errorMessage;
                    newUserErrorInfo.success = false;
                    setUser(newUserErrorInfo);
                });
        }
        e.preventDefault();
    }

    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(() => {
            // Update successful
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    const handleSignInByFaceBook = () => {
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential;

                // The signed-in user info.
                // var user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // var accessToken = credential.accessToken;
                // console.log(user);
                // ...
                console.log(result.user.displayName);
                const updateFbUser = { ...user };
                updateFbUser.isFacebookSignIn = true;
                updateFbUser.name = result.user.displayName;
                setUser(updateFbUser);
                // history.replace(from);
            })
            .catch((error) => {
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                // var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;

                // ...
                const fbError = { ...user };
                fbError.error = errorMessage;
                setUser(fbError);
            });
    }

    const handleSignOutByFaceBook = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            const afterSignOut = { ...user };
            afterSignOut.name = '';
            afterSignOut.isFacebookSignIn = false;
            setUser(afterSignOut);
            // history.replace(from);
        }).catch((error) => {
            const fbSoError = { ...user };
            fbSoError.error = error.message;
            setUser(fbSoError);

        });
    }

    const handleSignInByGithub = () => {
        firebase
            .auth()
            .signInWithPopup(githubProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential;

                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                // var token = credential.accessToken;

                // The signed-in user info.
                // var user = result.user;
                // ...
                console.log(result.user.displayName);
                const githubUser = { ...user };
                githubUser.name = result.user.displayName;
                githubUser.isGithubSignIn = true;
                setUser(githubUser);
                // history.replace(from);
            }).catch((error) => {
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                // var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
                const githubUser = { ...user };
                githubUser.error = errorMessage;
                setUser(githubUser);
            });
    }

    const handleSignOutByGithub = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            const githubUser = { ...user };
            githubUser.name = '';
            githubUser.isGithubSignIn = false;
            setUser(githubUser);
            // history.replace(from);
        }).catch((error) => {
            // An error happened.
            const githubUser = { ...user };
            githubUser.error = error.message;
            setUser(githubUser);
        });
    }
    return (
        <div className="">
            <div className="row">
                <div className="col-lg-4">

                </div>
                <div className="col-lg-4 bd p-3 m-2">
                    <form onSubmit={handleSubmit}>
                        {
                            user.newUser && <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input onBlur={handleBlur} type="name" name="name" class="form-control" id="name" aria-describedby="emailHelp" required></input>
                            </div>
                        }
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input onBlur={handleBlur} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input onBlur={handleBlur} type="password" name="password" class="form-control" id="exampleInputPassword1" required></input>
                        </div>
                        {user.newUser && <div class="mb-3">
                            <label for="password" class="form-label">Confirm Password</label>
                            <input onBlur={handleBlur} type="password" name="confirmPassword" class="form-control" id="confirmPassword" required></input>
                        </div>}
                        {/* <button type="submit" className="btn btn-primary" value={user.newUser?"Sign up":"Sign In"}></button> */}
                        {user.newUser ? <button type="submit" class="btn btn-danger">Sign Up</button> : <button type="submit" class="btn btn-danger">Sign In</button>}
                    </form>
                    <span class="color" onClick={() => handleChange()}>{user.newUser ? "Already have account? Sign In" : "Do not have account? Sign Up"}</span>
                    <p>{user.error}</p>
                    {
                        // user.success && <p>{user.newUser ? "Sign up " : "Sign In "}successfully</p>

                    }
                    {user.success && <p>Sign in successfully</p>}
                    {user.signInSuccess && <p>Sign Up successfully</p>}
                </div>
                <div className="col-lg-4">

                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">

                </div>
                <div className='col-lg-4 d-flex justify-content-center align-items-center b'>
                    {
                        user.isGoogleSignIn ? <button onClick={handleSignOutByGoogle} className="btn btn-danger">Sign Out <ImGoogle /></button> : <button onClick={handleSignInByGoogle} className="btn btn-danger">Sign In <ImGoogle /></button>
                    }
                    {
                        user.isFacebookSignIn ? <button onClick={handleSignOutByFaceBook} className="btn btn-danger">Sign Out <BsFacebook /></button> : <button onClick={handleSignInByFaceBook} className="btn btn-danger">Sign In <BsFacebook /></button>
                    }
                    {
                        user.isGithubSignIn ? <button onClick={handleSignOutByGithub} className="btn btn-danger">Sign Out <BsGithub /></button> : <button onClick={handleSignInByGithub} className="btn btn-danger">Sign In <BsGithub /></button>
                    }
                    {/* {
                        user.isSignIn && 
                        <div>
                            <p>Welcome, {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Email: {user.password}</p>
                            <img src={user.photoUrl} alt="" />
                        </div>
                    } */}
                </div>
                <div className="col-lg-4">

                </div>
            </div>
        </div>
    );
};

export default SignUpAndSignIn;