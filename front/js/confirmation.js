// Variables qui vas chercher dans URL avec GET la "Key" attendue.
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("key");

// Récupère la "key" dans URL est l'injecte dans le querySelector #orderId
const validationNumero = document.querySelector("#orderId");
validationNumero.textContent = myParam;
