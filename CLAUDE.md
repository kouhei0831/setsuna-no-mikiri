# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

[日本語版はこちら](./CLAUDE.ja.md)

## Project Overview

**刹那の見切り (Setsuna no Mikiri)** - A defensive action mini-game for DXC Technology's Family Day 2025 event. Players protect DXC's IT assets from threats through quick reflexes.

- **Version**: 2.0.0
- **Target**: Children aged 3-8 years (DXC employees' children)
- **Tech Stack**: Phaser.js 3.70.0, JavaScript (ES Modules), HTML5
- **Language**: Japanese with furigana for children

## Common Development Commands

### Running the Development Server
```bash
# Option 1: Standard http-server (port 8080)
npm start

# Option 2: ES Module compatible server (port 8001) - Recommended
node server-es.js
```

### Building and Testing
- **Build**: Not implemented yet (`npm build` is a placeholder)
- **Test**: Not implemented yet (`npm test` is a placeholder)
- **Lint/Typecheck**: No linting or type checking configured

## High-Level Architecture

### Game Scene Structure
The game uses Phaser's scene system with three main scenes:

1. **PreloadScene** (`src/main.js:7-61`): Handles asset loading with progress bar
2. **MenuScene** (`src/main.js:64-158`): Main menu with start button and version display
3. **GameScene** (`src/main.js:161-910`): Core gameplay implementation

### Asset Management System
- **SVG Assets**: UI elements and threats stored in `assets/images/`
- **PNG Assets**: Character sprites and backgrounds in `assets/gen/images/`
- **Asset Generators**: Utility scripts in `src/utils/` for programmatic asset creation:
  - `AssetGenerator.js`: Base class for asset generation
  - `StaticAssetGenerator.js`: Generates static UI elements
  - `AudioAssetGenerator.js`: Placeholder for audio generation

### Game State Management
The game implements a stage-based progression system with:
- **Player States**: normal, defending, damaged, victory, ko
- **IT Asset States**: normal, damaged, ko, victory
- **Threat States**: normal, cutin, ko, victory
- **Signal States**: normal, active, success, error

### Input Handling
- Single-button gameplay (Space, Click, or Tap)
- Full-screen tap area for mobile devices
- Input timing windows vary by stage difficulty

### Key Game Mechanics
1. **Defense Timing**: Players must react to visual signals when threats approach
2. **Health System**: IT assets can take 2 hits before game over
3. **Stage Progression**: 7 stages with increasing difficulty
4. **Visual Feedback**: Cut-in animations, shield effects, and state transitions

## Important Notes

### DXC Branding
- Primary color: #6B46C1 (DXC Purple)
- All UI elements follow DXC Technology brand guidelines
- Japanese text includes furigana for child readability

### Performance Considerations
- Target: 60 FPS on all devices
- Responsive design: 320px to 1920px width
- Browser support: Chrome 80+, Safari 13+, Firefox 75+

### Current Implementation Status
- ✅ Menu and loading screens
- ✅ Basic game loop with 7 stages
- ✅ Player and threat animations
- ✅ Victory and game over screens
- ✅ Frame counter for performance monitoring
- ❌ Sound effects and BGM
- ❌ Build process
- ❌ Test suite

### Development Tips
1. The game runs directly in browser without bundling - just refresh to see changes
2. Use `server-es.js` for proper ES Module support
3. Check browser console for detailed frame timing and performance metrics
4. Asset generation scripts can be run independently to create new graphics

### File Structure Conventions
- Game logic: All in `src/main.js` (single file for simplicity)
- Assets: SVG in `assets/images/`, PNG in `assets/gen/images/`
- Documentation: Design docs in `docs/`
- No build artifacts or node_modules in version control