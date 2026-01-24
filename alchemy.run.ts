import alchemy from 'alchemy'
import { Nextjs, D1Database } from 'alchemy/cloudflare'

const app = await alchemy('nuoi-tao')

export const db = await D1Database('db', {
  name: 'nuoi-tao-db',
  migrationsDir: './migrations',
})

export const web = await Nextjs('web', {
  adopt: true,
  bindings: {
    DB: db,
    APP_URL: alchemy.env.APP_URL,
    SEPAY_TOKEN: alchemy.env.SEPAY_TOKEN,
  },
})

console.log(`Web -> ${web.url}`)

await app.finalize()
