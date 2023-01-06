import React, { useContext, useState } from 'react';
import initializeAuthentication from './firebase.initialize';
import { ImGoogle } from 'react-icons/im';
import { BsFacebook } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
// import { UserContext } from '../../App';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
// import useFirebaseAuthentication from '../Hook/useFirebaseAuthentication';
import useAuth from '../Hook/useAuth';
import { UserContext } from '../../App';
import { useEffect } from 'react';
// import useGoogleAuthentication from '../Hook/useGoogleAuthentication';
// import useFacebookAuthentication from '../Hook/useFacebookAuthentication';
// import useGithubAuthentication from '../Hook/useGithubAuthentication';
initializeAuthentication();

const SignUpAndSignIn = () => {

    let { path, url } = useRouteMatch();
    const [navBarAndFooter, setNavBarAndFooter, enbaleStoringLoginData] = useContext(UserContext);
    useEffect(() => {
        if (path === "/returnAndOrders") { } {
            const changeState = { ...navBarAndFooter };
            changeState.navBar = true;
            changeState.footer = false;
            setNavBarAndFooter(changeState);
        }
    }, [])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: false
    });
    // const { handleSignInByGoogle, handleSignOutByGoogle } = useGoogleAuthentication();
    // const { handleSignInByFaceBook, handleSignOutByFaceBook } = useFacebookAuthentication();
    // const { handleSignInByGithub, handleSignOutByGithub } = useGithubAuthentication();

    // const {handleSignInByGoogle, handleSignOutByGoogle, handleSignInByFaceBook, handleSignOutByFaceBook, handleSignInByGithub, handleSignOutByGithub} = useFirebaseAuthentication();

    const { loggedAndSignedInUser, setLoggedAndSignedInUser, setIsLoading, handleSignInByGoogle, handleSignOutByGoogle, handleSignInByFaceBook, handleSignOutByFaceBook, handleSignInByGithub, handleSignOutByGithub } = useAuth();

    const history = useHistory();
    const location = useLocation();
    // console.log(location.state?.from);

    // same
    const redirect_uri = location.state?.from || '/home';
    // const { from } = location.state || { from: { pathname: "/home" } };

    const handleStoreLoginUserData = (id, email, name, time) => {
        const loginUserData = { id, email, name, time };
        fetch('https://full-stack-server-hasan.up.railway.app/ifCoockieAcceptLoginDataStore', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(loginUserData),
        })
            .then(response => response.json())
            .then(products => {
            })
            .then(error => {
                console.log(error);
            })
    }

    const handleFacebookLogin = () => {
        handleSignInByFaceBook()
            .then((result) => {
                const updateFbUser = { ...loggedAndSignedInUser };
                updateFbUser.uid = result.user.uid;
                updateFbUser.accessToken = result.user.accessToken;
                updateFbUser.email = result.user.email;
                updateFbUser.error = '';
                updateFbUser.isFacebookSignIn = true;
                updateFbUser.name = result.user.displayName;
                setLoggedAndSignedInUser(updateFbUser);
                if (enbaleStoringLoginData) {
                    handleStoreLoginUserData(result.user.uid, result.user.email, result.user.displayName, new Date());
                }
                saveUser(result.user.email, result.user.displayName, result.user.uid, 'PUT');
                history.push(redirect_uri);
                // history.replace(from);

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const fbError = { ...loggedAndSignedInUser };
                fbError.error = errorMessage;
                setLoggedAndSignedInUser(fbError);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    const handleLoginByGoogle = () => {
        handleSignInByGoogle()
            .then((result) => {
                const { displayName, photoUrl, email, accessToken, uid } = result.user;
                const updateGoogleUser = { ...loggedAndSignedInUser };
                updateGoogleUser.isGoogleSignIn = true;
                updateGoogleUser.name = displayName;
                updateGoogleUser.photo = photoUrl;
                updateGoogleUser.email = email;
                updateGoogleUser.accessToke = accessToken;
                updateGoogleUser.error = '';
                updateGoogleUser.success = true;
                updateGoogleUser.uid = uid;
                setLoggedAndSignedInUser(updateGoogleUser);
                if (enbaleStoringLoginData) {
                    handleStoreLoginUserData(uid, email, displayName, new Date());
                }
                saveUser(email, displayName, uid, 'PUT');
                history.push(redirect_uri);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                const newUserErrorInfo = { ...loggedAndSignedInUser };
                newUserErrorInfo.error = errorMessage;
                newUserErrorInfo.success = false;
                setLoggedAndSignedInUser(newUserErrorInfo);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    const handleLoginByGithub = () => {
        handleSignInByGithub()
            .then((result) => {
                // The signed-in user info.
                const githubUser = { ...loggedAndSignedInUser };
                githubUser.accessToken = result.user.accessToken;
                githubUser.email = result.user.email;
                githubUser.error = '';
                githubUser.name = result.user.displayName;
                githubUser.isGithubSignIn = true;
                githubUser.uid = result.user.uid;
                setLoggedAndSignedInUser(githubUser);
                if (enbaleStoringLoginData) {
                    handleStoreLoginUserData(result.user.uid, result.user.email, result.user.displayName, new Date());
                }
                saveUser(result.user.email, result.user.displayName, result.user.uid, 'PUT');
                history.push(redirect_uri);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const githubUser = { ...loggedAndSignedInUser };
                githubUser.error = errorMessage;
                setLoggedAndSignedInUser(githubUser);
            }).finally(() => {
                setIsLoading(false);
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
        let isValidFieldForm;
        if (e.target.name === 'name') {
            isValidFieldForm = e.target.value.length > 4;
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

    const auth = getAuth();

    const handleSubmit = (e) => {
        if (loggedAndSignedInUser.newUser && user.name && user.email && user.password && user.confirmPassword) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...loggedAndSignedInUser };
                    newUserInfo.password = user.password;
                    newUserInfo.name = user.name;
                    newUserInfo.email = userCredential.user.email;
                    newUserInfo.uid = userCredential.user.uid;
                    newUserInfo.error = '';
                    newUserInfo.signUpSuccess = true;
                    setLoggedAndSignedInUser(newUserInfo);
                    updateUserName(user.name);
                    verifyEmail();
                    saveUser(user.email, user.name, userCredential.user.uid, 'POST');
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

        else if (!loggedAndSignedInUser.newUser && user.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    const newUserInfo = { ...loggedAndSignedInUser };
                    newUserInfo.accessToken = userCredential.user.accessToken;
                    newUserInfo.name = userCredential.user.displayName || "No name";
                    newUserInfo.email = userCredential.user.email;
                    newUserInfo.uid = userCredential.user.uid;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    if (enbaleStoringLoginData) {
                        handleStoreLoginUserData(userCredential.user.uid, userCredential.user.email, userCredential.user.displayName || "No name", new Date());
                    }
                    setLoggedAndSignedInUser(newUserInfo);
                    // history.replace(from);
                    history.push(redirect_uri);
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
        // alert("verifyEmail");
        sendEmailVerification(auth.currentUser)
            .then(result => {
                alert("Verify email success")
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            // alert('Profile updated successfully');
        }).catch((error) => {
            alert('Profile does not updated successfully');
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

    const saveUser = (email, displayName, uid, method) => {
        const newUser = { email: email, name: displayName, uid: uid };
        fetch('https://full-stack-server-hasan.up.railway.app/userDetails', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(userDetails => {
                const details = userDetails;
            })
            .catch(error => {
                alert(error.message);
            })
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4 col-md-3">

                </div>
                <div className="col-lg-4 col-md-6 bd p-3 m-2">
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
                        !loggedAndSignedInUser.forgotPassword ? <span className="loginOrSignUp" onClick={() => handleChange()}>{loggedAndSignedInUser.newUser ? "Already have account? Sign In" : "Do not have account? Sign Up"}</span> : <p></p>
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
                <div className="col-lg-4 col-md-3">

                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">

                </div>
                <div className='col-lg-4 d-flex justify-content-center align-items-center b'>
                    {
                        loggedAndSignedInUser.isGoogleSignIn ? <button onClick={handleSignOutByGoogle} className="btn btn-danger">Sign Out <ImGoogle /></button> : <button name="google" onClick={handleLoginByGoogle} className="btn btn-danger">Sign In <ImGoogle /></button>
                    }
                    {
                        loggedAndSignedInUser.isFacebookSignIn ? <button name="facebook" onClick={handleSignOutByFaceBook} className="btn btn-danger">Sign Out <BsFacebook /></button> : <button name="facebook" onClick={handleFacebookLogin} className="btn btn-danger">Sign In <BsFacebook /></button>
                    }
                    {
                        loggedAndSignedInUser.isGithubSignIn ? <button name="github" onClick={handleSignOutByGithub} className="btn btn-danger">Sign Out <BsGithub /></button> : <button name="github" onClick={handleLoginByGithub} className="btn btn-danger">Sign In <BsGithub /></button>
                    }
                </div>
                <div className="col-lg-4">

                </div>
            </div>
        </div>
    );
};

export default SignUpAndSignIn;