# AGENTS.md — Conventions de la refonte manufacture.dev

Ce fichier documente les conventions à suivre pour tous les agents et contributeurs
travaillant sur la refonte du site `manufacture.dev`.

---

## Stack technique

| Composant      | Choix retenu                              |
|----------------|-------------------------------------------|
| SSG            | Hugo ≥ 0.161 extended                     |
| CSS            | Custom Properties + BEM léger             |
| JavaScript     | Vanilla JS uniquement                     |
| Icônes         | SVG inline                                |
| Pipeline build | Hugo Pipes (dart-sass intégré)            |

## Ce qu'on supprime

- **Bootstrap** — remplacé par CSS Custom Properties + BEM léger
- **jQuery** — remplacé par Vanilla JS
- **Slick** (carousel) — remplacé par CSS scroll snap ou solution native
- **iconfont themefisher** — remplacé par SVG inline
- **Google Fonts CDN** — polices auto-hébergées ou system fonts

## Cibles qualité

- **Lighthouse ≥ 95** sur les 4 catégories : Performance, SEO, Accessibilité, Best Practices
- **WCAG AA** — conformité accessibilité niveau AA
- **0 erreur console** en production
- **Zéro dépendance npm** — build 100% Hugo Pipes

---

## Convention de commits

Format : `type(pN): message court`

Exemples :
```
feat(p3): tokens couleur et typographie
chore(p2): vendor thème manufacture depuis terracotta
fix(p4): contraste bouton CTA insuffisant
perf(p6): optimisation images WebP
docs(p0): ADR analytics
```

### Types valides

| Type       | Usage                                           |
|------------|-------------------------------------------------|
| `feat`     | Nouvelle fonctionnalité ou composant            |
| `fix`      | Correction de bug ou régression                 |
| `chore`    | Tâche de maintenance, setup, configuration      |
| `refactor` | Restructuration sans changement de comportement |
| `perf`     | Amélioration de performance                     |
| `docs`     | Documentation, ADR, commentaires                |
| `test`     | Ajout ou modification de tests                  |

### Identifiant de phase `pN`

- `p0` — Préparation (gel, branches, ADR)
- `p1` — Audit et inventaire
- `p2` — Vendor du thème
- `p3` — Design tokens et typographie
- `p4` — Composants UI
- `p5` — Contenu et formulaires
- `p6` — Performance et assets
- `p7` — Analytics, cookies, RGPD
- `p8` — Tests, QA, bascule production

---

## Workflow branches

```
upstream/main   ←── PR finale de bascule (Phase 8 uniquement)
upstream/redesign ←── toutes les PR de refonte (p0 → p7)
origin/chore/p0-prep ──→ PR vers redesign
origin/feat/p3-tokens   ──→ PR vers redesign
...
```

**Règle absolue : toutes les PR ciblent `redesign`, jamais `main` directement**
(sauf la PR finale de mise en production en Phase 8).

---

## Checklist PR

Avant de soumettre une PR, vérifier :

- [ ] `hugo build` passe sans erreur ni warning
- [ ] Vérification visuelle locale avec Agent-browser (voir ci-dessous)
- [ ] Pas de régression Lighthouse (score ≥ 95 sur les 4 catégories)
- [ ] 0 erreur console dans le navigateur
- [ ] Accessibilité : titres hiérarchiques, alt sur images, contraste AA
- [ ] Pas de nouvelle dépendance externe (npm, CDN)

### Vérification visuelle locale (Agent-browser)

Pour tout changement impactant l'UI, lancer le site en local et le vérifier via
[Agent-browser](https://agent-browser.dev/skills) :

```bash
# 1. Démarrer le serveur Hugo local (comme indiqué dans le README)
hugo server -D
# Le site est disponible sur http://localhost:1313
```

Puis utiliser la skill Agent-browser pour vérifier les pages clés :
- Homepage FR : `http://localhost:1313/`
- Homepage EN : `http://localhost:1313/en/`
- Une page intérieure (ex. : `http://localhost:1313/offer/`)

Contrôles visuels à effectuer : mise en page cohérente, navigation fonctionnelle,
images chargées, pas d'élément cassé ou déplacé par rapport à l'état précédent.

---

## Structure du repo

```
/
├── AGENTS.md              # Ce fichier
├── .tool-versions         # Versions des outils (Hugo)
├── config/                # Configuration Hugo
├── content/               # Contenu Markdown
├── themes/manufacture/    # Thème custom (Phase 2+)
├── assets/                # CSS, JS, images sources
├── static/                # Fichiers statiques copiés tels quels
├── layouts/               # Overrides de layouts (si besoin)
└── docs/
    └── decisions/         # ADR (Architecture Decision Records)
```

---

## ADR (Architecture Decision Records)

Les décisions d'architecture sont documentées dans `docs/decisions/`.
Format de nommage : `NNNN-titre-kebab-case.md`

| Fichier                           | Sujet                        | Statut              |
|-----------------------------------|------------------------------|---------------------|
| `0001-vendor-theme.md`            | Vendor du thème terracotta   | Accepté             |
| `0002-css-stack.md`               | Stack CSS                    | Accepté             |
| `0003-analytics.md`               | Solution analytics           | En attente          |
| `0004-form-backend.md`            | Backend formulaire contact   | En attente          |
| `0005-captcha.md`                 | Solution captcha             | En attente          |
