# Code Style and Conventions

## JavaScript Style

### ES Modules
- Project uses `"type": "module"` in package.json
- All imports/exports use ES Module syntax
- No CommonJS (require/module.exports)

### Class-Based Architecture
- Game scenes extend Phaser.Scene classes
- Constructor pattern: `super({ key: 'SceneName' })`
- Method naming: camelCase (e.g., `startDefenseRound`, `showBuildupSequence`)

### Naming Conventions
- **Classes**: PascalCase (PreloadScene, GameScene, MenuScene)
- **Methods**: camelCase (create, preload, onDefenseInput)
- **Variables**: camelCase (gameConfig, progressBar)
- **Constants**: camelCase for game properties (not UPPER_CASE)

### Japanese Text Handling
- UI text in Japanese with furigana for children
- Comments in Japanese explaining game mechanics
- String literals use single quotes: `'刹那の見切り'`

### Asset Loading Patterns
```javascript
this.load.svg('assetKey', 'path/to/asset.svg', { width: 120, height: 120 });
this.load.image('assetKey', 'path/to/asset.png');
```

### Game Object Creation
```javascript
this.add.text(x, y, 'テキスト', {
    fontSize: '32px',
    fill: '#FFFFFF',
    fontFamily: 'Arial'
}).setOrigin(0.5);
```

## File Organization
- **Single file approach**: All game logic in `src/main.js` for simplicity
- **Utility separation**: Asset generation utilities in `src/utils/`
- **Asset organization**: SVG in `assets/images/`, PNG in `assets/gen/images/`

## Color Scheme
- **Primary Brand Color**: #6B46C1 (DXC Purple)
- **Text**: #FFFFFF (White)
- **Backgrounds**: Gradient from #6B46C1 to #8B5CF6

## Performance Considerations
- Target 60 FPS on all devices
- Frame counter included for performance monitoring
- Responsive design: 320px to 1920px width