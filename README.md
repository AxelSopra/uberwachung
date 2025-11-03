# Uberwachung – Documentation

## Structure du projet

```
src/
  components/
    UserProfileForm.jsx      # Formulaire de choix du nom et avatar utilisateur
    PauseLight.jsx           # Affichage du feu de pause
    UserPause.jsx            # Affichage de la pause utilisateur
    PauseList.jsx            # Liste des pauses en cours
  hooks/
    usePauses.js             # Hook personnalisé pour la gestion des pauses
  utils/
    constants.js             # Constantes et fonctions utilitaires
  App.jsx                    # Composant principal
  firebase.js                # Configuration Firebase
  main.jsx                   # Point d'entrée React
  App.css                    # Styles principaux
public/
  favicon.svg                # Icône de l'application
index.html                   # Fichier HTML principal
vite.config.mjs              # Configuration Vite
```

## Fonctionnement

- **Identification utilisateur** : Générée et stockée dans le navigateur (`localStorage`). Persistante et anonyme.
- **Profil utilisateur** : L'utilisateur choisit un nom et un avatar (émoticône) via le formulaire en haut de l'application. Ces choix sont sauvegardés localement.
- **Gestion des pauses** : Un utilisateur ne peut prendre qu'une pause par demi-journée (paramétrable). Les pauses sont stockées dans Firestore et affichées en temps réel.
- **Affichage** : Le feu de pause change de couleur selon le nombre de pauses en cours. La liste des pauses affiche le nom et l'avatar de chaque utilisateur.

## Points d’extension

- **Ajouter des avatars** : Modifier la liste `AVATAR_LIST` dans `src/utils/constants.js`.
- **Changer la limite de pauses** : Modifier `MAX_PAUSES_PER_HALF_DAY` dans `constants.js`.
- **Modifier les plages horaires** : Adapter `HALF_DAY_PERIODS` dans `constants.js`.
- **Personnaliser le style** : Modifier `App.css` ou les fichiers CSS des composants.

## Bonnes pratiques

- Les composants sont réutilisables et isolés.
- La logique métier est dans des hooks personnalisés.
- Les constantes et utilitaires sont centralisés.
- Les imports sont relatifs et organisés par type.

## Démarrage

1. Installer les dépendances : `npm install`
2. Lancer le projet : `npm run dev`
3. Accéder à l’application via `http://localhost:5173` (par défaut)

---

Pour toute extension ou modification, suivez la structure proposée pour garantir la maintenabilité et la clarté du code.

