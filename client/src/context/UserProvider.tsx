import React, { useEffect, useReducer } from "react";
import { Plugins } from "@capacitor/core";
import { Token } from "../common/models/Token";
import { Role } from "../common/enums/Role";

interface UserState {
    jwt?: string;
    role?: Role;
    isLoggedIn: boolean;
    setUser?: (token: Token) => void;
    clearState?: () => void;
}

interface ActionProps {
    type: string;
    payload?: any;
}

const initialState: UserState = {
    jwt: undefined,
    role: undefined,
    isLoggedIn: false,
};

const SET_USER = "SET_USER";
const CLEAR_STATE = "CLEAR_STATE";
const CHECK_USER = "CHECK_USER";

const { Storage } = Plugins;
const reducer: (state: UserState, action: ActionProps) => UserState = (
    state,
    { type, payload }
) => {
    switch (type) {
        case SET_USER:
            Storage.set({
                key: "JWT",
                value: JSON.stringify(payload.token.token),
            });
            Storage.set({
                key: "ROLE",
                value: JSON.stringify(payload.token.role),
            });
            return {
                ...state,
                jwt: payload.token.jwt,
                role: payload.token.role,
                isLoggedIn: true,
            };

        case CHECK_USER:
            return {
                ...state,
                jwt: undefined,
                role: payload.role,
                isLoggedIn: true,
            };

        case CLEAR_STATE:
            Storage.set({
                key: "JWT",
                value: "",
            });
            Storage.set({
                key: "ROLE",
                value: "",
            });
            return initialState;

        default:
            return state;
    }
};

export const UserContext = React.createContext<UserState>(initialState);

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    useEffect(() => {
        storager().then((res) => {
            switch (res as string) {
                case '"ADMIN"':
                    checkUser(Role.Admin);
                    console.log("Admino");
                    break;
                case '"MOD"':
                    checkUser(Role.Moderator);
                    console.log("Modderatorio");
                    break;
                case '"CONTRIB"':
                    checkUser(Role.Contributor);
                    console.log("Contributore");
                    break;
                default:
                    console.log("Just a user !");
            }
        });
    }, []);

    const [state, dispatch] = useReducer(reducer, initialState);

    const setUser = (token: Token) => {
        dispatch({ type: SET_USER, payload: { token: token } });
    };
    const clearState = () => {
        dispatch({ type: CLEAR_STATE });
    };
    const checkUser = (role: Role) => {
        dispatch({ type: CHECK_USER, payload: { role: role } });
    };

    const value = {
        isLoggedIn: state.isLoggedIn,
        jwt: state.jwt,
        role: state.role,
        setUser: setUser,
        clearState: clearState,
    };
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

const storager = async () => {
    let _role = await Storage.get({ key: "ROLE" });
    return _role.value;
};

export default UserProvider;
