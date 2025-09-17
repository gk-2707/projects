import React, { useState } from 'react';
import '../styles/blog.css';

import blog from '../assets/Kadhali_Price_Difference_poster.png';
import blog1 from '../assets/Annur Red Banana Price Variance.png';
import blog2 from '../assets/Udumalpet_Nendhiran_Banana_Price Difference.png';
import blog4 from '../assets/Farmday Rasthali Correct Price.png';
import blog5 from '../assets/Sathy_Mondhan_Banana_Price Difference.png';

const blogData = [
    {
        title_en: 'Kadhali Price Difference',
        title_ta: 'கதலி விலை வேறுபாடு',
        image: blog,
        link: 'link1.html',
    },
    {
        title_en: 'Annur Red Banana Price Variance',
        title_ta: 'அண்ணூர் சிவப்பு வாழை விலை மாறுபாடு',
        image: blog1,
        link: 'link2.html',
    },
    {
        title_en: 'Udumalpet Nendhiran Banana Price Difference',
        title_ta: 'உடுமலைபேட்டை நெந்திரன் வாழை விலை வேறுபாடு',
        image: blog2,
        link: 'link3.html',
    },
    {
        title_en: 'Sathy Mondhan Banana Price Difference',
        title_ta: 'சத்தியமங்கலம் மொண்டான் வாழை விலை வேறுபாடு',
        image: blog5,
        link: 'link4.html',
    },
    {
        title_en: 'Farmday Rasthali Correct Price',
        title_ta: 'Farmday ரஸ்தலி சரியான விலை',
        image: blog4,
        link: 'link5.html',
    },
    {
        title_en: 'Release Notes - Farmday App',
        title_ta: 'வெளியீட்டு குறிப்புகள் - Farmday செயலி',
        image: blog4,
        link: 'link6.html',
    },
];

const Blogs = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSlide = (direction) => {
        const total = blogData.length;
        setCurrentSlide((prev) => (prev + direction + total) % total);
    };

    return (
        <section id="blogs" className="blogs">
            <h2 data-en="Blogs" data-ta="வலைப்பதிவுகள்">Blogs</h2>

            <div className="slider">
                <div
                    className="blog-slider-container"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {blogData.map((blog, index) => (
                        <div className="blog-card" key={index}>
                            <h3
                                data-en={blog.title_en}
                                data-ta={blog.title_ta}
                            >
                                {blog.title_en}
                            </h3>
                            <a href={blog.link} target="_blank" rel="noreferrer">
                                <img src={blog.image} alt={`Blog ${index + 1}`} />
                            </a>
                        </div>
                    ))}
                </div>

                <button className="prev" onClick={() => handleSlide(-1)}>&#10094;</button>
                <button className="next" onClick={() => handleSlide(1)}>&#10095;</button>
            </div>
        </section>
    );
};

export default Blogs;
