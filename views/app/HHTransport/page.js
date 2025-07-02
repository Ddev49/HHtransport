import "../css/hhtransport.css";
import React from "react";
import Image from "next/image";
import { metadataBase, getPageMetadata } from "../metadata";

export async function generateMetadata() {
  return {
    ...getPageMetadata("HHTransport"),
    metadataBase,
  };
}

const QuiSommesNous = () => {
  const inconnu= "/images/inconnu.webp";
  const teamMembers = [
    {
      name: "Hissein Choua Barkai",
      position: "Responsable d'Exploitation",
      photo: null,//"/images/hissein-choua-barkai.jpg"
    },
    {
      name: "Abderahman Hissein",
      position: "Responsable Administrative",
      photo: null,//"/images/abderahman-hissein.jpg"
    },
    {
      name: "Jordan Jamet",
      position: "Responsable Commercial",
      photo: null, //"/images/ahmed-ben-salah.jpg"
    },
    {
      name: "Yassine Faouzi",
      position: "Commercial",
      photo: null, //"/images/ahmed-ben-salah.jpg"
    },
    {
      name: "Kyllian Jamet",
      position: "Démenageur",
      photo:null, //"/images/sophie-martin.jpg.jpg"
    },
    {
      name: "Thomas Grison",
      position: "Démenageur",
      photo: null, //"/images/lucas-nguyen.jpg.jpg"
    },
    {
      name: "Mamadou Toure",
      position: "Démenageur",
      photo: null, //"/images/lucas-nguyen.jpg.jpg"
    },
  ];

  return (
    <div className="hh-about-container">
      <header className="hh-about-header">
        <h1>À propos de H&H Transport</h1>
        <p>
          Votre partenaire de confiance pour un déménagement sans stress et une
          logistique efficace.
        </p>
      </header>

      <section className="hh-about-content">
        <div className="hh-about-mission">
          <h2>Notre mission</h2>
          <p>
            Chez H&H Transport, notre mission est de fournir des services de
            transport et de déménagement fiables, efficaces et adaptés à vos
            besoins. Que vous soyez un particulier ou une entreprise, nous nous
            engageons à assurer la sécurité et l'intégrité de vos biens à chaque
            étape du processus.
          </p>
        </div>

        <div className="hh-about-values">
          <h2>Nos valeurs</h2>
          <ul>
            <li>
              <strong>Professionnalisme :</strong> Une équipe expérimentée et
              qualifiée.
            </li>
            <li>
              <strong>Fiabilité :</strong> Respect des délais et des
              engagements.
            </li>
            <li>
              <strong>Flexibilité :</strong> Des solutions adaptées à chaque
              client.
            </li>
            <li>
              <strong>Service client :</strong> À l'écoute et toujours prêt à
              aider.
            </li>
          </ul>
        </div>

        <div className="hh-about-experience">
          <h2>Notre expertise</h2>
          <p>
            Forts de plusieurs années d'expérience, nous avons accompagné des
            centaines de clients dans leurs projets de déménagement et de
            transport. Notre savoir-faire et notre engagement nous permettent
            d'offrir un service de haute qualité, avec une satisfaction client
            garantie.
          </p>
        </div>

        <div className="hh-about-team">
          <h2>Notre équipe</h2>
          <p>
            Derrière chaque mission réussie se cache une équipe dynamique et
            motivée. Nos experts du transport mettent tout en œuvre pour
            répondre à vos attentes et assurer la meilleure expérience
            possible.
          </p>
          <div className="hh-team-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="hh-team-member">
                <Image src={member.photo || inconnu } alt={member.name} layout="responsive" className="hh-team-photo" width={16} height={9} priority/>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="hh-about-footer">
        <p>
          Contactez-nous dès aujourd'hui et découvrez pourquoi nos clients
          nous font confiance.
        </p>
      </footer>
    </div>
  );
};

export default QuiSommesNous;
