require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');

// URL del evangelio del día
const url = 'https://evangeli.net/evangelio';

// URL de la API de WhatsApp desde las variables de entorno
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;

// Números de teléfono desde las variables de entorno
const PHONE_NUMBERS = process.env.PHONE_NUMBERS.split(',');

// Función para enviar un mensaje por WhatsApp
const sendMessage = async (number, message) => {
    const postData = {
        number: number,
        message: message,
    };

    try {
        const response = await axios.post(WHATSAPP_API_URL, postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`Mensaje enviado a ${number}:`, response.data);
    } catch (error) {
        console.error(`Error al enviar el mensaje a ${number}:`, error.message);
        if (error.response) {
            console.log('Data:', error.response.data);
            console.log('Status:', error.response.status);
            console.log('Headers:', error.response.headers);
        } else if (error.request) {
            console.log('Request:', error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};

// Función para obtener el evangelio del día
const obtenerEvangelioDelDia = async () => {
    try {
        // Hacer la solicitud HTTP GET
        const response = await axios.get(url);
        const html = response.data;

        // Cargar el HTML en cheerio
        const $ = cheerio.load(html);

        // Selector específico del contenido del evangelio
        const selector = '#evangeli_avui > div.evangeli_text';
        
        // Extraer el contenido del evangelio
        const evangelio = $(selector).text().trim();

        // Verificar si se encontró el contenido del evangelio
        if (evangelio) {
            // Eliminar la línea "Texto del Evangelio" y mantener solo el versículo y el texto
            const resultado = evangelio.replace('Texto del Evangelio', '').trim();
            console.log("Evangelio del día:", resultado);
            
            // Enviar el evangelio por WhatsApp a cada número
            for (const number of PHONE_NUMBERS) {
                const messageResult = await sendMessage(number, resultado);
                if (messageResult) {
                    console.log(`Mensaje enviado a ${number}: ${resultado}`);
                }
            }
        } else {
            console.log("No se encontró el evangelio del día.");
        }
    } catch (error) {
        console.error('Error al obtener el evangelio del día:', error.response ? error.response.data : error.message);
    }
};

// Llamar a la función para obtener el evangelio del día y enviarlo por WhatsApp
obtenerEvangelioDelDia();
