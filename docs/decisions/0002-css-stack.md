# ADR 0002 — Stack CSS : Custom Properties + BEM léger

- **Date** : 2026-05-06
- **Statut** : Accepté

---

## Contexte

Le site actuel embarque Bootstrap 4 pour la mise en page et les composants UI. Bootstrap
introduit ~200 Ko de CSS non utilisé, une dépendance npm, et des conventions de classe
utilitaire qui alourdissent le HTML. La refonte vise un Lighthouse ≥ 95 sur toutes les
catégories, ce qui requiert un budget CSS très serré.

Alternatives évaluées :

| Option              | Dépendances | Taille approx. | Adapté au projet |
|---------------------|-------------|----------------|------------------|
| Bootstrap 5         | npm         | ~160 Ko        | Non              |
| Tailwind CSS        | npm + purge | ~10–30 Ko      | Trop verbeux     |
| Custom Properties + BEM | Aucune  | < 20 Ko        | **Oui**          |

Le site comporte environ 12 composants distincts (hero, nav, cards, testimonials, CTA,
footer, formulaire…). Un framework utility-first serait surdimensionné.

## Décision

- Utiliser les **CSS Custom Properties** pour les design tokens (couleurs, typographie,
  espacements, breakpoints).
- Suivre une convention **BEM légère** (Block__Element--Modifier) pour nommer les
  composants, sans générateur automatique.
- Utiliser **Hugo Pipes avec dart-sass intégré** pour compiler les fichiers SCSS.
- **Aucune dépendance npm** : pas de `package.json`, pas de `node_modules`.

## Conséquences

**Positives :**
- Build 100% Hugo Pipes, zéro outil Node requis.
- CSS produit minimal, performant, facilement auditable.
- Design tokens centralisés dans un fichier `_tokens.scss`, modifiables en un endroit.
- Maintenabilité maximale : un développeur junior peut lire et modifier le CSS.

**Négatives :**
- Pas de classes utilitaires prêtes à l'emploi : chaque composant est à écrire.
- Discipline BEM à maintenir manuellement (pas de linter de convention de nommage prévu).

## Référence

- Phase d'implémentation : **Phase 3** (design tokens) et **Phase 4** (composants UI)
- Branche cible : `redesign`
