<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card bg-secondary border-0">
          <div class="card-header bg-transparent pb-5">
            <div class="text-center">
              <h1 class="text-dark">MiSig</h1>
              <p class="text-lead text-dark">Sistema de Gestión</p>
            </div>
          </div>
          <div class="card-body px-lg-5 py-lg-5">
            <div class="text-center text-muted mb-4">
              <small>Registrar nueva cuenta</small>
            </div>
            <form role="form" @submit.prevent="register">
              <div class="mb-3">
                <div class="input-group input-group-alternative">
                  <span class="input-group-text"><i class="ni ni-hat-3"></i></span>
                  <input
                    class="form-control"
                    placeholder="Nombre"
                    type="text"
                    v-model="name"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="input-group input-group-alternative">
                  <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                  <input
                    class="form-control"
                    placeholder="Email"
                    type="email"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="input-group input-group-alternative">
                  <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                  <input
                    class="form-control"
                    placeholder="Contraseña"
                    type="password"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="input-group input-group-alternative">
                  <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                  <input
                    class="form-control"
                    placeholder="Confirmar contraseña"
                    type="password"
                    v-model="confirmPassword"
                  />
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary mt-4">Crear cuenta</button>
              </div>
              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 text-center">
            <router-link to="/login" class="text-light">
              <small>¿Ya tienes una cuenta? Inicia sesión</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth, database } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, set } from "firebase/database";

export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const error = ref(null);

    const register = async () => {
      error.value = null;

      // Validaciones básicas
      if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = "Todos los campos son obligatorios";
        return;
      }

      if (password.value !== confirmPassword.value) {
        error.value = "Las contraseñas no coinciden";
        return;
      }

      if (password.value.length < 6) {
        error.value = "La contraseña debe tener al menos 6 caracteres";
        return;
      }

      try {
        // Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Guardar información adicional en la base de datos
        const userDbRef = dbRef(database, `usuarios2/Misig/${user.uid}`);
        await set(userDbRef, {
          name: name.value,
          user: email.value,
          type: "client", // Por defecto, los nuevos usuarios son clientes
          createdAt: new Date().toISOString()
        });

        // Redirigir al dashboard
        router.push("/misig-dashboard");
      } catch (e) {
        console.error("Error en registro:", e);
        if (e.code === "auth/email-already-in-use") {
          error.value = "El correo electrónico ya está en uso";
        } else {
          error.value = "Error al crear la cuenta. Inténtalo de nuevo.";
        }
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      error,
      register
    };
  }
};
</script>
