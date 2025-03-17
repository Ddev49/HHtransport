export function getAdminMetadata(page) {
    const metadataConfig = {
    nodefini: {
        title: "Administrateur - H&H Transport",
        description: "Gérez votre espace administrateur sur H&H Transport.",
        robots: "noindex, nofollow",
        },
    // adminHome: {
    //     title: "Tableau de Bord - H&H Transport",
    //     description: "Gérez votre espace administrateur sur H&H Transport.",
    //     robots: "noindex, nofollow",
    //     },
    // profil: {
    //     title: "Profil Administrateur - H&H Transport",
    //     description: "Gérez votre profil administrateur et vos informations personnelles.",
    //     robots: "noindex, nofollow",
    //     },
    // resetPassword: {
    //     title: "Réinitialisation du mot de passe - H&H Transport",
    //     description: "Réinitialisez votre mot de passe administrateur en toute sécurité.",
    //     robots: "noindex, nofollow",
    //     },
    //   blogs: {
    //     title: "Gestion des blogs - H&H Transport",
    //     description: "Gérez les articles de blog sur H&H Transport.",
    //     robots: "noindex, nofollow",
    //   },
    //   createBlog: {
    //     title: "Création d'un blog - H&H Transport",
    //     description: "Ajoutez un nouvel article de blog.",
    //     robots: "noindex, nofollow",
    //   },
    //   editBlog: {
    //     title: "Modification d'un blog - H&H Transport",
    //     description: "Modifiez un article de blog existant.",
    //     robots: "noindex, nofollow",
    //   },
    //   options: {
    //     title: "Gestion des Options - H&H Transport",
    //     description: "Personnalisez les options administratives.",
    //     robots: "noindex, nofollow",
    //   },
    //   newPassword: {
    //     title: "Réinitialisation du mot de passe - H&H Transport",
    //     description: "Changez votre mot de passe administrateur.",
    //     robots: "noindex, nofollow",
    //   },
    };
  
    return metadataConfig[page] || metadataConfig.nodefini;
  }
  