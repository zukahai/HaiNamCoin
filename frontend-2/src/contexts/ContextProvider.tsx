import React, { createContext, useContext, useState } from 'react';

type StateClick = {
    chat: boolean;
    cart: boolean;
    notification: boolean;
    userProfile: boolean;
};

const initialState: StateClick = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};
type State = {
    activeMenu: boolean;
    setActiveMenu: (menu: boolean) => void;
    click: StateClick;
    setClick: (click: StateClick) => void;
    handleClick: (name: string) => void;
    setDefault: () => void;
};

export const StateContext = createContext<State>({
    activeMenu: false,
    setActiveMenu(menu: boolean): void {},
    click: initialState,
    setClick(click: StateClick): void {},
    handleClick(name: string): void {},
    setDefault(): void {},
});

type Props = {
    children: React.ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [click, setClick] = useState(initialState);
    const setDefault = () => {
        setClick(initialState);
    };
    const handleClick = (name: string) => {
        setClick({ ...initialState, [name]: true });
    };
    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                click,
                setClick,
                setDefault,
                handleClick,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
