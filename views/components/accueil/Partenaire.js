"use client";
import Image from "next/image";
const PartenaireSection = () => {
    return (
        <>
        <section className="partners">
    <h3>Nos Partenaires</h3>
    <p>Nous sommes fiers de collaborer avec des partenaires de confiance qui partagent nos valeurs et notre engagement envers la qualité. Découvrez nos partenaires ci-dessous.</p>
    <div className="partners-logos">
        <div className="partner-item">
            <Image src="/mairie.webp" alt="Mairie d'Angers" className="partner-logo"/>
            <div className="partner-text">Mairie d'Angers</div>
        </div>
        <div className="partner-item">
            <Image src="/aldev.webp" alt="Aldev Angers" className="partner-logo"/>
            <div className="partner-text">Aldev Angers</div>
        </div>
        <div className="partner-item">
            <Image src="/niah.webp" alt="Niah Humanity" className="partner-logo"/>
            <div className="partner-text">Niah Humanity</div>
        </div>
    </div>
</section>

        <section className="contact">
        <h2>Besoin d’un devis ?</h2>
        <p>
          Nos experts sont à votre écoute pour vous proposer la meilleure
          solution.
        </p>
        <a href="/contact" className="btn">Nous Contacter</a>
      </section>
      </>
    );
};

export default PartenaireSection;
