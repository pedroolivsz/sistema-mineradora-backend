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

-- =========================================
-- TABELA: EQUIPAMENTO
-- =========================================

CREATE TABLE equipamento (
id SERIAL NOT NULL,
nome VARCHAR(100) NOT NULL,
modelo VARCHAR(100) NOT NULL,
fabricante VARCHAR(100) NOT NULL,
data_aquisicao DATE NOT NULL,
status VARCHAR(20) NOT NULL,
cidade_id INTEGER NOT NULL,

CONSTRAINT pk_equipamento
    PRIMARY KEY (id),

CONSTRAINT ck_equipamento_status
    CHECK (status IN ('ATIVO', 'MANUTENCAO', 'INATIVO')),

CONSTRAINT fk_equipamento_cidade
    FOREIGN KEY (cidade_id)
    REFERENCES cidade(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- =========================================
-- TABELA: SERVICO
-- =========================================

CREATE TABLE servico (
id SERIAL NOT NULL,
nome VARCHAR(100) NOT NULL,
descricao TEXT NOT NULL,
data_inicio DATE NOT NULL,
data_fim DATE NOT NULL,
valor NUMERIC(12,2) NOT NULL,

CONSTRAINT pk_servico
    PRIMARY KEY (id),

CONSTRAINT ck_servico_valor
    CHECK (valor >= 0),

CONSTRAINT ck_servico_datas
    CHECK (data_fim >= data_inicio)
);

-- =========================================
-- TABELA: SERVICO_EQUIPAMENTO
-- =========================================

CREATE TABLE servico_equipamento (
servico_id INTEGER NOT NULL,
equipamento_id INTEGER NOT NULL,

CONSTRAINT pk_servico_equipamento
    PRIMARY KEY (servico_id, equipamento_id),

CONSTRAINT fk_servico_equipamento_servico
    FOREIGN KEY (servico_id)
    REFERENCES servico(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT fk_servico_equipamento_equipamento
    FOREIGN KEY (equipamento_id)
    REFERENCES equipamento(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
