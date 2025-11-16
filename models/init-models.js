var DataTypes = require("sequelize").DataTypes;
var _candidato = require("./candidato");
var _tokens = require("./tokens");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var candidato = _candidato(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  tokens.belongsTo(candidato, { as: "id_candidato_candidato", foreignKey: "id_candidato"});
  candidato.hasMany(tokens, { as: "tokens", foreignKey: "id_candidato"});

  return {
    candidato,
    tokens,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
