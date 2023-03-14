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
            const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`)
            const apiRecipes = info.data.results.map(recipe => {
                    return {
                    id: recipe.id,
                    name: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    analyzedInstructions: recipe.analyzedInstructions.map(inst => { 
                        return inst.steps.map(step => {return step.step})
                    }),
                    dietas: recipe.diets.map(diet=>{return diet})
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
            const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true&titleMatch=${name}`) 
            const apiRecipesByName = info.data.results.map(recipe => {
                return {
                    id: recipe.id,
                    name: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    analyzedInstructions: recipe.analyzedInstructions.map(inst => { 
                        return inst.steps.map(step => {return step.step})
                    }),
                    dietas: recipe.diets.map(diet=>{return diet})
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
                return res.status(404).send("No existe ninguna receta con ese nombre")
            }

            res.send(allGamesByName)
        } catch (error) {
            res.send(error.message)
        }
    };
});

router.get('/:id', async(req,res)=>{
    const { id } = req.params;

    if(Number(id)){
     try {
        const info = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)

        return res.send({
            id: info.data.id,
            name: info.data.title,
            image: info.data.image,
            summary: info.data.summary,
            healthScore: info.data.healthScore,
            analyzedInstructions: info.data.analyzedInstructions.map(inst => { 
                return inst.steps.map(step => {return step.step})
            }),
            dietas: info.data.diets.map(diet=>{return diet})
        });    
    } catch (error) {
        res.send(error.message)       
    }
 }else{
    try {
        const recipeByIdDB = await Recipe.findByPk(id);
        if(!recipeByIdDB) return res.status(404).send("No hay recetas con este id")
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
        
        return res.send("Receta creada con éxito")
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = router;