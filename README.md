# CreditStore

CreditStore es una aplicación web diseñada para ayudar a pequeños establecimientos comerciales a gestionar eficientemente las cuentas corrientes por crédito otorgadas a sus clientes. Esta solución es ideal para negocios como supermercados de barrio, fruteros, carniceros, polleros, panaderos, bodegas y establecimientos similares.

## Características principales

- Gestión de créditos y pagos asociados
- Configuración de tasas de interés personalizadas
- Generación de reportes de saldos en cuenta
- Cálculo automático de intereses y fechas de pago
- Interfaz intuitiva y fácil de usar

## Tecnologías utilizadas

- Frontend: Angular
- Backend: Spring Boot
- Base de datos: MySQL
- API: RESTful

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/LucianRuiz/CreditStore_Frontend.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd CreditStore_Frontend
   ```

3. Instala las dependencias:
   ```
   npm i --force
   ```

4. Configura la base de datos MySQL en `src/main/resources/application.properties`

5. Ejecuta la aplicación:
   ```
   mvn spring-boot:run
   ```

## Uso

1. Accede a la aplicación a través de tu navegador web en `http://localhost:8080`
2. Regístrate como nuevo usuario o inicia sesión si ya tienes una cuenta
3. Comienza a gestionar los créditos de tus clientes y a realizar seguimiento de los pagos


## Configuración

Para configurar la aplicación, necesitarás modificar el archivo `application.properties` en el directorio `src/main/resources/`. Asegúrate de configurar correctamente la conexión a tu base de datos MySQL.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/creditstore
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=update
```

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Fork el repositorio
2. Crea una nueva rama (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios y haz commit de ellos (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
