import React, { useContext, useState } from 'react';
import initializeAuthentication from './firebase.initialize';
import { ImGoogle } from 'react-icons/im';
import { BsFacebook } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import './SignUpAndSignIn.css';
import { UserContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import useFirebaseAuthentication from '../Hook/useFirebaseAuthentication';
import useAuth from '../Hook/useAuth';
// import useGoogleAuthentication from '../Hook/useGoogleAuthentication';
// import useFacebookAuthentication from '../Hook/useFacebookAuthentication';
// import useGithubAuthentication from '../Hook/useGithubAuthentication';
initializeAuthentication();

const SignUpAndSignIn = () => {
    // const { handleSignInByGoogle, handleSignOutByGoogle } = useGoogleAuthentication();
    // const { handleSignInByFaceBook, handleSignOutByFaceBook } = useFacebookAuthentication();
    // const { handleSignInByGithub, handleSignOutByGithub } = useGithubAuthentication();

    // const {handleSignInByGoogle, handleSignOutByGoogle, handleSignInByFaceBook, handleSignOutByFaceBook, handleSignInByGithub, handleSignOutByGithub} = useFirebaseAuthentication();

    const { handleSignInByGoogle, handleSignOutByGoogle, handleSignInByFaceBook, handleSignOutByFaceBook, handleSignInByGithub, handleSignOutByGithub } = useAuth();

    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    // console.log(location.state?.from);
    // const redirect_uri = location.state?.from || '/home';

    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleLogin = () => {
        handleSignInByGoogle()
            .then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential.accessToken;
                // The signed-in user info.
                // console.log(result.loggedAndSignedInUser.displayName);
                const updateFbUser = { ...loggedAndSignedInUser };
                updateFbUser.error = '';
                updateFbUser.isFacebookSignIn = true;
                updateFbUser.name = result.user.displayName;
                setLoggedAndSignedInUser(updateFbUser);
                // history.push(redirect_uri);
                history.replace(from);

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;F
                // The AuthCredential type that was used.
                // const credential = FacebookAuthProvider.credentialFromError(error);
                const fbError = { ...loggedAndSignedInUser };
                fbError.error = errorMessage;
                setLoggedAndSignedInUser(fbError);
            });
    }

    const handleChange = () => {
        if (loggedAndSignedInUser.newUser === false) {
            const isNewUser = { ...loggedAndSignedInUser };
            isNewUser.newUser = true;
            setLoggedAndSignedInUser(isNewUser);
        }
        else {
            const isNewUser = { ...loggedAndSignedInUser };
            isNewUser.newUser = false;
            setLoggedAndSignedInUser(isNewUser);
        }
    }

    const handleBlur = (e) => {
        // console.log( e.target.name,e.target.value);
        let isValidFieldForm;
        if (e.target.name === 'name') {
            isValidFieldForm = e.target.value.length;
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
            if (loggedAndSignedInUser.password === e.target.value) {
                const confirmNewPassword = { ...loggedAndSignedInUser };
                confirmNewPassword[e.target.name] = true;
                confirmNewPassword.alert = '';
                setLoggedAndSignedInUser(confirmNewPassword);
            }
            else {
                const confirmNewPasswordNotMatch = { ...loggedAndSignedInUser };
                confirmNewPasswordNotMatch.alert = 'Password not matched';
                setLoggedAndSignedInUser(confirmNewPasswordNotMatch);
            }
        }

        if (isValidFieldForm) {
            const newUserInfo = { ...loggedAndSignedInUser };
            newUserInfo[e.target.name] = e.target.value;
            setLoggedAndSignedInUser(newUserInfo);
        }
    }
    const auth = getAuth();

    const handleSubmit = (e) => {
        if (loggedAndSignedInUser.newUser && loggedAndSignedInUser.name && loggedAndSignedInUser.email && loggedAndSignedInUser.password && loggedAndSignedInUser.confirmPassword) {
            createUserWithEmailAndPassword(auth, loggedAndSignedInUser.email, loggedAndSignedInUser.password)
                .then((userCredential) => {
                    const newUserInfo = { ...loggedAndSignedInUser };
                    newUserInfo.error = '';
                    newUserInfo.signUpSuccess = true;
                    setLoggedAndSignedInUser(newUserInfo);
                    updateUserName(loggedAndSignedInUser.name);
                    verifyEmail();
                    // console.log(userCredential.user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const newUserErrorInfo = { ...loggedAndSignedInUser };
                    newUserErrorInfo.error = errorMessage;
                    newUserErrorInfo.signUpSuccess = false;
                    setLoggedAndSignedInUser(newUserErrorInfo);
                });
        }

        else if (!loggedAndSignedInUser.newUser && loggedAndSignedInUser.email && loggedAndSignedInUser.password) {
            signInWithEmailAndPassword(auth, loggedAndSignedInUser.email, loggedAndSignedInUser.password)
                .then((userCredential) => {
                    // Signed in
                    console.log(userCredential.user);
                    const newUserInfo = { ...loggedAndSignedInUser };
                    // newUserInfo.name = userCredential.loggedAndSignedInUser.displayName;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    // console.log(newUserInfo.name);
                    setLoggedAndSignedInUser(newUserInfo);
                    // history.replace(from);
                    // console.log(userCredential.loggedAndSignedInUser.displayName);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    var errorMessage = error.message;
                    const newUserErrorInfo = { ...loggedAndSignedInUser };
                    newUserErrorInfo.error = errorMessage;
                    newUserErrorInfo.success = false;
                    setLoggedAndSignedInUser(newUserErrorInfo);
                });
        }
        e.preventDefault();
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(result => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            alert('Profile updated successfully');
        }).catch((error) => {
            alert('Profile does not updated successfully');
            console.log(error);
        });
    }

    const [fEmail, setEmail] = useState('');

    const changeForm = () => {
        const cF = { ...loggedAndSignedInUser };
        cF.forgotPassword = true;
        setLoggedAndSignedInUser(cF);
    }

    const back = () => {
        const bk = { ...loggedAndSignedInUser };
        bk.forgotPassword = false;
        setLoggedAndSignedInUser(bk);
    }

    const forgotPasswordBlur = (e) => {
        const isValidEmail = /\S+@\S+\.\S+/.test(e.target.value);
        if (isValidEmail) {
            setEmail(e.target.value);
        }
        else {
            alert("Email is not in valid form");
        }
    }

    const handleReset = (e) => {
        sendPasswordResetEmail(auth, fEmail)
            .then((result) => {
                console.log(result);
                alert("Email has sent successfully");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Email has not sent successfully");
                // ..
            });
        e.preventDefault();
    }

    return (
        <div className="">
            <div className="row">
                <div className="col-lg-4">

                </div>
                <div className="col-lg-4 bd p-3 m-2">
                    {!loggedAndSignedInUser.forgotPassword ? <form onSubmit={handleSubmit}>
                        {
                            loggedAndSignedInUser.newUser && <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input onBlur={handleBlur} type="name" name="name" className="form-control" id="name" aria-describedby="emailHelp" required></input>
                            </div>
                        }
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input onBlur={handleBlur} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input onBlur={handleBlur} type="password" name="password" className="form-control" id="exampleInputPassword1" required></input>
                        </div>
                        {loggedAndSignedInUser.newUser && <div className="mb-3">
                            <label htmlFor="password" className="form-label">Confirm Password</label>
                            <input onBlur={handleBlur} type="password" name="confirmPassword" className="form-control" id="confirmPassword" required></input>
                        </div>}
                        {loggedAndSignedInUser.newUser ? <button type="submit" className="btn btn-danger">Sign Up</button> : <button type="submit" className="btn btn-danger">Sign In</button>}
                    </form> : <form onSubmit={handleReset}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input onBlur={forgotPasswordBlur} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
                        </div>
                        <button type="submit" className="btn btn-danger">Send</button>
                    </form>}
                    {
                        !loggedAndSignedInUser.forgotPassword ? <span className="color" onClick={() => handleChange()}>{loggedAndSignedInUser.newUser ? "Already have account? Sign In" : "Do not have account? Sign Up"}</span> : <p></p>
                    }
                    <br />
                    {
                        !loggedAndSignedInUser.forgotPassword ? <button className="btn btn-danger" onClick={() => changeForm()}>Forgot password?</button> : <button className="btn btn-danger" onClick={() => back()}>Back</button>
                    }
                    <br />
                    <p>{loggedAndSignedInUser.error}</p>
                    {
                        loggedAndSignedInUser.success && <p>{loggedAndSignedInUser.newUser ? "Sign up " : "Sign In "}successfully</p>

                    }
                </div>
                <div className="col-lg-4">

                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">

                </div>
                <div className='col-lg-4 d-flex justify-content-center align-items-center b'>
                    {
                        loggedAndSignedInUser.isGoogleSignIn ? <button name="google" onClick={handleSignOutByGoogle} className="btn btn-danger">Sign Out <ImGoogle /></button> : <button name="google" onClick={handleGoogleLogin} className="btn btn-danger">Sign In <ImGoogle /></button>
                    }
                    {
                        loggedAndSignedInUser.isFacebookSignIn ? <button name="facebook" onClick={handleSignOutByFaceBook} className="btn btn-danger">Sign Out <BsFacebook /></button> : <button name="facebook" onClick={handleSignInByFaceBook} className="btn btn-danger">Sign In <BsFacebook /></button>
                    }
                    {
                        loggedAndSignedInUser.isGithubSignIn ? <button name="github" onClick={handleSignOutByGithub} className="btn btn-danger">Sign Out <BsGithub /></button> : <button name="github" onClick={handleSignInByGithub} className="btn btn-danger">Sign In <BsGithub /></button>
                    }
                </div>
                <div className="col-lg-4">

                </div>
            </div>
        </div>
    );
};

export default SignUpAndSignIn;