require('dotenv').config();
const { Router } = require("express");
const axios = require('axios');
const { Recipe, Diet } = require('../../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const router = Router();

router.get('/', async(req,res) => {
    const { name } = req.query;
    
    if(!name) {
        try {
            // const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
            const info = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
            const apiRecipes = info.data.results.map(recipe => {
                let diets = recipe.diets.map(diet => {return diet})

                if(diets.includes("vegan")){
                    diets.push("vegetarian")
                };
                return {
                    id: recipe.id,
                    name: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    analyzedInstructions: recipe.analyzedInstructions.map(inst => { 
                        return inst.steps.map(step => {return step.step})
                    }),
                    dietas: diets,
                }
            });
    
            const dbRecipes = await Recipe.findAll();
            const allRecipes = [ ...dbRecipes, ...apiRecipes];

            res.send(allRecipes)
            
        } catch (error) {
            res.send(error.message)
        }
    };
    if(name) {
        try {
            //const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true&titleMatch=${name}`) 
            const info = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
            
            const apiRecipesByName = info.data.results
            .filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()))
            .map(recipe => {
                let diets = recipe.diets.map(diet => {return diet})

                if(diets.includes("vegan")){
                    diets.push("vegetarian")
                };

                return {
                    id: recipe.id,
                    name: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    analyzedInstructions: recipe.analyzedInstructions.map(inst => { 
                        return inst.steps.map(step => {return step.step})
                    }),
                    dietas: diets,
                }
            });
            const dbRecipesByName = await Recipe.findAll({
                where: {
                name: {
                    [Op.iLike]: '%' + name + '%'
             }
            }});

            const allGamesByName = [ ...dbRecipesByName, ...apiRecipesByName ];
            
            if(!allGamesByName.length){
                return res.status(404).send("That recipe isn't in our system!")
            }

            res.send(allGamesByName)
        } catch (error) {
            res.status(404).send("That recipe isn't in our system!")
        }
    };
});

router.get('/:id', async(req,res)=>{
    const { id } = req.params;

    if(Number(id)){
     try {
        const info = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
        
        const recipe = info.data.results.find(recipe => recipe.id === Number(id))

        if(recipe) {
            let diets = recipe.diets.map(diet=>diet);
            if(diets.includes("vegan")){
                diets.push("vegetarian")
            };
        
        const idRecipe = {
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            analyzedInstructions: recipe.analyzedInstructions.map(inst => { 
                return inst.steps.map(step => {return step.step})
            }),
            dietas: diets,
        };

        res.send(idRecipe)
    }else{
        res.status(404).send("Recipe not found")
    }
    } catch (error) {
        res.send(error.message)       
    }
  }else{
    try {
        const recipeByIdDB = await Recipe.findByPk(id);
        if(!recipeByIdDB) return res.status(404).send("Recipe not found")
        return res.send(recipeByIdDB)
    } catch (error) {
        res.send(error.message)
    }
 }
});

router.post('/post', async(req,res) => {
    try {
        const { name, image, summary, healthScore, analyzedInstructions, dietas } = req.body;
        if(!name || !image || !summary || !healthScore || !analyzedInstructions || !dietas) {
            return res.status(404).send("Faltan datos obligatorios para crear la receta")
        }
        const newRecipe = await Recipe.create(req.body);
        
        dietas.map(async(diet) => {
        const d = await Diet.findAll({where: {name: diet}})
        await newRecipe.addDiets(d)
        })
        
        return res.send("Recipe created succesfully")
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = router;