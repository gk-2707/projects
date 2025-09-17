import React, { useEffect, useRef } from 'react';
import homeimg from '../assets/mobhom.png';

const Home = () => {
    const textSectionRef = useRef(null);
    const imageSectionRef = useRef(null);

    useEffect(() => {
        const textEl = textSectionRef.current;
        const imageEl = imageSectionRef.current;

        if (textEl && imageEl) {
            // Remove and re-add animation class to re-trigger
            textEl.classList.remove('animate-[fadeSlideUpScale_1s_ease-in-out]');
            imageEl.classList.remove('animate-[fadeSlideUpScale_1s_ease-in-out]');

            // Force reflow to reset animation
            void textEl.offsetWidth;
            void imageEl.offsetWidth;

            textEl.classList.add('animate-[fadeSlideUpScale_1s_ease-in-out]');
            imageEl.classList.add('animate-[fadeSlideUpScale_1s_ease-in-out]');
        }
    }, []);

    return (
        <section className="pt-20 px-5 md:px-12 text-white bg-[#1a1f32] min-h-screen flex items-center">
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                {/* Text Section */}
                <div
                    ref={textSectionRef}
                    className="flex-1 text-center md:text-left mb-12 md:mb-0 transform md:translate-x-12 animate-[fadeSlideUpScale_1s_ease-in-out]"
                >
                    <h1
                        className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
                        data-en="Your Farming Partner – One Stop Solution to Buy/Sell Your Crops"
                        data-ta="உங்கள் விவசாய துணை – பயிர்களை வாங்க/விற்க ஒரே இட தீர்வு"
                    >
                        Your Farming Partner – One Stop Solution to Buy/Sell Your Crops
                    </h1>

                    <p
                        className="text-lg md:text-xl mb-10 max-w-2xl mx-auto md:mx-0"
                        data-en="FarmDay is your smart, quick, and convenient solution for farmers and buyers. Download the app now and join thousands already making better deals!"
                        data-ta="விவசாயிகள் மற்றும் வாங்குபவர்களுக்கான FarmDay என்பது புத்திசாலி, விரைவு மற்றும் வசதியான தீர்வாகும். ஆப்பை இப்போது பதிவிறக்கம் செய்து, ஏற்கனவே சிறந்த ஒப்பந்தங்களை உருவாக்கும் ஆயிரக்கணக்கானவர்களில் சேருங்கள்!"
                    >
                        FarmDay is your smart, quick, and convenient solution for farmers and buyers.
                        Download the app now and join thousands already making better deals!
                    </p>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() =>
                                window.open("https://play.google.com/store/search?q=farmday&c=apps", "_blank")
                            }
                            className="download-button"
                            data-en="Download the App"
                            data-ta="ஆப்பை பதிவிறக்குங்கள்"
                        >
                            Download the App
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div
                    ref={imageSectionRef}
                    className="flex-1 mt-16 md:mt-16 text-center md:text-right animate-[fadeSlideUpScale_1s_ease-in-out]"
                >
                    <img
                        src={homeimg}
                        alt="FarmDay App Screenshot"
                        className="max-w-full rounded-lg inline-block"
                    />
                </div>
            </div>
        </section>
    );
};

export default Home;
