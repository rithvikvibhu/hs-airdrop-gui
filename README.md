# Handshake Airdrop GUI

[![GitHub license](https://img.shields.io/github/license/rithvikvibhu/hs-airdrop-gui?)](https://github.com/rithvikvibhu/hs-airdrop-gui)
[![GitHub stars](https://img.shields.io/github/stars/rithvikvibhu/hs-airdrop-gui?)](https://github.com/rithvikvibhu/hs-airdrop-gui/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/rithvikvibhu/hs-airdrop-gui?)](https://github.com/rithvikvibhu/hs-airdrop-gui/issues)
[![Github all releases](https://img.shields.io/github/downloads/rithvikvibhu/hs-airdrop-gui/total?)](https://github.com/rithvikvibhu/hs-airdrop-gui/releases)
[![GitHub tags](https://img.shields.io/github/tag/rithvikvibhu/hs-airdrop-gui?)](https://github.com/rithvikvibhu/hs-airdrop-gui/tags)

Redemption tool for the Handshake network's decentralized airdrop to open source developers.

SSH, PGP and Faucet rewards are supported.  
Binaries for Linux and Windows are availabile in Releases. MacOS coming soon.

This uses code from https://github.com/handshake-org/hs-airdrop under the hood to create proofs.

## Warning
This app requires decrypted access to your **SSH/PGP private keys** (depending on the claim type chosen).

Even if I solemnly swear that I am up to ~no~ good, it's important for you to **review the code** of this (and any other app) before entering your keys.  
Very few changes have been made to the core [proof creating logic](https://github.com/rithvikvibhu/hs-airdrop-gui/blob/master/src/airdrop.js) and can be easily compared with [the original hs-airdrop](https://github.com/handshake-org/hs-airdrop/blob/master/bin/hs-airdrop).

If you are comfortable with a terminal, check out [the official cli](https://github.com/handshake-org/hs-airdrop).

## Usage

Download the [latest release](https://github.com/rithvikvibhu/hs-airdrop-gui/releases) for your platform and simply run it (exe for Windows, appimage/snap for Linux).

<img src="https://i.imgur.com/hBBGv7u.png" width="45%"></img> <img src="https://i.imgur.com/dA24rAD.png" width="45%"></img> <img src="https://i.imgur.com/CuLh66Y.png" width="45%"></img> <img src="https://i.imgur.com/VIwoCUt.png" width="45%"></img> <img src="https://i.imgur.com/5fe293G.png" width="45%"></img> <img src="https://i.imgur.com/AvOS6uI.png" width="45%"></img>

## Issues

Feel free to open issues if there are problems with the app.

## Development

First install dependencies with (NodeJs v14)

```sh
npm install
```

### To start a Development Server

```sh
npm run electron:serve
```

### To Build the App

```sh
npm run electron:build
```
