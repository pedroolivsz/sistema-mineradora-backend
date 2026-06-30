-- =========================================
-- TABELA: CIDADE
-- =========================================

CREATE TABLE cidade (
    id SERIAL NOT NULL,
    nome VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    populacao INTEGER NOT NULL,

    CONSTRAINT pk_cidade
        PRIMARY KEY (id)
);

-- =========================================
-- TABELA: FUNCIONARIO
-- =========================================

CREATE TABLE funcionario (
id SERIAL NOT NULL,
nome VARCHAR(100) NOT NULL,
cargo VARCHAR(100) NOT NULL,
telefone VARCHAR(20) NOT NULL,
email VARCHAR(150) NOT NULL,
salario NUMERIC(10,2) NOT NULL,
cidade_id INTEGER NOT NULL,

CONSTRAINT pk_funcionario
    PRIMARY KEY (id),

CONSTRAINT uq_funcionario_email
    UNIQUE (email),

CONSTRAINT fk_funcionario_cidade
    FOREIGN KEY (cidade_id)
    REFERENCES cidade(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
