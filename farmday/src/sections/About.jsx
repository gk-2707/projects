import React from 'react';
import img1 from '../assets/about.jpg';
import img2 from '../assets/about 1.jpg';

const About = () => {
    return (
        <section
            id="about"
            className="bg-[#1a1f32] py-20 px-6 text-white text-center overflow-hidden"
        >
            <h1
                className="text-4xl md:text-5xl font-bold text-green-500 mb-12 animate-fade-slide-up"
                data-en="About FarmDay"
                data-ta="FarmDay பற்றி"
            >
                About FarmDay
            </h1>

            <div className="flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto gap-12">
                {/* Image Section */}
                <div className="flex-1 flex flex-col items-center gap-6 animate-fade-slide-up delay-200">
                    <img
                        src={img1}
                        alt="FarmDay mission"
                        className="w-3/5 rounded-lg shadow-lg transition-all duration-700"
                    />
                    <img
                        src={img2}
                        alt="FarmDay helping farmers"
                        className="w-3/5 rounded-lg shadow-lg transition-all duration-700"
                    />
                </div>

                {/* Text Section */}
                <div className="flex-1 text-left text-lg animate-fade-slide-up delay-400">
                    <p
                        className="mb-6 leading-relaxed"
                        data-en="FarmDay mobile app is designed to empower farmers by delivering timely and accurate information. With the right insights at the right time, the app helps farmers boost their revenue or reduce input costs by leveraging advanced technology."
                        data-ta="விவசாயிகளை நேரத்திற்கேற்பவும் துல்லியமான தகவல்களைக் கொண்டும் அதிகாரப்படுத்தும் நோக்கில் FarmDay செயலி வடிவமைக்கப்பட்டுள்ளது. சரியான நேரத்தில் சரியான தகவல்களுடன், விவசாயிகள் தங்களின் வருமானத்தை அதிகரிக்கவோ அல்லது செலவுகளை குறைக்கவோ இந்த செயலியின் மூலம் முடியும்."
                    >
                        FarmDay mobile app is designed to empower farmers by delivering timely and accurate information.
                        With the right insights at the right time, the app helps farmers boost their revenue or reduce input costs by leveraging advanced technology.
                    </p>

                    <p
                        className="mb-8 leading-relaxed"
                        data-en="With this innovative data-driven digital ecosystem aimed at solving one problem at a time, we believe that it would eventually create a ripple effect by adding incremental value to farmers."
                        data-ta="ஒவ்வொரு பிரச்சனையையும் தனித்தனியாக தீர்க்கும் நோக்கத்தில் உருவாக்கப்பட்ட தரவுகள் சார்ந்த டிஜிட்டல் சூழல், விவசாயிகளுக்கு படிப்படியாக அதிக மதிப்பை சேர்த்து ஒரு அலை போன்ற தாக்கத்தை உருவாக்கும் என நாங்கள் நம்புகிறோம்."
                    >
                        With this innovative data-driven digital ecosystem aimed at solving one problem at a time,
                        we believe that it would eventually create a ripple effect by adding incremental value to farmers.
                    </p>

                    <div className="flex justify-center md:justify-start">
                        <a
                            href="https://play.google.com/store/search?q=farmday&c=apps"
                            className="about-button"
                            data-en="Learn More"
                            data-ta="மேலும் அறிக"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
