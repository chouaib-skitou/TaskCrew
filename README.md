# 🛠️ TaskCrew

**TaskCrew** is a microservices-based Task Manager application designed to empower teams with seamless task management, collaboration, and productivity tools. The name "TaskCrew" reflects our commitment to teamwork, where every member of the "crew" contributes to achieving common goals efficiently.

---

## 🏗️ Architecture Overview

TaskCrew is built using a microservices architecture to ensure:
- **Scalability**: Each service can scale independently based on its workload.
- **Maintainability**: Modular design makes it easier to maintain and extend functionality.
- **Reliability**: Decoupled services reduce the risk of a single point of failure.

### **Key Components**

📦 **Microservices**:
- **Auth Service**: Manages authentication, user login, and token generation.
- **User Service**: Handles user profiles and role-based access control.
- **Task Service**: Manages task creation, updates, tagging, and assignment.
- **Notification Service**: Sends email and push notifications.
- **Analytics Service**: Provides insights on task completion and productivity.

🛡️ **API Gateway**:
- Routes requests to the appropriate microservices.
- Handles authentication and rate-limiting.

📮 **Event Bus**:
- Uses RabbitMQ or Kafka for real-time communication between services (e.g., task updates triggering notifications).

📈 **Monitoring and Logging**:
- **Prometheus & Grafana**: Collects and visualizes application metrics.
- **Elastic Stack (ELK)**: Centralized logging to track and debug issues effectively.

---

## 🖥️ Tech Stack

### **Frontend**
- 🖼️ **Framework**: React.js
- 🎨 **Styling**: Tailwind CSS
- 🔄 **State Management**: Zustand
- 🛠️ **Validation**: Zod
- 🌐 **Routing**: React Router

### **Backend**
- ⚡ **Framework**: Express.js (Node.js)
- 🔐 **Authentication**: JSON Web Tokens (JWT) & OAuth 2.0 (Google, GitHub)
- 🗄️ **Database**: PostgreSQL (for relational data)
- 🚀 **Caching**: Redis

### **Infrastructure & DevOps**
- 🐳 **Containerization**: Docker
- ☸️ **Orchestration**: Kubernetes
- 🤖 **CI/CD**: GitHub Actions
- 📈 **Monitoring**: Prometheus & Grafana
- 📋 **Logging**: Elastic Stack (ELK)

---

## 📂 Folder Structure

```
TaskCrew/
├── frontend/             # React.js application
├── services/              # Microservices code
│   ├── auth-service/     # Authentication service
│   ├── user-service/     # User management service
│   ├── task-service/     # Task management service
│   ├── notification-service/ # Notification service
│   └── analytics-service/    # Analytics service
├── api-gateway/          # API gateway code
├── event-bus/            # Event bus setup
├── monitoring/           # Prometheus and Grafana setup
├── deployment/           # Kubernetes manifests and Dockerfiles
└── README.md             # Project documentation
```

---

## ✨ Why "TaskCrew"?

We believe productivity thrives when teams work as a **crew**, united by a common purpose. The name "TaskCrew" embodies:
- **Collaboration**: Focused on teamwork and shared goals.
- **Productivity**: A crew that efficiently tackles tasks together.
- **Modern Simplicity**: Reflecting a streamlined, approachable design.

---

## 🚀 Get Started
1. Clone the repository:
   ```bash
   git clone https://github.com/chouaib-skitou/taskcrew.git
   ```
2. Set up the environment for each service using `.env` files.
3. Use Docker Compose to spin up the services:
   ```bash
   docker-compose up
   ```
4. Access the frontend at `http://localhost:3000`.

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

💡 *TaskCrew: Where teams manage tasks like pros!*
