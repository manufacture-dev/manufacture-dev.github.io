# ADR 0001 — Vendor du thème terracotta dans le repo

- **Date** : 2026-05-06
- **Statut** : Accepté

---

## Contexte

Le site actuel utilise le thème Hugo `terracotta` référencé comme submodule git via SSH
(`git@github.com:…`). Cette configuration pose deux problèmes bloquants :

1. **CI bloquée** : le clone SSH échoue dans les environnements CI/CD sans clé SSH
   configurée (GitHub Actions, Netlify, etc.), rendant les builds automatiques fragiles.
2. **Thème à réécrire** : le thème terracotta est conçu pour du e-commerce ; la refonte
   vise un site de services B2B, ce qui nécessite une réécriture quasi-complète du thème.
   Maintenir un lien vers l'upstream n'a donc pas de valeur.

## Décision

- Copier le contenu de `themes/terracotta` dans `themes/manufacture` directement dans le repo.
- Supprimer le fichier `.gitmodules` et la référence au submodule.
- Le thème `manufacture` devient un thème first-party, versionné dans ce repo.

## Conséquences

**Positives :**
- Build CI reproductible sans clé SSH ni submodule.
- Liberté totale de modifier le thème sans contrainte de compatibilité upstream.
- Un seul dépôt à gérer, historique unifié.

**Négatives :**
- Aucune mise à jour automatique depuis le thème terracotta (non souhaitée de toute façon).
- Légère augmentation de la taille du repo (assets du thème copiés).

## Référence

- Phase d'implémentation : **Phase 2** (vendor du thème)
- Branche cible : `redesign`
