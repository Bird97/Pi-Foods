const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },

    steps: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      defaultValue:"https://spoonacular.com/recipeImages/640117-312x231.jpg"
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max:100,
        min:0
      }
    },
  });
};
