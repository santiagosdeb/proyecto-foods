require("dotenv").config();
const { Router } = require("express");
const axios = require('axios');
const { Diet } = require("../../db");
const { API_KEY } = process.env; 

const router = Router();

router.get("/", async(req,res) => {
    try {
        const validator = await Diet.findAll();
        if(!validator.length){
            const diets = [];

            const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`)
            info.data.results.map(recipe => {
                recipe.diets.map(diet => {
                diets.push({
                    name: diet,
                })
            })
        });

        const setDiets = Array.from(new Set(diets.map(diet => diet.name)));
        setDiets.push('vegetarian')
        const dietsDb = await Promise.all(setDiets.map(name => Diet.findOrCreate({ where: { name } })));
        res.send(dietsDb)
        } 
        res.send(validator) 
    } catch (error) {
        res.send(error.message)
    };
});
    

module.exports = router;