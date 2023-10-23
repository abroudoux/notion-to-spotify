# Spotify automatic play from Notion

Launch randomly an album from your Notion database

## Clone this repository

```bash
git clone https://github.com/abroudoux/spotify-automatic-play
```

## Download and install Spotify 

### With Homebrew

```bash
brew install --cask spotify
```

### Manually 

[Download and install](http://www.spotify.com/download) the Spotify
desktop application [here](http://www.spotify.com/download)


## Install and setup Shpotify

> The explanations come from [the shpotify repository](https://github.com/hnarayanan/shpotify)

### With Homebrew

The easiest way to install shpotify is by using the [Homebrew package
manager](http://brew.sh):

```
brew install shpotify
```

### Manual installation

If you don’t use Homebrew, you can install the script manually by
following a few simple steps:

1. Fetch a copy of this repository, either with git or [download the
   zip archive](https://github.com/hnarayanan/shpotify/archive/master.zip).

2. Navigate to the folder where you fetched the repository (unzip if
   needed) and make sure the file called `spotify` is executable:
   ```bash
   cd shpotify
   chmod +x spotify
   ```

3. Copy the file `spotify` to a convenient location in your `PATH`, or
   set your `PATH` to include the folder where the file is located.

### Connecting to Spotify’s API

Shpotify needs to connect to Spotify’s API in order to find music by
name. It is very likely you want this feature!

To get this to work, you first need to sign up (or into) Spotify’s
developer site and [create an *Application*][spotify-dev]. Once you’ve
done so, you can find its `Client ID` and `Client Secret` values and
enter them into your shpotify config file at `${HOME}/.shpotify.cfg`.

Be sure to quote your values and don’t add any extra spaces. When
done, it should look like the following (but with your own values):

```bash
CLIENT_ID="abc01de2fghijk345lmnop"
CLIENT_SECRET="qr6stu789vwxyz"
```

## Install dependencies

```bash
npm install
```
or 

```bash
yarn install
```

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
