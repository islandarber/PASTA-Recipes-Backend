import express from 'express';
import { getRecipes, getRecipe } from '../Controllers/recipesControllers.js';

const recipesRouter = express.Router();

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:id', getRecipe);

export default recipesRouter;