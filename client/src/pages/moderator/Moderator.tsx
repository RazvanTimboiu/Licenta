import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import Button from "../../components/button/Button";
import ErrorMessage from "../../components/error/Error";
import "../moderator/Moderator.css";
import { useHistory } from "react-router";
import { routes } from "../../common/routes/routes";
import { UserContext } from "../../context/UserProvider";
import { informationCircle, logOut } from "ionicons/icons";
import { dataApi } from "../../api/DataAPI";

interface ModeratorState {
    label: string;
    motivation: string;
    source: string;
    isError: boolean;
    message: string;
}

const Moderator: React.FC = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const { clearState } = useContext(UserContext);

    const logout = () => {
        clearState!!();
        history.push(routes.landing);
    };

    const [modState, setModState] = useState<ModeratorState>({
        label: "",
        motivation: "",
        source: "",
        isError: false,
        message: "",
    });

    const sendGetRequest = async () => {
        dataApi
            .getNext()
            .then((data) => {
                window.open(data.source!, "_blank");
                setModState({
                    ...modState,
                    label: data.label!,
                    motivation: data.motivation!,
                    source: data.source!,
                    isError: false,
                    message: "",
                });
            })
            .catch((err) => {
                setModState({
                    ...modState,
                    label: "",
                    motivation: "",
                    source: "",
                    isError: true,
                    message: err.response.data.message,
                });
            });
    };

    const sendEvalRequest = async (isApproved: boolean) => {
        dataApi
            .evaluate(isApproved, modState.source)
            .then((data) => {
                console.log(data);
                setModState({
                    ...modState,
                    isError: true,
                    message: "Evaluation succeded ! ",
                });
            })
            .catch((err) => {
                setModState({
                    ...modState,
                    isError: true,
                    message: err.response.data.message,
                });
            });
    };

    const handleGet = async () => {
        sendGetRequest();
    };

    const handleEval = async (isApproved: boolean) => {
        sendEvalRequest(isApproved);
    };

    return (
        <IonPage>
            <IonContent className="moderatorPage">
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

                    <IonTitle>Moderator Page</IonTitle>
                </IonToolbar>
                <IonGrid className="ionGridSignup">
                    <IonRow className="ion-justify-content-left">
                        <IonCol size="0.5">
                            <IonModal isOpen={showModal} cssClass="customModal">
                                <p>Welcome to the mod page.</p>
                                <p>
                                    Make sure you verify each proposal you
                                    accept or reject.
                                    <br></br>
                                    The motivation should help you in deciding
                                    how to evaluate the proposal.
                                    <br></br>
                                    If the article source does not open, reject
                                    the proposal.
                                    <br></br>
                                    When done with a proposal, click 'Get next'
                                    to get a new one.
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
                    <IonRow className="ion-justify-content-center ionButtonUPadding">
                        <IonCol sizeMd="2" sizeLg="1.5" sizeXs="5">
                            <Button
                                text="Get next"
                                theme="dark"
                                height="5vh"
                                handleClick={() => handleGet()}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <IonLabel className="inputLabelll">
                                Label :
                            </IonLabel>
                            <IonItem className="inputIttem">
                                <IonText>
                                    <p>{modState.label}</p>
                                </IonText>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <IonLabel className="inputLabelll">
                                Motivation :
                            </IonLabel>
                            <IonItem className="inputItttem">
                                <IonText>
                                    <p>{modState.motivation}</p>
                                </IonText>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    {modState.isError ? (
                        <IonRow className="ion-justify-content-center">
                            <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                                <ErrorMessage
                                    text={modState.message}
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
                                text="Reject"
                                theme="dark"
                                height="5vh"
                                handleClick={() => handleEval(false)}
                            />
                        </IonCol>
                        <IonCol sizeMd="2" sizeLg="1.5" sizeXs="5">
                            <Button
                                text="Approve"
                                theme="dark"
                                height="5vh"
                                handleClick={() => handleEval(true)}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Moderator;
