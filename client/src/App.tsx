import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Pages */
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Demo from "./pages/demo/Demo";
import Admin from "./pages/admin/Admin";
import Signup from "./pages/signup/Signup";
import Moderator from "./pages/moderator/Moderator";
import Contributor from "./pages/contributor/Contributor";
import Forbidden from "./pages/forbidden/Forbidden";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Common */
import { routes } from "./common/routes/routes";
import ProtectedRoute from "./common/routes/ProtectedRoute";
import UserProvider from "./context/UserProvider";
import { Role } from "./common/enums/Role";

const App: React.FC = () => (
    <UserProvider>
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Switch>
                        <Route path={routes.landing} component={Landing} />
                        <Route path={routes.login} component={Login} />
                        <Route path={routes.signup} component={Signup} />
                        <Route path={routes.demo} component={Demo} />
                        <Route path={routes.forbidden} component={Forbidden} />
                        <ProtectedRoute
                            exact={true}
                            path={routes.admin}
                            Component={Admin}
                            requiredRole={Role.Admin}
                        />
                        <ProtectedRoute
                            exact={true}
                            path={routes.mod}
                            Component={Moderator}
                            requiredRole={Role.Moderator}
                        />
                        <ProtectedRoute
                            exact={true}
                            path={routes.contrib}
                            Component={Contributor}
                            requiredRole={Role.Contributor}
                        />
                        <Redirect to={routes.landing} />
                    </Switch>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    </UserProvider>
);

export default App;
