import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

// Imported views from gc-hub-MiSig
import MiSigDashboard from "../views/MiSigDashboard.vue";
import UserProfile from "../views/UserProfile.vue";
//import Element from "../views/Element.vue";
//import Doc from "../views/Doc.vue";
import DocumentoLibre from "../views/DocumentoLibre.vue";
import InboxSolicitudes from "../views/InboxSolicitudes.vue";
import ClientList from "../views/ClientList.vue";
import ContextoOrganizacion from "../views/ContextoOrganizacion.vue";
import Liderazgo from "../views/Liderazgo.vue";
import Planificacion from "../views/Planificacion.vue";
import Apoyo from "../views/Apoyo.vue";
import Operacion from "../views/Operacion.vue";
import EvaluacionDesempeno from "../views/EvaluacionDesempeno.vue";
import Mejora from "../views/Mejora.vue";
import Otros from "../views/Otros.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Register from "../views/Register.vue";
//import Photo from "../views/Photo.vue";
import UploadData from "../views/UploadData.vue";
import OpenPdf from "../views/OpenPdf.vue";
import FlowEx from "../views/FlowEx.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/login",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: { hideNav: true }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { hideNav: true }
  },
  
  // MiSig routes
  {
    path: "/misig-dashboard",
    name: "MiSig Dashboard",
    component: MiSigDashboard,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    component: UserProfile,
  },
  /*{
    path: "/element/:elementid",
    name: "Detalle equipo",
    component: Element,
    props: true
  },*/
  /*{
    path: "/cl/:elementid",
    name: "Datos equipo",
    component: Element,
    props: true
  },*/
  /*{
    path: "/doc/:elementid",
    name: "Carta de garantía",
    component: Doc,
    props: true
  },*/
  {
    path: "/solicitudes",
    name: "Solicitudes",
    component: InboxSolicitudes,
  },
  {
    path: "/client-list",
    name: "Lista de Clientes",
    component: ClientList,
  },
  {
    path: "/contexto-organizacion",
    name: "Contexto de Organización",
    component: ContextoOrganizacion,
  },
  {
    path: "/liderazgo",
    name: "Liderazgo",
    component: Liderazgo,
  },
  {
    path: "/planificacion",
    name: "Planificación",
    component: Planificacion,
  },
  {
    path: "/apoyo",
    name: "Apoyo",
    component: Apoyo,
  },
  {
    path: "/operacion",
    name: "Operación",
    component: Operacion,
  },
  {
    path: "/evaluacion-desempeno",
    name: "Evaluación del desempeño",
    component: EvaluacionDesempeno,
  },
  {
    path: "/mejora",
    name: "Mejora",
    component: Mejora,
  },
  {
    path: "/otros",
    name: "Otros",
    component: Otros,
  },
  {
    path: "/documento-libre",
    name: "Documento Libre",
    component: DocumentoLibre,
  },
  /*{
    path: "/photo",
    name: "Photo",
    component: Photo,
  },*/
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideNav: true }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { hideNav: true }
  },
  {
    path: "/uploaddata/:keydb/:datavalue",
    name: "Upload Data",
    component: UploadData,
    props: true
  },
  {
    path: "/openpdf/:elementid/:tipo/:nombrearchivo",
    name: "Open PDF",
    component: OpenPdf,
    props: true
  },
  {
    path: "/flow-ex",
    name: "Flow Diagram",
    component: FlowEx
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/signin', '/signup'];
  
  // Check if the route requires authentication
  const requiresAuth = !publicRoutes.includes(to.path);
  
  // Get the current user from Firebase auth
  const currentUser = auth.currentUser;
  
  if (requiresAuth && !currentUser) {
    // If the route requires auth and there's no current user, redirect to login
    next('/login');
  } else {
    // Otherwise proceed as normal
    next();
  }
});

export default router;
