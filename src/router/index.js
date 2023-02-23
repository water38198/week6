import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      component: () => import("../views/FrontLayout.vue"),
      children: [
        {
          path: "home",
          name: "Home",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "about",
          name: "About",
          component: () => import("../views/front/AboutView.vue"),
        },
        {
          path: "cart",
          name: "Cart",
          component: () => import("../views/front/CartView.vue"),
        },
        {
          path: "products",
          name: "Products",
          component: () => import("../views/front/ProductsView.vue"),
        },
        {
          path: "product/:id",
          name: "Product",
          component: () => import("../views/front/ProductView.vue"),
        },
        {
          path: "login",
          component: () => import("../views/front/LoginView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/DashBoard.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/admin/AdminProducts.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/admin/AdminOrders.vue"),
        },
      ],
    },
  ],
});

export default router;
