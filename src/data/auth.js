import { api } from "./api.js";

export const loginRequest = async ({ usuario, contrasena }) => {
  return await api("/auth/login", {
    method: "POST",
    body: { usuario, contrasena },
  });
};

export const registerRequest = async ({ cedula, usuario, contrasena }) => {
  return await api("/auth/register", {
    method: "POST",
    body: { cedula, usuario, contrasena },
  });
};

export const autoRegisterRequest = async ({ cedula }) => {
  return await api("/auth/auto-register", {
    method: "POST",
    body: { cedula },
  });
};

export const forgotPasswordRequest = async ({ usuario }) => {
  return await api("/auth/forgot-password", {
    method: "POST",
    body: { usuario },
  });
};

export const resetPasswordRequest = async ({ usuario, codigo, contrasena }) => {
  return await api("/auth/reset-password", {
    method: "POST",
    body: { usuario, codigo, contrasena },
  });
};

export const meRequest = async () => {
  const res = await api("/auth/me");
  return res;
};

export const logoutRequest = async () => {
  await api("/auth/logout", { method: "POST" });
  return true;
};

export const fetchUsuarios = async () => {
  const res = await api("/auth/usuarios");
  return res.usuarios ?? [];
};

export const fetchUsuarioById = async (id) => {
  const res = await api(`/auth/usuarios/${id}`);
  return res.usuario ?? null;
};

export const updateUsuarioRequest = async (id, data) => {
  const body = {
    empleado_id: data.empleado_id ? Number(data.empleado_id) : null,
    usuario: data.usuario?.trim(),
    contrasena: data.contrasena?.trim() || null,
    rol_id: data.rol_id ? Number(data.rol_id) : null,
  };

  const res = await api(`/auth/usuarios/${id}`, {
    method: "PATCH",
    body,
  });

  return res.usuario ?? null;
};

export const deleteUsuarioRequest = async (id) => {
  await api(`/auth/usuarios/${id}`, {
    method: "DELETE",
  });

  return true;
};