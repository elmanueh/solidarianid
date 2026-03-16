import { AUTH_ENDPOINTS } from "@/features/auth/constants/api.constants"
import type { User } from "@/features/auth/model/user"
import api from "@/features/axios/axios"

// FIXME: Añadir Registro y tenemos que hablar el tema de los JWT (refresh, etc)
export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // const params = new URLSearchParams()
    // params.append("username", email)
    // params.append("password", password)
    // const response = await api.post(AUTH_ENDPOINTS.LOGIN, params, {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // })
    // return response.data.user
  },

  refreshToken: async () => {
    const response = await api.post(AUTH_ENDPOINTS.REFRESH)
    return response.data.message
  },
}
