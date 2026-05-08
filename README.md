# QueueLess – Smart Queue Management System

QueueLess is a comprehensive, multi‑tenant queue management platform designed for businesses of all types – hospitals, banks, shops, restaurants, and more. It allows administrators to create and manage multiple locations (places), providers to handle queues in real time, and users to join queues, track their position, receive notifications, and provide feedback.

---

## 👨‍💻 Developed By
**Reesha Sayana**
- **Email**: [reeshasayana@gmail.com](mailto:reeshasayana@gmail.com)
- **GitHub**: [reeshasayana-commits](https://github.com/reeshasayana-commits)
- **LinkedIn**: [Reesha Sayana](https://www.linkedin.com/in/reesha-sayana/)

---

## Features

### For End Users
- **Search & Discover**: Find places by name, type, location, or rating.
- **Join Queues**: Choose regular, group, or emergency tokens (with provider approval).
- **Real‑time Updates**: Live position, wait time, and status changes via WebSocket.
- **Notifications**: Email and push notifications before your turn.
- **Feedback**: Rate your experience with detailed dimensions.

### For Providers
- **Queue Management**: Create, pause, resume, and reset queues.
- **Token Handling**: Serve next, complete, cancel tokens.
- **Emergency Approvals**: Approve or reject emergency requests.
- **Analytics**: Real-time stats and busiest hour trends.

### For Administrators
- **Place Management**: Full control over business profiles and services.
- **Provider Management**: Assign places and manage provider accounts.
- **Payments**: Integrated with Razorpay for token-based access.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 25, Spring Boot 3.5, MongoDB, Redis |
| **Frontend** | React 18, Vite, Redux Toolkit, Bootstrap |
| **Notifications** | Firebase Cloud Messaging, JavaMail |
| **Real-time** | WebSocket (STOMP) |
| **Payments** | Razorpay |
| **DevOps** | Docker, Docker Compose |

---

## Getting Started

### Prerequisites
- **Docker & Docker Compose** installed on your system.
- **Firebase Project** for notifications.

### Quick Start with Docker
1. **Clone the repository**
   ```bash
   git clone https://github.com/reeshasayana-commits/QueueLess.git
   cd QueueLess
   ```

2. **Configure Environment Variables**
   - Update the root `.env` and `frontend/.env` with your API keys.

3. **Run the Stack**
   ```bash
   docker-compose up -d --build
   ```

---

## License
This project is for demonstration purposes. All rights reserved &copy; 2026 Reesha Sayana.
