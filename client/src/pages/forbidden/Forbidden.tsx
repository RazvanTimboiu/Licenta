import React from "react";
import { IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import "./Forbidden.css";

interface ForbiddenProps {}

const Forbidden: React.FC<ForbiddenProps> = () => {
    return (
        <IonPage>
            <IonContent>
                <IonGrid className="ionGridForbidden">
                    <IonRow className="ion-justify-content-center error">
                        <h1>Error 403 : Forbidden</h1>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Forbidden;
