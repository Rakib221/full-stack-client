import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    loggedAndSignedInUser.email ? (
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