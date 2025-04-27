import { axiosInstance } from "@/config/axios-config";

export const getMe = async () => {
  try {
    const response = await axiosInstance.get("/users/profile");
    console.log(response);
    const data = response.data;
    if (response.status == 200) {
      return {
        success: true,
        data: data.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message || error.message,
    };
  }
};

export const updateBackground = async (file) => {
  const formData = new FormData();
  formData.append("backgroundCover", file);
  try {
    const response = await axiosInstance.put(
      "/users/update-background",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = response.data;
    if (response.status === 200) {
      return {
        success: true,
        data: data.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  try {
    const response = await axiosInstance.put("/users/update-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data;
    if (response.status === 200) {
      return {
        success: true,
        data: data.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const updateUser = async (body) => {
  try {
    const response = await axiosInstance.put("/users/update", body);

    const data = response.data;
    if (response.status === 200) {
      return {
        success: true,
        data: data.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const deleteUser = async () => {
  try {
    const response = await axiosInstance.delete("/users/");

    const data = response.data;
    if (response.status === 200) {
      return {
        success: true,
        data: data.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const updatePassword = async (body) => {
  try {
    const response = await axiosInstance.put("/users/update-password", body);
    // {
    //    "oldPassword": "Baktar",
    // "newPassword":"Almazz"
    // } ---body belee olaacq

    const data = response.data;
    if (response.status === 200) {
      return {
        success: true,
        data: data.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
