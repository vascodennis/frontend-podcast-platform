# Frontend Podcast Platform

This repository contains the frontend code for the Podcast Platform project, a web application built using Next.js 13.

## About the Project

The Podcast Platform is a web application for browsing, listening to, and interacting with various podcasts. The frontend is built using Next.js 13, a popular framework for building React applications.

## Getting Started

### Prerequisites

- Node.js: Ensure that you have Node.js installed on your machine.
- Next.js: This project uses Next.js 13. You can install it using npm or yarn.

### Installation

Use the following commands:

```bash
# 1. Clone this repository to your local machine:
git clone https://github.com/vascodennis/frontend-podcast-platform.git

# 2. Change to this directory:
cd frontend-podcast-platform

# 3.Install the dependencies:
npm install

# 4. Run the development server:
npm run dev
```

After running the development server, you should be able to open http://localhost:3000 with your browser to see the result.

## Project Structure
The project uses the new file-based routing system introduced in Next.js 13. Pages are defined by exporting a component from a page.js file. Layouts, which are shared between multiple pages, are defined by exporting a React component from a layout.js file. The root layout is defined at the top level of the app directory and applies to all routes.
