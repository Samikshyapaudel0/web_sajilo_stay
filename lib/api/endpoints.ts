// centralized path definitions for API endpoints
export const API = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    WHOAMI: "/api/v1/auth/whoami",
    UPDATE: "/api/v1/auth/update",
    UPDATE_PASSWORD: "/api/v1/auth/update-password",
    REQUEST_PASSWORD_RESET: "/api/v1/auth/request-password-reset",
    RESET_PASSWORD: (token: string): string =>
      `/api/v1/auth/reset-password/${token}`,
  },
  ADMIN: {
    USERS: {
      GET_ALL: "/api/v1/admin/users",
      GET_BY_ID: (id: string) => `/api/v1/admin/users/${id}`,
      CREATE: "/api/v1/admin/users",
      UPDATE: (id: string) => `/api/v1/admin/users/${id}`,
      UPDATE_PASSWORD: (id: string) => `/api/v1/admin/users/${id}/password`,
      DELETE: (id: string) => `/api/v1/admin/users/${id}`,
    },
  },
  HOST: {
    PROPERTIES: {
      GET_ALL: "/api/v1/host/properties",
      GET_BY_ID: (id: string) => `/api/v1/host/properties/${id}`,
      CREATE: "/api/v1/host/properties",
      UPDATE: (id: string) => `/api/v1/host/properties/${id}`,
      DELETE: (id: string) => `/api/v1/host/properties/${id}`,
    },
    BOOKINGS: {
      GET_ALL: "/api/v1/host/bookings",
      CONFIRM: (id: string) => `/api/v1/host/bookings/${id}/confirm`,
      REJECT: (id: string) => `/api/v1/host/bookings/${id}/reject`,
    },
  },
  USER: {
    PROPERTIES: {
      GET_ALL: "/api/v1/properties",
      GET_BY_ID: (id: string) => `/api/v1/properties/${id}`,
    },
    BOOKINGS: {
      GET_ALL: "/api/v1/bookings",
      GET_BY_ID: (id: string) => `/api/v1/bookings/${id}`,
      CREATE: "/api/v1/bookings",
      CANCEL: (id: string) => `/api/v1/bookings/${id}/cancel`,
    },
    FAVORITES: {
      GET_ALL: "/api/v1/favorites",
      CREATE: "/api/v1/favorites",
      DELETE: (propertyId: string) => `/api/v1/favorites/${propertyId}`,
    },
    PAYMENTS: {
      INITIATE: "/api/v1/payments/initiate",
      VERIFY: "/api/v1/payments/verify",
    },
  },
};
 

