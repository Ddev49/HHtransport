"use client";

import { useRouter } from "next/navigation";

const formules = [
  {
    id: "eco",
    title: "Formule Économique",
    description: "Un service de base pour un déménagement à moindre coût. Idéale pour ceux qui souhaitent un déménagement économique tout en bénéficiant d’un transport sécurisé et d’une assistance logistique. Vous gérez l’emballage et le déballage de vos biens, et nous nous chargeons du transport avec professionnalisme. Une solution parfaite pour les petits budgets et les déménagements rapides.",

  },
  {
    id: "standard",
    title: "Formule Standard",
    description: "Un équilibre parfait entre service et maîtrise de votre budget. Cette formule vous permet de bénéficier d’un déménagement organisé et fluide, avec une prise en charge partielle par nos équipes. Nous nous occupons du transport et du démontage/remontage de vos meubles, tandis que vous emballez et déballez vos affaires. Un compromis idéal pour un déménagement sans stress et sans coût excessif.",
  },
  {
    id: "premium",
    title: "Formule Premium",
    description: "Un déménagement clé en main, sans le moindre effort. Optez pour un service haut de gamme où nous nous occupons de tout : emballage, transport, démontage, remontage et installation dans votre nouveau logement. Notre équipe veille à la protection de vos biens avec du matériel de qualité et une expertise professionnelle. Parfait pour ceux qui souhaitent un déménagement rapide et serein.",
  },
  {
    id: "debaras",
    title: "Service Débarras Solidaire",
    description: "Libérez votre espace tout en aidant ceux qui en ont besoin. Nous récupérons vos meubles, électroménagers et objets inutilisés pour leur donner une seconde vie. Grâce à notre partenariat avec des associations humanitaires, nous redistribuons les affaires encore en bon état aux personnes en situation de précarité. Une démarche écoresponsable et solidaire pour un déménagement utile et engagé.",
  },
];

const FormulesPage = () => {
  const router = useRouter();

  return (
    <div className="hh-formules-container">
      <h1>Nos Formules de Déménagement & Débarras</h1>
      <p className="hh-intro-text">
        Que vous souhaitiez un déménagement en toute sérénité ou libérer de l’espace 
        tout en contribuant à une cause solidaire, nous avons la formule qui vous correspond.
      </p>

      {/* 📂 Section des formules */}
      <div className="hh-formules-list">
        {formules.map((formule) => (
          <div key={formule.id} className="hh-formule-card">
            <h2>{formule.title}</h2>
            <p>{formule.description}</p>
            <button className="admin-gestions-submit-btn btn-center" onClick={() => router.push(`/formules/${formule.id}`)}>
              En savoir plus
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Section Pourquoi Nous Choisir */}
      <div className="hh-why-choose">
        <h2>Pourquoi choisir H&H Transports ?</h2>
        <div className="hh-why-grid">
          <div className="hh-why-item">
            <h3>Un transport sécurisé</h3>
            <p>Nos équipes qualifiées assurent la sécurité de vos biens, du chargement à la livraison.</p>
          </div>
          <div className="hh-why-item">
            <h3>Des formules adaptées</h3>
            <p>Nous proposons des solutions personnalisées pour chaque budget et chaque besoin.</p>
          </div>
          <div className="hh-why-item">
            <h3>Un engagement solidaire</h3>
            <p>Nous collaborons avec des associations humanitaires pour offrir une seconde vie aux objets dont vous n’avez plus besoin.</p>
          </div>
        </div>
      </div>

      {/* 📞 Call to Action */}
      <div className="hh-cta">
        <h2>Transformez votre déménagement en un acte solidaire</h2>
        <p>Faites appel à notre service de débarras et offrez une nouvelle vie à vos objets. Ensemble, aidons ceux qui en ont besoin.</p>
        <a href="/contact" className="admin-gestions-submit-btn btn-center">Nous contacter</a>
      </div>
    </div>
  );
};

export default FormulesPage;
