import { useState } from "react";
import initializeAuthentication from "../Authentication/firebase.initialize";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { UserContext } from '../../App';
import { useContext } from "react";


initializeAuthentication();

const useFirebaseAuthentication = () => {
    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const [user,setUser] = useState({});
    // console.log(loggedAndSignedInUser);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const handleSignInByGoogle = (e) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                console.log(result.user);
                const { displayName, photoUrl, email, accessToken } = result.user;
                // console.log(displayName, photoUrl, email);
                const signedInUser = {
                    isGoogleSignIn: true,
                    name: displayName,
                    photo: photoUrl,
                    email: email,
                    accessToken: accessToken,
                    error: '',
                    success: true,
                }
                setLoggedAndSignedInUser(signedInUser);
            }).catch((error) => {
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
                const email = error.email;
                console.log(email);
                const credential = error.credential;
                console.log(credential);
                const newUserErrorInfo = { ...loggedAndSignedInUser };
                newUserErrorInfo.error = errorMessage;
                newUserErrorInfo.success = false;
                setLoggedAndSignedInUser(newUserErrorInfo);
            });
    }
    const handleSignOutByGoogle = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            const signOutUser = {
                isGoogleSignIn: false,
                signInSuccess: false,
                name: '',
                photo: '',
                email: '',
                password: '',
                error: '',
                accessToken: '',
                success: true
            }
            setLoggedAndSignedInUser(signOutUser);
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            const email = error.email;
            console.log(email);
            const credential = error.credential;
            console.log(credential);
            const newUserErrorInfo = { ...loggedAndSignedInUser };
            newUserErrorInfo.error = errorMessage;
            newUserErrorInfo.success = false;
            setLoggedAndSignedInUser(newUserErrorInfo);
        });
    }

    const handleSignInByFaceBook = () => {
        return signInWithPopup(auth, facebookProvider)
    }

    const handleSignOutByFaceBook = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            const afterSignOut = { ...loggedAndSignedInUser };
            afterSignOut.error = '';
            afterSignOut.name = '';
            afterSignOut.isFacebookSignIn = false;
            setLoggedAndSignedInUser(afterSignOut);
        }).catch((error) => {
            // An error happened.
            const fbSoError = { ...loggedAndSignedInUser };
            fbSoError.error = error.message;
            setLoggedAndSignedInUser(fbSoError);
        });
    }

    const handleSignInByGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                console.log(result.user);
                const githubUser = { ...loggedAndSignedInUser };
                githubUser.error = '';
                // githubUser.name = result.loggedAndSignedInUser.displayName;
                githubUser.isGithubSignIn = true;
                setLoggedAndSignedInUser(githubUser);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
                const githubUser = { ...loggedAndSignedInUser };
                githubUser.error = errorMessage;
                setLoggedAndSignedInUser(githubUser);
            });
    }

    const handleSignOutByGithub = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            const githubUser = { ...loggedAndSignedInUser };
            githubUser.error = '';
            githubUser.name = '';
            githubUser.isGithubSignIn = false;
            setLoggedAndSignedInUser(githubUser);
        }).catch((error) => {
            // An error happened.
            const githubUser = { ...loggedAndSignedInUser };
            githubUser.error = error.message;
            setLoggedAndSignedInUser(githubUser);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (signedUser) => {
            if (signedUser) {
                // user signed in
                console.log(signedUser);
                const signedIn = { ...loggedAndSignedInUser };
                signedIn.name = signedUser.displayName;
                signedIn.signInSuccess = true;
                signedIn.isGoogleSignIn = true;
                setLoggedAndSignedInUser(signedIn);
                const uid = signedUser.uid;
            } else {
                console.log("not signed in");
            }
        });
    }, [])

    console.log(loggedAndSignedInUser);

    return {
        handleSignInByGoogle,
        handleSignOutByGoogle,
        handleSignInByFaceBook,
        handleSignOutByFaceBook,
        handleSignInByGithub,
        handleSignOutByGithub
    }

}

export default useFirebaseAuthentication;
