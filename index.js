const API_KEY = "b1eef9e8c87f4552b6f753c8d513fc8b";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";
    if (!recipes) {
        console.error('Recipes array is undefined or null.');
        return;
    }
    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");
        const recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe image";

        const recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;

        recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = ` <strong> Ingredients: </strong>
         ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(", ")}`;

        const recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe";

        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(recipeLinkEl);
        recipeListEl.appendChild(recipeItemEl);


    });

}

async function getRecipes() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

// async function getRecipes() {
//     const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
//     const data = await response.json();
//     return data.recipes;
// }



async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes)
    console.log(recipes);
}

init();