import { useToast } from "vue-toastification";

export const apiHandler = async (apiCall, successMessage = "Success!") => {
  const toast = useToast();

  try {
    const response = await apiCall();
    toast.success(successMessage);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.error;
    toast.error(errorMessage);
    throw error;
  }
};

export default apiHandler;
