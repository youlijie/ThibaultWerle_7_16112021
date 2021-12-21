import { recipes } from "./recipes.js";
import {
  afficherLiAppareil,
  afficherListTrier,
  afficherLiUstensil,
  afficherIngredient,
} from "./dropdown.js";
const main = document.querySelector(".recettes__card");
const recherchePrincipale = document.getElementById("search");

//---------------------BUILD LES CARDS----------------////////////////

/**@param{tableau} */
// fonction qui permet de creer les card des recettes
export function AfficherRecettes(recette) {
  const recetteCard = recette
    .map((recipe) => {
      let ingredientinfos = "";
      const ingredient = recipe.ingredients.map((ingredient) => {
        if (ingredient.quantity) {
          if (ingredient.unit && ingredient.quantity) {
            ingredientinfos += `<li>${ingredient.ingredient}:${ingredient.quantity}${ingredient.unit}</li>`;
          } else {
            ingredientinfos += `<li>${ingredient.ingredient}:${ingredient.quantity}</li>`;
          }
        } else {
          ingredientinfos += `<li>${ingredient.ingredient}</li>`;
        }
      });
      return `<article class='col-3'>
<div class='img'></div>

<div class='recette__complete'>     
<div class='infos_principale'>
<span class='title__recette'>${recipe.name}</span>

<div>
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
AfficherRecettes(recipes);

//---------------------------------------------------------------------//
//---------------------------FILTRE ALGOS n°2 moins performant------------///

function search(e) {
  
  let searchValue= e.target.value.toLowerCase();
  let recipesSorted = [];
  if (searchValue.length >= 3) {
    for (let recipe of recipes) {
      let nameArray = recipe.name.split(" ");
      let descArray = recipe.description.split(" ");
      let ingredientsArray = recipe.ingredients.map((ing) => {
        return ing.ingredient;
      });
      if (descArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        recipesSorted.push(recipe);
      } else if (nameArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        recipesSorted.push(recipe);
      } else if (ingredientsArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        recipesSorted.push(recipe);
      }
     
    }
   
   AfficherRecettes(recipesSorted)
   
  
 if (recipesSorted.length===0){
  recherchePrincipale.value = " ";
  main.innerHTML+= `<span class='message_erreur'>Aucune recette ne correspond à votre critères... vous pouvez chercher "tarte aux pommes,"poisson",...</span>`
  
 }
 }
 return recipesSorted;
}

// // fonction qui retourne le tableau filtrer recherche principale.
// export const filtrerTableauCardTrier = function (search, array) {
//   const filtrerCard = array.filter((item) => {
//     const ingredient = item.ingredients.map((x) => x.ingredient);
   
//     return (
//       item.name.toLowerCase().includes(search) ||
//       item.description.includes(search) ||
//       ingredient.toString().toLowerCase().includes(search)
//     );
//   });

//   return filtrerCard;
// };

// Au keyup on execute la fonction filtrer card
const inputP = document.getElementById("search");
inputP.addEventListener("keyup", search);

//-------------------TRIER LES ELEMENTS DE LA LISTE--------------------//
//---------------------------------------------------------------------//
// permet d'afficher seulement les elements de la liste encore présent dans le tableau filtrer
// par la recherche principale.
// const listAppareils = document.querySelectorAll(".list_appareils");
// const listIngredients = document.querySelectorAll(".list_ingredients");
// const listUstensiles = document.querySelectorAll(".list_ustensiles");

// // retournes le tableau trier recherche principale
// inputP.addEventListener("keyup", function (e) {
//   let search = e.target.value.toLowerCase();
//   const cardRestante = filtrerTableauCardTrier(search, recipes);
//   const appareilRestant = cardRestante.map((item) =>
//     item.appliance.toLowerCase()
//   );
//   const ingredientRestant = cardRestante.map((item) => {
//     const ingredient = item.ingredients.map((x) => x.ingredient);
//      for (let val of ingredient) {
//       const valIngr = val.toLowerCase();
//       return valIngr;
//     }
//   });
//   const ustensilRestant = cardRestante.map((item) => {
//     const ustensil = item.ustensils;
//     for (let valeur of ustensil) {
//       let valUst = valeur.toLowerCase();
//       return valUst;
//     }
//   });

//   if (search.length > 2) {
//     // trie dans les appareils
//     for (let valeur of listAppareils) {
//      let textValue =
//         valeur.textContent.toLowerCase() || valeur.innerText.toLowerCase();

//       if (appareilRestant.includes(textValue)) {
//         valeur.style.display = "";
//       } else {
//         valeur.style.display = "none";
//       }
//     }
//     // trie dans les ingredients
//     for (let valeur of listIngredients) {
//       let textValue =
//         valeur.textContent.toLowerCase() || valeur.innerText.toLowerCase();
//       if (ingredientRestant.includes(textValue)) {
//         valeur.style.display = "";
//       } else {
//         valeur.style.display = "none";
//       }
//     }
//     for (let valeur of listUstensiles) {
//       let textValue =
//         valeur.textContent.toLowerCase() || valeur.innerText.toLowerCase();
//       if (ustensilRestant.includes(textValue)) {
//         valeur.style.display = "";
//       } else {
//         valeur.style.display = "none";
//       }
//     }
//   } else {
//     afficherListTrier(listIngredients, search);
//     afficherListTrier(listUstensiles, search);
//     afficherListTrier(listAppareils, search);
//   }
// });
