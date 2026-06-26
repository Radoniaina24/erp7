import { resolve } from 'node:path'
import { config } from 'dotenv'
import * as bcrypt from 'bcrypt'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient, UserRole } from './backend/generated/prisma/client'

config({ path: resolve(process.cwd(), 'backend/.env') })

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@erp.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'Admin@123456'
const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME ?? 'Admin'
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME ?? 'ERP'

async function seedAdmin() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL manquant dans backend/.env')
  }

  const adapter = new PrismaMariaDb(databaseUrl)
  const prisma = new PrismaClient({ adapter })

  try {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)

    const admin = await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: {
        firstName: ADMIN_FIRST_NAME,
        lastName: ADMIN_LAST_NAME,
        password: hashedPassword,
        role: UserRole.ADMIN,
        isActive: true,
      },
      create: {
        email: ADMIN_EMAIL,
        firstName: ADMIN_FIRST_NAME,
        lastName: ADMIN_LAST_NAME,
        password: hashedPassword,
        role: UserRole.ADMIN,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    })

    console.log('✅ Utilisateur admin créé / mis à jour :')
    console.log(`   Email    : ${admin.email}`)
    console.log(`   Nom      : ${admin.firstName} ${admin.lastName}`)
    console.log(`   Rôle     : ${admin.role}`)
    console.log(`   Actif    : ${admin.isActive}`)
    console.log('')
    console.log('🔑 Mot de passe (voir ADMIN_PASSWORD dans backend/.env)')
  } finally {
    await prisma.$disconnect()
  }
}

seedAdmin().catch((error) => {
  console.error('❌ Échec du seed admin :', error)
  process.exit(1)
})
