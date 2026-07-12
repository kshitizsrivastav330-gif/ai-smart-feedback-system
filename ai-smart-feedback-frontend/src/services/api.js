import axios from "axios";

// Axios Instance
// const API = axios.create({
//     baseURL: "https://ai-smart-feedback-system.onrender.com"
// });
const API = axios.create({
    baseURL: "http://localhost:8080"
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
// AI APIs
// =========================

export const generateReview = (rating) =>
    API.get(`/comments/generate?rating=${rating}`);

// =========================
// Dashboard APIs
// =========================

export const getDashboard = (restaurantId) =>
    API.get(`/comments/dashboard?restaurantId=${restaurantId}`);

export const getAllReviews = (restaurantId) =>
    API.get(`/comments/all?restaurantId=${restaurantId}`);

export const getReviewsByRating = (restaurantId, rating) =>
    API.get(`/comments/rating/${rating}?restaurantId=${restaurantId}`);

// =========================
// Feedback APIs
// =========================

export const saveFeedback = (feedback) =>
    API.post("/feedback", feedback);

export default API;