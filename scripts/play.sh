node src/get.js

cat notion-export.json | jq '.[] | select(.properties.Listened.checkbox == false) | "\(.properties.Title.title[0].plain_text) - \(.properties.Artist.rich_text[0].plain_text)"' > albums.txt

node src/play.js
