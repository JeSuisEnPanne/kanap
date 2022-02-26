// Initialisation de l'ID Items dans index.html
const result = document.getElementById("items");

// Création de la fonction getIdFetch en mode asynchrone
(async function getIdFetch() {
  // Initialisation await de l'asynchrone qui permet de charger en parallèle les informations
  // fetch initiale l'API http
  await fetch("http://localhost:3000/api/products")
    // Promesse qui convertit le JavaScript en JSON
    .then((res) => res.json())
    // Promesse
    .then((data) => display(data));
})();

// Créer une function avec un argument appeler "Data" qui fait référence a l'API
function display(data) {
  // Dans la variable "result" le code a injecté dans le Dom avec innerHTML
  result.innerHTML = data
    .map(
      (canap) =>
        `<a href="./product.html?id=${canap._id}">
    <article>
    <img src="${canap.imageUrl}" alt="${canap.altTxt}">
    <h3 class="productName">${canap.name}</h3>
    <p class="productDescription">${canap.description}</p>
    </article>
    </a>`
    )
    //Joins sert à des éléments d'un tableau d'enlever les séparateurs.
    .join("");
}
