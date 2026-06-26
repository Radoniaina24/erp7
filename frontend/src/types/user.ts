export type UserRole = 'ADMIN' | 'MANAGER' | 'USER'

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}
