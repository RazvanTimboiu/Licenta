import React, { useState } from "react";
import "./Landing.css";

import {
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonText,
    IonPage,
    IonModal,
    IonButton,
    IonButtons,
    IonIcon,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import Button from "../../components/button/Button";

import { useHistory } from "react-router";
import { routes } from "../../common/routes/routes";
import { informationCircle, logIn } from "ionicons/icons";

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    return (
        <IonPage>
            <IonContent className="landingPage">
                <IonToolbar color="light">
                    <IonButtons slot="end">
                        <IonButton onClick={() => history.push(routes.login)}>
                            <IonIcon slot="icon-only" icon={logIn} />
                        </IonButton>
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon
                                slot="icon-only"
                                icon={informationCircle}
                            />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Landing</IonTitle>
                </IonToolbar>
                <IonGrid className="ionGridLanding">
                    <IonRow className="ion-justify-content-left">
                        <IonCol size="0.5">
                            <IonModal isOpen={showModal} cssClass="customModal">
                                <p>Welcome to the landing page.</p>
                                <p>
                                    Click the 'Try it Out' button to navigate to
                                    the Demo Page.
                                    <br></br>
                                    Become a contributor by clicking
                                    'Contribute'.
                                    <br></br>
                                    If you already have an account, navigate to
                                    the Login Page by pressing the entrance
                                    icon.
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
                            <IonText className="ionText">
                                <p>Trusty</p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center ionButtonPadding">
                        <IonCol
                            className="rightMargin"
                            sizeXs="5"
                            sizeSm="4"
                            sizeMd="3"
                            sizeLg="2"
                            sizeXl="1.5"
                        >
                            <Button
                                text="Try it out"
                                theme="dark"
                                height="4.5vh"
                                handleClick={(e) => {
                                    history.push(routes.demo);
                                }}
                            />
                        </IonCol>
                        <IonCol
                            className="leftMargin"
                            sizeXs="5"
                            sizeSm="4"
                            sizeMd="3"
                            sizeLg="2"
                            sizeXl="1.5"
                        >
                            <Button
                                text="Contribute"
                                theme="light"
                                height="4.5vh"
                                handleClick={(e) => {
                                    history.push(routes.signup);
                                }}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Landing;
