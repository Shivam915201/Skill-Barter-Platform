import cors from "cors";
import path from "path";
import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import postButtonRoutes from "./routes/postButton.route.js";
import authenticatedProfileComponentRoutes from "./routes/authenticatedProfilePageComponents.route.js";
import proposalRoutes from "./routes/proposals.route.js";
import authenticatedProfileRoutes from "./routes/authenticatedProfile.route.js";
import specificView from "./routes/specificView.route.js";
import managingComments from "./routes/managingComments.route.js";
import getPreviewCardsRoutes from "./routes/getPreviewCards.route.js";
import groupRoutes from "./routes/group.route.js";
import setupSocketIO from "./socket.js";
const app = express();
const server = http.createServer(app);
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://opportunehub-lac.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cookie",
        "Origin",
        "Accept",
    ],
    exposedHeaders: ["set-cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use("/api/auth", authRoutes);
app.use("/api", postButtonRoutes);
app.use("/api/preview", getPreviewCardsRoutes);
app.use("/api", groupRoutes);
app.use("/api", authenticatedProfileRoutes);
app.use("/api", authenticatedProfileComponentRoutes);
app.use("/api/specificView", specificView);
app.use("/api/comments", managingComments);
app.use("/api/proposal", proposalRoutes);
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
setupSocketIO(server);
server.listen(5000, () => {
    console.log("Server is running on port 5000");
});
