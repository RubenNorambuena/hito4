-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    date_birth DATE  -- DATE para almacenar fechas
);

-- Tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    imagen VARCHAR(200),
    descripcion TEXT,  -- TEXT para permitir descripciones largas
    precio NUMERIC(10, 2),  -- NUMERIC para precios con decimales
    stock INT
);

-- Tabla de favoritos
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    id_product INT NOT NULL,
    id_user INT NOT NULL,
    CONSTRAINT fk_product FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE,  -- Llave foránea
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE  -- Llave foránea
);

-- Índices para mejorar el rendimiento en búsquedas
CREATE INDEX idx_favoritos_product ON favoritos (id_product);
CREATE INDEX idx_favoritos_user ON favoritos (id_user);
