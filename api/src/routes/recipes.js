const { Router } = require('express');

const {createRecipe,allRecipes,getRecipeById} = require(`../controllers/recipes`);

const router = Router();

router.get("/",allRecipes);
router.post("/create",createRecipe);
router.get("/:id",getRecipeById);

module.exports =router;