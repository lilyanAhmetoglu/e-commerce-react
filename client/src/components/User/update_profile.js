
import React from 'react';
import UserLayout from '../hoc/userLayout';
import UpdatePersonalNfo from './update_personal_info';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1 style={{marginTop:"30px"}}>Profile</h1>
            <UpdatePersonalNfo/>
        </UserLayout>
    );
};

export default UpdateProfile;