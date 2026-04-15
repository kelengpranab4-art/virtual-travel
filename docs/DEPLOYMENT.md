# Deployment Guide

This guide describes how to deploy the AI Immersive Virtual Travel Discovery Platform.

## 1. Prerequisites
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.
- [Render](https://render.com/) account (for Backend).
- [Railway](https://railway.app/) account (for ML Service).
- [Expo Application Services (EAS)](https://expo.dev/eas) account (for Mobile APK).

## 2. Backend (Render)
1. Push the `backend` folder to a GitHub repository.
2. In Render, create a new **Web Service**.
3. Connect your repository.
4. Set the following Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string.
   - `ML_SERVICE_URL`: The URL of your deployed ML service (see next section).
5. Render will use the `render.yaml` or you can manually set build (`npm install`) and start (`npm start`) commands.

## 3. ML Service (Railway)
1. Push the `ml-service` folder to a GitHub repository.
2. In Railway, create a new project and select **GitHub Repo**.
3. Railway will detect the `Procfile` and `requirements.txt`.
4. Once deployed, copy the provided URL and update the `ML_SERVICE_URL` in your Render environment variables.

## 4. Database (MongoDB Atlas)
1. Create a new Cluster.
2. Under "Network Access", allow access from `0.0.0.0/0` (or Render's outbound IPs if using a paid plan).
3. Create a Database User and copy the connection string.
4. Ensure the database name is specified in the URI (e.g., `.../vitravel?retryWrites=...`).

## 5. Mobile App (Android APK)
To build a standalone APK for testing:
1. Install EAS CLI: `npm install -g eas-cli`.
2. Login to Expo: `eas login`.
3. Configure build: `eas build:configure`.
4. Run the build: `eas build -p android --profile preview`.
   - The `--profile preview` will generate an APK instead of an AAB (Play Store format).
5. Download the APK from the Expo dashboard once finished.

---
**Note:** For local development, ensure you have a local MongoDB running or use the Atlas string in a `.env` file.
