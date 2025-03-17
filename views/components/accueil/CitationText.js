"use client";

import React, { useState } from "react";

const CitationText = () => {
    const [openService, setOpenService] = useState(null);

    const toggleService = (index) => {
        setOpenService(openService === index ? null : index);
    };

    return (
        <div className="home-sections">
            {/* 📜 Citation avec fond vert foncé */}
            <div className="home-quote">
                    <blockquote>
                        "Chez H&H Transports, nous savons que déménager est bien plus qu’un
                        simple transport de biens, c’est une nouvelle étape de vie. C’est
                        pourquoi nous mettons tout en œuvre pour assurer un déménagement
                        fluide, rapide et sécurisé, en vous accompagnant avec
                        professionnalisme et sérénité"
                    </blockquote>
                    <p className="quote-author">- Équipe H&H Transports</p>
            </div>

            {/* 📂 Services avec effet fondu */}
            <div className="home-services">
                <h2>Nos Services</h2>

                <div className="services-grid">
                    <div className="service-item">
                        <button aria-label="info" className="service-btn" onClick={() => toggleService(1)}>
                        Un savoir-faire de qualité
                        </button>
                        <div className={`service-text ${openService === 1 ? "fade-in" : "fade-out"}`}>
                            <p>
                            Avec plus de 3 ans d'expérience dans le déménagement et le
                  transport, nous garantissons un service professionnel et
                  efficace. Nos équipes sont formées pour assurer un
                  déménagement fluide et sans stress, quelle que soit la taille
                  de votre projet.
                            </p>
                        </div>
                    </div>

                    <div className="service-item">
                        <button aria-label="info" className="service-btn" onClick={() => toggleService(2)}>
                        La sécurité avant tout
                        </button>
                        <div className={`service-text ${openService === 2 ? "fade-in" : "fade-out"}`}>
                            <p>
                            Nous utilisons du matériel professionnel pour garantir la
                  sécurité de vos biens et de nos équipes. Chaque membre est
                  formé aux techniques de manutention et nous disposons
                  d’équipements adaptés aux charges lourdes et objets fragiles.
                            </p>
                        </div>
                    </div>

                    <div className="service-item">
                        <button aria-label="info" className="service-btn" onClick={() => toggleService(3)}>
                        Un service respectueux de votre budget
                        </button>
                        <div className={`service-text ${openService === 3 ? "fade-in" : "fade-out"}`}>
                            <p>
                            Nos offres sont conçues pour être accessibles à tous. Nous
                  proposons des formules adaptées à vos besoins et notre
                  tarification est en moyenne 23% inférieure à celle de nos
                  concurrents, tout en garantissant un service de qualité.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitationText;
