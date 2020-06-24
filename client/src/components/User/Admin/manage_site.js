import React from 'react';
import UserLayout from '../../hoc/userLayout';
import UpdateSiteNfo from './update_site_info';

const ManageSite = () => {
    return (
        <UserLayout>
           <UpdateSiteNfo/>
        </UserLayout>
    );
};

export default ManageSite;