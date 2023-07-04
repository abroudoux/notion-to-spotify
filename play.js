// const { promises: fsPromises } = require('fs');
// const fs = require('fs').promises;
// const puppeteer = require('puppeteer');

// let FilmsNetflix = [];

// async function readFile(filename) {
//     try {
//         const contents = await fsPromises.readFile(filename, 'utf-8');
//         FilmsList = contents.split(/\r?\n/);

//         return FilmsList;
//     } catch (err) {
//         console.log(err);
//     };
// };

// function extractFilmTitle(film) {
//     const filmParts = film.replace(/"/g, '').split(' - ');
//     return filmParts[0].trim();
// };

// async function getGoogleSearchResults(filmTitle) {
//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();

//     const searchQuery = `netflix ${filmTitle}`;
//     const encodedSearchQuery = encodeURIComponent(searchQuery);
//     const searchUrl = `https://www.google.com/search?q=${encodedSearchQuery}`;

//     await page.goto(searchUrl);
//     await page.waitForSelector('div.g');

//     const searchResults = await page.$$eval('div.g', (results) => {
//         results = results.slice(0, 1);

//         const titles = results.map((result) => {
//             const titleElement = result.querySelector('h3');
//             return titleElement ? titleElement.textContent : '';
//         });

//         return titles;
//     });

//     searchResults.forEach((title) => {
//         if (title.startsWith('Watch')) {
//             FilmsNetflix.push(filmTitle);
//         };
//     });

//     await browser.close();
// };

// async function processFilmsList() {

//     try {
//         const FilmsList = await readFile('./films.txt');

//         for (const film of FilmsList) {
//             const filmTitle = extractFilmTitle(film);
//             await getGoogleSearchResults(filmTitle);
//         };

//         try {
//             fs.writeFile('filmsNetflix.txt', FilmsNetflix.join('\n'), 'utf-8');
//         } catch (err) {
//             console.error('Une erreur s\'est produite lors de l\'écriture du fichier :', err);
//         }
//     } catch (err) {
//         console.error('Une erreur s\'est produite :', err);
//     };
// };

// processFilmsList().catch((error) => {
//     console.error('Une erreur s\'est produite :', error);
// });
