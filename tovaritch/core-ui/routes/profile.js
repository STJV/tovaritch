import ProfileView from 'tovaritch/core-ui/views/profile'
import Profile from 'tovaritch/core-ui/components/user/profile'

export default [{
  path: '/profile',
  component: ProfileView,
  children: [{
    path: '',
    name: 'profile',
    component: Profile
  }]
}]
