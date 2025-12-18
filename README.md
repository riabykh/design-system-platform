# Design System Platform

A modern design system documentation platform built with Next.js and Material-UI, featuring Figma file management and admin controls.

## Features

- **Design Files Homepage**: Browse and access Figma files organized by categories
- **Admin Mode**: Add, edit, and delete Figma file entries with icon selection
- **Drag & Drop**: Admins can reorder cards by dragging and dropping
- **Search & Filter**: Find files by name or category (including "Frequently Used")
- **Icon Selection**: Choose from popular Material-UI icons for each file
- **Frequently Used**: Mark files as frequently used (no visual indicators)
- **Custom Colors**: Admin files use #3F68FF, Mobile files use #025248, Participant files use #142641
- **Equal Width Cards**: 3 cards per row with consistent sizing
- **Material Design**: Clean, modern interface using Inter font
- **Responsive**: Works on desktop and mobile devices

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For Users
- Browse the homepage to see all available Figma files
- Use the search bar to find specific features
- Filter by category (Mobile, Web, Core)
- Click "Open in Figma" to access the design files

### For Admins
- Click "Admin Mode" to enable editing capabilities
- Use "Add Figma File" to create new entries
- Edit existing files by clicking the edit icon
- Delete files using the delete icon
- Toggle back to user mode when done

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Homepage with Figma file cards
│   ├── theme.ts            # Material-UI theme configuration
│   └── globals.css         # Global styles
├── data/
│   └── figmaFiles.json     # Sample data (will be replaced with CMS)
```

## Technology Stack

- **Next.js 14** - React framework with App Router
- **Material-UI (MUI)** - Component library and design system
- **TypeScript** - Type safety and better development experience
- **Inter Font** - Modern typography
- **Tailwind CSS** - Utility-first CSS framework

## Future Enhancements

- [ ] Integrate with Payload CMS for dynamic content management
- [ ] Add authentication system (NextAuth.js)
- [ ] Implement component library documentation
- [ ] Add UX patterns section
- [ ] Deploy to Vercel with database integration

## Development

The project uses a simple JSON file for data storage in the current implementation. This will be replaced with a proper CMS (Payload CMS) in future iterations for production use.

## Design Principles

- **No Drop Shadows**: Following user preference for clean, flat design
- **Material Design**: Consistent with Google's design language
- **Inter Font**: Modern, readable typography
- **Accessibility**: WCAG compliant components