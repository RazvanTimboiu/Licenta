import React, { useContext, useState } from "react";
import "./Admin.css";

import {
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonPage,
    IonText,
    IonModal,
    IonButton,
    IonButtons,
    IonIcon,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import Button from "../../components/button/Button";
import ErrorMessage from "../../components/error/Error";

import { useHistory } from "react-router";
import { UserContext } from "../../context/UserProvider";
import Input from "../../components/input/Input";
import { informationCircle, logOut } from "ionicons/icons";
import { userApi } from "../../api/UserAPI";
import { routes } from "../../common/routes/routes";

interface AdminState {
    email: string;
    isError: boolean;
    message: string;
}

const Admin: React.FC = () => {
    const history = useHistory();
    const { clearState } = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        clearState!!();
        history.push(routes.landing);
    };

    const [adminState, setAdminState] = useState<AdminState>({
        email: "",
        isError: false,
        message: "",
    });

    const handleBlur = (e: any) => {
        setAdminState({ ...adminState, [e.target.name]: e.target.value });
    };

    const validateEmail = () => {
        if (adminState.email === "") return "Fill in an email ! ";
        if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                adminState.email
            )
        )
            return "Enter a valid email ! ";
    };

    const validateCredentials = () => {
        let errorEmail = validateEmail();

        if (errorEmail) {
            setAdminState({
                ...adminState,
                isError: true,
                message: errorEmail === undefined ? "" : errorEmail,
            });
            return false;
        } else {
            setAdminState({ ...adminState, isError: false, message: "" });
        }
        return true;
    };

    const sendPromoteRequest = async () => {
        userApi
            .promote(adminState.email)
            .then((data) => {
                console.log(data);
                setAdminState({
                    ...adminState,
                    isError: true,
                    message: data,
                });
            })
            .catch((err) => {
                setAdminState({
                    ...adminState,
                    isError: true,
                    message: err.response.data.message,
                });
            });
    };

    const handlePromote = async () => {
        if (validateCredentials() === true) sendPromoteRequest();
    };

    return (
        <IonPage>
            <IonContent className="adminPage">
                <IonToolbar color="light">
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon
                                slot="icon-only"
                                icon={informationCircle}
                            />
                        </IonButton>
                        <IonButton onClick={() => logout()}>
                            <IonIcon slot="icon-only" icon={logOut} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Admin Page</IonTitle>
                </IonToolbar>

                <IonGrid className="ionGridLanding">
                    <IonRow className="ion-justify-content-left">
                        <IonCol size="0.5">
                            <IonModal isOpen={showModal} cssClass="customModal">
                                <p>Welcome to the admin page.</p>
                                <p>
                                    To promote a contributor to a moderator,
                                    fill in the contributor's email adress and
                                    click 'Promote'.
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
                    <IonRow className="ion-justify-content-center rowPadding">
                        <IonCol size="12">
                            <IonText className="ionTexxt ">
                                <p>Promote to moderator : </p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="3" sizeXs="10">
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
                    {adminState.isError ? (
                        <IonRow className="ion-justify-content-center">
                            <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                                <ErrorMessage
                                    text={adminState.message}
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
                                text="Promote"
                                theme="dark"
                                height="5vh"
                                handleClick={handlePromote}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Admin;
