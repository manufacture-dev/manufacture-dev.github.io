# ADR 0005 — Solution captcha

- **Date** : 2026-05-06
- **Statut** : En attente de décision

---

## Contexte

Le formulaire de contact utilise actuellement reCAPTCHA v2 (Google). Cette solution
présente plusieurs inconvénients :

- **RGPD** : reCAPTCHA dépose des cookies tiers Google, nécessitant un consentement
  explicite ; des amendes RGPD ont été prononcées en Europe à ce sujet.
- **Performance** : charge ~170 Ko de JavaScript Google au démarrage.
- **Friction utilisateur** : les cases à cocher et défis visuels dégradent l'UX.
- **Dépendance Google** : couplage fort avec l'écosystème Google.

## Options

### Option A — Cloudflare Turnstile (recommandé)

- **Principe** : challenge invisible ou non-interactif, RGPD-natif (sans cookie traceur).
- **RGPD** : conforme par design, pas de consentement requis selon Cloudflare.
- **Performance** : script léger, chargé à la demande.
- **Coût** : gratuit (1 million de défis/mois sur le plan Free).
- **Intégration** : widget JS + validation côté backend (ou délégué au service de formulaire).

### Option B — Conserver reCAPTCHA v2

- Aucune migration nécessaire.
- Problèmes RGPD et performance non résolus.
- Non recommandé dans le cadre de la refonte.

### Option C — Honeypot seul (sans captcha)

- **Principe** : champ caché dans le formulaire, rempli uniquement par les bots.
- **RGPD** : aucune donnée tiers collectée.
- **Performance** : zéro JavaScript supplémentaire.
- **Limite** : efficacité insuffisante contre les bots sophistiqués.
- Peut être combiné avec l'Option A (double protection).

## Recommandation

**Option A (Cloudflare Turnstile)**, idéalement combinée avec un honeypot (Option C).
Cette combinaison maximise la protection tout en restant RGPD-conforme et performante.

## Impact

La décision s'applique conjointement à la décision analytics (ADR 0003) et au choix
du backend formulaire (ADR 0004). Les trois décisions doivent être cohérentes.

## Décision

> ⏳ **À décider avant le démarrage de la Phase 7**, en cohérence avec ADR 0003.

## Référence

- Phase d'implémentation : **Phase 7** (analytics, cookies, RGPD)
- Branche cible : `redesign`
