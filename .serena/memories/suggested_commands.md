# Essential Development Commands

## Running the Game

### Development Server (Recommended)
```bash
node server-es.js
```
- Runs ES Module compatible server on port 8001
- Better CORS handling and enhanced logging
- Access at http://localhost:8001/

### Alternative HTTP Server
```bash
npm start
# or
npm run dev
```
- Runs standard http-server on port 8080
- Opens browser automatically

## Project Commands

### Package Management
```bash
npm install          # Install dependencies (Phaser.js 3.70.0, http-server)
```

### Placeholder Commands (Not Implemented)
```bash
npm run build        # Placeholder - echoes message
npm run test         # Placeholder - echoes message
```

## Git Commands
```bash
git status           # Check repository status
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
```

## System Commands (Linux)
```bash
ls                   # List directory contents
find . -name "*.js"  # Find JavaScript files
grep -r "text"       # Search for text in files
```

## Development Workflow
1. Make code changes to `src/main.js` or asset files
2. Refresh browser to see changes (no build step required)
3. Check browser console for performance metrics and errors
4. Use `node server-es.js` for proper ES Module support during development