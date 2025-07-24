import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/presentation/layouts/BaseLayout.vue'
import CategoriesView from '@/presentation/pages/CategoriesView.vue'
import ProductsView from '@/presentation/pages/ProductsView.vue'

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      { path: '', redirect: '/categories' },
      { path: 'categories', component: CategoriesView },
      { path: 'products', component: ProductsView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
