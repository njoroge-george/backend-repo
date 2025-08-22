// routes/recipeRoutes.js
import express from "express";
const router = express.Router();
import recipeController from "../controllers/recipeController.js";

router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post("/", recipeController.createRecipe);
router.put("/:id", recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

export default router;
