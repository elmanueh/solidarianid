export const ROUTES = {
  auth: {
    login: '/login',
    register: '/register',
    onboarding: '/register/onboarding',
  },
  app: {
    home: '/home',
    explore: '/explore',
    favorites: '/favorites',
    notifications: '/notifications',
    profile: '/profile',
  },
  profile: {
    settings: '/profile/settings',
    requests: '/profile/settings/requests',
    personalInfo: '/profile/settings/personal-info',
    impact: '/profile/settings/impact',
    privacy: '/profile/settings/privacy',
    help: '/profile/settings/help',
  },
  favorites: {
    requestsCreate: '/favorites/requests/create',
  },
  communities: {
    detail: (communityId: string) => `/communities/${communityId}`,
    causes: (communityId: string) => `/communities/${communityId}/causes`,
    causeDetail: (communityId: string, causeId: string) => `/communities/${communityId}/causes/${causeId}`,
    causeRequestCreate: (communityId: string, causeId: string) =>
      `/communities/${communityId}/causes/${causeId}/requests/create`,
    actionDetail: (communityId: string, causeId: string, actionId: string) =>
      `/communities/${communityId}/causes/${causeId}/actions/${actionId}`,
  },
} as const;
