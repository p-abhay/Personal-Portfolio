const admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
  const idToken = req.header("Authorization").replace("Bearer", "").trim();
  try {
    console.log(idToken);
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log(req.user);
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { verifyToken };
