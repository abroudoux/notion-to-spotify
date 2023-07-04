node get.js

cat notion-export.json | jq '.[] | select(.properties.Seen.checkbox == false) | "\(.properties.Name.title[0].plain_text) - \(.properties.Realisator.rich_text[0].plain_text)"' > albums.txt

# node search.js

# fileResults="filmsNetflix.txt"

# if [[ -f "$fileResults" ]]; then
#     echo -e "Les films/séries disponibles sur Netflix sont :"
#     cat "$fileResults"
# else
#     echo "Le fichier $fileResults n'existe pas."
# fi
