import { recipes } from "./recipes.js";
import { SortAllListWithInputTags } from "./dropdown.js";

const main = document.querySelector(".recettes__card");
const recherchePrincipale = document.getElementById("search");

//---------------------BUILD LES CARDS----------------////////////////

/** @param {Ojbect} recette les recettes du fichier recipes */
//------------------------------------------------------------*//
//Permet de creer les card des recettes
export function displayRecipes(recette) {
  const recetteCard = recette
    .map((recipe) => {
      let ingredientinfos = "";
      const ingredient = recipe.ingredients.map((ingredient) => {
        if (ingredient.quantity) {
          if (ingredient.unit && ingredient.quantity) {
            ingredientinfos += `<li><strong>${ingredient.ingredient}:</strong>${ingredient.quantity}${ingredient.unit}</li>`;
          } else {
            ingredientinfos += `<li><strong>${ingredient.ingredient}:</strong>${ingredient.quantity}</li>`;
          }
        } else {
          ingredientinfos += `<li><strong>${ingredient.ingredient}</strong></li>`;
        }
      });
      return `<article class='col-3'>
<div class='img'></div>
<div class='recette__complete'>     
<div class='infos_principale'>
<span class='title__recette'>${recipe.name}</span>
 <div class='time_recipes'>
 <span class='time__logo'><i class="far fa-clock"></i></span>
 <span class='time'>${recipe.time}min</span>
 </div>
</div>
  
 <div class="contenu">
   <div class='ingredient'>${ingredientinfos}</div>
 <div class='recettes'>${recipe.description}</div>
</div>
</div>
</article>
`;
    })
    .join("");

  main.innerHTML = recetteCard;
}
displayRecipes(recipes);


//---------------------------FILTRE ALGOS n1 avec filter() le plus performant------------///

/**
 * @param {String} search la rechercher taper dans Input principale
 * @param {Object} recette les recettes total ou celle restante
 */
//retourne le tableau filtrer recherche principale.
export const algoSearchFilterMethod = function (search, recette) {
  const filtrerCard = recette.filter((item) => {
    const ingredient = item.ingredients.map((x) => x.ingredient);

    return (
      item.name.toLowerCase().includes(search) ||
      item.description.includes(search) ||
      ingredient.toString().toLowerCase().includes(search)
    );
  });

  return filtrerCard;
};


const inputP = document.getElementById("search");
inputP.addEventListener("keyup", filterRecipesWithInputSearch);

function filterRecipesWithInputSearch(e) {
  let search = e.target.value.toLowerCase();
  if (search.length > 2) {
    const filtrerCard = algoSearchFilterMethod(search, recipes); // algo 1
    displayRecipes(filtrerCard);
    // si aucune occurence alors on affiche message erreur
    if (filtrerCard.length === 0) {
      recherchePrincipale.value = " ";
      main.innerHTML += `<div class='msg_error_input'>Aucune recette ne correspond à votre critères... vous pouvez chercher "tarte aux pommes,"poisson",...</div>`;
    }
  } else {
    displayRecipes(recipes);
  }
}



//------TRIER LES ELEMENTS DE LA LISTE en fonction de la saisie Input principale----------//
//----------------------------------------------------------------------------------------//
const listAppareils = document.querySelectorAll(".list_appareils");
const listIngredients = document.querySelectorAll(".list_ingredients");
const listUstensiles = document.querySelectorAll(".list_ustensiles");

// retournes le tableau trier recherche principale
inputP.addEventListener("keyup", function (e) {
  let search = e.target.value.toLowerCase();
  // on stockes les cards restante après saisie Input
  const cardRestante = algoSearchFilterMethod(search, recipes);
  const appareilRestant = cardRestante.map((item) =>
    item.appliance.toLowerCase()
  );
  const ingredientRestant = cardRestante.map((item) => {
    const ingredient = item.ingredients.map((x) => x.ingredient);
    for (let val of ingredient) {
      const valIngr = val.toLowerCase();
      return valIngr;
    }
  });
  const ustensilRestant = cardRestante.map((item) => {
    const ustensil = item.ustensils;
    for (let valeur of ustensil) {
      let valUst = valeur.toLowerCase();
      return valUst;
    }
  });

  if (search.length > 2) {
    // trie dans les appareils
    for (let valeur of listAppareils) {
      let textValue =
        valeur.textContent.toLowerCase() || valeur.innerText.toLowerCase();

      if (appareilRestant.includes(textValue)) {
        valeur.style.display = "";
      } else {
        valeur.style.display = "none";
      }
    }
    // trie dans les ingredients
    for (let valeur of listIngredients) {
      let textValue =
        valeur.textContent.toLowerCase() || valeur.innerText.toLowerCase();
      if (ingredientRestant.includes(textValue)) {
        valeur.style.display = "";
      } else {
        valeur.style.display = "none";
      }
    }
    for (let valeur of listUstensiles) {
      let textValue =
        valeur.textContent.toLowerCase() || valeur.innerText.toLowerCase();
      if (ustensilRestant.includes(textValue)) {
        valeur.style.display = "";
      } else {
        valeur.style.display = "none";
      }
    }
  } else {
    SortAllListWithInputTags(listIngredients, search);
    SortAllListWithInputTags(listUstensiles, search);
    SortAllListWithInputTags(listAppareils, search);
  }
});