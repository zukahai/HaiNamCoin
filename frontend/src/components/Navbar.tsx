// @flow
import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { AiOutlineMenu } from 'react-icons/ai';
import { NavLink, Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Cart } from './Cart';
import { Notification } from './Notification';
import { Chat } from './Chat';
import { UserProfile } from './UserProfile';
import { useAuthContext } from '../contexts/AuthContextProvider';
type Props = {};

export const Navbar = (props: Props) => {
    const { activeMenu, setActiveMenu, click, handleClick } = useStateContext();
    const { user, isLogin } = useAuthContext();
    return (
        <div className={'flex justify-between p-2 md:mx-6 relative'}>
            <NavbarButton
                title={'Menu'}
                customFunction={() => {
                    setActiveMenu(!activeMenu);
                }}
                dotColor={'#03C9D7'}
                icon={<AiOutlineMenu />}
                color={'blue'}
            ></NavbarButton>

            <div className={'flex'}>
                {isLogin ? (
                    <div
                        onClick={() => handleClick('userProfile')}
                        className={'flex items-center gap-2 cursor-pointer p-1'}
                    >
                        <p>
                            <span className={'text-gray-400 text-14'}>Hi, </span>
                            <span className={'text-gray-700 text-14 font-bold'}>{user.name}</span>
                        </p>
                        <MdKeyboardArrowDown></MdKeyboardArrowDown>
                    </div>
                ) : (
                    //login and register
                    <div className={'flex gap-2'}>
                        <Link to={'/login'}>
                            <button className={'bg-blue-500 text-white px-4 py-1 rounded-lg'}>Login</button>
                        </Link>
                        <Link to={'/register'}>
                            <button className={'bg-blue-500 text-white px-4 py-1 rounded-lg'}>Register</button>
                        </Link>
                    </div>
                )}

                {isLogin && (
                    <>
                        {click.cart && <Cart></Cart>}
                        {click.notification && <Notification></Notification>}
                        {click.chat && <Chat></Chat>}
                        {click.userProfile && <UserProfile></UserProfile>}
                    </>
                )}
            </div>
        </div>
    );
};

type PropButton = {
    title: string;
    customFunction: () => void;
    icon: React.ReactNode;
    color: string;
    dotColor?: string;
};
export const NavbarButton = (props: PropButton) => {
    return (
        <button
            onClick={props.customFunction}
            className={'relative text rounded-full p-3 hover:bg-light-gray'}
            style={{ color: props.color }}
        >
            <span
                style={{ backgroundColor: props.dotColor }}
                className={'absolute inline-flex rounded-full h-2 w-2 right-2 top-2'}
            >
                {props.icon}
            </span>
        </button>
    );
};
