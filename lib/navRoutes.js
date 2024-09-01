export const navRoutes = (user) => [
  {
    name: 'Home',
    icon: 'mdi:home-outline',
    route: '/',
  },
  {
    name: 'My profile',
    icon: 'ri:profile-line',
    route: `/profile/${user?.id}`,
  },
  {
    name: 'Messages',
    icon: 'ic:outline-message',
    route: '/messages',
  },
];
