import React from 'react';
import { FooterComponent } from '../components';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <FooterComponent/>
            </div>
        </footer>
    );
}

export default Footer;