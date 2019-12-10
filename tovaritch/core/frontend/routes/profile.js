import ProfileView from '@/views/profile'
import Profile from '@/components/user/profile'

export default [{
  path: '/profile',
  component: ProfileView,
  name: '',
  children: [{
    path: '',
    name: 'profile',
    component: Profile
  }]
}]
