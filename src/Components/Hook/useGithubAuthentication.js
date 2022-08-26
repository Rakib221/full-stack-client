// import initializeAuthentication from "../Authentication/firebase.initialize";
// import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
// import { useEffect } from "react";
// import { UserContext } from '../../App';
// import { useContext } from "react";


// initializeAuthentication();

// const useGithubAuthentication = () => {
//     const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
//     const auth = getAuth();
//     const githubProvider = new GithubAuthProvider();
//     const handleSignInByGithub = () => {
//         signInWithPopup(auth, githubProvider)
//             .then((result) => {
//                 // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//                 const credential = GithubAuthProvider.credentialFromResult(result);
//                 const token = credential.accessToken;

//                 // The signed-in user info.
//                 const githubUser = { ...loggedAndSignedInUser };
//                 githubUser.error = '';
//                 // githubUser.name = result.loggedAndSignedInUser.displayName;
//                 githubUser.isGithubSignIn = true;
//                 setLoggedAndSignedInUser(githubUser);
//                 // ...
//             }).catch((error) => {
//                 // Handle Errors here.
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // The email of the user's account used.
//                 // const email = error.customData.email;
//                 // The AuthCredential type that was used.
//                 const credential = GithubAuthProvider.credentialFromError(error);
//                 // ...
//                 const githubUser = { ...loggedAndSignedInUser };
//                 githubUser.error = errorMessage;
//                 setLoggedAndSignedInUser(githubUser);
//             });
//     }

//     const handleSignOutByGithub = () => {
//         const auth = getAuth();
//         signOut(auth).then(() => {
//             const githubUser = { ...loggedAndSignedInUser };
//             githubUser.error = '';
//             githubUser.name = '';
//             githubUser.isGithubSignIn = false;
//             setLoggedAndSignedInUser(githubUser);
//         }).catch((error) => {
//             // An error happened.
//             const githubUser = { ...loggedAndSignedInUser };
//             githubUser.error = error.message;
//             setLoggedAndSignedInUser(githubUser);
//         });
//     }

//     useEffect(() => {
//         onAuthStateChanged(auth, (signedUser) => {
//             if (signedUser) {
//                 // user signed in
//                 const signedIn = { ...loggedAndSignedInUser };
//                 signedIn.signInSuccess = true;
//                 signedIn.isGithubSignIn = true;
//                 setLoggedAndSignedInUser(signedIn);
//                 const uid = signedUser.uid;
//             } else {
//                 console.log("not signed in");
//             }
//         });

//     }, [])

//     return {
//         handleSignInByGithub,
//         handleSignOutByGithub
//     }

// }

// export default useGithubAuthentication;