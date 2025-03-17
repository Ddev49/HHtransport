"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import axios from "axios";

const formules = {
    eco: {
      title: "Formule Économique",
      description: "Un service essentiel pour un déménagement à moindre coût.",
      intro: "Parfaite pour les petits budgets, cette formule vous permet de gérer l'emballage et le déballage, tandis que nous nous occupons du transport et de la manutention.",
      services: [
        "Transport sécurisé de vos biens",
        "Chargement et déchargement par nos équipes",
        "Tarif réduit pour un service efficace",
        "Assistance pour optimiser l’organisation du chargement"
      ],
      idealFor: "Idéale pour les étudiants, les petits appartements et les personnes souhaitant un déménagement économique.",
      additionalInfo: "Si vous êtes à l’aise avec la logistique et l’organisation, cette option est la plus rentable tout en bénéficiant d’une aide professionnelle pour le transport."
    },
    standard: {
      title: "Formule Standard",
      description: "Un équilibre parfait entre autonomie et assistance.",
      intro: "Une solution intermédiaire qui combine efficacité et simplicité. Nous nous occupons du transport et du démontage/remontage des meubles, tandis que vous emballez vos affaires.",
      services: [
        "Transport, chargement et déchargement inclus",
        "Démontage et remontage des meubles",
        "Assistance pour le placement des meubles dans le nouveau logement",
        "Protection des objets fragiles"
      ],
      idealFor: "Idéale pour les familles, les couples ou toute personne souhaitant un déménagement avec une aide partielle.",
      additionalInfo: "Avec cette formule, vous gardez le contrôle sur l’organisation de vos cartons tout en bénéficiant de notre expertise pour le transport et le mobilier."
    },
    premium: {
      title: "Formule Premium",
      description: "Un déménagement clé en main, sans effort.",
      intro: "Pour ceux qui souhaitent un déménagement haut de gamme, nous nous occupons de tout, de l’emballage au réaménagement dans votre nouveau domicile.",
      services: [
        "Emballage et déballage complet de vos affaires",
        "Protection renforcée des objets fragiles",
        "Transport et installation dans votre nouveau logement",
        "Démontage et remontage des meubles inclus",
        "Assistance personnalisée pour l'agencement"
      ],
      idealFor: "Idéale pour les professionnels ou toutes personnes souhaitant un déménagement sans stress.",
      additionalInfo: "Avec notre équipe à vos côtés, vous pourrez emménager sans lever le petit doigt. Profitez d’un service haut de gamme et d’une transition fluide."
    },
    debaras: {
      title: "Service Débarras Solidaire",
      description: "Faites de la place tout en aidant ceux dans le besoin.",
      intro: "Plutôt que de jeter, nous vous aidons à trier et recycler vos objets inutilisés. Nous collaborons avec des associations humanitaires pour leur donner une seconde vie.",
      services: [
        "Enlèvement rapide et efficace des encombrants",
        "Tri des objets réutilisables et recyclables",
        "Collaboration avec des associations humanitaires",
        "Élimination responsable des déchets"
      ],
      idealFor: "Idéale pour les successions, les déménagements nécessitant un grand tri ou les personnes souhaitant faire un geste écologique et solidaire.",
      additionalInfo: "Grâce à notre engagement solidaire, vos objets inutilisés trouvent une nouvelle utilité auprès des personnes dans le besoin, tout en vous débarrassant efficacement."
    }
  };
  

const FormuleDetail = () => {
    const router = useRouter();
    const { id } = useParams();
    const formule = formules[id];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
    });
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("/api/contact", {
            ...formData,
            subject: `Demande de devis pour ${formule.title}`,
        });
        setResponseMessage(response.data.message);
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            message: "",
        });
        } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire :", error);
        setResponseMessage("Une erreur est survenue lors de l'envoi du message.");
        }
    };

    if (!formule) {
        return (
        <div className="admin-gestions-container not-found">
            <h2 className="pages-title">Formule introuvable</h2>
            <p>La formule demandée n'existe pas.</p>
            <button className="admin-gestions-submit-btn btn-center" onClick={() => router.push("/formules")}>Retour aux formules</button>
        </div>
        );
    }

    return (
        <div className="hh-formule-container">
            {/* Bloc d'information sur la formule */}
            <div className="hh-formule-info">
                <h1>{formule.title}</h1>
                <p className="hh-description">{formule.description}</p>
                <p className="hh-intro">{formule.intro}</p>

                {/* ✅ Liste des services inclus */}
                <h2>Ce que comprend cette formule :</h2>
                <ul className="hh-services-list">
                {formule.services.map((service, index) => (
                    <li key={index}>• {service}</li>
                ))}
                </ul>

                {/* ℹ️ Idéale pour */}
                <h2>Cette formule est idéale pour :</h2>
                <p className="hh-ideal-for">{formule.idealFor}</p>

                {/* 📜 Informations supplémentaires */}
                <p className="hh-additional-info">{formule.additionalInfo}</p>
            </div>


            {/* Formulaire de devis */}
            <div className="hh-formule-form">
                <h2>Demande de devis</h2>
                {responseMessage && <p className="response-message">{responseMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Nom <span className="required">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Saisissez votre nom..." />
                    <label>Mail <span className="required">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Votre adresse e-mail..." />
                    <label>Téléphone <span className="required">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Votre numéro de téléphone..." />
                    <label>Adresse</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Votre adresse (optionnel)..." />
                    <label>Message <span className="required">*</span></label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Votre message ici..."></textarea>
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    );
};

export default FormuleDetail;