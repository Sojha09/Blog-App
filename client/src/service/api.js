import axios from "axios";
import {
  API_NOTIFICATION_MESSAGES,
  SERVICE_URLS,
} from "../components/constants/config";

import { getAccessToken, getType } from "../utils/common-utils";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8002";
console.log("Using API URL:", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request made with config:", config);

    // Ensure config.TYPE is defined before accessing its properties
    if (config.TYPE) {
      if (config.TYPE.params) {
        config.params = config.TYPE.params; // Correct property access
      } else if (config.TYPE.query) {
        config.url = `${config.url}/${config.TYPE.query}`; // Use template literals for clarity
      }
    } else {
      console.warn("config.TYPE is undefined. Cannot access Params or query.");
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => processResponse(response),
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(processError(error));
  }
);

// Process successful responses
const processResponse = (response) => {
  console.log("Response received:", response);
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response.status,
      msg: response.data?.msg || "Unknown error",
      code: response.data?.code || "UNKNOWN_CODE",
    };
  }
};

// Process errors
const processError = (error) => {
  if (error.response) {
    console.error("Error in RESPONSE:", error.response.data);
    return {
      isError: true,
      msg: error.response.data.msg || `Error: ${error.response.status}`,
      code: error.response.status,
    };
  } else if (error.request) {
    console.error("Error in REQUEST:", error.request);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "REQUEST_ERROR",
    };
  } else if (error.code === "ECONNABORTED") {
    console.error("Request timed out");
    return {
      isError: true,
      msg: "Request timed out. Please try again.",
      code: "TIMEOUT_ERROR",
    };
  } else {
    console.error("Error in NETWORK:", error.message);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkFailure,
      code: "NETWORK_ERROR",
    };
  }
};

// Build API methods dynamically
const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (
    body,
    showUploadProgress,
    showDownloadProgress,
    customHeaders
  ) => {
    return axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
        ...customHeaders,
      },
      TYPE: getType(value, body),
      onUploadProgress: (progressEvent) => {
        if (showUploadProgress) {
          const percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
          console.log(`Upload progress: ${percentageCompleted}%`);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (showDownloadProgress) {
          const percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
          console.log(`Download progress: ${percentageCompleted}%`);
        }
      },
    });
  };
}

export { API };
