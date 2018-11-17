import Vue from 'vue'
import Router from 'vue-router'
// LAYOUTS
import Protected from '@/layouts/protected'
import Public from '@/layouts/public'
// PAGES
import Login from '@/pages/Login'
import Users from '@/pages/Users'
import Cliente from '@/pages/cliente'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Public,
      redirect: 'login',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/admin',
      component: Protected,
      redirect: '/admin',
      children: [
        {
          path: '/admin/actions',
          name: 'Portada',
          component: Users
        },
        {
          path: '/admin/entidad/cliente',
          name: 'Cliente',
          component: Cliente
        }
      ]
    }
  ]
})
