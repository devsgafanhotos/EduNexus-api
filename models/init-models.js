var DataTypes = require("sequelize").DataTypes;
var _candidato = require("./candidato");
var _iteracoes = require("./iteracoes");
var _tokens = require("./tokens");

function initModels(sequelize) {
  var candidato = _candidato(sequelize, DataTypes);
  var iteracoes = _iteracoes(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);

  iteracoes.belongsTo(candidato, { as: "id_candidato_candidato", foreignKey: "id_candidato"});
  candidato.hasMany(iteracoes, { as: "iteracos", foreignKey: "id_candidato"});
  tokens.belongsTo(candidato, { as: "id_candidato_candidato", foreignKey: "id_candidato"});
  candidato.hasMany(tokens, { as: "tokens", foreignKey: "id_candidato"});

  return {
    candidato,
    iteracoes,
    tokens,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
