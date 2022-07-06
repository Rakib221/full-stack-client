import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
// import { UserContext } from '../../App';
import PuffLoader from "react-spinners/PuffLoader";
import useAuth from '../Hook/useAuth';
import './PrivateRoute.css';

const PrivateRoute = ({ children, ...rest }) => {
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const {loggedAndSignedInUser, loggedUser, isLoading} = useAuth();
    if (isLoading) {
        return <div className="pre-loader"><PuffLoader color={'red'} isLoading={isLoading} size={150} /></div>
    }
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                loggedAndSignedInUser.email || loggedAndSignedInUser.uid? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default PrivateRoute;