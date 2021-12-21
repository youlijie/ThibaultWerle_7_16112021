import { recipes } from "./recipes.js";
import { AfficherRecettes } from "./index.js";

const dropIngredient = document.getElementById("drop_ingredients");
const dropAppareil = document.getElementById("drop_appareils");
const dropUstensile = document.getElementById("drop_ustensiles");

const chevronIngredient = document.getElementById("btn_ingredients");
const chevronAppareil = document.getElementById("btn_appareils");
const chevronUstensile = document.getElementById("btn_ustensiles");

const inputIngredient = document.getElementById("input_ingredients");
const inputAppareil = document.getElementById("input_appareils");
const inputUstensile = document.getElementById("input_ustensiles");

// deroule les dropdown au click
chevronIngredient.addEventListener("click", () => {
  dropIngredient.classList.toggle("show");
  inputIngredient.setAttribute("placeholder", " recherche par Ingrédient");
});

chevronAppareil.addEventListener("click", () => {
  dropAppareil.classList.toggle("show");
  inputAppareil.setAttribute("placeholder", " recherche par Appareils");
});

chevronUstensile.addEventListener("click", () => {
  dropUstensile.classList.toggle("show");
  inputUstensile.setAttribute("placeholder", " recherche par Ustensiles");
});
// déroule les dropdown au keyup sur input tags
inputIngredient.addEventListener("keyup", () => {
  dropIngredient.classList.toggle("show");
});

inputAppareil.addEventListener("keyup", () => {
  dropAppareil.classList.toggle("show");
});

inputUstensile.addEventListener("keyup", () => {
  dropUstensile.classList.toggle("show");
});

// fonction qui recupères la liste des ingredient, ustensile ou appareils

// affiches la liste des Appareils
export const afficherLiAppareil = function () {
  const appareil = recipes.map((item) => item.appliance);
  let tableauAppareil = [...new Set(appareil.concat(appareil))]; // retires les doublons
  let liAppareil = tableauAppareil
    .map((item) => {
      return `
 <li class='list_appareils'>${item}</li>`;
    })
    .join("");
  return liAppareil;
};
dropAppareil.innerHTML = afficherLiAppareil();
//afficherLiAppareil()

// afficher la liste des ustensiles
export function afficherLiUstensil() {
  let tableauUstens = [];
  const ustensil = recipes.map((item) => item.ustensils);
  for (let valeur of ustensil) {
    for (let j = 0; j < valeur.length; j++) {
      tableauUstens.push(valeur[j]);
    }
  }
  let tableauUstensils = [...new Set(tableauUstens.concat(tableauUstens))];
  let liUstensils = tableauUstensils
    .map((item) => {
      return `<li class='list_ustensiles'>${item}</li>`;
    })
    .join("");
  return liUstensils;
}

dropUstensile.innerHTML = afficherLiUstensil();

// afficher les ingredients dans la liste
export function afficherIngredient() {
  let tableauIngred = [];
  const ingredient = recipes.map((item) => item.ingredients);
  for (let valeur of ingredient) {
    for (let j = 0; j < valeur.length; j++) {
      tableauIngred.push(valeur[j]["ingredient"]);
    }
  }
  let tableauIngredients = [...new Set(tableauIngred.concat(tableauIngred))];
  let liIngredient = tableauIngredients
    .map((item) => {
      return `<li class='list_ingredients'>${item}</li>`;
    })
    .join("");
  return liIngredient;
}
dropIngredient.innerHTML = afficherIngredient();

// afficher les ingredients, ustensiles et appareil == correspond à la saisie input
const listIngredients = document.querySelectorAll(".list_ingredients");
const listUstensiles = document.querySelectorAll(".list_ustensiles");
const listAppareils = document.querySelectorAll(".list_appareils");

// trie la liste des tags en fonction de l'inut tags
export function afficherListTrier(liste, search) {
  for (let valeur of liste) {
    let textValue = valeur.textContent || valeur.innerText;
    if (textValue.toLowerCase().indexOf(search) > -1) {
      valeur.style.display = "";
    } else {
      valeur.style.display = "none";
    }
  }
}

// trie les ingredients
inputIngredient.addEventListener("keyup", function (e) {
  let search = e.target.value.toLowerCase();
  afficherListTrier(listIngredients, search);
});

//trie les ustensiles
inputUstensile.addEventListener("keyup", function (e) {
  let search = e.target.value.toLowerCase();
  afficherListTrier(listUstensiles, search);
});

//trie les appareils
inputAppareil.addEventListener("keyup", function (e) {
  let search = e.target.value.toLowerCase();
  afficherListTrier(listAppareils, search);
});

// affiches les tags lorque qu'on cliques sur un élements
function afficherTags(liste) {
  for (let value of liste) {
    value.addEventListener("click", () => {
      let txtValue = value.textContent.toLowerCase() || value.innerText;
      const filtreTags = recipes.filter((item) => {
        const ingredient = item.ingredients.map((x) => x["ingredient"]);

        return (
          item.appliance.toLowerCase().includes(txtValue) ||
          ingredient.toString().toLowerCase().includes(txtValue) ||
          item.ustensils.toString().toLowerCase().includes(txtValue)
        );
      });

      //affiche les recettes filtrer
      AfficherRecettes(filtreTags);
      // permet de creer le tags
      let tags = document.querySelector(".tags");
      tags.innerHTML += ` <div class='tags_li'>
  <span class='tags_value'>${txtValue}</span>
  <span class='croix'><i class="far fa-times-circle"></i></span>
 </div>`;
      const croixTags = document.querySelectorAll(".fa-times-circle");
      for (let value of croixTags) {
        value.addEventListener("click", (e) => {
          console.log(value);
          const tagsList = value.closest("div");
          tagsList.style.background = "transparent";
          tagsList.innerHTML = "";
        });
      }
    });
  }
}
afficherTags(listAppareils);
afficherTags(listUstensiles);
afficherTags(listIngredients);
