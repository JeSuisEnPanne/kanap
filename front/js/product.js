//----------------------URLSearchParams---------------------------------------//
//queryString_url_id contient window.location.search
const queryString_url_id = window.location.search;

// demande a URLSearchParams le parametre queryString_url_id
const utlSearchParams = new URLSearchParams(queryString_url_id);

// variable ID qui recupere avec la methode get le ID
const id = utlSearchParams.get("id");

//---------------------FIN------------------------------------------------------//

//----------------------Variable ------------------------------------------------//

// Variable qui pointe sur les éléments DOM de Produit.html
const resultImg = document.querySelector(".item__img");
const resultTitre = document.getElementById("title");
const resultPrix = document.getElementById("price");
const resultDesc = document.getElementById("description");
const resultColor = document.getElementById("colors");
const resultQuantity = document.getElementById("quantity");
const cart = document.getElementById("cart__items");
const tabListeEnfant = document.querySelector("#colors");
const resultPanier = document.getElementById("addToCart");
//------------------------FIN----------------------------------------------------//

//------------------------Fetch API---------------------------------------------//

// Création de la fonction displayProduct qui est appeler ligne : 164.
function displayProduct() {
  // Initialisation fetch qui est asynchrone est qui permet de charger en parallèle les informations
  // de l'API http avec les IDs des fiches produit.
  fetch(`http://localhost:3000/api/products/${id}`)
    // converti en JSON avec une promise
    // Renvoie lot comme promise pour faire appel à l'API
    .then((res) => res.json())
    .then((lot) => {
      //------------------------------Protection---------------------------------------//

      // Protection : vérification de l'ID est égal a true sinon je redirige vers la page d'accueil
      if (lot._id == null) {
        document.location.href = "index.html";
      }

      //--------------------------------FIN----------------------------------------------//

      // Variable "lot" de la ligne 44 pour la boucle FOR
      let modeCouleur = lot.colors;

      // Boucle For OF pour lister toutes les couleurs
      for (const valeur of modeCouleur) {
        // console.log(valeur);

        // Appel a resultColor dans un innerHTML pour lui injecter du code.
        // += Rajoute contenue dans un élément.
        // Ajoute "valeur" de la boucle for, pour avoir les couleurs.
        resultColor.innerHTML += `<option value="${valeur}">${valeur}</option>`;
      }

      // Injecte dans les variables ligne : 14 à 16
      // Du code avec l'api "lot" ligne 44 qui insère le nom, le prix et la description.
      resultTitre.textContent = lot.name;
      resultPrix.textContent = lot.price;
      resultDesc.textContent = lot.description;
      // utilise innerHTML pour ajouter du code dans resultImg ligne 13.
      resultImg.innerHTML = `<img src='${lot.imageUrl}' alt="${lot.altTxt}">`;
      // mais par default la valeur 1 à resultQuantity ligne 18.
      resultQuantity.value = 1;

      //Écoute l'événement "resultPanier" au click et exécute la function flécher.
      resultPanier.addEventListener("click", () => {
        //Sélectionne avec querySelector la valeur ID dans une variable
        const couleurs = document.querySelector("#colors").value;
        const quanty = parseInt(document.querySelector("#quantity").value);

        // Variable qui contient 3 clef/valeur a ajouter au localstorage
        let optionsProduit = {
          colors: couleurs,
          id: id,
          quantity: quanty,
        };

        //-----------------------------------FIN-----------------------------------------------//

        // ---------------------------------------Le local Storage ---------------------------//

        // mes dans une variable "produitsLocalStorage" et apelle la valeur "produits" de l'API.
        let produitsLocalStorage =
          JSON.parse(localStorage.getItem("produits")) ?? [];

        //Renvoi et compare les produits strictement égale a ID et couleurs dans un tableau findIndex
        const index = produitsLocalStorage.findIndex(
          (product) => product.id === id && product.colors === couleurs
        );

        //Condition if qui vérifie "index" alors on exécute le code sinon on passe a else.
        //produitsLocalStorage ajoute la quantité pour l'incrémenter
        //On passe au localStorage les informations en JSON de "Produits"
        //Appel a la function "popupPanier" ligne : 151.
        //if 118 verifie si l'utilisateur a choisie une couleur
        //else créer un tableau s'il est vide ligne 126
        //else exécute les functions concaténation

        if (index !== -1) {
          let quantity = Number(produitsLocalStorage[index].quantity) + quanty;
          produitsLocalStorage[index].quantity = quantity;

          localStorage.setItem(
            "produits",
            JSON.stringify(produitsLocalStorage)
          );
          popupPanier();
        } else {
          if (tabListeEnfant.value >= 1 || tabListeEnfant.value <= 0) {
            window.alert("atention, choisir une couleur");
          } else if (produitsLocalStorage) {
            produitLocal(optionsProduit, produitsLocalStorage);
            popupPanier();
          } else {
            produitsLocalStorage = [];
            produitLocal(optionsProduit, produitsLocalStorage);
            popupPanier();
          }
        }
      });
    });
}

//function qui envoie dans un tableau "produitsLocalStorage" les valeurs optionsProduit ligne 88.
//Fait appel au localStorage pour ajouter une clé valeur dans produitsLocalStorage en JSON
function produitLocal(optionsProduit, produitsLocalStorage) {
  produitsLocalStorage.push(optionsProduit);
  localStorage.setItem("produits", JSON.stringify(produitsLocalStorage));
}

//------------------FIN----------------------------------------------------------------//

// ------------------ Alerte ---------------------

//Function flecher qui affiche une Alerte le panier a été ajouter.
//Vérifie la condition et redirige l'article dans le panier.
const popupPanier = () => {
  if (window.confirm(`Votre Produit a été ajouter au Panier`)) {
    window.location.href = "cart.html";
  } else {
    window.location.href = "index.html";
  }
};

//--------------------FIN ------------------------

// Excecute la function appeler displayProduct ligne 37.
displayProduct();
