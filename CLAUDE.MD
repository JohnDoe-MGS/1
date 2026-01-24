# CLAUDE.MD

## Project Overview

This repository contains a simple HTML website with GitHub Pages deployment workflows.

## Repository Structure

```
.
├── .github/
│   └── workflows/
│       ├── jekyll-docker.yml
│       └── static.yml
├── index.html
└── CLAUDE.MD (this file)
```

## Files Description

### index.html
- Main HTML file for the website
- Basic HTML5 document structure

### GitHub Workflows

The repository includes two GitHub Actions workflows:

1. **jekyll-docker.yml** - Jekyll-based deployment workflow
2. **static.yml** - Static site deployment workflow

## Development Guidelines

### Branch Strategy
- Main branch: Default branch for stable releases
- Feature branches: Use `claude/` prefix for AI-assisted development

### Working with this Repository

1. **Making Changes**
   - Create or checkout a feature branch
   - Make your changes to the HTML or other files
   - Commit with descriptive messages
   - Push to the feature branch

2. **Deployment**
   - The GitHub workflows handle automatic deployment
   - Changes merged to main branch trigger the deployment

## AI Assistant Notes

This file helps Claude AI understand the repository structure and development workflow. When working with this repository:

- Always check current branch before making changes
- Follow git best practices for commits
- Test changes locally when possible
- Keep commits focused and atomic

## Last Updated

2026-01-24
