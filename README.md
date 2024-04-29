# Notion to Spotify CLI

## 💻・About

From a Notion list, launch randomly an album on Spotify

## 🎯・Installation

### Clone this repository

```bash
git clone https://github.com/abroudoux/notion-to-spotify-cli.git
```

### Install dependencies

```bash
npm install
```

### Download and install Spotify

#### With Homebrew

```bash
brew install --cask spotify
```

#### Manual installation

[Download and install](http://www.spotify.com/download) the Spotify
desktop application [here](http://www.spotify.com/download)

### Install and setup Shpotify

> The explanations are detailed in the [shpotify repository](https://github.com/hnarayanan/shpotify) by [hnarayanan](https://github.com/hnarayanan)

### Create and setup environment

#### Create a .env file

```bash
touch .env
```

#### Setup .env

```bash
NOTION_DATABASE_ID=""
NOTION_API_KEY=""
```

### Run the project !

```bash
npm run dev
```

## 🧑‍🤝‍🧑・Contributing

To contribute to `notion-to-spotify-cli` in development, follow these steps:

1. Fork the project.

2. Create a branch with [conventionnal name](https://www.conventionalcommits.org/en/v1.0.0/).

   - fix: `bugfix/the-bug-fixed`
   - features: `feature/the-amazing-feature`
   - test: `test/the-famous-test`
   - hotfix `hotfix/oh-my-god-bro`
   - wip `wip/the-work-name-in-progress`

## 🎯・Roadmap

- [ ] Increase performance
- [ ] Automatic checked of the album choosed when finished
- [ ] Send notification to the client
- [ ] Implement tests

## 📑・Licence

This project is under MIT license. For more information, please see the file [LICENSE](./LICENSE).
