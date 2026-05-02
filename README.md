# GenerateMyCV

GenerateMyCV est un générateur de CV simple, pensé pour créer rapidement un CV propre, lisible et exportable en PDF directement depuis le navigateur.

Le projet propose une page d'accueil, un éditeur complet, une prévisualisation en direct et plusieurs modèles adaptés à différents profils, notamment les étudiants en recherche de stage et les profils avec plus d'expérience.

## Fonctionnalités

- Éditeur de CV avec aperçu en temps réel
- 10 modèles de CV disponibles
- Choix entre profil étudiant et profil expérimenté
- Gestion des informations personnelles, formations, expériences, projets et compétences
- Ajout ou suppression dynamique des sections répétables
- Photo de profil personnalisable
- Sauvegarde automatique dans le navigateur
- Export PDF côté client
- Interface responsive pour ordinateur et mobile
- Code source disponible gratuitement sur GitHub

## Stack technique

- React
- Vite
- CSS classique
- lucide-react
- html2canvas
- jsPDF

## Installation

Clone le projet puis installe les dépendances :

```bash
npm install
```

Lance le serveur de développement :

```bash
npm run dev
```

Par défaut, l'application est accessible sur :

```bash
https://generate-my-cv.netlify.app/
```



## Scripts disponibles

```bash
npm run dev
```

Lance le projet en mode développement.

```bash
npm run build
```

Génère la version de production.

```bash
npm run preview
```

Prévisualise la version de production en local.

```bash
npm run lint
```

Vérifie le code avec ESLint.

## Structure du projet

```txt
src/
  components/
    common/
    landing/
    Builder.jsx
    CVForm.jsx
    CVPreview.jsx
    Footer.jsx
    Header.jsx
  pages/
    EditorPage.jsx
    LandingPage.jsx
  App.jsx
  main.jsx
```

## Export PDF

L'export PDF est généré côté navigateur avec `html2canvas` et `jsPDF`. Aucune donnée n'est envoyée à un serveur pour créer le fichier.

## Auteur

Projet développé par Issa.dev.

- GitHub : [Issa-Mgn](https://github.com/Issa-Mgn)
- Powered by : [L!txx](https://litxxcompany.netlify.app/)
