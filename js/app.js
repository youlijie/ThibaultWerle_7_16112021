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

// log the new array
console.log(recipesArray);

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
      <div class="card-body-top">
      <h5 class="card-title">${recipe.name}</h5>
      <div class="recipe-item__info-item clock">
      <i class="far fa-clock fa-lg"></i>
      <h5>${recipe.time} min</h5>
      </div>
      </div>
      <div class="recipe-item__content">
          <div class="recipe-item__info">
                <div class="recipe-item__info-item ingredients">
                </div>
                <div class="recipe-item__info-item description">
                <p class="recipe-item__description">${recipe.description}</p>
                </div>
                <div class="recipe-item__info-item ustensils">
                <p>ustensils: ${recipe.ustensils}</p>
                </div>
          </div>
       </div>
    </div>
  </div>
        
    `;
  recipeList.appendChild(recipeItem);

  // ellipsis to the description
  const description = recipeItem.querySelector(".recipe-item__description");
  if (description.textContent.length > 100) {
    description.textContent = description.textContent.substring(0, 200) + "...";
  } else {
    description.textContent = description.textContent;
  }
}

// add ingredients to the DOM for each recipes (ingredient, quantity, unit)
const ingredients = document.querySelectorAll(
  ".recipe-item__info-item.ingredients"
);
for (let i = 0; i < ingredients.length; i++) {
  const ingredient = ingredients[i];
  const recipe = recipesArray[i];
  for (let j = 0; j < recipe.ingredients.length; j++) {
    const recipeIngredient = recipe.ingredients[j];
    // if unit and quantity is not defined, set it to " "
    if (recipeIngredient.unit === undefined) {
      recipeIngredient.unit = " ";
    }
    if (recipeIngredient.quantity === undefined) {
      recipeIngredient.quantity = " ";
    } // add ":" before quantity
    else {
      recipeIngredient.quantity = ": " + recipeIngredient.quantity;
    }
    ingredient.innerHTML += `
      <div class="recipe-item__info-item-ingredient">
      <span class="bold-ingredient">${recipeIngredient.ingredient}</span>
      <span>${recipeIngredient.quantity}</span>
      <span class="unit">${recipeIngredient.unit}</span>
      </div>
    `;

    //add ingredient only 1 time to the first dropdown
    if (j === 0) {
      const dropdown = document.querySelector(".add-ingredients");
      const option = document.createElement("button");
      option.value = recipeIngredient.ingredient;
      option.textContent = recipeIngredient.ingredient;
      dropdown.appendChild(option);

      // display none by default
      option.style.display = "none";
      // add class to the option
      option.classList.add("dropdown-item");
      // display the option when the button is clicked
      dropdown.addEventListener("click", () => {
        option.style.display = "block";
      });
    }
  }
}

// use text search to filter recipes by using everythings in the recipe
const search = document.querySelector(".search");
search.addEventListener("keyup", (e) => {
  const searchText = e.target.value.toLowerCase();
  const recipes = document.querySelectorAll(".recipe-item");
  recipes.forEach((recipe) => {
    const recipeName = recipe
      .querySelector(".card-title")
      .textContent.toLowerCase();
    const recipeDescription = recipe
      .querySelector(".description")
      .textContent.toLowerCase();
    const recipeIngredients = recipe
      .querySelector(".ingredients")
      .textContent.toLowerCase();
    const ustensils = recipe
      .querySelector(".ustensils")
      .textContent.toLowerCase();
    if (
      recipeName.includes(searchText) ||
      recipeDescription.includes(searchText) ||
      recipeIngredients.includes(searchText) ||
      ustensils.includes(searchText)
    ) {
      recipe.style.display = "block";
    } else {
      recipe.style.display = "none";
    }
    // need 3 caracters to search
    if (searchText.length < 3) {
      recipe.style.display = "block";
    }
  });
});

// filter recipes
