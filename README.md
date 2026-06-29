# 🏛️ Plataforma Libro de Clases Digital - Colegio Bernardo O'Higgins de Coquimbo

Este repositorio aloja la solución informática distribuida diseñada para modernizar los procesos administrativos y pedagógicos del Colegio Bernardo O'Higgins de Coquimbo, eliminando de forma definitiva la fragmentación de la información mediante una arquitectura resiliente, desacoplada y de alta disponibilidad.

---

## 🗺️ Arquitectura General del Sistema

El ecosistema está estructurado bajo un patrón de **Microservicios** que garantiza el aislamiento de dominios, escalabilidad horizontal y total tolerancia a fallos.

![Diagrama de Arquitectura](./Diagrama/Diagrama%20de%20arquitectura.png)

<br>

# 💻 1. Componente Frontend - Portal Escolar Colegio B. O'Higgins

Este componente corresponde a la interfaz de usuario de la plataforma, desarrollada como una Single Page Application (SPA) utilizando **React junto con JavaScript** y empaquetada bajo el estándar de **NPM/Vite**. Implementa un renderizado eficiente vía Virtual DOM, inmutabilidad de estados para cálculos analíticos en tiempo real y hooks personalizados para el desacoplamiento lógico.

## Requisitos Previos
* Node.js (Versión 18 o superior recomendada)
* NPM (Instalado automáticamente con Node)

## Instalación y Configuración

1. Entrar al directorio del frontend:
```bash
cd colegio-frontend
```
2. Instalar todas las dependencias declaradas en el package.json:

```bash
npm install
```

3. Ejecución en Entorno de Desarrollo
Para levantar el servidor de desarrollo local con Vite/NPM:

```bash
npm run dev
```

Una vez ejecutado, abrir en el navegador la ruta informada en la terminal: http://localhost:5173/

Scripts Disponibles
* npm run dev: Levanta la aplicación local con Hot-Reload.

* npm run build: Empaqueta y optimiza la aplicación en la carpeta dist para producción.

* npm run lint: Ejecuta el validador ESLint para asegurar la calidad del código limpio.

## 🛡️ Resiliencia y Continuidad Operacional (Alta Disponibilidad)
El cliente cuenta con un diseño defensivo envuelto en bloques try-catch. Si el backend o la base de datos relacional en MySQL pierden conectividad, el frontend captura la excepción de inmediato y respalda de manera automática la estructura de datos JSON en el Local Storage indexado por curso, notificando al usuario mediante componentes Toast flotantes para evitar cualquier pérdida de datos en el aula.


# 🛡️ 2. Backend For Frontend (BFF) - API Gateway Service

Componente centralizador que actúa como la puerta de entrada única del ecosistema. Implementa Spring Cloud Gateway para gestionar el enrutamiento dinámico hacia los microservicios, resolver problemas de CORS y centralizar la seguridad perimetral.

## Requisitos Previos
* Java Development Kit (JDK) 17 o superior
* Apache Maven 3.8+
* Servidor Eureka en ejecución (puerto 8761)

## Configuración del Puerto
El servicio se levanta por defecto en el puerto:
* **Puerto:** 8080 (Expuesto de forma directa hacia el cliente React)
* **Seguridad Stateless:** Valida la firma de los tokens **JWT** que viajan en las cabeceras de las peticiones HTTP antes de rutar a los servicios internos de negocio.

## Instalación y Ejecución

1. Compilar el proyecto con Maven:
```bash
mvn clean install
```

2. Ejecutar la aplicación Spring Boot:
```bash
mvn spring-boot:run
```

# 🔍 3. Capa de Descubrimiento de Servicios - Eureka Server
Orquestador de infraestructura basado en Netflix Eureka Server que proporciona el mapeo y registro dinámico de red para todos los componentes del ecosistema distribuido.

* Características Clave
* Puerto de Escucha: 8761

Alta Disponibilidad: Permite el balanceo de carga elástico y el autoregistro automático de las instancias de microservicios en caliente.

Instalación y Ejecución
Compilar el proyecto con Maven:

```bash
mvn clean install
```
Levantar el servidor de descubrimiento:

```bash
mvn spring-boot:run
```
