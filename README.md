# 🏆 Prueba Técnica - Desarrollador Backend Semi-Senior

## 📄 Instrucciones Generales

**Tiempo estimado:** Unas 3 horas, pero puedes organizarte como prefieras y enviarlo mañana.  
**Uso de herramientas:** Puedes usar **IA (ChatGPT, Copilot, etc.)** o cualquier otro recurso que consideres útil. Sin embargo, debes asegurarte de entender tu solución y estar listo para sustentarla si es necesario.  
**Tecnologías:** NestJS, PostgreSQL, AWS

---

## 1. Arquitectura y Desarrollo en NestJS

### 1.1 Creación de API REST

Desarrolla una API en **NestJS** con los siguientes requisitos:

1. Crea un servicio `UsersService` y un controlador `UsersController`.
2. Implementa los siguientes endpoints:
   - `POST /users` → Crear un usuario con `name`, `email` y `password`.
   - `GET /users/:id` → Obtener un usuario por su `id`.
   - `PATCH /users/:id` → Actualizar el nombre y email de un usuario.
   - `DELETE /users/:id` → Eliminar un usuario.
3. Utiliza **PostgreSQL (RDS)** para almacenar los usuarios.
4. Usa un ORM de tu preferencia (**TypeORM, Prisma o Sequelize**).
5. Aplica **validaciones con `class-validator`** y usa **DTOs**.
6. La contraseña debe almacenarse de forma segura con `bcrypt`.

**Pregunta adicional:**

- ¿Qué ventajas ofrece NestJS sobre Express para la escalabilidad de aplicaciones backend?

---

## 2. Modelado de Datos en PostgreSQL

Se te pide modelar una base de datos en **PostgreSQL** para almacenar pedidos de una tienda en línea.

### 2.1 Estructura esperada de un pedido:

Cada pedido tiene:

- `id`: Identificador único (UUID).
- `user_id`: ID del usuario que hizo el pedido.
- `status`: Estado del pedido (`pending`, `shipped`, `delivered`).
- `items`: Relación con los productos comprados en el pedido.
- `total`: Monto total del pedido.
- `created_at`: Fecha de creación del pedido.

### 2.2 Requerimientos:

1. Crea las migraciones para la base de datos usando **TypeORM, Prisma o Sequelize**.
2. Define las relaciones necesarias entre usuarios y pedidos.
3. Implementa un endpoint `GET /orders/:user_id` que devuelva todos los pedidos de un usuario.

**Preguntas adicionales:**

- ¿Qué índices considerarías para optimizar las consultas?
- ¿Cómo manejarías transacciones en tu ORM elegido?

---

## 3. Preguntas sobre AWS

Contesta brevemente:

1. ¿Cuándo usarías **EC2** en lugar de **ECS** para desplegar microservicios?
2. Explica la diferencia entre **RDS y DynamoDB**.
3. ¿Qué es un **Application Load Balancer (ALB)** y cuándo lo usarías?
4. ¿Cómo almacenarías credenciales sensibles en AWS de forma segura?
5. ¿Qué rol tiene una **VPC** en la arquitectura de AWS?

---

## 4. Pruebas Unitarias en NestJS

Crea pruebas unitarias con **Jest** para `UsersService` en NestJS.

1. Implementa una prueba para verificar que `createUser()` almacena correctamente los datos en PostgreSQL.
2. Crea un mock del repositorio para evitar conexiones reales a la base de datos.
3. Asegúrate de probar la lógica de hash de contraseñas con `bcrypt`.

---

## 5. (Opcional) CI/CD con GitHub Actions y Terraform

Este punto es opcional y solo se evaluará si decides implementarlo.

1. **GitHub Actions:**

   - Crea un workflow en `.github/workflows/deploy.yml` que haga lo siguiente:
     - Instale dependencias (`npm ci` o `yarn install`).
     - Ejecute pruebas (`npm test` o `yarn test`).
     - Despliegue el código a AWS (puede ser un contenedor en ECS o una instancia EC2).

2. **Terraform:**
   - Escribe un archivo `main.tf` que defina la infraestructura en AWS:
     - Un recurso **PostgreSQL RDS**.
     - Una instancia de **ECS Fargate** o **EC2** para desplegar la API.
     - Un **ALB** para manejar el tráfico.
     - Variables para definir las credenciales de la base de datos.

**Pregunta adicional:**

- ¿Por qué usar Terraform en lugar de crear los recursos manualmente en AWS?

---

💪 **Envía tu código a una rama con tu nombre y crea un Pull Request en GitHub.** 💪

🎉 ¡Buena suerte! 🎉
