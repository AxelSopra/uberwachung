# Documentation des composants React

Ce projet utilise une architecture modulaire avec des composants réutilisables pour garantir la clarté, la maintenabilité et la facilité d’évolution.

## PauseLight
Affiche le feu tricolore selon l’état des pauses.

**Utilisation :**
```jsx
<PauseLight color="green" />
```
**Props :**
- `color` (string, requis) : "green", "orange" ou "red".

## UserPause
Affiche l’encart de la pause de l’utilisateur en cours, avec le nom anonyme et le temps restant.

**Utilisation :**
```jsx
<UserPause name="Aigle bleu" remaining={12} />
```
**Props :**
- `name` (string, requis) : nom anonyme de l’utilisateur.
- `remaining` (number, requis) : minutes restantes à la pause.

## PauseList
Affiche la liste des pauses en cours, avec le nom anonyme et le temps restant pour chaque pause.

**Utilisation :**
```jsx
<PauseList pauses={pauses} />
```
**Props :**
- `pauses` (array, requis) : tableau d’objets pause `{ id, name, uid, startTime }`.

## Bonnes pratiques
- Centraliser la logique métier dans des hooks ou fonctions utilitaires.
- Utiliser des composants pour chaque élément visuel ou fonctionnel réutilisable.
- Typage des props avec PropTypes pour la robustesse.
- Styles dans des fichiers CSS dédiés.
- Orchestration dans App.jsx, sans logique complexe dans le rendu.

## Extension
Pour ajouter des fonctionnalités (ex : animation, notifications, personnalisation visuelle), créez de nouveaux composants ou étendez ceux existants en respectant la structure et les conventions ci-dessus.

---

Pour toute question ou évolution, suivez la structure proposée pour garantir la qualité et la maintenabilité du code.

