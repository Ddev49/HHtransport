export const metadataBase = new URL("https://h-htransports.com");
const defaultImage = `${metadataBase}/images/default.webp`;

export function getPageMetadata(page, params = {}) {
  const metadataConfig = {
    home: {
      title: "H&H Transport - Déménagement & Livraison Écologique",
      description: "H&H Transport vous accompagne dans vos déménagements et livraisons avec un service respectueux de l’environnement.",
      robots: "index, follow",
      openGraph: {
        title: "H&H Transport - Déménagement Écologique & Solidaire",
        description: "Nous facilitons votre déménagement tout en soutenant des actions solidaires grâce au recyclage de meubles et objets.",
        url: metadataBase.href,
        siteName: "H&H Transport",
        images: [defaultImage],//`${metadataBase}/images/og-image.jpg`,
        locale: "fr_FR",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "H&H Transport - Déménagement & Livraison Écologique",
        description: "Optez pour un déménagement rapide, sécurisé et écologique avec H&H Transport.",
        site: "@HHTransport",
        images: [defaultImage],//`${metadataBase}/images/twitter-image.jpg`,
      },
      canonical: metadataBase.href,
    },
    contact: {
      title: "Contactez-nous - H&H Transport",
      description: "Besoin d'un devis ou d'informations sur nos services de déménagement et livraison ? Contactez-nous dès maintenant.",
      robots: "index, follow",
      openGraph: {
        title: "Contactez-nous - H&H Transport",
        description: "Nous sommes à votre écoute pour toute demande d'informations ou de devis.",
        locale: "fr_FR",
        type: "website",
        url: `${metadataBase}/contact`,
        images: [defaultImage], //`${metadataBase}/images/contact.jpg`, 
      },
      twitter: {
        card: "summary_large_image",
        title: "Contactez-nous - H&H Transport",
        description: "Demandez un devis pour votre déménagement ou livraison dès aujourd'hui.",
        images: [defaultImage], //`${metadataBase}/images/contact.jpg`,
      },
      canonical: `${metadataBase}/contact`,
    },
    formules: {
      title: "Nos Formules de Déménagement - H&H Transport",
      description: "Découvrez nos différentes formules de déménagement adaptées à vos besoins et à votre budget.",
      robots: "index, follow",
      openGraph: {
        title: "Nos Formules de Déménagement - H&H Transport",
        description: "Choisissez la formule qui vous convient : économique, standard ou premium.",
        locale: "fr_FR",
        type: "website",
        url: `${metadataBase}/formules`,
        images: [defaultImage], //`${metadataBase}/images/formules.jpg`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Nos Formules de Déménagement - H&H Transport",
        description: "Comparez nos offres et choisissez la formule adaptée à votre déménagement.",
        images: [defaultImage],//`${metadataBase}/images/formules.jpg`,
      },
      canonical: `${metadataBase}/formules`,
    },
    eco_depot: {
      title: "Éco Dépôt - H&H Transport",
      description: "Donnez une seconde vie à vos meubles et objets avec notre service de recyclage et redistribution solidaire.",
      robots: "index, follow",
      openGraph: {
        title: "Éco Dépôt - H&H Transport",
        description: "Nous récupérons vos objets et meubles inutilisés pour les redistribuer aux associations.",
        locale: "fr_FR",
        type: "website",
        url: `${metadataBase}/eco_depot`,
        images: [defaultImage], //`${metadataBase}/images/eco-depot.jpg`, 
      },
      twitter: {
        card: "summary_large_image",
        title: "Éco Dépôt - H&H Transport",
        description: "Recyclez et donnez une seconde vie à vos meubles avec notre service écologique.",
        images: [defaultImage], //`${metadataBase}/images/eco-depot.jpg`,
      },
      canonical: `${metadataBase}/eco_depot`,
    },
    HHTransport: {
      title: "Qui sommes-nous ? - H&H Transport",
      description: "Découvrez notre engagement pour un transport responsable et solidaire.",
      robots: "index, follow",
      openGraph: {
        title: "Qui sommes-nous ? - H&H Transport",
        description: "En savoir plus sur notre mission et nos valeurs écoresponsables.",
        locale: "fr_FR",
        type: "website",
        url: `${metadataBase}/HHtransport`,
        images: [defaultImage], //`${metadataBase}/images/qui-sommes-nous.jpg`, 
      },
      twitter: {
        card: "summary_large_image",
        title: "Qui sommes-nous ? - H&H Transport",
        description: "Découvrez notre mission et nos engagements pour un transport plus responsable.",
        images: [defaultImage], //`${metadataBase}/images/qui-sommes-nous.jpg`,
      },
      canonical:  `${metadataBase}/HHtransport`,
    },
    blogs: {
      title: "Nos Articles de Blog - H&H Transport",
      description: "Retrouvez nos conseils et astuces pour un déménagement réussi et des pratiques écologiques.",
      robots: "index, follow",
      openGraph: {
        title: "Nos Articles de Blog - H&H Transport",
        description: "Conseils et astuces sur le déménagement, le transport et l’écologie.",
        type: "website",
        locale: "fr_FR",
        url: `${metadataBase}/blogs`,
        images: [defaultImage], // `${metadataBase}/images/blogs.jpg`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Nos Articles de Blog - H&H Transport",
        description: "Découvrez nos articles sur le transport, l'écologie et le déménagement.",
        images: [defaultImage], //`${metadataBase}/images/blogs.jpg`,
      },
      canonical:  `${metadataBase}/blogs`,
    },
    login: {
      title: "Connexion Administrateur - H&H Transport",
      description: "Accès réservé aux administrateurs pour la gestion du site.",
      robots: "noindex, nofollow", // 🔴 Exclusion des moteurs de recherche
    },
    notFound: {
      title: "Page non trouvée - H&H Transport",
      description: "La page que vous cherchez n'existe pas ou a été déplacée.",
      robots: "noindex, nofollow",
      openGraph: {
        title: "Page non trouvée - H&H Transport",
        description: "Nous ne trouvons pas la page demandée.",
        locale: "fr_FR",
        type: "website",
        url: `${metadataBase}/404`,
        images: [ defaultImage], //`${metadataBase}/images/not-found.jpg`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Page non trouvée - H&H Transport",
        description: "Nous ne trouvons pas la page demandée.",
        images: [defaultImage],//`${metadataBase}/images/not-found.jpg`,
      },
    },
  };

  // 🔹 Gestion des pages dynamiques `formules/[id]`
  if (page === "formules" && params.id) {
    return {
      title: `Formule ${params.id} - H&H Transport`,
      description: `Découvrez notre formule ${params.id} adaptée à votre déménagement.`,
      robots: "index, follow",
      openGraph: {
        title: `Formule ${params.id} - H&H Transport`,
        description: `Informations sur la formule ${params.id} pour votre déménagement.`,
        locale: "fr_FR",
        type: "website",
        url: `${metadataBase}/formules/${params.id}`,
        images: [defaultImage],//`${metadataBase}/images/formules/${params.id}.jpg`, 
      },
    };
  }

  // 🔹 Gestion des pages dynamiques `blogs/[id]`
  if (page === "blogs" && params.id) {
    return {
      title: `Article ${params.id} - H&H Transport`,
      description: `Découvrez notre article : ${params.id}.`,
      robots: "index, follow",
      openGraph: {
        title: `Article ${params.id} - H&H Transport`,
        description: `Lisez notre article : ${params.id}.`,
        locale: "fr_FR",
        type: "website",
        url: `${metadataBase}/blogs/${params.id}`,
        images: [ defaultImage], //`${metadataBase}/images/blogs/${params.id}.jpg`,
      },
    };
  }

  return metadataConfig[page] || metadataConfig.home;
}
