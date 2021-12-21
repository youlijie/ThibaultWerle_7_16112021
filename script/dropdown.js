import { recipes } from "./recipes.js";
import { displayRecipes, algoSearchFilterMethod } from "./index.js";

//---------------------------------------------------------//
//-------------DOM ELEMENTS---------------------------------//
//-----------------------------------------------------------//
const main = document.querySelector(".recettes__card");

const dropIngredient = document.getElementById("drop_ingredients");
const dropAppareil = document.getElementById("drop_appareils");
const dropUstensile = document.getElementById("drop_ustensiles");

const chevronIngredient = document.getElementById("btn_ingredients");
const chevronAppareil = document.getElementById("btn_appareils");
const chevronUstensile = document.getElementById("btn_ustensiles");

const inputIngredient = document.getElementById("input_ingredients");
const inputAppareil = document.getElementById("input_appareils");
const inputUstensile = document.getElementById("input_ustensiles");

const inputSearch = document.getElementById("search");

//-----------------------------------------------------------------//
// -----------deroule les dropdown au click---------------------------//
chevronIngredient.addEventListener("click", () => {
  dropIngredient.classList.toggle("show");
  inputIngredient.setAttribute("placeholder", " recherche par ingrédient");
});

chevronAppareil.addEventListener("click", () => {
  dropAppareil.classList.toggle("show");
  inputAppareil.setAttribute("placeholder", " recherche par appareils");
});

chevronUstensile.addEventListener("click", () => {
  dropUstensile.classList.toggle("show");
  inputUstensile.setAttribute("placeholder", " recherche par ustensiles");
});

//-------------------------------------------------------------------//
//----------- déroule les dropdown au keyup sur input tags----------//
inputIngredient.addEventListener("keyup", () => {
  dropIngredient.classList.toggle("show");
});
window.addEventListener("click", (e) => {
  if (e.target !== chevronIngredient) {
    dropIngredient.classList.remove("show");
  }
});

inputAppareil.addEventListener("keyup", () => {
  dropAppareil.classList.toggle("show");
});
window.addEventListener("click", (e) => {
  if (e.target !== chevronAppareil) {
    dropAppareil.classList.remove("show");
  }
});

inputUstensile.addEventListener("keyup", () => {
  dropUstensile.classList.toggle("show");
});
window.addEventListener("click", (e) => {
  if (e.target !== chevronUstensile) {
    dropUstensile.classList.remove("show");
  }
});
//----------------------------------------------------------------------//
// fonction qui recupères la liste des ingredient, ustensile ou appareils//
//-------------------------------------------------------------------------//

// trier les élments par ordre alpabetique
function sortAlphabetically(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else return 0;
}
// affiches la liste des Appareils
export const displayListAppliance = function () {
  const appareil = recipes.map((item) => item.appliance);
  // retires les doublons
  let tableauAppareil = [...new Set(appareil.concat(appareil))];
  tableauAppareil.sort(sortAlphabetically);
  let liAppareil = tableauAppareil
    .map((item) => {
      return `
 <li class='list_appareils'>${item}</li>`;
    })
    .join("");
  return liAppareil;
};
dropAppareil.innerHTML = displayListAppliance();

// afficher la liste des ustensiles
export function displayListUstensils() {
  let tableauUstens = [];
  const ustensil = recipes.map((item) => item.ustensils);
  for (let valeur of ustensil) {
    for (let j = 0; j < valeur.length; j++) {
      tableauUstens.push(valeur[j]);
    }
  }
  // retires les doublons
  let tableauUstensils = [...new Set(tableauUstens.concat(tableauUstens))];
  tableauUstensils.sort(sortAlphabetically);
  let liUstensils = tableauUstensils
    .map((item) => {
      return `<li class='list_ustensiles'>${item}</li>`;
    })
    .join("");
  return liUstensils;
}

dropUstensile.innerHTML = displayListUstensils();

// afficher les ingredients dans la liste
export function displayListIngredients() {
  let tableauIngred = [];
  const ingredient = recipes.map((item) => item.ingredients);
  for (let valeur of ingredient) {
    for (let j = 0; j < valeur.length; j++) {
      tableauIngred.push(valeur[j]["ingredient"]);
    }
  }
  // retires les doublons
  let tableauIngredients = [...new Set(tableauIngred.concat(tableauIngred))];
  tableauIngredients.sort(sortAlphabetically);
  let liIngredient = tableauIngredients
    .map((item) => {
      return `<li class='list_ingredients'>${item}</li>`;
    })
    .join("");
  return liIngredient;
}
dropIngredient.innerHTML = displayListIngredients();

//-------------------------------------------------------------------------------//
// afficher les ingredients, ustensiles et appareil ==> dans input tags
//-------------------------------------------------------------------------------//
const listIngredients = document.querySelectorAll(".list_ingredients");
const listUstensiles = document.querySelectorAll(".list_ustensiles");
const listAppareils = document.querySelectorAll(".list_appareils");

// trie la liste des tags en fonction de l'input tags
export function SortAllListWithInputTags(liste, search) {
  for (let valeur of liste) {
    let textValue =
      valeur.textContent.toLowerCase() || valeur.innerText.toLowerCase();
    if (textValue.toLowerCase().indexOf(search) > -1) {
      valeur.style.display = "";
    } else {
      valeur.style.display = "none";
    }
  }
}

// trie les ingredients
inputIngredient.addEventListener("keydown", function (e) {
  let search = e.target.value.toLowerCase();
  SortAllListWithInputTags(listIngredients, search);
});

//trie les ustensiles
inputUstensile.addEventListener("keyup", function (e) {
  let search = e.target.value.toLowerCase();
  SortAllListWithInputTags(listUstensiles, search);
});

//trie les appareils
inputAppareil.addEventListener("keyup", function (e) {
  let search = e.target.value.toLowerCase();
  SortAllListWithInputTags(listAppareils, search);
});

//------------------------------FONCTION FILTRES TAGS-----------------------------------//
//-----------------------------------------------------------------------------//

//--------Tableau vides des Ingredients/ ustensils et Appareils-------//

let tabsAppareil = [];
let tabsIngredient = [];
let tabsUstensiles = [];

sortAndDisplayAllTags(listAppareils, tabsAppareil, inputAppareil);
sortAndDisplayAllTags(listIngredients, tabsIngredient, inputIngredient);
sortAndDisplayAllTags(listUstensiles, tabsUstensiles, inputUstensile);

/**@param {string} liste des appareils,ingredients ou ustensile */
/**@param {Array} tableau rempli le tableau app,ustens ou ingre */
/**@param {String} input permet de vider le champ input */
/**@param {String} type le type de liste */

function sortAndDisplayAllTags(liste, tableau, input) {
  //recupères la valeur
  let searchInFirstInput = inputSearch.value.toLowerCase();
  let tags = document.querySelector(".tags");
  // Au click dans chaque listes
  for (let value of liste) {
    value.addEventListener("click", () => {
      let txtValue = value.textContent.toLowerCase() || value.innerText.toLowerCase();
        input.value = "";
      tableau.push(txtValue)
      let filterOnlyByTags = getTagMatchingAll(recipes);
      displayRecipes(filterOnlyByTags);
      reinitializeDisplaySearchInput(searchInFirstInput);
      createTags(txtValue);
      displayErrorMessage(filterOnlyByTags);
      // Pour chaque click sur la croix des tags
      const croixTags = document.querySelectorAll(".fa-times-circle");
      for (let croix of croixTags) {
        croix.addEventListener("click", (e) => {
          // retires la valeur du tableau au click de la croix
          const tagsList = croix.closest("div");
          tagsList.remove();
          if (tagsList.classList.contains("green_appareils")) {
            const indexTags = tabsAppareil.indexOf(
              tagsList.getElementsByClassName("tags_value")[0].innerHTML);
            tabsAppareil.splice(indexTags, 1);
          }
          if (tagsList.classList.contains("red_ustensils")) {
            const indexTags = tabsUstensiles.indexOf(
              tagsList.getElementsByClassName("tags_value")[0].innerHTML);
            tabsUstensiles.splice(indexTags, 1); 
          }
          if (tagsList.classList.contains("blue_ingredients")) {
            const indexTags = tabsIngredient.indexOf(
              tagsList.getElementsByClassName("tags_value")[0].innerHTML);
            tabsIngredient.splice(indexTags, 1);
       
          }
          // reinitialise l'affichage au tags précédent
          const EffacerTags = getTagMatchingAll(recipes);
          displayRecipes(EffacerTags);
          reinitializeDisplaySearchInput(searchInFirstInput);
        });
      }
    });
  }
}


//verifie si dans le tableau on a les ingredients/ appareils/ustensile correspondants
function matchUstensiles(tabsUstensiles, ustensil) {
  return ustensil.toString().toLowerCase().includes(tabsUstensiles);
}

function matchAppareils(tabsAppareil, appliance) {
  return appliance.toString().toLowerCase().includes(tabsAppareil);
}
function matchIngredients(tabsIngredient, ingredient) {
  ingredient = ingredient.map((ing) => ing.toLowerCase());
  return tabsIngredient.every((elem) =>
    ingredient.includes(elem.toLowerCase())
  );
}

//si il y a une recherche sur l'input principale
function reinitializeDisplaySearchInput(searchInFirstInput) {
  if (searchInFirstInput.length > 2) {
    let cardRestante = algoSearchFilterMethod(searchInFirstInput, recipes);
    const tagsAvecsearchInFirstInput = getTagMatchingAll(cardRestante);
    displayRecipes(tagsAvecsearchInFirstInput);
  }
}

// permet de créer le tags
function createTags(txtValue) {
  let tags = document.querySelector(".tags");
  tags.innerHTML += ` <div class='tags_li'>
 <span class='tags_value'>${txtValue}</span>
 <span class='croix'><i class="far fa-times-circle"></i></span>
 </div>`;
}
// si trop de critères on affiche message d'erreur
function displayErrorMessage(filterOnlyByTags) {
  if (filterOnlyByTags == "") {
    main.innerHTML = `<div class=msg_error>OUPS... Vous avez saisie trop de critères veuillez en supprimer</div>`;
  }
}

//----------------------------------------------------------------------------//
// -----------------------ALGO pour les TAGS---------------------------------//

/**
 * @param {object} recettes recettes total ou filtrer apres input principale
 */
function getTagMatchingAll(recettes) {
  const filtreTags = recettes.filter((recipe) => {
    let ingredient = recipe.ingredients.map((x) => x.ingredient);
    let appliance = recipe.appliance;
    let ustensil = recipe.ustensils;

    return (
      matchUstensiles(tabsUstensiles, ustensil) &&
      matchIngredients(tabsIngredient, ingredient) &&
      matchAppareils(tabsAppareil, appliance)
    );
  });
  return filtreTags;
}


//----Change la couleur du tags--------------------//
function changeCouleurTag() {
  for (let value of listAppareils) {
    value.addEventListener("click", () => {
      const tagsValue = document.querySelector(".tags_li");
      tagsValue.classList.replace("tags_li", "green_appareils");
    });
  }
  for (let value of listIngredients) {
    value.addEventListener("click", () => {
      const tagsValue = document.querySelector(".tags_li");
      tagsValue.classList.replace("tags_li", "blue_ingredients");
    });
  }
  for (let value of listUstensiles) {
    value.addEventListener("click", () => {
      const tagsValue = document.querySelector(".tags_li");
      tagsValue.classList.replace("tags_li", "red_ustensils");
    });
  }
}
changeCouleurTag();
