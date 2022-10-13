const axios = require("axios");
require('dotenv').config()
const {spoonacularURL,YOUR_API_KEY} = process.env;
const {Recipe,Diet} =require('../db'); //Datos de la base de datos

//api
async function apiRecipes(req,res){
    try{     
        const recipes= await axios.get(`${spoonacularURL}/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);       
        const filtrados=recipes.data.results.map(d=>{
            let diets=[];           
            if(d.vegan){
                diets.push("vegan");
            }
            if(d.vegetarian){
                diets.push("vegetarian");
            }
            if(d.glutenFree){
                diets.push("gluten free");
            }
            diets=diets.concat(d.diets);

            const diet={
                name: d.title,
                image:d.image,
                id:d.id,
                diets: diets.filter((item,index)=>{
                    return diets.indexOf(item)===index;
                }),
                score: d.healthScore,
                maxReadyTime: d.readyInMinutes,
            }
            return diet;
        })

        return filtrados;

    }catch(e){
        console.log(e);
        return [];
    }   
}
//db
async function dbRecipes(req,res){
    try{
        let recipes= await Recipe.findAll(
            {include:{
                attributes: ["name"],
                model: Diet,
                through: {
                    attributes: [],
                  }
              },}
        );
        return recipes;
    }catch(e){
        console.log(e);
        return [];
    }
}
//all
async function allRecipes(req,res){
    const {name}=req.query;
    try{
        let dbre=await dbRecipes();
        let apire= await apiRecipes();
        let allre =dbre.concat(apire);
        if(name){
            let busqueda=allre.filter(recipe=>recipe.name.toLowerCase().includes(name.toLowerCase()));
            return res.send(busqueda).status(200);

        }else{           
            return res.send(allre).status(200);
        }       
    }catch(e){
        console.log(e);
        res.send("Se produjo un error").status(500);
    }
}
//id

function standar(buscado){
    let{id,name,summary,steps,image,score}= buscado;
    let dietas=[];
    buscado.diets.map(d=>{return dietas.push(d.name)});
    let recipe={
        id,
        name,
        summary,
        steps,
        image,
        score,
        diets:dietas,

    }
    
    return recipe;
}

async function getRecipeById(req,res){
    //si busca id de la db
    try{
        const {id}=req.params;
        if(id<0){
            buscado= await Recipe.findByPk(id.toUpperCase(),{include:Diet});
            if(buscado){
                
                return res.status(200).send(standar(buscado));
            }else{
                return res.status(404).json({ err: `No se encontró una receta con el id: ${id}` });
            } 
        }else{
            let buscado= await axios.get(`${spoonacularURL}/recipes/${id}/information?apiKey=${YOUR_API_KEY}`);
            const {image,summary,title,healthScore,diets,dishTypes,instructions}= buscado.data;

            let dietss=[];           
            if(buscado.data.vegan){
                dietss.push("vegan");
            }
            if(buscado.data.vegetarian){
                dietss.push("vegetarian");
            }
            if(buscado.data.glutenFree){
                dietss.push("gluten free");
            }
            dietss=dietss.concat(diets);

            const diet={
                name: title,
                image:image,
                id:id,
                diets: dietss.filter((item,index)=>{
                    return dietss.indexOf(item)===index;
                }),
                score: healthScore,
                dishTypes,
                summary,
                steps: instructions
            }

            //console.log(diet);
            res.send(diet);
        }    
    }catch(e){
        console.log(e);
        res.send("error").status(500);
    }
    


}
//create
let id=-1;
async function createRecipe(req,res){
    try{
        let {name,summary,score,steps,diets,image} = req.body;
        //creamos la receta
        let recipe= await Recipe.create({
            id:id--,
            name,
            summary,
            score,
            steps,
            image
        });

        let dietDB = await Promise.all(
            diets.map((d)=>{
                return Diet.findOne({where:{name: d}})
            })
        );
        
        recipe.setDiets(dietDB);

        //agregamos las dietas
        res.send("receta creada correctamente")

    }catch(e){
        console.log(e);
        res.send("error :C").status(500);
    }
    



}

module.exports ={
    apiRecipes,
    createRecipe,
    dbRecipes,
    allRecipes,
    getRecipeById
}

