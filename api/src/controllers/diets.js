const axios = require("axios");
require('dotenv').config()
const {spoonacularURL,YOUR_API_KEY} = process.env;
const {Diet} =require('../db'); //Datos de la base de datos

async function chargeDiets(){
    try{       
        const recipes= await axios.get(`${spoonacularURL}/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);       
        let diets=["vegan","vegetarian","gluten free"]; 
  
        recipes.data.results.map(d=>{                    
            d.diets.forEach(element => {
                if(!diets.includes(element)){
                    diets.push(element);
                }
            });
        })
        const ArrayDiets=[];

        diets.forEach((element,index) => {
            const diet={
                id:index,
                name:element
            }
            ArrayDiets.push(diet);
        });

        Diet.bulkCreate(ArrayDiets);

        console.log("dietas cargadas en db correctamente");

    }catch(e){
        console.log(e);
    }   
}

async function dbDiets(req,res){
    try{
        let diets= await Diet.findAll();

        diets=diets.map(d=> {
            let diet={                
                id:d.id,
                name:d.name                   
            }
            return diet;
        }
    );

        res.json(diets).status(200)
    }catch(e){
        console.log(e);
        res.send("Error").status(500);
    }
}

module.exports ={
    chargeDiets,
    dbDiets
}
