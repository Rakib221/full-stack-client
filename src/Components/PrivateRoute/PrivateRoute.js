import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../App';
import useAuth from '../Hook/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    // const user = useAuth();
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    loggedAndSignedInUser.name? (
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