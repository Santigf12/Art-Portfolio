
# Art Portfolio

A full-stack portfolio website designed to showcase an artist's work through a clean, responsive interface. The application uses Next.js for the frontend and Strapi as a headless CMS, allowing artwork and portfolio content to be managed independently of the website's code.

## Tech Stack

**Frontend**

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

**Backend**

- Strapi 5 (Headless CMS)
- PostgreSQL
- REST API

**Infrastructure**

- Docker and Docker Compose
- GitHub Actions
- GitHub Container Registry (GHCR)

## Features

- Responsive interface for displaying artwork.
- Dynamic content management through Strapi.
- Integration between the Next.js frontend and Strapi backend.
- PostgreSQL database for persistent content storage.
- Containerized deployment of frontend, backend, and database services.

## Architecture

The application consists of three main components:

1. **Frontend:** A Next.js application responsible for rendering the portfolio and retrieving content from Strapi.
2. **Backend:** A Strapi CMS that manages artwork information and exposes content through an API.
3. **Database:** PostgreSQL stores the content managed by Strapi.

Docker Compose orchestrates the services, while GitHub Container Registry hosts the application container images.

## Project Structure

```text
Art-Portfolio/
├── frontend/           # Next.js application
├── backend/            # Strapi CMS
├── .github/workflows/  # GitHub Actions
├── Dockerfile.frontend
├── Dockerfile.backend
└── Docker-compose.yml
```

## Deployment

The application is containerized using Docker, with separate images for the frontend and backend.

The Docker Compose configuration defines the frontend, Strapi backend, and PostgreSQL database services, including persistent volumes for database storage and uploaded media.

Deployment requires configuring the appropriate environment variables, database credentials, and Strapi application secrets.

## My Role

I was responsible for designing, developing, integrating, and deploying the application, including:

- Implementing the responsive frontend.
- Configuring and integrating Strapi for content management.
- Connecting the frontend to the CMS API.
- Containerizing the application using Docker.
- Setting up the deployment infrastructure.
- Explaining non-technical aspects of the project to the artist.

## Future Improvements

Potential improvements include expanding automated testing, optimizing artwork loading and performance, and improving the content management experience.

## Live Website

[View the live website here](https://ana-barbara.com/en)

## Author

Developed by [Santigf12](https://github.com/Santigf12).
