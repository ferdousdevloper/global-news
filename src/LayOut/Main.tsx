// src/layouts/Main.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';

const Main: React.FC = () => {
    return (
        <div>
            <NavBar/>
            <Outlet />
        </div>
    );
};

export default Main;