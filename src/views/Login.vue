<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-md-7">
        <div class="card bg-secondary border-0 mb-0">
          <div class="card-header bg-transparent pb-5">
            <div class="text-center">
              <h1 class="text-dark">MiSig</h1>
              <p class="text-lead text-dark">Sistema de Gestión</p>
            </div>
          </div>
          <div class="card-body px-lg-5 py-lg-5">
            <div class="text-center text-muted mb-4">
              <small>Iniciar sesión con credenciales</small>
            </div>
            <form role="form" @submit.prevent="login">
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
                    placeholder="Password"
                    type="password"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary my-4">Iniciar sesión</button>
              </div>
              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-6">
            <a href="#" class="text-light">
              <small>¿Olvidaste tu contraseña?</small>
            </a>
          </div>
          <div class="col-6 text-right">
            <router-link to="/register" class="text-light">
              <small>Crear nueva cuenta</small>
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
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref(null);

    const login = async () => {
      error.value = null;
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push("/misig-dashboard");
      } catch (e) {
        console.error("Error en login:", e);
        error.value = "Error en el inicio de sesión. Verifica tus credenciales.";
      }
    };

    return {
      email,
      password,
      error,
      login
    };
  }
};
</script>
