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
