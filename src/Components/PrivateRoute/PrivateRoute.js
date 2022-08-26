import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
// import { UserContext } from '../../App';
import useAuth from '../Hook/useAuth';
import Loading from '../Shared/Loading/Loading';

const PrivateRoute = ({ children, ...rest }) => {
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const {loggedAndSignedInUser, loggedUser, isLoading} = useAuth();
    if (isLoading) {
        return <Loading></Loading>
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