const PORT = 8000;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const newsSources = [
  { name: 'Guardian', address: 'https://www.theguardian.com/environment/climate-crisis', base: 'https://www.theguardian.com/' },
  { name: 'thetimes', address: 'https://www.thetimes.co.uk/environment', base: '' },
  { name: 'The New York Times', address: 'https://www.nytimes.com/section/climate', base: '' }
];

const articles = [];

// Use Promise.all to make multiple requests concurrently
const fetchArticles = async () => {
  const requests = newsSources.map(async (source) => {
    try {
      const response = await axios.get(source.address);
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr('href');
        articles.push({
          title,
          url: source.base + url,
          source: source.name,
        });
      });
    } catch (error) {
      console.error(`Error fetching articles from ${source.name}: ${error}`);
    }
  });

  await Promise.all(requests);
};

fetchArticles().then(() => {
  app.get('/', (req, res) => {
    res.json("Welcome to the climate change news API");
  });

  app.get('/news', (req, res) => {
    res.json(articles);
  });

  app.get('/news/:newspaperId', async (req, res) => {
    const newspaperId = req.params.newspaperId;

    const newspaper = newsSources.find((source) => source.name === newspaperId);

    if (newspaper) {
      const { address, base } = newspaper;

      try {
        const response = await axios.get(address);
        const html = response.data;
        const $ = cheerio.load(html);
        const specificArticles = [];

        $('a:contains("climate")', html).each(function () {
          const title = $(this).text();
          const url = $(this).attr('href');
          specificArticles.push({
            title,
            url: base + url,
            source: newspaperId,
          });
        });
        res.json(specificArticles);
      } catch (error) {
        console.error(`Error fetching articles from ${newspaperId}: ${error}`);
        res.status(500).json({ error: `Error fetching articles from ${newspaperId}` });
      }
    } else {
      res.status(404).json({ error: `Newspaper ${newspaperId} not found` });
    }
  });

  app.listen(PORT, () => {
    console.log('Server is running on port 8000');
  });
});
