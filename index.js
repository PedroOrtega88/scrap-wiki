const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';




// Ruta principal
app.get('/', (req, res) => {
    axios.get(url)
        .then(response => {
            const $ = cheerio.load(response.data);


            const rapLinks = $('#mw-pages a').map((index, element) => $(element).attr('href')).get();

            
            const rapData = [];

           
           
        })
        .then(rapData => {
           
            console.log(rapData);

            res.send(`
                <html>
                    <head>
                        <title>Scraping Wikipedia - Músicos de Rap</title>
                    </head>
                    <body>
                        <h1> Wikipedia - Músicos de Rap</h1>
                        <ul>
                            ${rapData.map(data => `
                                <li>
                                    <h2>${data.title}</h2>
                                    <ul>
                                        ${data.images.map(image => `<li>Imagen: ${image}</li>`).join('')}
                                    </ul>
                                    <p>${data.paragraphs.join('</p><p>')}</p>
                                </li>
                            `).join('')}
                        </ul>
                    </body>
                </html>
            `);
        })
        .catch(error => {
            console.error('error:', error);
            res.status(500).send('error de');
        });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
