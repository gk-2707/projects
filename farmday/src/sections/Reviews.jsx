import React, { useState, useEffect } from 'react';
import '../styles/reviews.css'; 

const reviews = [
    {
        name_en: "Govind, Gobichettipalayam",
        name_ta: "கோவிந்த், கோபிசெட்டிபாளையம்",
        text_en: "This app has greatly helped me and my dad find the right prices for bananas while being supportive and easily reachable.",
        text_ta: "இந்த பயன்பாடு வாழை விலைகளை அறிந்து எங்களுக்குத் துணையாக இருந்தது.",
    },
    {
        name_en: "Senthil, Anthiyur",
        name_ta: "செந்தில், அத்தியூர்",
        text_en: "This app effectively provides local market prices for agricultural products with an excellent user interface.",
        text_ta: "இந்த பயன்பாடு வியாபார சந்தை விலைகளை திறம்பட வழங்குகிறது.",
    },
    {
        name_en: "Mohan, Udumalpet",
        name_ta: "மோகன், உடுமல்பேட்டை",
        text_en: "Very useful for agriculture community. And also try to include traders and their requirements.",
        text_ta: "இது விவசாயிகளுக்கு மிகவும் பயனுள்ளதாக உள்ளது. வியாபாரிகளையும் சேர்க்கலாம்.",
    },
    {
        name_en: "Deepak, Coimbatore",
        name_ta: "தீபக், கோயம்புத்தூர்",
        text_en: "Really a positive application for farmers. It's really helpful. Thanks for developing such kind of applications.",
        text_ta: "விவசாயிகளுக்கு இது ஒரு மிகச்சிறந்த பயன்பாடு. நன்றி!",
    },
    {
        name_en: "Riswanth, Trichy",
        name_ta: "ரிஸ்வாந்த், திருச்சி",
        text_en: "This app is a must for every farmer. It is very user friendly and enables farmers to know the current market price accurately.",
        text_ta: "இது ஒவ்வொரு விவசாயிக்கும் அவசியமான பயன்பாடு. மிகவும் எளிதாக பயன்படுத்தலாம்.",
    },
    {
        name_en: "Rajamani, Kalakkadu, Tirunelveli",
        name_ta: "ராஜமணி, களக்காடு, திருநெல்வேலி",
        text_en: "Very easy to use app and must have for farmers.",
        text_ta: "மிக எளிதாக பயன்படுத்தக்கூடிய பயன்பாடு.",
    },
    {
        name_en: "Suganthi, Namakkal",
        name_ta: "சுகந்தி, நாமக்கல்",
        text_en: "Perfect app for farmers. Finally, farmers got a chance to decide the price. I recommend farmers to use it.",
        text_ta: "விலை நிர்ணயத்தில் விவசாயிகளுக்கு உரிமை வழங்கும் சிறந்த பயன்பாடு.",
    },
    {
        name_en: "Keerthi Kumar, Erode",
        name_ta: "கீர்த்தி குமார், ஈரோடு",
        text_en: "Actually, this app does what farmers expect from government.",
        text_ta: "விவசாயிகள் அரசு இடத்தில் எதிர்பார்ப்பதை இது செய்கிறதே!",
    },
];

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 2;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + itemsPerPage) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev - itemsPerPage < 0 ? reviews.length - itemsPerPage : prev - itemsPerPage
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <section id="reviews" className="reviews bg-[#1a1f32] text-white py-20 px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 mb-16 animate-fade-slide-up" data-en="Reviews" data-ta="விமர்சனங்கள்">
                Reviews
            </h2>

            <div className="slider relative max-w-6xl mx-auto flex items-center justify-center">
                <div className="review-slider-container flex flex-wrap justify-center gap-8 transition-transform duration-500 ease-in-out">
                    {visibleReviews.map((review, index) => (
                        <div
                            className="review-card bg-[#86868976] rounded-2xl p-8 text-left w-full md:w-[45%] min-h-[340px] border-4 border-green-500 hover:scale-105 transition-transform duration-300 animate-fade-slide-up"
                            key={index}
                        >
                            <h3 className="text-xl font-semibold text-green-300 mb-4" data-en={review.name_en} data-ta={review.name_ta}>
                                {review.name_en}
                            </h3>
                            <p className="text-lg text-green-100" data-en={review.text_en} data-ta={review.text_ta}>
                                "{review.text_en}"
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    className="slider-btn left-2 md:left-6 text-2xl bg-green-600 hover:bg-green-700 rounded-full w-10 h-10 absolute top-1/2 -translate-y-1/2 text-white"
                    onClick={prevSlide}
                >
                    &#10094;
                </button>
                <button
                    className="slider-btn right-2 md:right-6 text-2xl bg-green-600 hover:bg-green-700 rounded-full w-10 h-10 absolute top-1/2 -translate-y-1/2 text-white"
                    onClick={nextSlide}
                >
                    &#10095;
                </button>
            </div>
        </section>
    );
};

export default Reviews;
