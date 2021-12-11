import React from "react";
import { IonButton } from "@ionic/react";
import "./Button.css";

interface ButtonProps {
    text: string;
    theme: "light" | "dark";
    height?: string;
    handleClick: (e: any) => void;
}

const Button: React.FC<ButtonProps> = ({
    text,
    theme,
    height,
    handleClick,
}: ButtonProps) => {
    return (
        <IonButton
            style={{ height: height }}
            className={theme}
            onClick={handleClick}
        >
            {text}
        </IonButton>
    );
};

export default Button;
