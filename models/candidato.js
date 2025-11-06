const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidato', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    senha: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    criado_em: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'candidato',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "candidato_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
