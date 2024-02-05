// /backend/src/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const { connect, disconnect } = require("./db/db");
const admin = require("firebase-admin");
const adminUser = require("./config/admin-user");
const app = express();
const port = 3000;

// Initialize Firebase Admin SDK with your credentials
const serviceAccount = require("./config/firebase-private-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Admin user creation logic
const adminUserCreation = async () => {
  try {
    // Check if admin user already exists
    //console.log("eeeldddsoo ", adminUser);
    const userRecord = await admin.auth().getUserByEmail(adminUser.email);
    console.log("Admin user already exists");
  } catch (error) {
    // If the user does not exist, create the admin user
    if (error.code === "auth/user-not-found") {
      const userRecord = await admin.auth().createUser(adminUser);
      await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
      console.log("Admin user created successfully");
      console.log(userRecord);
    } else {
      console.error("Error checking/admin user:", error);
    }
  }
};

// Call the admin user creation logic
adminUserCreation();

// Connect to MongoDB
connect();

app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send(
    "Start using the API by using /api/projects - to get all the projects"
  );
});

app.use("/api/projects", projectRoutes);
app.use("/api/experiences", experienceRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Handle disconnect on process exit
process.on("exit", () => {
  console.log("Server is shutting down. Disconnecting from MongoDB...");
  disconnect();
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Disconnecting from MongoDB...");
  server.close(() => {
    process.exit(0);
  });
});
