/*const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';
const principalURL = 'https://es.wikipedia.org'
*/
/*

// Ruta principal
app.get('/', async (req, res) => {
    try {
        
        const response = await axios.get(url)
        const html = response.data
        const $ = cheerio.load(html)

        const links = []
        $('#mwpages a').each( (index, element) => {
            const link = $(element). attr('href')
            links.push(link)
            console.log('link--->', link)
        })

        for(const link of links ) {
            const innerURL = '${principalURL}${link}'
            const response = await axios.get(innerURL)
            const innerPage = response.data
            const $ = cheerio.load(innerPage)

            const title = ('h1').text()
            const imgs = []
            const texts = []

            $('img').each((index,element)) => {
                const img = (element).attr('src')
                img.push(img)
            })   
            $('img').each((index,element)) => {
                const text = (element).text('src')
                text.push(text)
            }) 
        }    

            
    

        

    } catch {


    }
   req.setEncoding('hola')
})
   
   
   
    /* axios.get(url)
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
});*/

const express = require('express')
const app = express()
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap'
const principalURL = 'https://es.wikipedia.org'

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    const links = []
    $('#mw-pages a').each((index, element) => {
      const link = $(element).attr('href')
      links.push(link)
    })
    
    const finalArray = [] 
    
    for(const link of links) {
      const innerURL = `${principalURL}${link}`
      const response = await axios.get(innerURL)
      const innerPage = response.data
      const $ = cheerio.load(innerPage)
      
      
      const obj = {
        imgs: [],
        texts: []
      }
      
      const title = $('h1').text()
      obj.title = title
     
      $('img').each((index, element) => {
        const img = $(element).attr('src')
        obj.imgs.push(img)
        console.log('imgs-->', img)
      })
      
      $('p').each((index, element) => {
          const text = $(element).text()
          obj.texts.push(text)
          console.log('texts-->', text)
        })
      finalArray.push(obj)
    }
        
    res.send(`
    <p>LINKS</p>
    <ul>
      ${links.map(data => `<li>${data}</li>`).join('')}
    </ul>
    <p>Cantantes</p>
    <ul>
      ${finalArray.map(data => `
        <li>
          <h2>${data.title}</h2>
          <p>Imagenes: ${data.imgs.map(img => `<p>${img}</p>`).join('')}</p>
          <p>Textos: ${data.texts.map(text => `<p>${text}</p>`).join('')}</p>
        </li>`
      )}
    </ul>
    `)

  } catch(error) {
    console.log(error)
  }
})


app.listen(3000, () => {
  console.log('Express está escuchando en el puerto http://localhost:3000')
})





/*
// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
*/