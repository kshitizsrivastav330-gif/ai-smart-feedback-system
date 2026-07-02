import axios from "axios";

// Axios Instance
const API = axios.create({
    baseURL: "https://ai-smart-feedback-system.onrender.com"
});

// Automatically send JWT Token
API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

// =========================
// Authentication APIs
// =========================

export const registerRestaurant = (restaurant) =>
    API.post("/auth/register", restaurant);

export const loginRestaurant = (loginData) =>
    API.post("/auth/login", loginData);

// =========================
// Review APIs
// =========================

export const generateReview = (rating) =>
    API.get(`/comments/generate?rating=${rating}`);

export const getDashboard = () =>
    API.get("/comments/dashboard");

export const getAllReviews = () =>
    API.get("/comments/all");

export const getReviewsByRating = (rating) =>
    API.get(`/comments/rating/${rating}`);

export const saveFeedback = (feedback) =>
    API.post("/feedback", feedback);

export default API;