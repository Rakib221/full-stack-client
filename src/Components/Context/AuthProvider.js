import React from 'react';
import { createContext } from 'react';
import useFirebaseAuthentication from '../Hook/useFirebaseAuthentication';

export const AuthContext = createContext();

const AuthProvider= ({children}) => {
    // const {children} = props;
    const AllContext = useFirebaseAuthentication();
    return (
        <AuthContext.Provider value = {AllContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;