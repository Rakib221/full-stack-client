import { useState } from "react";
import initializeAuthentication from "../Authentication/firebase.initialize";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, onAuthStateChanged, getIdToken, signOut } from "firebase/auth";
import { useEffect } from "react";
// import { UserContext } from '../../App';
// import { useContext } from "react";


initializeAuthentication();

const useFirebaseAuthentication = () => {
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useState({
        newUser: false,
        isGoogleSignIn: false,
        isFacebookSignIn: false,
        isGithubSignIn: false,
        success: false,
        signUpSuccess: false,
        signInSuccess: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: false,
        error: '',
        alert: '',
        forgotPassword: false,
        accessToken: '',
        uid: '',
        isAdmin: false
    });

    const [loggedUser, setLoggedUser] = useState({});

    const [admin, setAdmin] = useState(false);

    const [token, setToken] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    // console.log(loggedAndSignedInUser);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleSignInByGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const handleSignInByFaceBook = () => {
        return signInWithPopup(auth, facebookProvider);
    }
    const handleSignInByGithub = () => {
        return signInWithPopup(auth, githubProvider);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (signedUser) => {
            // console.log(signedUser);
            if (signedUser) {
                // user signed in
                setLoggedUser(signedUser);
                getIdToken(signedUser)
                .then(idToken => {
                    setToken(idToken);
                })
                const signedIn = { ...loggedAndSignedInUser };
                // console.log(signedIn.name);
                signedIn.accessToken = signedUser.accessToken;
                signedIn.signInSuccess = true;
                signedIn.uid = signedUser.uid;
                setLoggedAndSignedInUser(signedIn);
            } else {
                const signOutUser = {
                    newUser: false,
                    isGoogleSignIn: false,
                    isFacebookSignIn: false,
                    isGithubSignIn: false,
                    success: false,
                    signUpSuccess: false,
                    signInSuccess: false,
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: false,
                    error: '',
                    alert: '',
                    forgotPassword: false,
                    accessToken: '',
                    uid: ''
                }
                setLoggedAndSignedInUser(signOutUser);
                setLoggedUser({});
            }
            setIsLoading(false);
        });
    }, [])

    useEffect(() => {
        fetch(`http://localhost:7777/users/${loggedAndSignedInUser.email}`)
        .then((response) => response.json())
        .then(data => setAdmin(data.admin))
    },[loggedAndSignedInUser.email])
    
    const handleSignOutByGoogle = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            const signOutUser = {
                newUser: false,
                isGoogleSignIn: false,
                isFacebookSignIn: false,
                isGithubSignIn: false,
                success: false,
                signUpSuccess: false,
                signInSuccess: false,
                name: '',
                email: '',
                password: '',
                confirmPassword: false,
                error: '',
                alert: '',
                forgotPassword: false,
                accessToken: '',
                uid: ''
            }
            setLoggedAndSignedInUser(signOutUser);
        }).catch((error) => {
            const errorCode = error.code;
            // console.log(errorCode);
            const errorMessage = error.message;
            // console.log(errorMessage);
            const email = error.email;
            // console.log(email);
            const credential = error.credential;
            // console.log(credential);
            const newUserErrorInfo = { ...loggedAndSignedInUser };
            newUserErrorInfo.error = errorMessage;
            newUserErrorInfo.success = false;
            setLoggedAndSignedInUser(newUserErrorInfo);
        }).finally(()=>{
            setIsLoading(false);
        });
    }

    const handleSignOutByFaceBook = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            const signOutUser = {
                newUser: false,
                isGoogleSignIn: false,
                isFacebookSignIn: false,
                isGithubSignIn: false,
                success: false,
                signUpSuccess: false,
                signInSuccess: false,
                name: '',
                email: '',
                password: '',
                confirmPassword: false,
                error: '',
                alert: '',
                forgotPassword: false,
                accessToken: '',
                uid: ''
            }
            setLoggedAndSignedInUser(signOutUser);
        }).catch((error) => {
            // An error happened.
            const fbSoError = { ...loggedAndSignedInUser };
            fbSoError.error = error.message;
            setLoggedAndSignedInUser(fbSoError);
        }).finally(()=>{
            setIsLoading(false);
        });
    }

    const handleSignOutByGithub = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            const signOutUser = {
                newUser: false,
                isGoogleSignIn: false,
                isFacebookSignIn: false,
                isGithubSignIn: false,
                success: false,
                signUpSuccess: false,
                signInSuccess: false,
                name: '',
                email: '',
                password: '',
                confirmPassword: false,
                error: '',
                alert: '',
                forgotPassword: false,
                accessToken: '',
                uid: ''
            }
            setLoggedAndSignedInUser(signOutUser);
        }).catch((error) => {
            // An error happened.
            const githubUser = { ...loggedAndSignedInUser };
            githubUser.error = error.message;
            setLoggedAndSignedInUser(githubUser);
        }).finally(()=>{
            setIsLoading(false);
        });
    }
    console.log(loggedUser);
    
    return {
        loggedUser,
        setLoggedUser,
        loggedAndSignedInUser,
        setLoggedAndSignedInUser,
        isLoading,
        setIsLoading,
        admin,
        setAdmin,
        handleSignInByGoogle,
        handleSignOutByGoogle,
        handleSignInByFaceBook,
        handleSignOutByFaceBook,
        handleSignInByGithub,
        handleSignOutByGithub,
        token
    }

}

export default useFirebaseAuthentication;
