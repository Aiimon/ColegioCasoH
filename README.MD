# 1. Componente Frontend - Portal Escolar Colegio B. O'Higgins

Este componente corresponde a la interfaz de usuario de la plataforma, desarrollada como una Single Page Application (SPA) utilizando React y empaquetada bajo el estándar de NPM.

## Requisitos Previos
* Node.js (Versión 18 o superior recomendada)
* NPM (Instalado automáticamente con Node)

## Instalación y Configuración

1. Entrar al directorio del frontend:
   cd colegio-frontend

2. Instalar todas las dependencias declaradas en el package.json:
   npm install

## Ejecución en Entorno de Desarrollo

Para levantar el servidor de desarrollo local (Vite/NPM):
npm run dev

Una vez ejecutado, abrir en el navegador la ruta informada en la terminal: http://localhost:5173/home

## Scripts Disponibles
* npm run dev: Levanta la aplicación local con Hot-Reload.
* npm run build: Empaqueta y optimiza la aplicación en la carpeta dist para producción.
* npm run lint: Ejecuta el validador ESLint para asegurar la calidad del código limpio.

<br>

# 2. Backend For Frontend (BFF) - API Gateway Service

Componente centralizador que actúa como la puerta de entrada única del ecosistema. Implementa Spring Cloud Gateway para gestionar el enrutamiento dinámico hacia los microservicios, resolver problemas de CORS y centralizar la seguridad.

## Requisitos Previos
* Java Development Kit (JDK) 17 o superior
* Apache Maven 3.8+
* Servidor Eureka en ejecución (puerto 8761)

##  Configuración del Puerto
El servicio se levanta por defecto en el puerto:
* Puerto: 8080 (Expuesto de forma directa hacia el cliente React)

##  Instalación y Ejecución

1. Compilar el proyecto con Maven:
   mvn clean install

2. Ejecutar la aplicación Spring Boot:
   mvn spring-boot:run

<br>

# 3. Microservicio Transaccional - Gestión Escolar

Este componente aloja la lógica de negocio modular e independiente del establecimiento, estructurado mediante un arquetipo ágil de Spring Boot.

## Requisitos Previos
* Java Development Kit (JDK) 17 o superior
* Servidor de Descubrimiento Eureka activo

## Identificación de Módulos y Puertos
* Microservicio Académico: Puerto 8081 (Gestión de matrículas y alumnos)
* Microservicio de Conducta: Puerto 8082 (Bitácora escolar con Patrón Factory Method)

##  Instalación y Ejecución

1. Compilar el submódulo de forma limpia:
   mvn clean install

2. Levantar el servicio en su respectivo entorno local:
   mvn spring-boot:run

##  Pruebas Unitarias y Cobertura
Para ejecutar las pruebas unitarias (JUnit 5 / Mockito) y validar el porcentaje de cobertura exigido por la pauta:
mvn test

Los resultados y reportes de cobertura se guardarán automáticamente en la ruta estandarizada target/site/jacoco/index.html.

<br>

# 4. Guía de Uso: Arquetipos Estructurados de Maven

Este repositorio contiene el proyecto base estructurado (Proyecto Padre Multi-Módulo) que sirve como arquetipo institucional para el desarrollo uniforme de microservicios en el establecimiento.

## Cómo generar un nuevo Microservicio basado en nuestro Arquetipo

Si el colegio requiere expandir la plataforma (por ejemplo, añadir un módulo de Finanzas o Asistencia), se debe registrar el nuevo módulo hijo bajo la herencia del POM padre siguiendo estos pasos:

1. Declarar el nuevo módulo en el archivo pom.xml raíz (Padre):

```xml
<modules>
    <module>api-gateway</module>
    <module>eureka-server</module>
    <module>gestion-academica</module>
    <module>asistencia-conducta</module>
    <module>nuevo-microservicio</module>
</modules>
```
Crear la estructura de carpetas base usando la convención estándar:

src/main/java/com/colegio/tu_modulo

src/main/resources/application.yml

Heredar las dependencias globales en el nuevo pom.xml hijo sin repetir versiones:

```xml
<parent>
    <groupId>com.colegio</groupId>
    <artifactId>colegio-parent</artifactId>
    <version>1.0.0</version>
</parent>
```
Al compilar desde la raíz con el comando mvn clean install, Maven empaquetará el nuevo módulo automáticamente garantizando que utilice las mismas versiones estables de Spring Boot, herramientas de pruebas y seguridad de todo el ecosistema.
<br>
