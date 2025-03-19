import "./css/accueil.css";

import ImageText from "@/components/accueil/ImageText";
import CitationText from "@/components/accueil/CitationText";  
import PartenaireSection from "@/components/accueil/Partenaire";  
import TestimonialsSlider from "@/components/accueil/TestimonialsSlider";

const HomePage = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>Bienvenue chez H&H Transports</h1>
                    <p>Votre partenaire de confiance pour un déménagement sans stress et une livraison sécurisée.</p>
                    <a href="/contact" className="btn">Demander un devis</a>
                </div>
            </section>
            <CitationText/>
            <ImageText/>
            <PartenaireSection/>
            <TestimonialsSlider/>
            
        </>
    );
};

export default HomePage;
