import { defineStore } from "pinia";
import api from "../api/apiClient";
import apiHandler from "../api/apiHandler";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [],
    token: localStorage.getItem("token") || "",
    id: null,
    error: null,
  }),
  actions: {
    async login(userData) {
      try {
        const response = await apiHandler(
          () => api.post("/login", userData),
          "Login Success!"
        );
        this.token = response.data.token;

        localStorage.setItem("token", this.token);
        return response.data;
      } catch (error) {
        this.error = error;
        if (error.response) {
          const errorMessage = error.response?.data?.error;
          this.error = errorMessage;
          return null;
        }
      }
    },
    async register(userData) {
      try {
        const response = await apiHandler(
          () => api.post("/register", userData),
          "Register Success!"
        );
        this.token = response.data.token;
        this.id = response.data.id;

        localStorage.setItem("token", this.token);
        return response.data;
      } catch (error) {
        this.error = error;
        if (error.response) {
          const errorMessage = error.response?.data?.error;
          this.error = errorMessage;
          return null;
        }
      }
    },
    async signOut() {
      try {
        this.token = "";
        this.id = null;
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    },
  },
});
