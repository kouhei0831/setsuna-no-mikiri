# Codebase Structure

## Directory Layout
```
/
├── src/
│   ├── main.js                    # Main game logic (single file architecture)
│   └── utils/                     # Asset generation utilities
│       ├── AssetGenerator.js      # Base class for asset generation
│       ├── StaticAssetGenerator.js # Static UI element generation
│       └── AudioAssetGenerator.js # Audio generation (placeholder)
├── assets/
│   ├── images/                    # SVG assets
│   │   ├── signal_*.svg           # Game signal graphics
│   │   ├── threat_*.svg           # Enemy threat graphics  
│   │   ├── *_button.svg           # UI button graphics
│   │   └── background_menu.svg    # Menu background
│   ├── gen/images/                # Generated PNG assets
│   │   ├── player_character_*.png # Character sprites
│   │   └── game_background_*.png  # Game backgrounds
│   └── sounds/                    # Audio assets (placeholder)
├── docs/                          # Design documentation
├── index.html                     # Game entry point
├── server-es.js                   # ES Module compatible server
├── package.json                   # Node.js project configuration
└── CLAUDE.md                      # Development guidance
```

## Key Files

### src/main.js (Core Game)
- **Size**: ~1013 lines - single file contains entire game
- **Structure**: 
  - PreloadScene class (lines 6-60)
  - MenuScene class (lines ~64-134) 
  - GameScene class (lines ~136-1013) - main gameplay
  - EndingScene class
  - Game configuration and initialization

### Key GameScene Methods
- `startDefenseRound()`: Initiates gameplay sequence
- `showWarningSignal()`: Visual cue system
- `onDefenseInput()`: Input handling and timing validation
- `onDefenseSuccess()/onDefenseFail()`: Outcome handling
- `nextStage()`: Stage progression logic

### index.html
- Loads Phaser.js 3.70.0 from CDN
- Imports main.js as ES module
- Defines game container styling with DXC branding

### server-es.js
- Custom HTTP server with ES Module support
- CORS headers for development
- Enhanced logging with timestamps
- Serves on port 8001 (vs npm start on 8080)

## Game Architecture Patterns

### Scene Management
- Phaser's scene system handles state transitions
- Each scene has standard lifecycle: preload() → create() → update()
- Scenes communicate via this.scene.start() transitions

### State Management  
- Game state tracked in GameScene instance variables
- Character states: normal, defending, damaged, victory, ko
- Stage progression: 7 stages with increasing difficulty

### Asset Management
- SVG assets for UI elements (scalable)
- PNG assets for detailed character sprites
- Programmatic asset generation via util classes