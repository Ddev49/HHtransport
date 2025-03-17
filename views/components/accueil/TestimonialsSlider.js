"use client";

import React, { useState, useEffect } from "react";

const testimonials = [
    { text: "Service de déménagement exceptionnel ! L’équipe était ponctuelle et très professionnelle.", author: "Sophie L." },
    { text: "Un transport rapide et efficace, je recommande H&H Transports sans hésitation.", author: "Marc D." },
    { text: "Des professionnels à l’écoute et un service irréprochable. Merci H&H Transports !", author: "Clara M." }
];

const TestimonialsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // Début de l'effet fondu (disparition)
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
                setFade(true); // Apparition du nouveau témoignage
            }, 500);
        }, 5000); // Changement automatique toutes les 5s

        return () => clearInterval(interval); // Nettoyage de l’intervalle
    }, []);

    return (
        <div className="testimonials-fond">
        <section className="testimonials">
            <h2>Ils nous ont fait confiance</h2>
            <div className={`testimonial-content ${fade ? "fade-in" : "fade-out"}`}>
                <p>"{testimonials[currentIndex].text}"</p>
                <span>- {testimonials[currentIndex].author}</span>
            </div>
            <div className="slider-dots">
                {testimonials.map((_, index) => (
                    <button aria-label="testimonial"
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </section>
        </div>
    );
};

export default TestimonialsSlider;
