# Branch Comparison: main vs dev

This document provides a comprehensive comparison between the `main` and `dev` branches of the IN2-V2.0 repository.

## Overview

The `dev` branch contains **7 additional commits** ahead of `main`, featuring significant structural reorganization, new features, and bug fixes.

## Branch Structure

### Main Branch (origin/main)
- Single-directory structure with frontend code in root `src/` folder
- Basic project setup without Tailwind CSS
- Simpler color scheme implementation

### Dev Branch (origin/dev)
- Separated frontend and backend into distinct folders
- Added Tailwind CSS for styling
- Enhanced UI with loading screens and improved navigation
- Custom color theming

## Commit History (main → dev)

The following commits are present in `dev` but not in `main` (in chronological order):

1. **e8a9b70** - Feat: added tailwind and made a global value for green colour *(Noxmentis, 3 days ago)*
2. **855d2e6** - Fix some colour in the homepage *(Noxmentis, 3 days ago)*
3. **d551b50** - Feat: Added colour change in the chatbot in the botton screen *(Noxmentis, 3 days ago)*
4. **1fd6b90** - Feat: Added Temp loading screen *(Noxmentis, 3 days ago)*
5. **f9e031b** - Patch: Moved all the frontend to a sperate folder *(Noxmentis, 34 hours ago)*
6. **0e6867b** - Fix: navigation bug in the shop and product detail page *(Noxmentis, 34 hours ago)*
7. **8ea899c** - ADD : added backend folder *(Noxmentis, 34 hours ago)*

## Major Structural Changes

### Project Organization

**Main Branch:**
```
IN2-V2.0/
├── src/
│   ├── components/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── ...
├── package.json
├── vite.config.ts
└── index.html
```

**Dev Branch:**
```
IN2-V2.0/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   └── ...
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── tailwind.config.js
│   └── postcss.config.js
└── backend/
    ├── package.json
    └── .gitignore
```

## File Changes Summary

**Total Changes:** 89 files changed, 814 insertions(+), 762 deletions(-)

### New Files Added in Dev Branch:
- `backend/.gitignore`
- `backend/package.json`
- `frontend/postcss.config.js`
- `frontend/tailwind.config.js`
- `frontend/src/App.tsx` (rewritten)
- `frontend/src/components/LoadingScreen.tsx`
- `frontend/src/components/ProductDetailPage.tsx` (rewritten)

### Files Moved:
All files from root `src/` directory moved to `frontend/src/`
- Root configuration files (`.gitignore`, `README.md`, `index.html`, `package.json`, `vite.config.ts`) moved to `frontend/`

### Files Modified:
Most component files were updated with color scheme changes and styling improvements:
- `AdminDashboard.tsx` (95% similarity)
- `CartPage.tsx` (96% similarity)
- `ContactPage.tsx` (92% similarity)
- `FloatingButtons.tsx` (67% similarity - significant changes)
- `Footer.tsx` (60% similarity - significant changes)
- `HomePage.tsx` (91% similarity)
- `ShopPage.tsx` (82% similarity)
- And many more...

## Key Feature Additions

### 1. Tailwind CSS Integration
- Added `tailwindcss`, `postcss`, and `autoprefixer` as dev dependencies
- Created `tailwind.config.js` for Tailwind configuration
- Created `postcss.config.js` for PostCSS processing
- Implemented global green color theme: `--primary-green` variable

### 2. Loading Screen
- New `LoadingScreen.tsx` component for better UX during page transitions
- Temporary loading screen implementation

### 3. Backend Structure
- Created separate `backend/` folder for future API development
- Initial `package.json` setup for backend (Node.js project)
- Backend `.gitignore` for node_modules and build artifacts

### 4. Enhanced Styling & UI
- Color scheme improvements across multiple components
- Chatbot color customization in bottom screen
- Homepage color fixes
- Global CSS updates in `index.css` (+41 lines)

### 5. Navigation Improvements
- Fixed navigation bugs in shop and product detail pages
- Enhanced ProductDetailPage component (completely rewritten)

## Dependency Changes

### New Dependencies in Dev Branch:
**Frontend:**
- `react-router-dom@^7.9.4` (added)
- `autoprefixer@^10.4.21` (dev)
- `postcss@^8.5.6` (dev)
- `tailwindcss@^3.4.14` (dev)

**Backend:**
- No additional dependencies yet (basic Node.js setup)

## Migration Path

To merge changes from `dev` to `main`:

1. **Structural Migration:**
   - Move all root frontend files to `frontend/` subdirectory
   - Create `backend/` directory structure
   - Update build scripts and paths accordingly

2. **Dependency Installation:**
   - Install Tailwind CSS and related dependencies
   - Update package.json with new dependencies

3. **Configuration Updates:**
   - Add `tailwind.config.js` and `postcss.config.js`
   - Update import paths in all components
   - Configure build tools for the new structure

4. **Code Updates:**
   - Update all components with new color theming
   - Integrate LoadingScreen component
   - Apply navigation bug fixes

## Testing Recommendations

Before merging `dev` to `main`, test the following:

1. ✅ All component imports work correctly with new file structure
2. ✅ Tailwind CSS styles are applied properly
3. ✅ Build process succeeds for both frontend and backend
4. ✅ Navigation between shop and product detail pages works
5. ✅ Loading screen displays correctly
6. ✅ Color theme is consistent across all pages
7. ✅ No broken imports or missing files

## Conclusion

The `dev` branch represents a significant evolution of the project with:
- **Better organization** (frontend/backend separation)
- **Modern styling** (Tailwind CSS integration)
- **Enhanced UX** (loading screens, improved navigation)
- **Future-ready structure** (backend folder for API development)

The changes are primarily additive and organizational, making the codebase more maintainable and scalable for future development.
