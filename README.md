# Climate Change News API

The Climate Change News API provides access to news articles related to climate change from various reputable sources. This API allows you to retrieve climate change news articles, along with their titles and URLs, from different news websites.

## Getting Started

To use the Climate Change News API, follow the instructions below:

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/gitadityakumar/Climate-Change-News-API.git 

   Install the required Node.js packages:npm install
Usage

Start the API server : npm start

The API server will run on port 8000 by default

Access the API endpoints:

Base URL: http://localhost:8000

Get All Articles:

Endpoint: /news

Method: GET

Description: Retrieves a list of climate change news articles from various sources.
Get Articles from a Specific Source:

Endpoint: /news/:newspaperId

Method: GET

Description: Retrieves climate change news articles from a specific news source identified by newspaperId.
Customize the API:

You can customize the list of news sources and their URLs by editing the newsSources array in the index.js file.
Error handling and additional features can be added as needed.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
This API uses Express.js for the web server.
Web scraping is performed using Axios and Cheerio.
Special thanks to the news sources providing climate change news.

### Acknowledgments
This API uses Express.js for the web server.

Web scraping is performed using Axios and Cheerio.

Special thanks to the news sources providing climate change news.





