import React from 'react';
import { HeaderComponent } from '../components';
function Header() {
    return (
        <header className="bg-blue-500 p-4">
            <h1 className="text-white text-2xl md:text-4xl">
                <HeaderComponent/>
            </h1>
        </header>
    );
}

export default Header;