# Katsu Nikki - Modern Blog Engine

A modern, fast, and lightweight blog engine built with **SvelteKit 5**, **Tailwind CSS 4**, and **TypeScript**. Features multilingual support, dark/light themes, traffic economy mode, and elegant Markdown rendering.

## 🚀 Features

- **Modern Stack**: SvelteKit 5 with TypeScript and Tailwind CSS 4
- **Multilingual**: Support for English, Russian, and Ukrainian
- **Theme System**: Dark/light themes with separate code block themes
- **Traffic Economy**: Optimized image loading with WebP compression
- **Markdown-First**: Enhanced Markdown with custom syntax extensions
- **Responsive Design**: Mobile-first responsive layout
- **Image Modal**: Full-screen image viewing with keyboard navigation
- **Static Generation**: Optimized for deployment as static site
- **Docker Ready**: Containerized deployment with Nginx

## 📁 Project Structure

```txt
  ├── src/
  │   ├── lib/
  │   │   ├── components/     # Reusable UI components
  │   │   ├── i18n/          # Internationalization files
  │   │   ├── partials/      # Layout components
  │   │   ├── utils/         # Utility functions
  │   │   └── types.ts       # TypeScript type definitions
  │   ├── routes/            # SvelteKit pages and layouts
  │   └── app.html           # Main HTML template
  ├── static/
  │   ├── files/             # Blog content structure
  │   └── posts.yaml         # Generated content tree
  ├── scripts/               # Build and utility scripts
  ├── docker-compose.yaml    # Docker configuration
  └── Dockerfile            # Container build instructions
```

## 🛠️ Installation & Setup

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- **Docker** (for containerized deployment)

### Development Setup

1. Clone and install dependencies:

```bash
  git clone <repository>
  cd mdBlog
  bun install
```

1. Start development server:

```bash
  bun dev
```

1. Access the application:
   - Development: `http://localhost:5173`
   - Production preview: `bun run preview`

### Production Build

```bash
  # Full production build with optimizations
  bun bake

  # Or step by step:
  bun posts          # Generate content tree
  bun compress:images # Optimize images
  bun build          # Build static site
  bun compress:text   # Compress assets
```

## 📝 Content Management

### Directory Structure

Content is organized in the `static/files/` directory with the following structure:

```txt
  static/files/
  ├── index.yaml          # Root configuration
  ├── category1/
  │   ├── index.yaml      # Category metadata
  │   ├── +post.en.md     # English post content
  │   ├── +post.ru.md     # Russian post content
  │   ├── +images/        # Original images
  │   ├── +imagesCompressed/ # Auto-generated WebP images
  │   └── subcategory/
  │       ├── index.yaml
  │       └── +post.default.md
```

### Configuration Files (index.yaml)

Each directory can contain an `index.yaml` file with metadata:

```yaml
title:
  en: Category Title
  ru: Название категории
  ua: Назва категорії
post: # Available languages for post
  - en
  - ru
  - default
date: 2025-01-01
```

### Markdown Posts

Post files follow the naming convention `+post.[language].md`:

- `+post.en.md` - English content
- `+post.ru.md` - Russian content
- `+post.default.md` - Fallback content

## ✨ Enhanced Markdown Syntax

The blog supports standard Markdown plus custom extensions:

### Grid Layouts

```markdown
%%%3
Content in 3-column grid
%&23
Content spanning 2 columns within 3-column parent
&%
%%%
```

### Images with Grid Support

```markdown
![Caption](image.jpg) # Standard image with caption
!c2[Caption](image.jpg) # Span 2 columns in grid
!r3[Caption](image.jpg) # Span 3 rows in grid
```

### Embedded Content

```markdown
@{some-class}[Title](https://example.com)
@{h-150}[Video](https://youtube.com/embed/id)
```

### Special Effects

```markdown
––{Hidden text}–– # Hover to reveal
```

## 🎨 Theming & Customization

### Theme Configuration

The application supports multiple theme combinations:

- **UI Theme**: Light/Dark mode for interface
- **Code Theme**: Independent theme for code blocks
- **Language**: English/Russian/Ukrainian interface

### Tailwind Configuration

Custom Tailwind classes and safelist are defined in `tailwind.config.ts`. The project uses Tailwind CSS 4 with:

- Custom color palette (amber/gray based)
- Responsive grid system
- Typography utilities
- Animation classes

### Adding New Languages

1. Create new translation file in `src/lib/i18n/[lang].ts`
2. Add language to `src/lib/constants.ts`
3. Update type definitions in `src/lib/types.ts`
4. Run locale validation: `bun run check:18n`

## 🐳 Deployment

### Docker Deployment

Build and run with Docker Compose:

```bash
  docker-compose up --build --force-recreate
```

The application will be available at `http://localhost:5173`

### CapRover Deployment

For CapRover deployment:

```bash
  bun caprover:build  # Build and package
  # Upload blog.tar.gz to CapRover
```

### Static Hosting

After running `bun bake`, deploy the `build/` directory to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 🛠️ Scripts Reference

### Development Scripts

- `bun dev` - Start development server
- `bun check` - Type checking
- `bun check:watch` - Watch mode type checking
- `bun format` - Format code with Prettier
- `bun lint` - Lint code with ESLint

### Build Scripts

- `bun posts` - Generate content tree
- `bun compress:images` - Optimize images to WebP
- `bun compress:text` - Compress text assets
- `bun bake` - Full production build
- `bun preview` - Preview production build

### Utility Scripts

- `bun check:18n` - Validate translation completeness
- `bun json:to:yaml` - Convert JSON configs to YAML

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic operation. All configuration is done through:

- `src/lib/constants.ts` - Application constants
- `tailwind.config.ts` - Styling configuration
- `svelte.config.js` - SvelteKit configuration

### Browser Storage

User preferences are stored in localStorage:

- `lang` - Interface language
- `theme` - UI theme preference
- `codeTheme` - Code block theme
- `trafficEconomy` - Image optimization setting

## 🎯 Performance Features

### Image Optimization

- Automatic WebP conversion
- Traffic economy mode for reduced bandwidth
- Lazy loading with proper sizing
- Responsive image serving

### Text Compression

- Gzip and Brotli compression for all text assets
- Optimized bundle splitting
- Static generation for fast loading

### Caching Strategy

- Immutable assets with cache headers
- Service worker ready (via SvelteKit)
- Optimized for CDN distribution

## 🔍 Troubleshooting

### Common Issues

**Build failures:**

```bash
  # Clear build cache
  rm -rf .svelte-kit build node_modules
  bun install
```

**Image processing errors:**

- Ensure Sharp is properly installed: `bun add sharp`
- Check image file permissions and formats

**Translation validation errors:**

```bash
bun check:18n  # Shows missing/extra keys
```

### Debug Mode

Enable SvelteKit debugging:

```bash
DEBUG=vite:* bun dev
```

## 📦 Dependencies

### Core Dependencies

- **SvelteKit 5** - Application framework
- **Tailwind CSS 4** - Styling framework
- **TypeScript** - Type safety
- **Showdown** - Markdown processing
- **Sharp** - Image optimization
- **Highlight.js** - Syntax highlighting

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite** - Build tool
- **Bun** - Runtime and package manager

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly
4. Run linting and type checking: `bun lint && bun check`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is open source. Please check the repository for license details.

## 🙏 Acknowledgments

- **Svelte Team** - For the amazing framework
- **Tailwind Labs** - For the utility-first CSS framework
- **Highlight.js** - For syntax highlighting
- **MDI** - For beautiful icons
