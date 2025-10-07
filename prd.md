📦 PRD – MCN-221
Product Requirements Document
Version 1.0 – 03 oct 2025 – auteur: toi
1. Vision (1 phrase)
Devenir l’application de référence qui permet à tout visiteur – sur place ou à distance – de scanner, écouter, voir en AR et partager les trésors du Musée des Civilisations Noires en moins de 3 secondes.
2. Objectifs OKR (90 jours)
Table
Copy
Objectif	KR	Statut
O1 – Expérience fluide	KR1 – temps scan→play < 3 s	🔄
KR2 – taux complétion audio ≥ 60 %	🔄
O2 – Rayonnement	KR3 – 1 000 partages sociaux #MCNXP	🔄
O3 – Accessibilité	KR4 – 10 000 pages vues hors-murs	🔄
3. Personas
P1 – « Aminata » 24 ans, étudiante dakaroise, Android 12, aime les stories Instagram.
P2 – « Jean » 38 ans, touriste français, iPhone 14, famille 2 enfants.
P3 – « Prof Sarr » enseignant, groupe 30 lycéens, besimprimé & quiz.
4. User Stories MVP
Table
Copy
ID	Story	Critères d’acceptation
US1	En tant que Aminata, je scanne un QR pour avoir l’histoire audio.	– QR affiche page < 2 s
– Audio auto-play avec sous-titres FR/EN
US2	En tant que Jean, je vois l’œuvre en 3D sans installer d’app.	– WebAR démarre en 1 clic
– Fallback vidéo 360° si non compatible
US3	En tant que Prof Sarr, j’imprime une fiche récap pour mes élèves.	– Bouton « Télécharger PDF » généré dynamiquement
US4	En tant que visiteur, je partage ma collection sur WhatsApp.	– Image générée côté serveur 1200×630 px
– Lien preview avec métadonnées
5. Fonctionnalités détaillées
5.1 Scan & Redirect
QR code généré au format SVG + logo MCN, taille 300×300 px.
Short-link mcn.sn/{id} ( Netlify Redirects 200 ).
Paramètre ?lang= automatique via browser locale.
5.2 Audio Player
Waveform visuel ( Wavesurfer-js ).
Téléchargement possible (mp3 64 kbs).
Sous-titres WebVTT synchronisés.
5.3 WebAR
Lib : 8thWall (image-tracking) ou MindAR fallback.
Modèle glb ≤ 1 Mo, 5 000 polygones max.
Bouton « Capturer » déclenche download photo PNG.
5.4 Offline
Workbox 7, stratégie CacheFirst pour assets.
Page d’erreur stylisée si hors ligne + lien « retry ».
5.5 Share & NFT
Endpoint /api/og génère image Open-Graph.
NFT : contrat Polygon ERC-1155, metadata stocké sur IPFS (Pinata free).
6. Non-Objectifs (explicitement hors scope V1)
Paiement intégré.
Création de compte utilisateur.
Application native iOS/Android.
Mode admin multi-rôles complexe.
7. KPI & Analytics
Technique : Vercel Analytics (Core Web Vitals).
Produit : Plausible (respect RGPD).
Événements trackés : scan, play_start, ar_launch, share, pdf_download.
8. Contraintes
Performance : Lighthouse ≥ 90 mobile.
Accessibilité : WCAG 2.1 AA (contraste, aria-label).
Sécurité : CSP headers, pas de cookie tiers.
Droits : licences images CC-BY ou autorisation MCN écrite.
9. Hypothèses
Le visiteur possède un smartphone < 5 ans.
Le musée fournit 10 photos haute résolution par œuvre.
Connexion 3G minimum sur site.
10. Schéma technique (simplifié)
Copy
Visitor → QR → Vercel Edge → Sanity CDN (json)  
                    ↓  
ServiceWorker (cache) → Cloudinary (media)  
                    ↓  
Optional 8thWall → glb model → user photo → share
11. Releases plan
Table
Copy
Version	Date	Scope
V0.1	09 oct 08 h	3 œuvres, scan, audio, offline
V0.5	09 oct 20 h	10 œuvres, AR fallback, share
V1.0	10 oct 12 h	NFT, PDF, pitch deck final
12. Open Questions
Faut-il un mode « nuit » automatique ? → décision J+1.
Logo MCN officiel en SVG ? → demander à M. Ndiaye (contact : +221 xx).
Budget Pinata si > 1 000 NFT ? → étudier Infura IPFS.
13. Sign-offs
Table
Copy
Rôle	Nom	Date	Signature
Product Owner	toi	03 oct	✅
Tech Lead	…		⬜
MCN Partner	…		⬜
Fichier : prd-MCN-221-v1.md
Emplacement : /docs/prd.md dans le repo Git.