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
import React, { useContext, useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ErrorMessage from "../../components/error/Error";
import "../contributor/Contributor.css";
import { useHistory } from "react-router";
import { routes } from "../../common/routes/routes";
import { informationCircle, logOut } from "ionicons/icons";
import { dataApi } from "../../api/DataAPI";
import { UserContext } from "../../context/UserProvider";

interface ContribState {
    headline: string;
    content: string;
    source: string;
    label: string;
    motivation: string;
    isError: boolean;
    message: string;
}

const Contributor: React.FC = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const [contribState, setContribState] = useState<ContribState>({
        headline: "",
        content: "",
        source: "",
        label: "",
        motivation: "",
        isError: false,
        message: "",
    });

    const { clearState } = useContext(UserContext);

    const logout = () => {
        clearState!!();
        history.push(routes.landing);
    };

    const handleBlur = (e: any) => {
        setContribState({ ...contribState, [e.target.name]: e.target.value });
    };

    const validateHeadline = () => {
        if (contribState.headline === "")
            return "Fill in the article headline ! ";
    };

    const validateContent = () => {
        if (contribState.content === "")
            return "Fill in the article content ! ";
    };

    const validateSource = () => {
        if (contribState.source === "") return "Fill in the article source ! ";
    };

    const validateLabel = () => {
        if (contribState.headline === "") return "Please provide a label ! ";
    };

    const validateMotivation = () => {
        if (contribState.headline === "") return "Please provide motivation! ";
    };

    const validateCredentials = () => {
        let errorHeadline = validateHeadline();
        let errorContent = validateContent();
        let errorSource = validateSource();
        let errorLabel = validateLabel();
        let errorMotivation = validateMotivation();

        if (
            errorHeadline ||
            errorContent ||
            errorSource ||
            errorLabel ||
            errorMotivation
        ) {
            setContribState({
                ...contribState,
                isError: true,
                message:
                    (errorHeadline === undefined ? "" : errorHeadline) +
                    (errorContent === undefined ? "" : errorContent) +
                    (errorSource === undefined ? "" : errorSource) +
                    (errorLabel === undefined ? "" : errorLabel) +
                    (errorMotivation === undefined ? "" : errorMotivation),
            });
            return false;
        } else {
            setContribState({ ...contribState, isError: false, message: "" });
        }
        return true;
    };

    const sendProposeRequest = async () => {
        dataApi
            .propose(
                contribState.headline,
                contribState.content,
                contribState.source,
                contribState.label,
                contribState.motivation
            )
            .then((data) => {
                console.log(data);
                setContribState({
                    ...contribState,
                    isError: true,
                    message: "Succesfully added ! ",
                });
            })
            .catch((err) => {
                setContribState({
                    ...contribState,
                    isError: true,
                    message: err.response.data.message,
                });
            });
    };

    const handlePropose = async () => {
        if (validateCredentials() === true) sendProposeRequest();
    };

    return (
        <IonPage>
            <IonContent className="contribPage">
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
                    <IonTitle>Contributor Page</IonTitle>
                </IonToolbar>
                <IonGrid className="ionGridSignup">
                    <IonRow className="ion-justify-content-left">
                        <IonCol size="0.5">
                            <IonModal isOpen={showModal} cssClass="customModal">
                                <p>Welcome to the contributor page.</p>
                                <p>
                                    Make sure you fill in all fields before
                                    clicking the 'Propose' button.
                                    <br></br>
                                    One of the most important fields is the
                                    source. If the article source won't open, it
                                    will be rejected right away.
                                    <br></br>
                                    Make sure you verify any information you
                                    submit and provide adequate motivation when
                                    you provide a label for an article.
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
                                <p>Contribute an article !</p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="headline"
                                type="text"
                                icon="news"
                                label="Headline:"
                                placeholder="Article headline ..."
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="content"
                                type="text"
                                icon="news"
                                label="Content:"
                                placeholder="Article content ..."
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="source"
                                type="text"
                                icon="news"
                                label="Source:"
                                placeholder="www.article.com"
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="label"
                                type="text"
                                icon="news"
                                label="Label:"
                                placeholder="Fake/Real/Satire"
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="motivation"
                                type="text"
                                icon="news"
                                label="Motivation:"
                                placeholder="Why did you choose that label ?"
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>

                    {contribState.isError ? (
                        <IonRow className="ion-justify-content-center">
                            <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                                <ErrorMessage
                                    text={contribState.message}
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
                                text="Propose"
                                theme="dark"
                                height="5vh"
                                handleClick={handlePropose}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Contributor;
