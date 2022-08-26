// import initializeAuthentication from "../Authentication/firebase.initialize";
// import { getAuth, signInWithPopup, FacebookAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
// import { useEffect } from "react";
// import { UserContext } from '../../App';
// import { useContext } from "react";


// initializeAuthentication();

// const useFacebookAuthentication = () => {
//     const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
//     const auth = getAuth();
//     const facebookProvider = new FacebookAuthProvider();
//     const handleSignInByFaceBook = () => {
//         signInWithPopup(auth, facebookProvider)
//             .then((result) => {
//                 // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//                 const credential = FacebookAuthProvider.credentialFromResult(result);
//                 const accessToken = credential.accessToken;
//                 // The signed-in user info.
//                 const updateFbUser = { ...loggedAndSignedInUser };
//                 updateFbUser.error = '';
//                 updateFbUser.isFacebookSignIn = true;
//                 updateFbUser.name = result.loggedAndSignedInUser.displayName;
//                 setLoggedAndSignedInUser(updateFbUser);

//                 // ...
//             })
//             .catch((error) => {
//                 // Handle Errors here.
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // The email of the user's account used.
//                 const email = error.customData.email;
//                 // The AuthCredential type that was used.
//                 const credential = FacebookAuthProvider.credentialFromError(error);
//                 const fbError = { ...loggedAndSignedInUser };
//                 fbError.error = errorMessage;
//                 setLoggedAndSignedInUser(fbError);
//             });
//     }

//     const handleSignOutByFaceBook = () => {
//         const auth = getAuth();
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             const afterSignOut = { ...loggedAndSignedInUser };
//             afterSignOut.error = '';
//             afterSignOut.name = '';
//             afterSignOut.isFacebookSignIn = false;
//             setLoggedAndSignedInUser(afterSignOut);
//         }).catch((error) => {
//             // An error happened.
//             const fbSoError = { ...loggedAndSignedInUser };
//             fbSoError.error = error.message;
//             setLoggedAndSignedInUser(fbSoError);
//         });
//     }


//     useEffect(() => {
//         onAuthStateChanged(auth, (signedUser) => {
//             if (signedUser) {
//                 // user signed in
//                 const signedIn = { ...loggedAndSignedInUser };
//                 signedIn.signInSuccess = true;
//                 signedIn.isFacebookSignIn = true;
//                 setLoggedAndSignedInUser(signedIn);
//                 const uid = signedUser.uid;
//             } else {
//                 console.log("not signed in");
//             }
//         });

//     }, [])

//     return {
//         handleSignInByFaceBook,
//         handleSignOutByFaceBook
//     }

// }

// export default useFacebookAuthentication;
