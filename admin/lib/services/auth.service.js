import api from "@/lib/axios";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const getCurrentAdmin = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const changePassword = async (payload) => {
  const { data } = await api.put("/auth/change-password", payload);
  return data;
};
