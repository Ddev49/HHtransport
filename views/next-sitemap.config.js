module.exports = {
    siteUrl: 'https://h-htransport.com',  // Ton domaine
    generateRobotsTxt: true,  // Génère un fichier robots.txt
    exclude: [
      '/admin/*',      // Exclure toutes les pages sous /admin/
      '/admin',
      '/login',        // Exclure la page /login
      '/404',          // Exclure la page 404
      '/private/*',    // Exemple : Exclure d'autres pages spécifiques si nécessaire
    ],
  };
  