// import { useState } from "react";
// import initializeAuthentication from "../Authentication/firebase.initialize";
// import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
// import { useEffect } from "react";
// import { UserContext } from '../../App';
// import { useContext } from "react";


// initializeAuthentication();

// const useGoogleAuthentication = () => {
//     const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
//     const auth = getAuth();
//     const googleProvider = new GoogleAuthProvider();
//     const handleSignInByGoogle = () => {
//         signInWithPopup(auth, googleProvider)
//             .then((result) => {
//                 // This gives you a Google Access Token. You can use it to access the Google API.
//                 // const credential = GoogleAuthProvider.credentialFromResult(result);
//                 // const token = credential.accessToken;
//                 // The signed-in user info.
//                 const { displayName, photoUrl, email } = result.user;
//                 const signedInUser = {
//                     isGoogleSignIn: true,
//                     name: displayName,
//                     photo: photoUrl,
//                     email: email,
//                     error: '',
//                     success: true,
//                 }
//                 setLoggedAndSignedInUser(signedInUser);
//             }).catch((error) => {
//                 // The AuthCredential type that was used.
//                 // const credential = GoogleAuthProvider.credentialFromError(error);
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 const email = error.email;
//                 const credential = error.credential;
//                 const newUserErrorInfo = { ...loggedAndSignedInUser };
//                 newUserErrorInfo.error = errorMessage;
//                 newUserErrorInfo.success = false;
//                 setLoggedAndSignedInUser(newUserErrorInfo);
//             });
//     }

//     const handleSignOutByGoogle = () => {
//         const auth = getAuth();
//         signOut(auth).then(() => {
//             const signOutUser = {
//                 isGoogleSignIn: false,
//                 signInSuccess: false,
//                 name: '',
//                 photo: '',
//                 email: '',
//                 password: '',
//                 error: '',
//                 success: true
//             }
//             setLoggedAndSignedInUser(signOutUser);
//         }).catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             const email = error.email;
//             const credential = error.credential;
//             const newUserErrorInfo = { ...loggedAndSignedInUser };
//             newUserErrorInfo.error = errorMessage;
//             newUserErrorInfo.success = false;
//             setLoggedAndSignedInUser(newUserErrorInfo);
//         });
//     }

//     useEffect(() => {
//         onAuthStateChanged(auth, (signedUser) => {
//             if (signedUser) {
//                 // user signed in
//                 const signedIn = {...loggedAndSignedInUser};
//                 signedIn.signInSuccess = true;
//                 signedIn.isGoogleSignIn = true;
//                 setLoggedAndSignedInUser(signedIn);
//                 const uid = signedUser.uid;
//             } else {
//                 console.log("not signed in");
//             }
//         });

//     }, [])

//     return {
//         loggedAndSignedInUser,
//         handleSignInByGoogle,
//         handleSignOutByGoogle
//     }

// }

// export default useGoogleAuthentication;
