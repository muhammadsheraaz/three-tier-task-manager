# Three-Tier Task Manager with Jenkins CI/CD

This project is a simple three-tier Task Manager application built to practice containerization and CI/CD using Jenkins.

The application consists of three services:

- React Frontend
- Node.js + Express Backend
- MongoDB Database

The entire application is containerized using Docker and managed with Docker Compose. A Jenkins Pipeline is used to automate the complete build and deployment process.

---

## What this project does

The application allows users to:

- Add new tasks
- Edit existing tasks
- Delete tasks
- Store data in MongoDB

Whenever new code is pushed to GitHub, Jenkins automatically:

- Pulls the latest code
- Builds Docker images
- Pushes images to Docker Hub
- Stops the old container
- Deploys the updated version

This project was created to understand how a real CI/CD workflow works.

---

## Technologies Used

### Frontend

- React
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### DevOps

- Docker
- Docker Compose
- Jenkins
- GitHub Webhooks
- Docker Hub
- Ubuntu (WSL)

---

## Project Structure

```
three-tier-taskmanager

├── frontend
├── backend
├── docker-compose.yml
└── Jenkinsfile
```

---

## Running the project locally

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd three-tier-taskmanager
```

Build and start everything

```bash
docker compose up --build -d
```

Stop the project

```bash
docker compose down
```

---

## Jenkins Pipeline

The project uses a Declarative Jenkins Pipeline.

Pipeline steps are:

1. Checkout latest code from GitHub
2. Verify build environment
3. Build Docker image
4. Login to Docker Hub
5. Push image to Docker Hub
6. Stop old container
7. Run updated container

The pipeline is automatically triggered using GitHub Webhooks whenever new code is pushed.

---

## CI/CD Workflow

```
Git Push -> GitHub -> Webhook -> Jenkins Pipeline -> Build Docker Image -> Push to Docker Hub -> Deploy Updated Container
```

---

## Docker Compose

Docker Compose is used to run all services together.

It creates

- Frontend container
- Backend container
- MongoDB container
- Docker network
- Persistent MongoDB volume

---

## What I learned

This project helped me practice:

- Docker
- Docker Compose
- Jenkins
- GitHub Webhooks
- Docker Hub
- CI/CD Pipeline
- React
- Express.js
- MongoDB

It also gave me a better understanding of how applications are built and deployed automatically using Jenkins.

---

## Future Improvements

Some features I plan to add later:

- User authentication
- Kubernetes deployment
- Nginx reverse proxy
- HTTPS
- SonarQube
- Trivy security scanning

---

## Author

Muhammad Sheraz

BS Computer Science Student

Interested in DevOps, Cloud Computing and Backend Development.