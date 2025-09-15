# 📚 Personal Dictionary

Vue application for managing your personal word collection with drag-and-drop functionality and fast word generation.

## ✨ Features

- **🚀 Lightning Fast**: Generate 10,000 words
- **🎯 Drag & Drop**: Reorder words with intuitive drag-and-drop interface
- **💾 Auto-Save**: Persistent storage with localStorage integration
- **⚡ Responsive UI**: Non-blocking interface during word generation
- **🎨 Modern Design**: Clean, accessible interface with dark theme support
- **📱 Mobile Friendly**: Responsive design that works on all devices

## 🛠️ Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Full type safety
- **Vite** - Fast build tool and dev server
- **VueDraggable** - Drag and drop functionality
- **Vitest** - Unit testing
- **VueUse** - Collection of essential Vue utilities
- **Web Workers** - Background processing for performance
- **CSS3** - Modern styling with Grid and Flexbox

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd personal-dictionary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`


## 🎮 Usage

1. **Generate Words**: App automatically generates 10,000 random words on first load
2. **Add Custom Words**: Use the input field to add your own words
3. **Reorder Words**: Drag and drop words to reorganize your list
4. **Edit Words**: Click on any word to edit it inline
5. **Delete Words**: Use the delete button to remove unwanted words
6. **Reload Data**: Click the reload button to generate fresh words

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint
```

### Project Structure

```
personal-dictionary/
├── public/              # Static assets
├── src/
│   ├── components/      # Vue components (organized by feature)
│   ├── composables/     # Reusable composition functions
│   ├── constants/       # App constants
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── workers/        # Web Workers
│   ├── App.vue         # Root component
│   └── main.ts         # App entry point
├── package.json
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md
```
