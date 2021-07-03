import axios from "axios";

const urlRoot = "https://meet-doc.herokuapp.com/api/";
// const urlRoot = "http://localhost:5000/api/";

export const register = async (data) => {
  return await axios
    .post(urlRoot + "auth/register", data, {
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      localStorage.setItem("csrf_access_token", res.data.csrf_access_token);
      localStorage.setItem("csrf_refresh_token", res.data.csrf_refresh_token);
      return res;
    });
};

export const login = async (data) => {
  return await axios
    .post(urlRoot + "auth/login", data, {
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      localStorage.setItem("csrf_access_token", res.data.csrf_access_token);
      localStorage.setItem("csrf_refresh_token", res.data.csrf_refresh_token);
      return res;
    });
};

export const logout = async () => {
  return await axios.post(urlRoot + "auth/logout", null, {
    withCredentials: true,
  });
};

export const getUserData = async () => await fetchWithToken("GET", "user-info");

export const adminGetAppointments = async () =>
  await fetchWithToken("GET", "admin/appointments");

export const adminDeleteAppointment = async (id) =>
  await fetchWithToken("DELETE", "admin/appointments", { id });

export const adminAddAppointment = async (data) =>
  await fetchWithToken("POST", "admin/appointments", data);

export const adminEditAppointment = async (id, data) =>
  await fetchWithToken("PUT", "admin/appointments", { ...data, id });

export const getAvailableAppointment = async () =>
  await fetchWithToken("GET", "appointments/available");

export const addAppointment = async (id) =>
  await fetchWithToken("POST", "appointments", { id });

export const cancelAppointment = async (id) =>
  await fetchWithToken("DELETE", "appointments", { id });

export const getAppointments = async (id) =>
  await fetchWithToken("GET", "appointments");

const fetchWithToken = async (method, url, data) => {
  const fetchData = async () => {
    const access_token = localStorage.getItem("csrf_access_token");
    const headers = {
      "Content-Type": "application/json",
      "X-CSRF_TOKEN": access_token,
    };
    return await axios({
      method: method,
      url: urlRoot + url,
      data: data,
      withCredentials: true,
      credentials: "include",
      headers,
    });
  };
  return await fetchData().catch(async (err) => {
    if (err.response?.data?.msg === "Token has expired") {
      return await refreshToken().then(async () => await fetchData());
    } else {
      throw err;
    }
  });
};

export const secret = async () => {
  return await fetchWithToken("GET", "secret");
};
const refreshToken = async () => {
  const refresh_token = localStorage.getItem("csrf_refresh_token");
  const headers = {
    "Content-Type": "application/json",
    "X-CSRF_TOKEN": refresh_token,
  };
  await axios
    .post(urlRoot + "refresh", null, {
      withCredentials: true,
      credentials: "include",
      headers,
    })
    .then((res) => {
      localStorage.setItem("csrf_access_token", res.data.csrf_access_token);
      localStorage.setItem("csrf_refresh_token", res.data.csrf_refresh_token);
      return res;
    });
};
