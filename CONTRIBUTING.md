# Contributing to GitHub Repository Manager

Thank you for your interest in contributing to GitHub Repository Manager! We welcome contributions from everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a new branch for your contribution
5. Make your changes
6. Test your changes
7. Submit a pull request

## How to Contribute

### Types of Contributions

- **Bug Reports**: Found a bug? Please report it!
- **Feature Requests**: Have an idea for a new feature?
- **Code Contributions**: Fix bugs, add features, improve documentation
- **Documentation**: Improve README, add examples, fix typos

### What We're Looking For

- Bug fixes
- New features that align with the project goals
- Performance improvements
- Code quality improvements
- Documentation improvements
- Test coverage improvements

## Development Setup

1. **Prerequisites**:

   - Node.js (v16.0.0 or higher)
   - npm (v7.0.0 or higher)
   - Git

2. **Clone and setup**:

   ```bash
   git clone https://github.com/yourusername/github-repo-manager.git
   cd github-repo-manager
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Start Electron app**:
   ```bash
   npm start
   ```

## Pull Request Process

1. **Create a branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:

   - Write clean, well-documented code
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation if needed

3. **Test your changes**:

   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Go to GitHub and create a pull request
   - Provide a clear description of your changes
   - Reference any related issues

### Pull Request Guidelines

- **Title**: Use a clear and descriptive title
- **Description**: Explain what you changed and why
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for UI changes
- **Documentation**: Update documentation if needed

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer functional components and hooks

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types with TypeScript
- Keep components small and focused
- Use proper state management

### Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design
- Test in both light and dark modes

### Git Commit Messages

Use conventional commit format:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:

```
feat: add dark mode toggle to settings page

- Add toggle component
- Update theme context
- Persist theme preference in localStorage
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, Node.js version, npm version
- **Screenshots**: If applicable
- **Error Messages**: Any console errors or stack traces

### Feature Requests

For feature requests, please include:

- **Description**: Clear description of the feature
- **Use Case**: Why this feature would be useful
- **Examples**: Similar features in other applications
- **Implementation Ideas**: Any thoughts on implementation

## Questions?

If you have questions about contributing, please:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Be patient and respectful

## Recognition

Contributors will be acknowledged in our README and release notes. Thank you for helping make GitHub Repository Manager better!

## License

By contributing to GitHub Repository Manager, you agree that your contributions will be licensed under the MIT License.
