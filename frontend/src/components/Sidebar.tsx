// @flow
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import { RiFileTransferFill, RiStockLine, RiUser4Fill } from 'react-icons/ri';
import { FiPieChart, FiShoppingBag } from 'react-icons/fi';
import { AiFillApi, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock, AiOutlineTransaction } from 'react-icons/ai';
import { BsBarChart } from 'react-icons/bs';
import { GiFrozenBlock, GiLouvrePyramid } from 'react-icons/gi';
import { BiUser, FaBitcoin } from 'react-icons/all';

const links = [
    {
        title: 'Main',
        links: [
            {
                link: 'block',
                title: 'Block',
                icon: <GiFrozenBlock />,
            },
            {
                link: 'user',
                title: 'User',
                icon: <BiUser />,
            },
            {
                link: 'user-profile',
                title: 'User Profile',
                icon: <RiUser4Fill />,
            },
        ],
    },
    {
        title: 'Transaction',
        links: [
            {
                link: 'transaction',
                title: 'Transaction',
                icon: <AiOutlineTransaction />,
            },
            {
                link: 'send-coin',
                title: 'Send Coin',
                icon: <FaBitcoin />,
            },
        ],
    },
    {
        title: 'Charts',
        links: [
            {
                link: 'crypto',
                title: 'Crypto',
                icon: <AiOutlineStock />,
            },
        ],
    },
    {
        title: 'Api',
        links: [
            {
                link: 'api',
                title: 'Api',
                icon: <AiFillApi />,
            },
        ],
    },
];
type Props = {};
export const Sidebar = (props: Props) => {
    const { activeMenu, setActiveMenu } = useStateContext();
    const activeLink =
        'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 bg-secondary-dark-bg';
    const normalLink =
        'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
    return (
        <div
            className={'ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'}
            style={{ zIndex: '1000000' }}
        >
            {activeMenu && (
                <>
                    <div className={'flex justify-between items-center'}>
                        <Link
                            to={'/'}
                            className={
                                'items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
                            }
                        >
                            <SiShopware></SiShopware> <span>HaiNamCoin</span>
                        </Link>
                        <button
                            type={'button'}
                            onClick={() => {
                                setActiveMenu(!activeMenu);
                            }}
                            className={'text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'}
                        >
                            <MdOutlineCancel></MdOutlineCancel>
                        </button>
                    </div>
                    <div className={'mt-100'}>
                        {links.map((item) => (
                            <div key={item.title} className={'text-gray-400 m-3 mt-4 uppercase text-sm font-semibold'}>
                                <p>{item.title}</p>
                                {item.links.map((link) => (
                                    <NavLink
                                        to={link.link}
                                        key={link.link}
                                        onClick={() => {}}
                                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                    >
                                        {link.icon}
                                        <span>{link.title}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
