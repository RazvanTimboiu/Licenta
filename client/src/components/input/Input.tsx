import React, { useEffect, useState } from "react";
import "./Input.css";
import {
    IonIcon,
    IonInput,
    IonItem,
    IonDatetime,
    IonLabel,
} from "@ionic/react";
import {
    personOutline,
    mailOutline,
    lockClosedOutline,
    calendarOutline,
    locationOutline,
    callOutline,
    schoolOutline,
    peopleOutline,
    newspaperOutline,
} from "ionicons/icons";

interface InputProps {
    type: "password" | "text" | "email" | "date" | "tel" | "number";
    icon:
        | "person"
        | "mail"
        | "lock"
        | "location"
        | "calendar"
        | "phone"
        | "school"
        | "people"
        | "news";
    placeholder: string;
    required?: boolean;
    handleBlur?: (e: any) => void;
    handleChange?: (e: any) => void;
    inputRef?: any;
    name?: string;
    error?: boolean;
    defaultValue?: string;
    label?: string;
}

const Input: React.FC<InputProps> = ({
    type,
    icon,
    placeholder,
    required,
    handleBlur,
    handleChange,
    name,
    error,
    inputRef,
    defaultValue,
    label,
}: InputProps) => {
    const [data, setData] = useState<string | null | undefined>(defaultValue);
    useEffect(() => {
        setData(defaultValue);
    }, [defaultValue]);
    return (
        <>
            {label !== undefined ? (
                <IonLabel className="inputLabell">{label}</IonLabel>
            ) : null}
            <IonItem
                className={error ? "inputItemError" : "inputItem"}
                lines="none"
            >
                <IonIcon
                    className={error ? "inputIconError" : "inputIcon"}
                    icon={selectedIcon(icon)}
                />

                {type === "date" ? (
                    <IonDatetime
                        name={name}
                        className="dateTime"
                        placeholder={placeholder}
                        onIonChange={(e) => {
                            setData(e.detail.value);
                            handleChange && handleChange(e);
                        }}
                        ref={inputRef}
                        value={data}
                    />
                ) : (
                    <IonInput
                        name={name}
                        className="inputText"
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        onIonBlur={handleBlur}
                        onIonChange={(e) => {
                            setData(e.detail.value);
                            handleChange && handleChange(e);
                        }}
                        clearOnEdit={false}
                        ref={inputRef}
                        value={data}
                    />
                )}
            </IonItem>
        </>
    );
};

const selectedIcon = (icon: string) => {
    switch (icon) {
        case "mail": {
            return mailOutline;
        }
        case "person": {
            return personOutline;
        }
        case "lock": {
            return lockClosedOutline;
        }
        case "calendar": {
            return calendarOutline;
        }
        case "location": {
            return locationOutline;
        }
        case "phone": {
            return callOutline;
        }
        case "school": {
            return schoolOutline;
        }
        case "people": {
            return peopleOutline;
        }
        case "news": {
            return newspaperOutline;
        }
        default: {
            return undefined;
        }
    }
};

export default Input;
