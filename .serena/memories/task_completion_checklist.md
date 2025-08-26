# Task Completion Checklist

## When a Development Task is Completed

### No Automated Testing or Linting
- **Build Process**: Not implemented (placeholder command only)
- **Unit Tests**: Not implemented (placeholder command only)  
- **Linting**: No ESLint or similar tooling configured
- **Type Checking**: No TypeScript - pure JavaScript project

### Manual Verification Steps

1. **Functional Testing**
   - Run `node server-es.js` to start development server
   - Open http://localhost:8001/ in browser
   - Test game functionality manually
   - Verify all 7 stages work correctly
   - Check mobile responsiveness (tap controls)

2. **Browser Console Check**
   - Open browser developer tools
   - Look for JavaScript errors or warnings
   - Monitor frame rate counter for performance
   - Check asset loading (no 404 errors)

3. **Cross-Browser Testing**
   - Test on Chrome 80+
   - Test on Safari 13+ 
   - Test on Firefox 75+
   - Verify mobile device compatibility

4. **Asset Verification**
   - Ensure all SVG and PNG assets load correctly
   - Check that generated assets in `assets/gen/` are up to date
   - Verify DXC branding colors (#6B46C1) are consistent

### Git Workflow (If Changes Need Committing)
```bash
git status                    # Check changed files
git add .                     # Stage changes
git commit -m "Description"   # Commit with descriptive message
# Note: Push only when explicitly requested
```

### Code Quality Checks (Manual)
- Follow ES Module patterns
- Maintain single-file architecture in main.js
- Use consistent camelCase naming
- Ensure Japanese text includes appropriate furigana
- Keep performance target of 60 FPS