# Pokedex Project

## Introduction

Le projet Pokedex a été conçu pour fournir une application web interactive permettant aux utilisateurs d'explorer des informations détaillées sur les Pokémon. Cette application utilise React pour la partie frontend et Flask pour le backend, avec une base de données SQLite pour stocker les données. Le projet est stylisé en utilisant une combinaison de Tailwind CSS et de CSS personnalisé pour assurer une apparence moderne et réactive, tout en permettant des ajustements spécifiques. Les requêtes HTTP sont gérées par l'API native `fetch` de JavaScript, et la gestion de l'état est assurée par Zustand.

## Choix Techniques

- **Frontend :**
  - **React** : Utilisé pour sa capacité à créer des interfaces utilisateur dynamiques, modulaires et réactives.
  - **Vite** : Choisi pour initialiser et gérer le projet React en raison de sa rapidité, de sa configuration légère, et de ses temps de compilation optimisés.
  - **Zustand** : Utilisé pour gérer l'état de l'application de manière simple et efficace.
  - **Fetch** : Utilisé pour effectuer les requêtes HTTP vers l'API backend.
  - **Tailwind CSS** : Utilisé pour créer rapidement des interfaces réactives avec des classes utilitaires.
  - **CSS Personnalisé** : Utilisé en complément de Tailwind pour des styles spécifiques non couverts par les classes utilitaires.
  - **React-Toastify** : Utilisé pour gérer les notifications toast de manière élégante et non intrusive.
  - **Dialogues de Formulaires** : Des dialogues modaux ont été créés pour faciliter l'ajout et l'édition des informations des Pokémon.

- **Backend :**
  - **Flask** : Choisi pour sa simplicité et sa légèreté, permettant de construire rapidement une API RESTful pour gérer les données des Pokémon.
  - **SQLite** : Utilisé pour persister les données des Pokémon avec une base de données légère et facile à configurer.

- **API :**
  - **PokeAPI** : Utilisée pour récupérer toutes les informations nécessaires sur les Pokémon, y compris leurs caractéristiques, leurs évolutions, et leurs statistiques.

## Cheminement du Projet

### 1. Mise en place du Backend avec Flask
  - **Création de l'API RESTful** : Développement d'une API complète pour gérer les opérations CRUD sur les Pokémon.
  - **Configuration de la Base de Données SQLite** : Mise en place d'une base de données locale pour stocker les informations sur les Pokémon.
  - **Endpoints API** :
    - `GET /api/pokemons` : Récupère la liste de tous les Pokémon enregistrés.
    - `POST /api/pokemon` : Ajoute un nouveau Pokémon avec les informations fournies par l'utilisateur.
    - `PUT /api/pokemon/:id` : Met à jour les informations d'un Pokémon existant basé sur son ID.
    - `DELETE /api/pokemon/:id` : Supprime un Pokémon de la base de données en fonction de son ID.

### 2. Développement du Frontend avec React et Vite
  - **Initialisation du Projet avec Vite** : Utilisation de Vite pour configurer un environnement de développement rapide.
  - **Création des Composants** :
    - **`PokemonList`** : Affiche une liste de Pokémon avec des options pour rechercher, ajouter, éditer ou supprimer des Pokémon.
    - **`PokemonDetails`** : Présente des informations détaillées sur un Pokémon spécifique.
    - **`PokemonEvolution`** : Affiche les évolutions possibles pour un Pokémon donné.
    - **`PokemonStats`** : Montre les statistiques détaillées des Pokémon sous forme de graphiques interactifs et colorés.
  - **Gestion de l'État avec Zustand** : Utilisation de Zustand pour gérer l'état global de l'application.
  - **Requêtes HTTP avec Fetch** : Utilisation de `fetch` pour toutes les requêtes HTTP.

### 3. Stylisation et Mode Sombre
  - **Utilisation de Tailwind CSS** : Application de Tailwind pour la majorité des styles.
  - **CSS Personnalisé** : Ajout de styles spécifiques via du CSS personnalisé.
  - **Implémentation du Mode Sombre** : Configuration d'un mode sombre pour offrir aux utilisateurs une expérience de visualisation agréable.

### 4. Gestion des Notifications et des Dialogues
  - **Notifications avec React-Toastify** : Mise en place de notifications toast pour informer les utilisateurs lors de chaque action importante.
  - **Dialogues de Confirmation et de Formulaires** : Ajout de dialogues modaux pour confirmer la suppression d'un Pokémon et pour gérer les formulaires d'ajout ou d'édition.

### 5. Fonctionnalités Avancées et Améliorations
  - **Recherche Dynamique** : Implémentation d'une barre de recherche qui filtre les Pokémon par nom ou ID en temps réel.
  - **Graphiques pour les Statistiques des Pokémon** : Affichage des statistiques sous forme de graphiques à barres.
  - **Amélioration du Style des Boutons** : Les boutons ont été stylisés avec des bordures `outline` et des transitions pour un look moderne.
  - **Accordéons pour les Détails des Pokémon** : Utilisation d'accordéons pour afficher ou masquer les détails des Pokémon.

## Choix Techniques Justifiés

- **Pourquoi React et Vite ?**
  - React est reconnu pour sa capacité à gérer les interfaces utilisateur complexes avec des composants modulaires et réutilisables. Vite a été choisi pour sa rapidité et sa simplicité, permettant une configuration instantanée du projet.

- **Pourquoi Zustand ?**
  - Zustand est un gestionnaire d'état léger et efficace, offrant une alternative simple à Redux pour gérer l'état global de l'application.

- **Pourquoi Fetch ?**
  - `fetch` est une API native de JavaScript qui offre une gestion simple et directe des requêtes HTTP, intégrée directement dans les navigateurs modernes.

- **Pourquoi Tailwind CSS et CSS personnalisé ?**
  - Tailwind CSS permet de créer des interfaces modernes rapidement grâce à ses classes utilitaires. Le CSS personnalisé a été ajouté pour affiner certains détails de conception non pris en charge par Tailwind.

- **Pourquoi Flask et SQLite ?**
  - Flask a été choisi pour sa légèreté et sa simplicité, offrant une API RESTful facile à mettre en œuvre. SQLite a été choisi pour sa simplicité et son intégration rapide avec Flask, fournissant une solution de stockage de données suffisante pour un projet de cette envergure.

## Installation


### Cloner le dépôt Git

git clone https://github.com/username/my-pokedex.git
cd my-pokedex

### Configurer le Backend

source venv/bin/activate   # Pour Linux/MacOS
.\venv\Scripts\activate    # Pour Windows

pip install -r requirements.txt     #Installez les dépendances Python

python app.py      #Démarrez le serveur Flask

### Configurer le Frontend


cd frontend


npm install


npm run dev




