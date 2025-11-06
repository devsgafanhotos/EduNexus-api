create database plataforma;
\c plataforma

CREATE TABLE candidato (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(150),
  senha varchar(1000),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table tokens(
    id SERIAL PRIMARY KEY,
    id_candidato integer references candidato(id),
    refresh_token text,

    foreign key (id_candidato) references candidato(id)
);