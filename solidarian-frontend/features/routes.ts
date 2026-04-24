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
    requests: '/profile/requests',
    personalInfo: '/profile/personal-info',
    impact: '/profile/impact',
    privacy: '/profile/privacy',
    help: '/profile/help',
  },
  favorites: {
    requestsCreate: '/favorites/requests/create',
  },
  communities: {
    detail: (communityId: string) => `/communities/${communityId}`,
    causes: (communityId: string) => `/communities/${communityId}`,
    causeDetail: (communityId: string, causeId: string) => `/communities/${communityId}/causes/${causeId}`,
    causeRequestCreate: (communityId: string, causeId: string) =>
      `/communities/${communityId}/causes/${causeId}/requests/create`,
    actionDetail: (communityId: string, causeId: string, actionId: string) =>
      `/communities/${communityId}/causes/${causeId}/actions/${actionId}`,
  },
} as const;
