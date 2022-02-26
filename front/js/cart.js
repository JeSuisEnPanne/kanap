// Initialisation de la funtion displayProductLocal
function displayProductLocal() {
  // Initialisation en asynchrone qui permet de charger en parallèle les informations
  // fetch initiale l'API pour communiquer avec.
  fetch(`http://localhost:3000/api/products/`)
    .then((res) => res.json())
    // Promesse qui convertit en JSON puis je peux appeler la promesse avec "lot" pour faire référence a API
    .then((lot) => {
      //-------------------- boucle API---------------//

      //Initialise des variables dans des tableaux vides.
      let produitPanier = [];
      let prixTotalCalcul = [];
      let quantiterTotalCalcul = [];

      //Initialisation de la boucle FOR qui interroge l'API
      for (let v = 0; v < lot.length; v++) {
        //Initialisation du "produitLocalStorage" pour récupérer le localStorage
        let produitLocalStorage = JSON.parse(localStorage.getItem("produits"));

        // ------------- Affichage du produit panier -----//

        // Selection de la classe avec "querySelector" a injecter
        const positionElement = document.querySelector("#cart__items");

        //Initialisation de la boucle FOR pour parcourir le localStorage
        for (z = 0; z < produitLocalStorage.length; z++) {
          //Condition if qui vérifier si ID de l'API et égale a ID du localStorage
          if (lot[v]._id === produitLocalStorage[z].id) {
            // Avec innerHTML ligne 134 mais le code dans le DOM de "positionElement" ligne 26.
            //Ont, mais dans le code, le nom et la boucle des produits a appeler comme "${produitLocalStorage[z].id}"
            produitPanier += `
          <article class="cart__item" data-id="${produitLocalStorage[z].id}" data-color="{product-color}">
          
          <div class="cart__item__img">
          <img src="${lot[v].imageUrl}" alt="${lot[v].altTxt}">
          </div>
          
          <div class="cart__item__content">
          <div class="cart__item__content__description">
          <h2>${lot[v].name}</h2>
          <p>${produitLocalStorage[z].colors}</p>
          <p data-prix="${lot[v].colors}">${lot[v].price} €</p>
          </div>
          
          <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" data-color="${produitLocalStorage[z].colors}" data-id="${produitLocalStorage[z].id}" min="1" max="100" value="${produitLocalStorage[z].quantity}">
          </div>
          
          <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-color="${produitLocalStorage[z].colors}" data-id="${produitLocalStorage[z].id}">Supprimer</p>
          </div>
          </div>
          </div>
          </article>
          
          `;

            //---------------- InnertHTML -------------------------------//
            //injecte le code avec innerhtml dans produitPanier
            positionElement.innerHTML = produitPanier;

            ///------------------fin------------------------------------//

            //-------------------------- Quantiter Total ------------------------//

            // Variable qui contient un element
            const quantiterProduitsDansLePanier =
              produitLocalStorage[z].quantity;
           

            // mettre prix du panier dans "quantiterTotalCalcul"
            quantiterTotalCalcul.push(quantiterProduitsDansLePanier);

            

            // //additionner les prix dans le tableau de la variable quantiterTotalCalcul

            const reducers = (accumulators, quantity) =>
              accumulators + 1 * quantity;
            const quantiterTotal = quantiterTotalCalcul.reduce(reducers, 0);

            // injecte le code dans un innerhtml avec quantiterTotal

            const htmlQuantiter = document.querySelector("#totalQuantity");
            htmlQuantiter.innerHTML = `${quantiterTotal}`;

            
            //-------------------------FIN---------------------------------------//

            //-------------------- Prix Total ---------------//

            // if (produitLocalStorage[z].id === produitLocalStorage[z].id) {

            // let prixProduitsDansLePanier = produitLocalStorage[z].quantity * lot[v].price;
            // // console.log(produitLocalStorage[m]);

            // // mettre prix du panier dans "prixTotalCalcul"
            // prixTotalCalcul.push(prixProduitsDansLePanier);

            // // console.log(prixTotalCalcul);

            // //additionner les prix dans le tableau de la variable prixTotalCalcul

            // let reducer = (accumulator, valeurCourante) =>
            //   accumulator + valeurCourante;
            // let prixTotal = prixTotalCalcul.reduce(reducer, 0);

            // let htmlPrix = document.querySelector("#totalPrice");
            // htmlPrix.innerHTML = `${prixTotal}`;

            // }

            //---------------------FIN-----------------------------//

            //-----------------------Supression produit-----------------------//

            // variable qui sélectionne tous les deleteitem avec querySelectorAll
            const suprimmer = document.querySelectorAll(".deleteItem");

            // boucle for qui parcoure la variable supprimer
            for (const supprim of suprimmer) {

              // Événement au click avec supprim
              supprim.addEventListener("click", (event) => {
                // Enleve le comportement par default
                event.preventDefault();

                // Appelle le local storage
                const produits = JSON.parse(localStorage.getItem("produits"));

                // Boucle produits
                for (let i = 0; i < produits.length; i++) {

                  // condition if qui compare id et la colors
                  if (
                    produits[i].id === supprim.getAttribute("data-id") &&
                    produits[i].colors === supprim.getAttribute("data-color")
                  ) {
                    // utilisation de filter
                    products = produits.filter((el) => el !== produits[i]);

                    // envoie dans le local storage produit
                    localStorage.setItem("produits", JSON.stringify(products));
                  }
                }
                // recharge la page
                location.reload();
              });
            }

            //----------------------FIN ------------------------------------------//

            //---------------------------Quantiter-------------------------------------//

            // variable qui sélectionne tous les itemquantity avec querySelectorAll
            const quantiterTotalPrix =
              document.querySelectorAll(".itemQuantity");
            
            // boucle for of qui liste ce que contient quantiterTotalPrix dans quantityInput
            for (const quantityInput of quantiterTotalPrix) {
              //Utilise un evenement avec change
              quantityInput.addEventListener("change", (e) => {
                
                // je fais appel au localstorage
                const produits = JSON.parse(localStorage.getItem("produits"));

                // nouvelle boucle for de produits
                for (let i = 0; i < produits.length; i++) {
                 
                  // je compare id et la colors avec les attributes
                  if (
                    produits[i].id === quantityInput.getAttribute("data-id") &&
                    produits[i].colors ===
                      quantityInput.getAttribute("data-color")
                  ) {
                    // mais à jour le local storage
                    produits[i].quantity = quantityInput.value;
                    localStorage.setItem("produits", JSON.stringify(produits));
                    
                  }
                }
                // recharge la page
                location.reload();
              });
            }

            //------------------FIN-----------------------------------------------------//

            //// --------- TotalPrix--------------------------

            // condition qui est égale à id
            if (produitLocalStorage[z].id === produitLocalStorage[z].id) {
              // variable qui fait le calcul
              const articleTotal =
                produitLocalStorage[z].quantity * lot[v].price;

              // j'envoie dans un tableau avec push le résulta de articleTotal 
              prixTotalCalcul.push(articleTotal);

              // j'utilise reducer pour faire le calcul du tableau prixTotalCalcul
              const reducer = (accumulator, curr) => accumulator + curr;
              const totalPrix = prixTotalCalcul.reduce(reducer);

              // j'injecte le code innerHTML avec totalPrix
              let htmlPrix = document.querySelector("#totalPrice");
              htmlPrix.innerHTML = `${totalPrix}`;
            }

            //---------------FIN---------------------------------

            //------------------FIN-----------------------------------------------------//
          }
        }
      }
    });
}

// Appel a la function displayProductLocal ligne : 2.
displayProductLocal();

//------------------------------FIN-------------------------------------

//--------------------REGEX------------------------//

//Création d'une variable qui fait référence au champ du formulaire
//Avec la variable, j'ajoute dans le code du formulaire DOM une "pattern"
//Cela permet de vérifier les champs avec une règle REGEX pour valiser sinon une erreur d'affiche avec "title"
const formulairePrenom = document.querySelector("#firstName");
formulairePrenom.setAttribute("pattern", "[A-Za-zéèêïç -]{2,30}");
formulairePrenom.setAttribute(
  "title",
  "Incorrect, peut contenir des lettres et: é è ê ï ç - espace"
);

const formulaireNom = document.querySelector("#lastName");
formulaireNom.setAttribute("pattern", "[A-Za-zéèêïç -]{2,30}");
formulaireNom.setAttribute(
  "title",
  "Incorrect, peut contenir des lettres et: é è ê ï ç - espace"
);

const formulaireAdresse = document.querySelector("#address");
formulaireAdresse.setAttribute("pattern", "[A-Za-z-0-9éèêïç 'à°,;:-]{2,60}");
formulaireAdresse.setAttribute(
  "title",
  "Incorrect, peut contenir des lettres, chiffres et: é è ê ï ç ' à ° , ; : - espace"
);

const formulaireVille = document.querySelector("#city");
formulaireVille.setAttribute("pattern", "[A-Za-zéèêïç' -]{2,30}");
formulaireVille.setAttribute(
  "title",
  "Incorrect, peut contenir des lettres et: é è ê ï ç ' - espace"
);

const formulaireEmail = document.querySelector("#email");
formulaireEmail.setAttribute("pattern", "[a-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}");
formulaireEmail.setAttribute(
  "title",
  "Incorrect, peut contenir des lettres, chiffres et: - @ _ ."
);

//----------------FIN ---------------------------------------//

//---------------Recuperation donnees formulaire---------------------//

//Variable donneFormulaire qui sélectionne avec querySelector et mais un événement avec "submit".
const donneFormulaire = document.querySelector(".cart__order__form");
donneFormulaire.addEventListener("submit", contacts);

//function qui preserve le nomportement par default de contacts
//Avec FormData, je récupère les champs du formulaire.
function contacts(e) {
  e.preventDefault();
  const formData = new FormData(donneFormulaire);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const address = formData.get("address");
  const city = formData.get("city");
  const email = formData.get("email");

  //----------------POST---------------------------------------------//

  //Je, mais dans le formulaire un nouveau attribue qui renvoie, une foi valider à la page "confirmation.html"
  const formulaireAction = document.querySelector(".cart__order__form");
  formulaireAction.setAttribute("action", "../html/confirmation.html");

  //----------------------FIN---------------------------------------//

  // J'envoie dans API avec POST les champs suivant comme cle/valeur, qui correspond aux donnes de FormData ligne : 276
  const contact = {
    firstName,
    lastName,
    address,
    city,
    email,
  };

  //Initialisation du localStorage dans "produitLocalStorage"
  let produitLocalStorage = JSON.parse(localStorage.getItem("produits"));

  //Creation d'un tableau vide
  const products = [];

  //Création d'une boucle FOR pour parcourir le localStorage avec produitLocalStorage
  // Envoie du tableau products les informations de ID avec z pour parcourir la liste.
  for (z = 0; z < produitLocalStorage.length; z++) {
    products.push(produitLocalStorage[z].id);
  }

  //Un objet qui contient contact et products ensembles pour faire un appel à API avec POST
  let envoyer = {
    contact,
    products,
  };

  //Initialisation de l'API avec Order pour envoyer des informations qu'il attend methode POST avec "contact" et "products"
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(envoyer),
  }).then((response) =>
    response.json().then((data) => {
      //Envoie dans la barre URL de confirmation.html, la key et sa valeur retourner part l'API pour le numéro de commande
      window.location.href = "confirmation.html?key=" + data.orderId;
    })
  );
}

//---------------FIN-------------------------------//
