# ADR 0004 — Backend du formulaire de contact

- **Date** : 2026-05-06
- **Statut** : En attente de décision

---

## Contexte

Le site actuel utilise `staticforms.xyz` comme backend pour le formulaire de contact.
Ce service présente des incertitudes quant à sa pérennité, sa conformité RGPD, et sa
fiabilité à long terme. La refonte est l'occasion de choisir un service plus robuste.

Le formulaire de contact est la seule fonctionnalité dynamique du site (Hugo est
100% statique). Le backend doit :

- Recevoir les soumissions HTTP POST
- Envoyer un e-mail de notification
- Être compatible RGPD (données hébergées en UE ou sous accord DPA)
- Ne pas nécessiter de backend custom

## Options

### Option A — Formspree

- Service spécialisé formulaires statiques, très répandu.
- Offre gratuite : 50 soumissions/mois.
- RGPD : DPA disponible sur les plans payants.
- Intégration : `<form action="https://formspree.io/f/XXXX">`.

### Option B — Web3Forms

- Service plus récent, offre gratuite généreuse (250 soumissions/mois).
- Données traitées hors UE par défaut (à vérifier).
- Intégration similaire à Formspree.

### Option C — Conserver staticforms.xyz

- Aucune migration nécessaire.
- Incertitude sur la pérennité et la conformité RGPD.
- Non recommandé pour une refonte long terme.

## Critères de décision

| Critère                  | Formspree | Web3Forms | staticforms.xyz |
|--------------------------|-----------|-----------|-----------------|
| RGPD / DPA disponible    | Oui (payant) | À vérifier | Inconnu       |
| Offre gratuite           | 50/mois   | 250/mois  | Oui             |
| Pérennité                | Bonne     | Correcte  | Inconnue        |
| Facilité d'intégration   | ✓         | ✓         | ✓               |

## Impact

La décision impacte uniquement le `action` du formulaire HTML et éventuellement
un champ caché (`_next`, `access_key`, etc.) selon le service retenu.

## Décision

> ⏳ **À décider avant le démarrage de la Phase 5.**

## Référence

- Phase d'implémentation : **Phase 5** (contenu et formulaires)
- Branche cible : `redesign`
