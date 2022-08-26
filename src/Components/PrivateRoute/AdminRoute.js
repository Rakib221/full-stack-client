import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
// import { UserContext } from '../../App';
import PuffLoader from "react-spinners/PuffLoader";
import useAuth from '../Hook/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const {loggedUser, loggedAndSignedInUser, admin, isLoading} = useAuth();
    if (isLoading) {
        return <div className="pre-loader"><PuffLoader color={'red'} isLoading={isLoading} size={150} /></div>
    }
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                loggedAndSignedInUser.email && admin ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/home",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default AdminRoute;