# Senior Project - File Analyzer

This is a client-side web application that allows users to drop files, which are then analyzed directly in the browser using Python via PyScript. It's designed for static hosting platforms like GitHub Pages.

## Setup

1.  **Frontend (Node.js/TypeScript):**
    ```bash
    npm install
    ```

## Running the Application Locally

1.  **Compile TypeScript:**
    ```bash
    npm start
    ```
    This command will continuously compile your TypeScript files (`app.ts` to `app.js`).

2.  **Open in Browser:**
    Open the `index.html` file directly in your web browser. Due to PyScript's nature, a local server is not strictly required for basic functionality, though a live server extension in your IDE can be helpful for development.

## PyScript Integration

This project utilizes PyScript to run Python code directly within the browser, enabling client-side file analysis without the need for a backend server. The Python logic is embedded within `index.html` and interacts with the JavaScript frontend.

## Deployment to GitHub Pages

This application is ideal for deployment on GitHub Pages.
1.  Ensure all your changes are committed to your repository.
2.  Build your project (if any specific build steps are needed beyond `tsc`).
3.  Follow GitHub's instructions for deploying a static site, typically by pushing your compiled assets to a `gh-pages` branch or configuring the `main` branch's `/docs` folder.

