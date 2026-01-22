

# Development Conventions & Standards

This document outlines the development practices, Git workflow, and coding standards for this project.

## Project Architecture

### Technology Stack
- **Frontend:** HTML/CSS for UI structure and styling
- **Logic & Analysis:** Python via PyScript for data processing, file parsing, and analysis tools
  - Leverage Python libraries (pandas, pdfplumber, BeautifulSoup, etc.) directly in the browser
  - All data analysis, file processing, and AI integration handled in Python
- **Supplementary Logic:** TypeScript for functionality where PyScript isn't feasible
  - DOM manipulation that's simpler in JS/TS
  - Complex async operations or browser APIs that work better in JavaScript
  - UI interactivity that needs tighter browser integration

### File Organization
```
project/
├── index.html          # Main HTML structure
├── styles/             # CSS files
├── scripts/
│   ├── python/         # PyScript files (.py)
│   │   ├── file_parser
│   │   ├── data_analysis
│   │   ├── ai_integration
│   │   └── others
│   └── typescript/     # TypeScript files (.ts)
│       ├── ui_helpers
│       └── others
└── data/               # Sample files for testing
```

### Development Philosophy
- **Python-first approach:** Default to PyScript for anything involving data processing, analysis, or file handling
- **TypeScript as supplement:** Use only when Python/PyScript has limitations or when native browser APIs are simpler to access
- **Keep it simple:** Avoid over-engineering; use the right tool for each specific task

## Git Workflow

### Core Principles
- Work directly on `main` for most changes
- Commit frequently with clear, descriptive messages
- Use branches only when needed (experiments, large features, risky refactors)

### Daily Development Cycle

1. **Start session:** `git pull`
2. **Make changes** in editor
3. **Review changes:** `git status` and `git diff`
4. **Stage and commit:** `git add .` then `git commit -m "[message]"`
5. **Push to remote:** `git push`

Repeat throughout work sessions.

### Commit Message Standards

**Format:**
- Short, descriptive summary, with specifics (20-80 chars ideal)
- Present tense: "Add feature" not "Added feature"
- Start with a verb: Add, Fix, Update, Refactor, Remove, etc.

**Good examples:**
```
Add user authentication with JWT
Fix navbar collapse on mobile
Refactor API calls to use async/await
Update dependencies to latest versions
Remove deprecated login component
```

**Bad examples:**
```
update files
fix bug
changes
stuff
wip
```

**Multi-line commits** (for complex changes):
```bash
git commit -m "Add user profile page" -m "Includes avatar upload, bio editing, and account settings. Backend API integration pending."
```

### When to Use Branches

Create a branch for:
- Experimental features that might be abandoned
- Large features spanning multiple days
- Significant refactors
- Breaking changes you want to test

**Branch workflow:**
```bash
# Create and switch to branch
git checkout -b feature-name

# Work and commit as normal
git add .
git commit -m "message"
git push -u origin feature-name

# When ready to merge
git checkout main
git merge feature-name
git push
git branch -d feature-name  # delete local branch
git push origin --delete feature-name  # delete remote branch
```

### What to Commit

**DO commit:**
- Source code files
- Configuration files (package.json, tsconfig.json, etc.)
- Documentation (README, this file, etc.)
- Build scripts
- Most files unless in the .gitignore

**DON'T commit:**
- `node_modules/` (should be in .gitignore)
- Build output (`dist/`, `build/`, etc.)
- IDE-specific files (.vscode/, .idea/)
- Environment files with secrets (.env with API keys)
- OS files (.DS_Store, Thumbs.db)
- Large binary files

### Tagging Releases

For larger milestones or deployments not individual small feature commits:
```bash
git tag -a v1.0.0 -m "First production release"
git push --tags
```

Use semantic versioning: `v[major].[minor].[patch]`

## Code Style & Standards

### TypeScript
- Use meaningful variable names (descriptive over clever preferably both)
- Keep functions small and focused with one responsibility each (names should be or start with verbs)
- Include after function and method declarations, descriptive and complete docstrings
- Use TypeScript types consistently
- Use 4 spaces as indent

### Comments
- Explain WHY, not WHAT
- Comment complex logic, not obvious code
- Update existing related comments when code changes
- Only use inline comments when single word temporary tagging is needed or on exceptionally complex single line logic such as lambda functions

**Good comment:**
```typescript
// Use debounce to avoid excessive API calls during typing
const debouncedSearch = debounce(searchAPI, 300);
```

**Bad comment:**
```typescript
// This function adds two numbers
function add(a, b) { return a + b; }
```

## Development Guidelines

### Before Committing
1. Test changes locally
2. Review diff (`git diff`)
3. Make sure you're not committing debug code or console.logs
4. Verify .gitignore is catching generated files

### Before Pushing
1. Make sure any tests pass (when you have tests)
2. Commit message is clear and descriptive
3. You're on the correct branch

### Problem-Solving Process
1. Understand the problem fully before making changes
2. Test incrementally
3. Commit working states before trying risky changes
4. Use branches for risky experiments

## Quick Reference For Commands

Remote git repo link: https://github.com/ethanboley/the_one_final.git

User: ethanboley

Repo: the_one_final

Branch: main

## Emergency Procedures

### Committed something sensitive (API key, password)
```bash
# If NOT pushed yet
git reset --soft HEAD~1
# Remove the sensitive data, add .env to .gitignore
git add .
git commit -m "message"

```

### Accidentally deleted important code
```bash
# Find the commit where it existed
git log --oneline

# Restore file from that commit
git checkout <commit-hash> -- path/to/file
```

### Merge conflicts
1. Open the conflicted files
2. Look for conflict markers `<<<<<<<`, `=======`, `>>>>>>>`
3. Edit to keep the correct version and all desired code
4. Remove conflict markers
5. `git add` the resolved files
6. `git commit` to complete the merge


#### Never modify this file unless explicitly asked to do so.
