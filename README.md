# AIS Website

# made by RL Team

Welcome to the repository for the **AIS Website**, a modern and interactive web experience built with Next.js, Tailwind CSS, and various exciting animations. This site features AI-related content, animations, and a dynamic layout that adapts to different sections of the website.

## Table of Contents

- [Installation](#installation)
- [Directory Structure](#directory-structure)
- [Technologies](#technologies)
- [Features](#features)

## Installation

Follow these steps to get the website up and running locally.

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gyaanendra-aiswebsite-new.git
   cd gyaanendra-aiswebsite-new
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000) to view the website.

## Directory Structure

Here is a breakdown of the directory structure:

```
└── gyaanendra-aiswebsite-new/
    ├── README.md                  # This file
    ├── eslint.config.mjs           # ESLint configuration
    ├── jsrepo.json                # JSON configuration for project-related settings
    ├── next.config.ts             # Next.js configuration
    ├── package.json               # Project dependencies and scripts
    ├── postcss.config.mjs         # PostCSS configuration for styling
    ├── tailwind.config.ts         # Tailwind CSS configuration
    ├── tsconfig.json              # TypeScript configuration
    ├── Animations/                # Folder for custom animations
    │   └── SplashCursor/          # Splash screen animation for the cursor
    │       └── SplashCursor.jsx   # JSX for SplashCursor animation
    ├── app/                        # Core layout and pages
    │   ├── globals.css            # Global styles for the app
    │   ├── layout.tsx             # Layout component for the app
    │   ├── page.tsx               # Main page of the app
    │   ├── aboutus/               # About Us page and styles
    │   ├── home/                  # Home page components
    │   └── project/               # Project page components
    ├── components/                # Reusable components for the website
    │   ├── AnimatedGradient.tsx   # Gradient animation component
    │   ├── Footer.tsx             # Footer component
    │   ├── Particles.tsx          # Particle animation component
    │   ├── aboutus/               # Components related to the About Us page
    │   ├── global/                # Global UI components like Navbar and Background
    │   └── home/                  # Components for Home page features
    ├── public/                    # Public assets like 3D models and static files
    ├── screens/                   # Specific screens, including About Us page
    └── screensCss/                # CSS styles for specific screens (e.g., About Us, Landing)
```

## Technologies

- **Next.js**: A React framework for building server-rendered React applications.
- **Tailwind CSS**: A utility-first CSS framework for custom and responsive styling.
- **TypeScript**: Type-safe JavaScript for improved development experience.
- **React**: JavaScript library for building user interfaces.
- **GLTF Models**: 3D assets used in the public directory to create immersive experiences.

## Features

- Interactive landing animations with custom cursors.
- Smooth, animated gradient backgrounds.
- Parallax particle background for enhanced user experience.
- Glass effect and blur text styling for a modern, glassmorphism design.
- Full-page layout with dynamic content sections (About Us, Home, Project).
