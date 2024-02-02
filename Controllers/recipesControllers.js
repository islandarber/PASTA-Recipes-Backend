import {pool} from '../db/pool.js'

export const getRecipes = async (req, res) => {
  try {
    const {rows:recipesArray} = await pool.query('SELECT * FROM recipes;');
    const { rows: ingredientsArray } = await pool.query('SELECT Recipes.id AS recipe_id, Recipes.name AS recipe_name, Ingredients.ingredient, RecipeIngredients.quantity FROM RecipeIngredients JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.id JOIN Recipes ON RecipeIngredients.recipe_id = Recipes.id');
    const recipesWithIngredients = [];

    recipesArray.forEach(recipe => {
      const recipeIngredients = ingredientsArray
          .filter(ingredient => ingredient.recipe_id === recipe.id)
          .map(({ ingredient, quantity }) => `${quantity} ${ingredient}`)
          .join(', ');
  
      const recipeWithIngredients = {
          ...recipe,
          ingredients: recipeIngredients,
      };
  
      recipesWithIngredients.push(recipeWithIngredients);
  });


    res.status(200).json(recipesWithIngredients);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export const getRecipe = async (req, res) => {
  const {id} = req.params;
  try {
    const {rows} = await pool.query('SELECT * FROM recipes WHERE id=$1;', [id]);
    if(rows.length === 0){
      res.sendStatus(404)
  } else {
      res.json(rows[0])
  }

  } catch (error) {
    res.status(500);
    
  }
}