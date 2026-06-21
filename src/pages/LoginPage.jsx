import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    usuario: "",
    contrasena: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login({
        usuario: form.usuario.trim(),
        contrasena: form.contrasena,
      });

      navigate("/");
    } catch (err) {
      setError(
        err.message ||
          "No se pudo iniciar sesión. Revise sus credenciales e intente nuevamente."
      );

      setTimeout(() => setError(""), 4500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-slate-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-2xl lg:grid-cols-[1.05fr_1fr]">
          <section className="hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 p-3 shadow-sm backdrop-blur">
                <img
                  src="/Logo.jpg"
                  alt="ACONSA"
                  className="h-14 w-14 rounded-2xl object-cover shadow-lg"
                />

                <div>
                  <p className="text-sm font-medium text-cyan-100">
                    Asesoría &
                  </p>

                  <p className="text-sm font-bold text-white">
                    Construcción S.A.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                  Sistema ACSA
                </p>

                <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white">
                  Bienvenido al panel administrativo
                </h1>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                  Plataforma para gestionar proyectos, personal, inventario,
                  compras, servicios, avalúos y recursos de construcción.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <InfoBox
                title="Gestión centralizada"
                text="Administra módulos clave desde un solo sistema."
              />

              <InfoBox
                title="Acceso por usuario"
                text="Inicia sesión con credenciales seguras."
              />

              <InfoBox
                title="Control operativo"
                text="Consulta información importante de forma rápida."
              />
            </div>
          </section>

          <section className="flex items-center justify-center bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:hidden">
                <div className="mb-5 flex justify-center">
                  <img
                    src="/Logo.jpg"
                    alt="ACONSA"
                    className="h-24 w-24 rounded-3xl object-cover shadow-lg"
                  />
                </div>

                <p className="text-sm font-medium text-blue-700">
                  Sistema ACSA
                </p>

                <h1 className="mt-1 text-2xl font-black text-slate-900">
                  Iniciar sesión
                </h1>
              </div>

              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-blue-700">
                  Acceso al sistema
                </p>

                <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                  Iniciar sesión
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Ingrese sus credenciales para acceder al panel.
                </p>
              </div>

              {error && (
                <MessageBox
                  tipo="error"
                  titulo="No se pudo iniciar sesión"
                  texto={error}
                  onClose={() => setError("")}
                />
              )}

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Usuario
                  </label>

                  <input
                    type="text"
                    name="usuario"
                    value={form.usuario}
                    onChange={(e) =>
                      setForm({ ...form, usuario: e.target.value })
                    }
                    placeholder="Ingrese su usuario"
                    required
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-slate-300
                      bg-slate-100
                      px-4
                      py-3
                      text-sm
                      text-slate-800
                      shadow-sm
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-blue-700
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Contraseña
                  </label>

                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      name="contrasena"
                      value={form.contrasena}
                      onChange={(e) =>
                        setForm({ ...form, contrasena: e.target.value })
                      }
                      placeholder="Ingrese su contraseña"
                      required
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-300
                        bg-slate-100
                        px-4
                        py-3
                        pr-12
                        text-sm
                        text-slate-800
                        shadow-sm
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-blue-700
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPw((prev) => !prev)}
                      className="
                        absolute
                        inset-y-0
                        right-3
                        flex
                        items-center
                        justify-center
                        text-slate-500
                        transition
                        hover:text-blue-800
                      "
                      aria-label={
                        showPw ? "Ocultar contraseña" : "Mostrar contraseña"
                      }
                    >
                      {showPw ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="mt-3 text-right">
                    <Link
                      to="/reset-password"
                      className="text-sm font-bold text-blue-800 transition hover:text-cyan-700 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-800
                    to-cyan-700
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    hover:scale-[1.01]
                    hover:shadow-xl
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                    disabled:hover:scale-100
                  "
                >
                  {loading ? "Ingresando..." : "Entrar"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm">
                <p className="text-sm text-slate-600">
                  ¿No tiene cuenta?{" "}
                  <Link
                    to="/signup"
                    className="font-bold text-blue-800 transition hover:text-cyan-700 hover:underline"
                  >
                    Crear una cuenta
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-sm backdrop-blur">
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="mt-1 text-sm leading-5 text-cyan-100">{text}</p>
    </div>
  );
}

function MessageBox({ tipo, titulo, texto, onClose }) {
  const isError = tipo === "error";

  return (
    <div
      className={`
        mt-6
        flex
        items-start
        gap-3
        rounded-2xl
        border
        px-4
        py-3
        shadow-sm
        ${
          isError
            ? "border-red-200 bg-red-50 text-red-800"
            : "border-emerald-200 bg-emerald-50 text-emerald-800"
        }
      `}
    >
      <div
        className={`
          mt-0.5
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-xl
          text-sm
          font-black
          ${isError ? "bg-red-600 text-white" : "bg-emerald-600 text-white"}
        `}
      >
        {isError ? "!" : "✓"}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-black">{titulo}</p>
        <p className="mt-1 text-sm leading-5">{texto}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-xl
          text-sm
          font-black
          transition
          hover:bg-black/5
        "
        aria-label="Cerrar mensaje"
      >
        ×
      </button>
    </div>
  );
}