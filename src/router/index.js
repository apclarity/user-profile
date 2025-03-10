import { createRouter, createWebHistory } from "vue-router";
const MainLayout = () => import("../layouts/MainLayout.vue");
const Homepage = () => import("../pages/Homepage.vue");
const UserProfile = () => import("../pages/UserProfile.vue");
const Login = () => import("../pages/Login.vue");
const AddUser = () => import("../pages/AddUser.vue");

const routes = [
  { path: "/", component: Login },
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/home", component: Homepage, meta: { requiresAuth: true } },
      { path: "/playground", component: AddUser, meta: { requiresAuth: true } },
      {
        path: "/profile/:id",
        component: UserProfile,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
