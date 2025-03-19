export function getAdminMetadata(page) {
    const metadataConfig = {
    nodefini: {
        title: "Administrateur - H&H Transport",
        description: "Gérez votre espace administrateur sur H&H Transport.",
        robots: "noindex, nofollow",
        }
    };
    return metadataConfig[page] || metadataConfig.nodefini;
  }
  