import {
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ErrorMessage from "../../components/error/Error";
import "../login/Login.css";
import { useHistory } from "react-router";
import { routes } from "../../common/routes/routes";
import { UserContext } from "../../context/UserProvider";
import { userApi } from "../../api/UserAPI";
import { Role } from "../../common/enums/Role";

interface LoginState {
    email: string;
    password: string;
    isError: boolean;
    message: string;
}

const Login: React.FC = () => {
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    const [loginState, setLoginState] = useState<LoginState>({
        email: "",
        password: "",
        isError: false,
        message: "",
    });

    const handleBlur = (e: any) => {
        setLoginState({ ...loginState, [e.target.name]: e.target.value });
    };

    const validateEmail = () => {
        if (loginState.email === "") return "Please fill in your email ! ";
    };

    const validatePassword = () => {
        if (loginState.password === "")
            return "Please fill in your password ! ";
    };

    const validateCredentials = () => {
        let errorEmail = validateEmail();
        let errorPassword = validatePassword();

        if (errorEmail || errorPassword) {
            setLoginState({
                ...loginState,
                isError: true,
                message:
                    (errorEmail === undefined ? "" : errorEmail) +
                    (errorPassword === undefined ? "" : errorPassword),
            });
            return false;
        } else {
            setLoginState({ ...loginState, isError: false, message: "" });
        }
        return true;
    };

    const sendLoginRequest = async () => {
        userApi
            .login(loginState.email, loginState.password)
            .then((data) => {
                setUser!!(data);
                switch (data.role) {
                    case Role.Admin:
                        history.push(routes.admin);
                        break;
                    case Role.Contributor:
                        history.push(routes.contrib);
                        break;
                    case Role.Moderator:
                        history.push(routes.mod);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoginState({
                    email: loginState.email,
                    password: loginState.password,
                    isError: true,
                    message: err.response.data.msg,
                });
            });
    };

    const handleLogin = async () => {
        if (validateCredentials() === true) sendLoginRequest();
    };

    return (
        <IonPage>
            <IonContent className="loginPage">
                <IonToolbar color="light">
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
                <IonGrid className="ionGridLogin">
                    <IonRow className="ion-justify-content-center rowPadding">
                        <IonCol size="12">
                            <IonText className="ionText">
                                <p>Trusty</p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="email"
                                type="text"
                                icon="mail"
                                label="Email Adress:"
                                placeholder="user@email.com"
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="password"
                                type="password"
                                icon="lock"
                                label="Password:"
                                placeholder="**********"
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>

                    {loginState.isError ? (
                        <IonRow className="ion-justify-content-center">
                            <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                                <ErrorMessage
                                    text={loginState.message}
                                    type="formError"
                                />
                            </IonCol>
                        </IonRow>
                    ) : (
                        <IonRow className="ion-justify-content-center">
                            <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                                <ErrorMessage text={"-"} type="formError" />
                            </IonCol>
                        </IonRow>
                    )}

                    <IonRow className="ion-justify-content-center ionButtonUPadding">
                        <IonCol sizeMd="2" sizeLg="1.5" sizeXs="5">
                            <Button
                                text="Login"
                                theme="dark"
                                height="5vh"
                                handleClick={handleLogin}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;
