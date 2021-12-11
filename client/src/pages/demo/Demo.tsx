import React, { useState } from "react";
import "../demo/Demo.css";

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

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ErrorMessage from "../../components/error/Error";

import { modelApi } from "../../api/ModelAPI";
import { informationCircle } from "ionicons/icons";

interface DemoState {
    article: string;
    prediction: string;
    confidence: number;
    returned: boolean;
    isError: boolean;
    message: string;
}

const Demo: React.FC = () => {
    const [demoState, setDemoState] = useState<DemoState>({
        article: "",
        prediction: "",
        confidence: 0,
        returned: false,
        isError: false,
        message: "",
    });

    const [showModal, setShowModal] = useState(false);

    const handleBlur = (e: any) => {
        setDemoState({ ...demoState, [e.target.name]: e.target.value });
    };

    const validateContent = () => {
        if (demoState.article === "") return "Please input an article ! ";
    };

    const validateInput = () => {
        let errorContent = validateContent();

        if (errorContent) {
            setDemoState({
                ...demoState,
                isError: true,
                message: errorContent === undefined ? "" : errorContent,
                returned: false,
            });
            return false;
        } else {
            setDemoState({
                ...demoState,
                isError: false,
                message: "",
                returned: false,
            });
        }
        return true;
    };

    const sendPredictRequest = async () => {
        modelApi
            .predict(demoState.article)
            .then((data) => {
                setDemoState({
                    ...demoState,
                    prediction: String(data.prediction),
                    confidence: data.confidence ? data.confidence : -1,
                    returned: true,
                    isError: false,
                });
            })
            .catch(() => {});
    };

    const handleQuery = async () => {
        const isValid = validateInput();
        if (isValid) sendPredictRequest();
    };

    return (
        <IonPage>
            <IonContent className="demoPage">
                <IonToolbar color="light">
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon
                                slot="icon-only"
                                icon={informationCircle}
                            />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Demo</IonTitle>
                </IonToolbar>
                <IonGrid className="ionGridLogin">
                    <IonRow className="ion-justify-content-left">
                        <IonCol size="0.5">
                            <IonModal isOpen={showModal} cssClass="customModal">
                                <p>Welcome to the demo page.</p>
                                <p>
                                    Paste your article in the 'News Article'
                                    field and click 'Query' to ask the model.
                                    <br></br>
                                    After you click 'Query', the model will
                                    evaluate your article and send back an
                                    answer.
                                    <br></br>
                                    The label can either be 'Trustworthy',
                                    'Satire' or 'Not Trustworthy'
                                    <br></br>A high confidence score ( over 90
                                    %) means that the model is confident with
                                    the label it provided.
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
                            <IonText className="ionTextt">
                                <p>Trusty</p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                            <Input
                                name="article"
                                type="text"
                                icon="news"
                                label="News Article:"
                                placeholder="Paste it right here ..."
                                handleBlur={handleBlur}
                            />
                        </IonCol>
                    </IonRow>
                    {demoState.isError ? (
                        <IonRow className="ion-justify-content-center">
                            <IonCol sizeMd="6" sizeLg="4" sizeXs="10">
                                <ErrorMessage
                                    text={demoState.message}
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

                    {demoState.returned && (
                        <IonRow className="ion-justify-content-center rowPaddingg ionTexttt">
                            <IonCol sizeMd="6" sizeLg="1.5" sizeXs="10">
                                <p>
                                    The model prediction is :{" "}
                                    {demoState.prediction}{" "}
                                </p>
                                <p>Confidence: {demoState.confidence} %</p>
                            </IonCol>
                        </IonRow>
                    )}

                    <IonRow className="ion-justify-content-center ionButtonPadding">
                        <IonCol sizeMd="2" sizeLg="1.5" sizeXs="5">
                            <Button
                                text="Query"
                                theme="dark"
                                height="5vh"
                                handleClick={handleQuery}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Demo;
