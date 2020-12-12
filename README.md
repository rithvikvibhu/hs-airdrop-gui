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

## Installation
This is a portable app and does not need to be installed anywhere.  
2 ways to go about this: either download prebuilt binaries, or build from source.

### Using pre-built binaries
Download the [latest release](https://github.com/rithvikvibhu/hs-airdrop-gui/releases) for your platform and simply run it (exe for Windows, appimage/snap for Linux).

Optionally, verify release signatures:
```sh
# Import this public key
gpg --recv-keys 0393D7636C08EFA8A781F9CDE85101DF1682E27F

# Download the SHA256SUMS.asc file included in each release

# Verify that it is signed with this key.
# The output should say: Good signature from "Rithvik Vibhu <rithvikvibhu@gmail.com>"
gpg --decrypt SHA256SUMS.asc

# Compare the executable digest with the one listed in SHA256SUMS.asc
sha256sum hs-airdrop-gui_0.1.0_amd64.snap

# If the hashes don't match, re-download the executable.
```

### Build from source
This is pretty much the same as the Development section below.
```sh
# Clone this repo
git clone https://github.com/rithvikvibhu/hs-airdrop-gui

# Build the app (nodejs v14 must is installed)
npm run electron:build

# The built app will be in ./electron_dist/
```

## Usage

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
