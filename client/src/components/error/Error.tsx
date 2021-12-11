import React from "react";
import { IonText } from "@ionic/react";
import "./Error.css";

interface ErrorProps {
    text: string;
    type: "formError";
}

const Error: React.FC<ErrorProps> = ({ text, type }: ErrorProps) => {
    return (
        <div className={type}>
            <IonText>{text}</IonText>
        </div>
    );
};

export default Error;
