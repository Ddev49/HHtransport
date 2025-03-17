"use client";
import Image from "next/image";
const ServicesSection = () => {
    return (
        <>
        <section className="services-container">
            {/* Service Déménagement */}
            <div className="service-card">
                <div className="service-image">
                    <Image src="/images/demenagement.webp" alt="Déménagement rapide" layout="responsive" width={800} height={600}  priority/>
                </div>
                <div className="service-text-image">
                    <h3>Déménagement rapide ss et efficace</h3>
                    <p>
                        Nous vous proposons un service clé en main, adapté aux besoins
                        des particuliers et des professionnels. De l’emballage au
                        transport, nous prenons en charge chaque étape avec rigueur et
                        efficacité, garantissant un déménagement fluide, sécurisé et
                        sans contraintes.
                    </p>
                </div>
            </div>

            {/* Service Livraison */}
            <div className="service-card">
                <div className="service-image">
                    <Image src="/images/livraison.webp" alt="Déménagement rapide" layout="responsive" width={800} height={600} priority/>
                </div>
                <div className="service-text-image">
                    <h3>Livraison de marchandises sécurisée</h3>
                    <p>
                        Nous assurons le transport fiable et sécurisé de vos biens,
                        quelle que soit leur nature. Grâce à une flotte de véhicules
                        adaptés, nous garantissons une prise en charge efficace, un
                        suivi rigoureux et une livraison dans les meilleurs délais, en
                        toute sérénité.
                    </p>
                </div>
            </div>

            {/* Service Débarras */}
            <div className="service-card">
                <div className="service-image">
                    <Image src="/images/debaras.webp" alt="Déménagement rapide" layout="responsive" width={800} height={600}  priority/>
                </div>
                <div className="service-text-image">
                    <h3>Débarras et recyclage responsable</h3>
                    <p>
                        Nous vous accompagnons dans le tri, l’évacuation et le recyclage
                        de vos encombrants en toute simplicité. Grâce à une gestion
                        respectueuse de l’environnement, nous assurons une mise en
                        décharge responsable, un recyclage efficace et une valorisation
                        des matériaux pour réduire l’impact écologique
                    </p>
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

export default ServicesSection;
