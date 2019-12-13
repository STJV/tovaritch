import AdminView from 'tovaritch/core-ui/views/admin'
import AdminUsers from 'tovaritch/core-ui/components/admin/admin-users.vue'

export default [{
  path: '/admin',
  component: AdminView,
  children: [{
    path: '',
    name: 'admin_users',
    component: AdminUsers
  }]
}]

