const { Router } = require('express');

const {dbDiets} = require(`../controllers/diets`);

const router = Router();

router.get("/",dbDiets);

module.exports =router;