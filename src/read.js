const fs = require('fs');


fs.readFile('exports/notion-export.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Erreur de lecture du fichier : ", err);
        return;
    }

    const jsonContent = JSON.parse(data);
    const filteredData = jsonContent.filter(item => item.properties.Listened.checkbox === false);
    const albumsText = filteredData.map(item => `${item.properties.Title.title[0].plain_text} - ${item.properties.Artist.rich_text[0].plain_text}`).join('\n');

    fs.writeFile('albums.txt', albumsText, 'utf8', (err) => {
        if (err) {
            console.error("Erreur d'écriture dans le fichier : ", err);
            return;
        }
        console.log("Le fichier albums.txt a été créé avec succès.");
    });
});
