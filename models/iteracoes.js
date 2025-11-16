const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('iteracoes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_candidato: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'candidato',
        key: 'id'
      }
    },
    titulo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recomendacao: {
      type: DataTypes.JSON,
      allowNull: true
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'iteracoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "iteracoes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
