import { defineStore } from "pinia";
import { useLoadingStore } from "./loading-store";
import api from "../api/apiClient";
import apiHandler from "../api/apiHandler";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    dataUserByIdD: {},
    descriptionProfile: {},
    error: null,
    listUser: [],
    currentPage: 1,
    totalPages: 1,
    perPage: 6,
  }),
  actions: {
    async getUsers(page = 1) {
      const loadingStore = useLoadingStore();
      try {
        loadingStore.startLoading();
        const response = await apiHandler(
          () => api.get("/users?page=" + page + "&per_page=" + this.perPage),
          "Success get the data!"
        );
        this.users = response.data.data;
        this.currentPage = page;
        this.totalPages = response.data.total_pages || 1;
      } catch (error) {
        this.error = error;
      } finally {
        loadingStore.stopLoading();
      }
    },
    async getUserById(id) {
      const loadingStore = useLoadingStore();
      try {
        loadingStore.startLoading();
        const response = await api.get("/users/" + id);
        this.dataUserByIdD = response.data.data;
        this.descriptionProfile = response.data.support;
      } catch (error) {
        this.error = error;
      } finally {
        loadingStore.stopLoading();
      }
    },
    async createUser(userData) {
      try {
        const response = await apiHandler(
          () => api.post("/users", userData),
          "Create user success!"
        );

        if (response.status === 201) {
          this.listUser.push(response.data);
          return response.data;
        }
      } catch (error) {
        console.log("Error creating user: ", error);
        return null;
      }
    },
    async editUser(updatedUser) {
      try {
        const response = await apiHandler(
          () => api.put("/users/" + updatedUser.id, updatedUser),
          "Edit user success!"
        );
        if (response.status === 200) {
          const index = this.listUser.findIndex(
            (user) => user.id === updatedUser.id
          );
          if (index !== -1) {
            this.listUser[index] = updatedUser;
          }
          return updatedUser;
        }
      } catch (error) {
        console.error("Error edit user:", error);
        return null;
      }
    },
    async deleteUser(userId) {
      try {
        const response = await apiHandler(
          () => api.delete("/users/" + userId),
          "Delete user success!"
        );
        if (response.status === 204) {
          this.listUser = this.listUser.filter((user) => user.id !== userId);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
});
