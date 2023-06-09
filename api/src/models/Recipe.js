const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    analyzedInstructions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    dietas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  });
};
