var DataTypes = require("sequelize").DataTypes;
var _candidato = require("./candidato");
var _token = require("./token");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var candidato = _candidato(sequelize, DataTypes);
  var token = _token(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  token.belongsTo(candidato, { as: "id_candidato_candidato", foreignKey: "id_candidato"});
  candidato.hasMany(token, { as: "token", foreignKey: "id_candidato"});

  return {
    candidato,
    token,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
