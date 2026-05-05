# Civic Issue Reporting System

A comprehensive, full-stack platform designed to empower citizens to report, track, and resolve local civic issues (such as potholes, broken streetlights, or waste management). The system consists of a mobile app for citizens to report issues on the go, a web client dashboard for administrators/officials to manage and view reports, and a robust backend powering both.

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Client Applications
        A[📱 Mobile App <br> React Native / Expo]
        B[💻 Web Dashboard <br> React / Vite]
    end

    subgraph Backend Server
        C[⚙️ Node.js API <br> Express.js]
        D[🗺️ Spatial Processing <br> Turf.js]
        C <--> D
    end

    subgraph Data Layer
        E[(🗄️ PostgreSQL <br> with Prisma)]
        F[📂 Media Storage]
    end

    A -- "REST API (JSON/Multipart)" --> C
    B -- "REST API (JSON)" --> C
    C -- "Queries" --> E
    C -- "Uploads" --> F
```

## 🚀 Tech Stack

### 📱 Frontend (Mobile App)
Located in the `/Frontend/` directory.
- **Framework**: React Native with [Expo](https://expo.dev/)
- **Styling**: Nativewind (Tailwind CSS for React Native)
- **Features**: 
  - `expo-location` for accurate geo-tagging of issue reports.
  - `expo-image-picker` for attaching photo evidence.
  - Smooth file-based routing with `expo-router`.

### 💻 Client (Web Dashboard)
Located in the `/Client/` directory.
- **Framework**: React.js with [Vite](https://vitejs.dev/)
- **Styling**: Tailwind CSS & Framer Motion for a dynamic, modern UI.
- **Features**: 
  - Interactive map visualizations using `react-leaflet` to display issue clusters and pinpoint locations.
  - Designed for officials to effectively manage, track, and resolve civic complaints.

### ⚙️ Backend (API Layer)
Located in the `/Backend/` directory.
- **Framework**: Node.js & Express.js
- **Database**: PostgreSQL mapped with [Prisma ORM](https://www.prisma.io/)
- **Security**: JWT Authentication, bcrypt password hashing, Helmet, and Express Rate Limit.
- **Features**:
  - Secure file handling with `multer` for image uploads.
  - Advanced geospatial data operations using `@turf/turf` (e.g., finding issues by proximity).

## 📂 Project Structure

```text
📦 Civic_Issue_Project
 ┣ 📂 Backend/         # Node.js Express server, Prisma schema, and API routes
 ┣ 📂 Client/          # React + Vite web application for admin/dashboard
 ┣ 📂 Frontend/        # React Native + Expo mobile application for citizens
 ┣ 📂 Project_Media/   # Shared media resources and project assets
 ┗ 📜 README.md        # Project documentation
```

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) database running locally or remotely
- [Expo Go](https://expo.dev/go) app installed on your smartphone (for mobile testing)

### 1. Backend Setup
```bash
cd Backend
npm install

# Configure your environment variables (.env file)
# Example:
# DATABASE_URL="postgresql://user:password@localhost:5432/civic_db"
# JWT_SECRET="your_secret_key"

npx prisma generate
npx prisma db push
npm run dev
```

### 2. Web Client Setup
```bash
cd Client
npm install
npm run dev
```

### 3. Mobile App Setup
```bash
cd Frontend
npm install
npx expo start
```
*Use the Expo Go app on your iOS/Android device to scan the generated QR code, or press `a`/`i` to launch an emulator.*

## 🔒 Security & Performance
- **Authentication**: Token-based secure authorization for citizens and officials.
- **Data Integrity**: Robust input validation using `express-validator`.
- **API Protection**: Automated rate limiting and strict HTTP headers via `helmet` to mitigate vulnerabilities.

## 🤝 Contributing
Contributions are always welcome! Feel free to open issues or submit pull requests for features, bug fixes, or UI enhancements.
