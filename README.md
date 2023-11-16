# Spotify automatic play from Notion

Launch randomly an album from your Notion database

## Clone this repository

```bash
git clone https://github.com/abroudoux/spotify-automatic-play
```

## Install dependencies

```bash
npm install
```
or 

```bash
yarn install
```

## Download and install Spotify 

### With Homebrew

```bash
brew install --cask spotify
```

### Manual installation

[Download and install](http://www.spotify.com/download) the Spotify
desktop application [here](http://www.spotify.com/download)


## Install and setup Shpotify

> The explanations come from [the shpotify repository](https://github.com/hnarayanan/shpotify) by [hnarayanan](https://github.com/hnarayanan)

## Create and setup environment

### Create a .env file

```bash
touch .env
```

### Setup like the .env.example

```bash
// Notion
NOTION_DATABASE_ID=""  // Copy link to view -> `https://www.notion.so/{notion_database_id}?v`
NOTION_API_KEY="" // Settings -> Connections -> Develop or manage integration -> New connection -> Start with 'secret_' 


// Spotify -> Go to "https://developer.spotify.com/dashboard/" then click to 'Create a new Application'
CLIENT_ID=""
CLIENT_SECRET=""
```

## Run the project !

```bash
npm run play
```

## Copyright and licences

MIT License

Copyright (c) 2023 abroudoux

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
