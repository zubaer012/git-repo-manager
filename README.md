# GitHub Repository Manager

![splash screen](/public/assets/splash.png)

A modern, feature-rich desktop application built with Electron and React for browsing and managing GitHub repositories. This application provides a beautiful and intuitive interface for exploring GitHub repositories, issues, and pull requests.

![GitHub Repository Manager](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

## ✨ Features

- 🔍 **Repository Search**: Search and browse any public GitHub repository
- 📊 **Repository Details**: View comprehensive repository information, stats, and metadata
- 🎯 **Issue Tracking**: Browse and view repository issues with detailed information
- 🔄 **Pull Request Management**: Explore pull requests with status, labels, and statistics
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes
- 🔒 **Secure API Integration**: Use your own GitHub Personal Access Token
- 📱 **Responsive Design**: Clean, modern interface that adapts to different screen sizes
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🎨 **Beautiful UI**: Crafted with Tailwind CSS and smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Desktop Framework**: Electron
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Build Tool**: Vite
- **GitHub API**: Octokit/rest

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **Git**

## 🚀 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/github-repo-manager.git
   cd github-repo-manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **In another terminal, start the Electron app**:
   ```bash
   npm start
   ```

## 🔧 Configuration

### GitHub Personal Access Token

To use this application, you'll need a GitHub Personal Access Token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "GitHub Repository Manager"
4. Select the following scopes:
   - `public_repo` (for public repositories)
   - `repo` (if you want to access private repositories)
5. Click "Generate token"
6. Copy the token and paste it in the app's Settings page

⚠️ **Important**: Never share your personal access token or commit it to version control.

## 📱 Usage

1. **First Launch**: Open the app and navigate to Settings
2. **Add Token**: Enter your GitHub Personal Access Token and click "Save Token"
3. **Search Repositories**: Use the Dashboard search to find any public GitHub repository
4. **Explore**: Click on repositories to view details, issues, and pull requests
5. **Navigate**: Use the sidebar and tabs to navigate between different sections

## 🏗️ Development

### Project Structure

```
github-repo-manager/
├── electron/              # Electron main process files
├── src/                   # React application source
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components (Dashboard, Repository, etc.)
│   ├── services/         # API services and utilities
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── dist/                 # Production build output
└── dist-electron/        # Electron build output
```

### Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start Vite development server            |
| `npm start`       | Start Electron application               |
| `npm run build`   | Build the application for production     |
| `npm run make`    | Package the application for distribution |
| `npm run lint`    | Run ESLint code linting                  |
| `npm run preview` | Preview production build                 |

### Building for Production

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Package for distribution**:
   ```bash
   npm run make
   ```

The packaged application will be available in the `out` directory.

## 🎨 Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Repository View

![Repository](./screenshots/repository.png)

### Issues & Pull Requests

![Issues](./screenshots/issues.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contributing Guidelines

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup

1. Follow the installation steps above
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a clear description of changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [Electron](https://www.electronjs.org/) for the desktop framework
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Heroicons](https://heroicons.com/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you have any questions or run into issues, please [open an issue](https://github.com/yourusername/github-repo-manager/issues) on GitHub.

---

**⭐ Star this repository if you find it helpful!**
