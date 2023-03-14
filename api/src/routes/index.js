const { Router } = require('express');
// Importar todos los routers;
const recipesRouter = require('./routers/recipes');
const dietsRouter = require('./routers/diets');


const router = Router();

// Configurar los routers
router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);
//https://api.spoonacular.com/recipes/complexSearch?apiKey=3af7702afdc147229144b871cc040929&number=100&addRecipeInformation=true
// para get de 100 juegos

module.exports = router;
