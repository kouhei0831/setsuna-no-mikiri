# 刹那の見切り (Setsuna no Mikiri) - Project Overview

## Purpose
**刹那の見切り (Setsuna no Mikiri)** is a defensive action mini-game developed for DXC Technology's Family Day 2025 event. The game's purpose is to allow children (aged 3-8 years) of DXC employees to play as defenders protecting DXC's IT assets from various threats through quick reflexes and timing-based gameplay.

## Tech Stack
- **Framework**: Phaser.js 3.70.0 (HTML5 game framework)
- **Language**: JavaScript with ES Modules
- **Runtime**: Browser-based (no bundling required)
- **Server**: Custom ES Module-compatible HTTP server (Node.js)
- **Asset Loading**: SVG and PNG images loaded via Phaser's asset loader
- **UI Language**: Japanese with furigana for children

## Architecture Overview
The game follows a simple, single-file architecture approach:

### Core Structure
- **Main Game Logic**: All in `src/main.js` (single file for simplicity)
- **Asset Utilities**: Helper classes in `src/utils/` for programmatic asset generation
- **Game Entry Point**: `index.html` loads Phaser.js via CDN and imports main.js

### Phaser Scene System
1. **PreloadScene**: Handles asset loading with progress bar
2. **MenuScene**: Main menu with start button and version display  
3. **GameScene**: Core gameplay with 7 progressive stages
4. **EndingScene**: Victory/game over screens

### Game Mechanics
- **Single-button gameplay**: Space bar, mouse click, or touch
- **Timing-based defense**: Players react to visual signals when threats approach
- **Health system**: IT assets can take 2 hits before game over
- **Progressive difficulty**: 7 stages with increasing complexity
- **State management**: Player, IT Asset, Threat, and Signal states tracked independently

## Asset Management
- **SVG Assets**: UI elements and threat graphics in `assets/images/`
- **PNG Assets**: Character sprites and backgrounds in `assets/gen/images/`
- **Asset Generators**: Utility scripts for creating assets programmatically