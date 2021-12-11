import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonModal,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ErrorMessage from "../../components/error/Error";
import "../signup/Signup.css";
import { useHistory } from "react-router";
import { routes } from "../../common/routes/routes";
import { userApi } from "../../api/UserAPI";
import { informationCircle } from "ionicons/icons";

interface SignupState {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
    isError: boolean;
    message: string;
}

const Signup: React.FC = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const [signupState, setSignupState] = useState<SignupState>({
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
        isError: false,
        message: "",
    });

    const handleBlur = (e: any) => {
        setSignupState({ ...signupState, [e.target.name]: e.target.value });
    };

    const validateUsername = () => {
        if (signupState.username === "") return "Fill in your name ! ";
    };

    const validateEmail = () => {
        if (signupState.email === "") return "Fill in your email ! ";
        if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                signupState.email
            )
        )
            return "Enter a valid email ! ";
    };

    const validatePassword = () => {
        if (signupState.password === "") return "Fill in your password ! ";
        if (signupState.password === "")
            return "Please confirm your password ! ";
        if (signupState.password !== signupState.confirmPassword)
            return "Passwords must match ! ";
    };

    const validateCredentials = () => {
        let errorUsername = validateUsername();
        let errorEmail = validateEmail();
        let errorPassword = validatePassword();

        if (errorUsername || errorEmail || errorPassword) {
            setSignupState({
                ...signupState,
                isError: true,
                message:
                    (errorUsername === undefined ? "" : errorUsername) +
                    (errorEmail === undefined ? "" : errorEmail) +
                    (errorPassword === undefined ? "" : errorPassword),
            });
            return false;
        } else {
            setSignupState({ ...signupState, isError: false, message: "" });
        }
        return true;
    };

    const sendSignupRequest = async () => {
        userApi
            .signup(
                signupState.username,
                signupState.email,
                signupState.password
            )
            .then((data) => {
                console.log(data);
                history.push(routes.login);
            })
            .catch((err) => {
                setSignupState({
                    ...signupState,
                    isError: true,
                    message: err.response.data.message,
                });
            });
    };

    const handleSignup = async () => {
        if (validateCredentials() === true) sendSignupRequest();
    };

    return (
        <IonPage>
            <IonContent className="signupPage">
                <IonToolbar color="light">
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon
                                slot="icon-only"
                                icon={informationCircle}
                            />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Signup</IonTitle>
                </IonToolbar>
                <IonGrid className="ionGridSignup">
                    <IonRow className="ion-justify-content-left">
                        <IonCol size="0.5">
                            <IonModal isOpen={showModal} cssClass="customModal">
                                <p>Welcome to the signup page.</p>
                                <p>
                                    Become a contributor right now and help us
                                    fight fake news by collecting data with us.
                                    <br></br>
                                    Make sure you provide a valid email adress
                                    and also double check your password before
                                    clicking the 'Signup' button.
                                </p>
                                <Button
                                    text="Close Help"
                                    theme="dark"
                                    height="4.5vh"
                                    handleClick={() => setShowModal(false)}
                                />
                            </IonModal>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center ">
                        <IonCol size="12">
                            <IonText className="ionTexxt">
                                <p>Become a contributor now !</p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="username"
                                type="text"
                                icon="person"
                                label="Name:"
                                placeholder="John Smith"
                                handleBlur={handleBlur}
                            />
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
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="confirmPassword"
                                type="password"
                                icon="lock"
                                label="Confirm Password:"
                                placeholder="**********"
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>

                    {signupState.isError ? (
                        <IonRow className="ion-justify-content-center">
                            <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                                <ErrorMessage
                                    text={signupState.message}
                                    type="formError"
                                />
                            </IonCol>
                        </IonRow>
                    ) : (
                        <IonRow className="ion-justify-content-center">
                            <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                                <ErrorMessage text="-" type="formError" />
                            </IonCol>
                        </IonRow>
                    )}

                    <IonRow className="ion-justify-content-center ionButtonUPadding">
                        <IonCol sizeMd="2" sizeLg="1.5" sizeXs="5">
                            <Button
                                text="Signup"
                                theme="dark"
                                height="5vh"
                                handleClick={handleSignup}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Signup;
