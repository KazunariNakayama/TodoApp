import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

const app = new Hono()
console.log('Hello World')

export default app // for Cloudflare Workers or Bun