INSERT INTO alumno (rut, nombre, apellido) VALUES ('12345678-9', 'Esteban', 'Quito');
INSERT INTO alumno (rut, nombre, apellido) VALUES ('98765432-1', 'Alan', 'Brito');
INSERT INTO alumno (rut, nombre, apellido) VALUES ('11111111-1', 'Aquiles', 'Brinco');

-- Inserción de los 4 usuarios de prueba con la clave '123456' encriptada en BCrypt
INSERT INTO usuarios (email, password, rol, activo, fecha_creacion) VALUES ('admin@colegio.cl', '$2a$10$X5ptBLXUvEclV4g.l1Lby.p.Y8Z3fWnL6Vl7Ua2M0v6yG8r1Sclg2', 'ROLE_ADMIN', true, NOW());

INSERT INTO usuarios (email, password, rol, activo, fecha_creacion) VALUES ('profesor@colegio.cl', '$2a$10$X5ptBLXUvEclV4g.l1Lby.p.Y8Z3fWnL6Vl7Ua2M0v6yG8r1Sclg2', 'ROLE_PROFESOR', true, NOW());

INSERT INTO usuarios (email, password, rol, activo, fecha_creacion) VALUES ('apoderado@colegio.cl', '$2a$10$X5ptBLXUvEclV4g.l1Lby.p.Y8Z3fWnL6Vl7Ua2M0v6yG8r1Sclg2', 'ROLE_APODERADO', true, NOW());

INSERT INTO usuarios (email, password, rol, activo, fecha_creacion) VALUES ('alumno@colegio.cl', '$2a$10$X5ptBLXUvEclV4g.l1Lby.p.Y8Z3fWnL6Vl7Ua2M0v6yG8r1Sclg2', 'ROLE_USUARIO', true, NOW());