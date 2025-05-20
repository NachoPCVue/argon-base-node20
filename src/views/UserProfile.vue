<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Editar Perfil</p>
              <button class="btn btn-primary btn-sm ms-auto" @click="saveProfile">
                Guardar
              </button>
            </div>
          </div>
          <div class="card-body">
            <p class="text-uppercase text-sm">Información de Usuario</p>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Nombre</label>
                  <input class="form-control" type="text" v-model="user.name" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Email</label>
                  <input class="form-control" type="email" v-model="user.email" disabled />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Teléfono</label>
                  <input class="form-control" type="text" v-model="user.phone" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Cargo</label>
                  <input class="form-control" type="text" v-model="user.position" />
                </div>
              </div>
            </div>
            <hr class="horizontal dark" />
            <p class="text-uppercase text-sm">Información de Contacto</p>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Dirección</label>
                  <input class="form-control" type="text" v-model="user.address" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Ciudad</label>
                  <input class="form-control" type="text" v-model="user.city" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">País</label>
                  <input class="form-control" type="text" v-model="user.country" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Código Postal</label>
                  <input class="form-control" type="text" v-model="user.postalCode" />
                </div>
              </div>
            </div>
            <hr class="horizontal dark" />
            <p class="text-uppercase text-sm">Sobre mí</p>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Descripción</label>
                  <textarea class="form-control" rows="4" v-model="user.about"></textarea>
                </div>
              </div>
            </div>
            <div v-if="message" class="alert" :class="messageType === 'success' ? 'alert-success' : 'alert-danger'" role="alert">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-profile">
          <img src="@/assets/img/bg-profile.jpg" alt="Image placeholder" class="card-img-top" />
          <div class="row justify-content-center">
            <div class="col-4 col-lg-4 order-lg-2">
              <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                <a href="javascript:;">
                  <img src="@/assets/img/team-2.jpg" class="rounded-circle img-fluid border border-2 border-white" />
                </a>
              </div>
            </div>
          </div>
          <div class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
            <div class="d-flex justify-content-between">
              <a href="javascript:;" class="btn btn-sm btn-info mb-0 d-none d-lg-block">Conectar</a>
              <a href="javascript:;" class="btn btn-sm btn-info mb-0 d-block d-lg-none"><i class="ni ni-collection"></i></a>
              <a href="javascript:;" class="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block">Mensaje</a>
              <a href="javascript:;" class="btn btn-sm btn-dark float-right mb-0 d-block d-lg-none"><i class="ni ni-email-83"></i></a>
            </div>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col">
                <div class="d-flex justify-content-center">
                  <div class="d-grid text-center">
                    <span class="text-lg font-weight-bolder">22</span>
                    <span class="text-sm opacity-8">Equipos</span>
                  </div>
                  <div class="d-grid text-center mx-4">
                    <span class="text-lg font-weight-bolder">10</span>
                    <span class="text-sm opacity-8">Documentos</span>
                  </div>
                  <div class="d-grid text-center">
                    <span class="text-lg font-weight-bolder">89</span>
                    <span class="text-sm opacity-8">Comentarios</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <h5>
                {{ user.name || 'Usuario' }}
              </h5>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2"></i>{{ user.city || 'Ciudad' }}, {{ user.country || 'País' }}
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>{{ user.position || 'Cargo' }}
              </div>
              <div>
                <i class="ni education_hat mr-2"></i>MiSig - Sistema de Gestión
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth, database } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref as dbRef, get, update } from "firebase/database";

export default {
  name: "UserProfile",
  setup() {
    const user = ref({
      name: "",
      email: "",
      phone: "",
      position: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      about: ""
    });
    
    const message = ref("");
    const messageType = ref("success");
    const userId = ref(null);

    const loadUserProfile = async (uid) => {
      try {
        const userDbRef = dbRef(database, `usuarios2/Misig/${uid}`);
        const snapshot = await get(userDbRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          user.value = {
            name: userData.name || "",
            email: userData.user || "",
            phone: userData.phone || "",
            position: userData.position || "",
            address: userData.address || "",
            city: userData.city || "",
            country: userData.country || "",
            postalCode: userData.postalCode || "",
            about: userData.about || ""
          };
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        message.value = "Error al cargar el perfil de usuario";
        messageType.value = "danger";
      }
    };

    const saveProfile = async () => {
      try {
        if (!userId.value) {
          message.value = "No se ha iniciado sesión";
          messageType.value = "danger";
          return;
        }

        const userDbRef = dbRef(database, `usuarios2/Misig/${userId.value}`);
        await update(userDbRef, {
          name: user.value.name,
          phone: user.value.phone,
          position: user.value.position,
          address: user.value.address,
          city: user.value.city,
          country: user.value.country,
          postalCode: user.value.postalCode,
          about: user.value.about,
          updatedAt: new Date().toISOString()
        });

        message.value = "Perfil actualizado correctamente";
        messageType.value = "success";
        
        // Limpiar el mensaje después de 3 segundos
        setTimeout(() => {
          message.value = "";
        }, 3000);
      } catch (error) {
        console.error("Error saving user profile:", error);
        message.value = "Error al guardar el perfil de usuario";
        messageType.value = "danger";
      }
    };

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userId.value = user.uid;
          loadUserProfile(user.uid);
        } else {
          // Redirect to login page
          window.location.href = "/#/login";
        }
      });
    });

    return {
      user,
      message,
      messageType,
      saveProfile
    };
  }
};
</script>
