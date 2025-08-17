// controllers/recipesController.js
const Recipe = require('../models/recipeModel');

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, tags, stars } = req.body;
    const newRecipe = await Recipe.create({
      title,
      description,
      tags,
      stars
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Failed to create recipe" });
  }
};

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      order: [['created_at', 'DESC']]
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
};

// Update recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { title, description, tags, stars } = req.body;
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    recipe.title = title;
    recipe.description = description;
    recipe.tags = tags;
    recipe.stars = stars;
    await recipe.save();

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Failed to update recipe" });
  }
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    await recipe.destroy();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};
