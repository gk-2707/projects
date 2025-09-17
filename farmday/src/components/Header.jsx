import React, { useState } from 'react';
import fl2 from '../assets/fl2.png';
import logoText from '../assets/farmdaylogotext.png';

const Header = () => {
    const [lang, setLang] = useState("en");

    const handleLangToggle = () => {
        const nextLang = lang === "en" ? "ta" : "en";
        setLang(nextLang);

        document.querySelectorAll("[data-en]").forEach(el => {
            el.textContent = el.getAttribute(`data-${nextLang}`);
        });
    };

    return (
        <header className="fixed top-0 left-0 w-full z-[100] h-[60px] bg-[#1a1f32] flex items-center justify-between px-6 shadow-md transition-all duration-500 rounded-sm">
            {/* Logo Section */}
            <div className="flex items-center space-x-6 cursor-pointer group">
                <img src={fl2} alt="Logo" className="h-[50px] w-[50px] rounded-[20%] transition-transform duration-500 group-hover:animate-[flip_0.6s_ease-in-out]" />
                <img src={logoText} alt="FarmDay Text" className="h-[50px] w-[120px] rounded-[10px] transition-transform duration-500 group-hover:animate-[flip_0.6s_ease-in-out]" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
                <ul className="flex w-full max-w-5xl justify-evenly font-medium text-white text-sm">
                    {[
                        { id: "home", en: "Home", ta: "முகப்பு" },
                        { id: "about", en: "About", ta: "எங்களைப் பற்றி" },
                        { id: "features", en: "Features", ta: "அம்சங்கள்" },
                        { id: "reviews", en: "Reviews", ta: "மதிப்பீடுகள்" },
                        { id: "blogs", en: "Blogs", ta: "வலைப்பதிவுகள்" },
                        { id: "contact", en: "Contact", ta: "தொடர்பு" }
                    ].map(({ id, en, ta }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                data-en={en}
                                data-ta={ta}
                                className="inline-block px-6 py-2 transition-transform duration-300 hover:scale-125 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-green-500 hover:text-transparent hover:bg-clip-text rounded-md"
                            >
                                {en}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Language Button */}
            <button
                onClick={handleLangToggle}
                className="hidden md:inline-block text-white border-2 border-white px-4 py-1.5 rounded transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-green-500 hover:text-white"
            >
                {lang === "en" ? "தமிழ்" : "English"}
            </button>
        </header>
    );
};

export default Header;
