import React from 'react';
import Navs from '../components/Navs';
import "../font.css";
import AccountInfo from '../components/AccountInfo';
import UserAccountMovies from '../components/UserAccountMovies';
import FavoriteMovies from '../components/FavoriteMovies';

const UserAccount = () => {
    
    return (
        <>
            <UserAccountMovies />
            <Navs />
            <AccountInfo />
            <FavoriteMovies />
        </>
    );
}

export default UserAccount;
