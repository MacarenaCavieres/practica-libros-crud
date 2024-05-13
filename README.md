# Libros DB

## Requisitos

-   Versión de Node.js 20.11 / 21.2

## Instalaciones previas

```sh
npm install
```

Levantar servidor

```sh
npm run start
```

Para ver parte frontend

```sh
http://localhost:3000
```

## Tablas creadas en:

database/queries.sql

```sql
DROP TABLE IF EXISTS LIBROS;

CREATE TABLE LIBROS (
	ID VARCHAR PRIMARY KEY,
	NOMBRE VARCHAR NOT NULL,
	PRECIO INT CHECK(PRECIO >= 0),
	AUTOR VARCHAR NOT NULL
);

SELECT * FROM LIBROS;

-- seeders
INSERT INTO LIBROS (ID, NOMBRE, PRECIO, AUTOR) VALUES
('z-FrmrjC3B-ttWgg5n7Tu', 'NOMBRE 1', 100, 'AUTOR 1'),
('A-FrmrjC3B-ttWgg5n7Tu', 'NOMBRE 2', 200, 'AUTOR 2');
```
