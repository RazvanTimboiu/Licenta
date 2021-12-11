import * as React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { routes } from "./routes";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { Role } from "../enums/Role";

interface ProtectedRouteProps {
    Component: React.FC<RouteComponentProps>;
    path: string;
    exact?: boolean;
    requiredRole?: Role | boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    Component,
    path,
    exact = false,
    requiredRole = false,
}: ProtectedRouteProps) => {
    const { isLoggedIn, role } = useContext(UserContext);

    console.log("Loggert: " + isLoggedIn);

    const isAuthorized = !isLoggedIn
        ? false
        : requiredRole === false
        ? true
        : role === requiredRole;

    return (
        <Route
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) =>
                isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: isLoggedIn
                                ? routes.forbidden
                                : routes.login,
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
