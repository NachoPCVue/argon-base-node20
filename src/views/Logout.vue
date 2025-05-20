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
            <div class="text-center">
              <h3>Cerrando sesión...</h3>
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

export default {
  name: "Logout",
  setup() {
    const router = useRouter();

    onMounted(async () => {
      try {
        await signOut(auth);
        console.log("User signed out");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } catch (error) {
        console.error("Error signing out: ", error);
        router.push("/login");
      }
    });

    return {};
  }
};
</script>
