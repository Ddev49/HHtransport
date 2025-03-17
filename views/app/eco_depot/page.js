"use client";
import React from "react";
import { useRouter } from "next/navigation";

const EngagementPage = () => {
  const router = useRouter();
  const handleContactClick = () => {
    router.push("/contact");
  };

    return (
        <div className="admin-gestions-container engagement">
            {/* 🏡 Section Intro */}
            <section className="admin-gestions-section">
                <h1 className="admin-title ">Notre Engagement : Environnement & Solidarité</h1>
                <p>
                    Chez <strong>H&H Transports</strong>, nous croyons qu’un déménagement peut être bien plus 
                    qu’un simple transport de biens. C’est aussi une opportunité de <strong>réduire notre impact 
                    écologique</strong> et de <strong>venir en aide aux personnes dans le besoin</strong>. 
                </p>
            </section>

            {/* 🌱 Section Écologique */}
            <section className="admin-gestions-section">
                <h2 className="admin-title ">Un déménagement respectueux de l’environnement</h2>
                <p>
                    Nous nous engageons à réduire l’empreinte écologique de nos activités grâce à des solutions 
                    durables et responsables. Nos actions :
                </p>
                <ul>
                    <li> Recyclage des matériaux d’emballage et optimisation des trajets pour limiter les émissions de CO₂.</li>
                    <li> Utilisation de cartons recyclés et réutilisables pour un déménagement plus écologique.</li>
                    <li> Modernisation de notre flotte de véhicules pour favoriser des modes de transport plus respectueux de l’environnement.</li>
                </ul>
            </section>

            {/* ❤️ Section Humanitaire */}
            <section className="admin-gestions-section">
                <h2 className="admin-title "> Donner une seconde vie à vos objets</h2>
                <p>
                    Beaucoup d’objets que nous récupérons lors de nos interventions pourraient encore être utiles. 
                    Plutôt que de les jeter, nous leur donnons une seconde vie en les redistribuant à ceux qui en ont besoin.
                </p>
                <p>
                    Nous collaborons avec plusieurs associations humanitaires pour offrir une nouvelle chance 
                    aux meubles, vêtements et électroménagers encore en bon état. Ces objets sont donnés à des 
                    familles en difficulté, des réfugiés ou des personnes en situation de précarité.
                </p>
            </section>

            {/* 🎯 Pourquoi nous choisir */}
            <section className="admin-gestions-section">
                <h2 className="admin-title "> Pourquoi choisir H&H Transports ?</h2>
                <div className="why-choose-grid">
                    <div className="why-item">
                        <h3>Un impact positif sur l’environnement</h3>
                        <p>Nous limitons le gaspillage et encourageons des solutions de déménagement responsables.</p>
                    </div>
                    <div className="why-item">
                        <h3>Un soutien aux plus démunis</h3>
                        <p>Vos anciens meubles et objets trouvent une seconde vie grâce à nos associations partenaires.</p>
                    </div>
                    <div className="why-item">
                        <h3>Une gestion professionnelle</h3>
                        <p>Nous récupérons, triions et redistribuons vos biens dans une logique éthique et durable.</p>
                    </div>
                </div>
            </section>

            {/* 📞 Call to Action */}
            <section className="admin-gestions-section">
                <h2 className="admin-title ">Transformez votre déménagement en un acte solidaire</h2>
                <p>
                    Vous souhaitez vous débarrasser d’anciens meubles ou objets tout en aidant les autres ?
                    Contactez-nous dès aujourd’hui et participez à notre engagement écologique et solidaire.
                </p>
                <button
            className="admin-gestions-submit-btn width"
            onClick={handleContactClick}
          >
            Contactez-nous
          </button>
            </section>
        </div>
    );
};

export default EngagementPage;
