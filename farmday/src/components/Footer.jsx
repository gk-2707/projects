import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#121826] text-white py-10 px-5 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                {/* Brand Name & Tagline */}
                <div>
                    <h1 className="text-2xl font-bold text-green-500">FarmDay</h1>
                    <p className="text-sm mt-1" data-en="Empowering Farmers, Connecting Markets" data-ta="விவசாயிகளை அதிகாரப்படுத்தி, சந்தைகளை இணைத்தல்">
                        Empowering Farmers, Connecting Markets
                    </p>
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-400" data-en="© 2025 FarmDay. All rights reserved." data-ta="© 2025 பார்ம் டே. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.">
                    © 2025 FarmDay. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
