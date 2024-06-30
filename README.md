
# Evangelio Diario

Este proyecto obtiene el evangelio del día desde [Evangeli.net](https://evangeli.net/evangelio) y lo envía a números de WhatsApp especificados utilizando una API REST.

## Requisitos

- Node.js
- Una API de WhatsApp que acepte solicitudes POST para enviar mensajes

## Configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/barrerot/evangelio.git
   cd evangelio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en el directorio raíz del proyecto con el siguiente contenido:
   ```env
   WHATSAPP_API_URL=http://whatsapi.buluu.es:6001/v1/messages
   PHONE_NUMBERS=NUMEROS_DE_TELEFONO_EN_FORMATO_INTERNACIONAL_SEPARADOS_POR_COMA
   ```
   Ejemplo:
   ```env
   PHONE_NUMBERS=34699490161,34650834261
   ```

## Uso

Para obtener el evangelio del día y enviarlo a los números de WhatsApp configurados, ejecuta:
   ```bash
   node index.js
   ```

## Estructura del Proyecto

- `index.js`: Script principal que obtiene el evangelio del día y lo envía por WhatsApp.
- `.env`: Archivo de configuración para las variables de entorno.
- `package.json`: Dependencias y scripts del proyecto.

## Contribución

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit de los mismos (`git commit -am 'Añadir nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Crea un nuevo Pull Request.
