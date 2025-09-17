import React from 'react';
import '../styles/features.css'; // Make sure this path is correct

const features = [
    {
        title: 'Real-Time Crop Prices',
        desc: 'Brings real time prices of the crops at farmers fingertips empowering them to sell their crops at the best possible price.',
        img: 'https://i.pinimg.com/originals/cc/e9/16/cce916796b9cfe51157296832d86f635.png',
    },
    {
        title: 'Merchant Directory',
        desc: 'Connect farmers with a wider network of buyers to increase their market reach and potential revenue.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYhjonhVvfZ-N_ClgjKbuGE84NUmTBMilZVWwBGiJ6GC_DMhgp',
    },
    {
        title: 'Marketplace',
        desc: "Explore a comprehensive farming marketplace where you'll find everything from farming equipments, saplings and livestock to harvest.",
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT6_z8MaBiqNynWxC4PwOzazJ4yxqJV59WRjrqrNaNfK2DuQOxv',
    },
];

const Features = () => {
    return (
        <section id="features">
            <h2 className="fade-slide-up">Features</h2>
            <div className="feature-grid">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`feature-card fade-slide-up`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        <img src={feature.img} alt={feature.title} />
                        <h3>{feature.title}</h3>
                        <p>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
