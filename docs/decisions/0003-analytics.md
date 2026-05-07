# ADR 0003 — Solution analytics

- **Date** : 2026-05-06
- **Statut** : En attente de décision

---

## Contexte

Le site actuel utilise Google Tag Manager (GTM) pour charger Google Analytics 4 (GA4).
GTM est bloqué par de nombreux bloqueurs de publicité (uBlock Origin, Brave, etc.),
ce qui fausse les métriques. GTM charge du JavaScript tiers au démarrage, impactant
négativement le score Lighthouse Performance.

De plus, l'utilisation de GA4 via GTM implique le dépôt de cookies analytiques, soumis
au consentement RGPD, ce qui nécessite une bannière de consentement.

## Options

### Option A — Solution cookieless (Plausible ou Umami)

- **Principe** : analytics sans cookie, données agrégées et anonymisées.
- **RGPD** : aucun consentement requis, pas de bannière.
- **Performance** : script léger (~1 Ko), non bloqué par les ad-blockers.
- **Coût** : Plausible ~9 €/mois (SaaS) ou auto-hébergement Umami (gratuit, infra requise).
- **Inconvénient** : moins de données comportementales fines que GA4.

### Option B — Conserver GTM + Klaro pour le consentement

- **Principe** : garder GTM/GA4 existant, ajouter une bannière de consentement avec Klaro.
- **RGPD** : conforme avec consentement explicite.
- **Performance** : GTM retardé après consentement (impact Lighthouse réduit).
- **Inconvénient** : complexité accrue, dépendance à un service Google, UX dégradée par la bannière.

## Impact selon la décision

| Décision | Action en Phase 7                                    |
|----------|------------------------------------------------------|
| Option A | Supprimer GTM du layout, intégrer script Plausible/Umami |
| Option B | Conserver GTM, intégrer Klaro + bannière consentement RGPD |

## Décision

> ⏳ **À décider avant le démarrage de la Phase 7.**

Critères de décision recommandés :
- Volume et granularité des données analytics nécessaires au business.
- Appétence pour l'auto-hébergement (Umami) ou un SaaS tiers (Plausible).
- Priorité donnée à la conformité RGPD sans friction utilisateur.

## Référence

- Phase d'implémentation : **Phase 7** (analytics, cookies, RGPD)
- Branche cible : `redesign`
