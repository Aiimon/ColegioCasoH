-- ===================================================================
-- 1. CREACIÓN DE USUARIOS (Primero para generar los IDs: 1, 2, 3, 4)
-- ===================================================================
-- ID 1: Admin
INSERT INTO usuarios (email, password, rol, activo, fecha_creacion) 
VALUES ('admin@colegio.cl', '123456', 'ROLE_ADMIN', true, NOW());

-- ID 2: Profesor
INSERT INTO usuarios (email, password, rol, activo, fecha_creacion) 
VALUES ('profesor@colegio.cl', '$2a$10$X5ptBLXUvEclV4g.l1Lby.p.Y8Z3fWnL6Vl7Ua2M0v6yG8r1Sclg2', 'ROLE_PROFESOR', true, NOW());

-- ID 3: Apoderado
INSERT INTO usuarios (email, password, rol, activo, fecha_creacion) 
VALUES ('apoderado@colegio.cl', '$2a$10$X5ptBLXUvEclV4g.l1Lby.p.Y8Z3fWnL6Vl7Ua2M0v6yG8r1Sclg2', 'ROLE_APODERADO', true, NOW());

-- ID 4: Alumno
INSERT INTO usuarios (email, password, rol, activo, fecha_creacion) 
VALUES ('alumno@colegio.cl', '$2a$10$X5ptBLXUvEclV4g.l1Lby.p.Y8Z3fWnL6Vl7Ua2M0v6yG8r1Sclg2', 'ROLE_USUARIO', true, NOW());


INSERT INTO alumno (rut, nombre, apellido) VALUES ('12345678-9', 'Esteban', 'Quito');
INSERT INTO alumno (rut, nombre, apellido) VALUES ('98765432-1', 'Alan', 'Brito');
INSERT INTO alumno (rut, nombre, apellido) VALUES ('11111111-1', 'Aquiles', 'Brinco');