# Festari Hub

## Project Overview

Festari Hub is a multi-functional digital platform integrating real estate listing services, a research and education hub, an agriculture marketplace, and a personal branding space. It leverages modern web technologies, making it suitable for team development and deployment.

### Technologies Used

- **Vite**: A build tool providing a fast development environment.
- **TypeScript**: Adds static typing to JavaScript for enhanced reliability.
- **React**: A library for building user interfaces, central to the frontend.
- **shadcn-ui**: A collection of reusable React components for UI development.
- **Tailwind CSS**: A utility-first CSS framework for rapid styling.

---

## Setup and Installation

To set up the development environment, follow these steps:

1. Clone the repository using the command:
   ```bash
   git clone https://github.com/Codernointed/festari-hub-nexus-76.git
   ```

2. Navigate to the project directory:
   ```bash
   cd festari-hub-nexus-76
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

Ensure Node.js and npm are installed. For managing Node.js versions, consider using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

---

## Project Structure

The codebase follows a typical structure for Vite + React applications:

> **Note**: For detailed code implementation and structure documentation, refer to [devnotes.md](./devnotes.md)

### Key Directories

| Directory         | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `public`           | Contains static assets like images and the `index.html` file.          |
| `src/components`   | Houses reusable UI components, organized by feature (e.g., home, agriculture). |
| `src`              | Includes main application files like `App.tsx` and `main.tsx`.         |

### Home Page Components

| Component File         | Description                                                      |
|-------------------------|------------------------------------------------------------------|
| `AnimatedStats.tsx`     | Displays animated statistics or metrics.                        |
| `BusinessDivisions.tsx` | Showcases different business divisions.                         |
| `CallToAction.tsx`      | Encourages user interaction with buttons.                       |
| `CoreValues.tsx`        | Highlights core values with descriptive content.                |
| `FeaturedSection.tsx`   | Features specific content or promotions.                       |

---

## Key Components and Their Functions

### Home Page Components (`src/components/home`)

- **AnimatedStats.tsx**: Displays animated statistics or metrics, enhancing user engagement on the homepage.
- **BusinessDivisions.tsx**: Showcases different business divisions or services offered by Festari Hub.
- **CallToAction.tsx**: Encourages user interaction, such as signing up or exploring features, with buttons and links.
- **CoreValues.tsx**: Highlights the core values or principles of the platform, likely with descriptive text and icons.
- **FeaturedSection.tsx**: Features specific content or promotions, possibly with images and links.

### Other Component Categories

- **Agriculture Components (`src/components/agriculture`)**: Related to listing and managing agricultural products, such as product cards, search filters, and marketplace interactions.
- **Consultation Components (`src/components/consultation`)**: Handle consultation services, including booking forms, expert profiles, and scheduling features.
- **Common Components (`src/components/common`)**: Shared components, such as buttons, modals, or forms, used across different sections.
- **Layout Components (`src/components/layout`)**: Structural components like headers, footers, and navigation bars, ensuring consistent UI across the application.

These components are styled using Tailwind CSS and shadcn-ui, providing a modern and consistent look.

---

## Configuration Files

The following configuration files are critical for the project's setup and operation:

- **`package.json`**: Manages project metadata, dependencies, and scripts. It lists dependencies such as `@radix-ui/react` components, `@tanstack/react-query` for state management, and Tailwind CSS, indicating a robust frontend stack.
- **`tsconfig.json`**: Configures TypeScript compiler options, ensuring type safety across the codebase.
- **`vite.config.ts`**: Customizes Vite's behavior, such as build settings and plugins, tailored for the React application.
- **`eslint.config.js`**: Sets up ESLint rules for code linting, maintaining code quality and consistency.

---

## Deployment Options

The application supports deployment to various platforms:

- **Netlify**: For easy deployment with continuous integration.
- **Vercel**: Offers seamless deployment and serverless functions.
- **GitHub Pages**: Suitable for static site hosting.
- **AWS S3**: For scalable storage and hosting.
- **Firebase Hosting**: Provides fast, secure hosting with CDN support.

### Build Commands

- To create a production build:
  ```bash
  npm run build
  ```

- For a development build:
  ```bash
  npm run build:dev
  ```

---

## Additional Notes

The project is actively maintained, with recent commits as of March 30, 2025, indicating ongoing development. The use of modern tools like Bun and shadcn-ui suggests a focus on performance and developer experience. Team members should familiarize themselves with the component structure to contribute effectively, especially given the modular organization by feature.

For a deeper understanding, explore the repository directly, as some file contents could not be fully accessed due to limitations, but the provided structure and README offer a solid foundation for collaboration.

---

## Key Citations

- [GitHub Repository for Festari Hub codebase](https://github.com/Codernointed/festari-hub-nexus-76)
- [nvm Installation and Updating Guide](https://github.com/nvm-sh/nvm#installing-and-updating)
# festarifrontend
# festarifrontend
