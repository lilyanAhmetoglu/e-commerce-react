import React from 'react';
import UserLayout from '../../hoc/userLayout';
import ManageBrands from './manage_brands';
import ManageFabrics from './manage_fabrics';
import ManageCategory from './manage_category';
const ManageCategories = () => {
    return (
        <UserLayout>
            <ManageBrands/>
            <ManageFabrics/>
            <ManageCategory/>
        </UserLayout>
    );
};

export default ManageCategories;