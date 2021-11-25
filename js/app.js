import { recipes } from "./recipes.js";

// Use imported recipes to create a new array of recipe objects with while, for...of, and for...in
const recipesArray = [];
for (let i = 0; i < recipes.length; i++) {
  recipesArray.push({
    id: recipes[i].id,
    name: recipes[i].name,
    servings: recipes[i].servings,
    ingredients: recipes[i].ingredients,
    time: recipes[i].time,
    description: recipes[i].description,
    appliance: recipes[i].appliance,
    ustensils: recipes[i].ustensils,
  });
}
// separete recipe by id
const recipeById = {};
for (let i = 0; i < recipesArray.length; i++) {
  recipeById[recipesArray[i].id] = recipesArray[i];
}
// push recipe to the DOM
const recipeList = document.querySelector(".recipes");
for (let i = 0; i < recipesArray.length; i++) {
  const recipe = recipesArray[i];
  const recipeItem = document.createElement("div");
  recipeItem.classList.add("recipe-item");
  recipeItem.innerHTML = `
    <div class="card">
    <img class="card-img-top" src="" alt="${recipe.name}">
    <div class="card-body">
      <h5 class="card-title">${recipe.name}</h5>
      <div class="recipe-item__content">
      <div class="recipe-item__info">
                <div class="recipe-item__info-item">
                    <i class="fas fa-utensils"></i>
                    <span>${recipe.ustensils}</span>
                </div>
                <div class="recipe-item__info-item">
                    <i class="fas fa-clock"></i>
                    <span>${recipe.time}</span>
                </div>
                <div class="recipe-item__info-item">
                    <i class="fas fa-users"></i>
                    <span>${recipe.servings}</span>
                </div>
            <p class="recipe-item__description">${recipe.description}</p>
            
            </div>
        </div>
    </div>
  </div>
        
    `;
  recipeList.appendChild(recipeItem);
}
