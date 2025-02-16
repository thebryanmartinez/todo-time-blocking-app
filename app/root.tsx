import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'

import './tailwind.css'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
import { Database } from '~/modules/shared/models'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
  }
]

export const loader = () => {
  const env = {
    SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY
  }

  return Response.json({ env })
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { env } = useLoaderData<typeof loader>()
  const [supabase] = useState(() =>
    createClient<Database>(env.SUPABASE_PROJECT_URL, env.SUPABASE_API_KEY)
  )
  return <Outlet context={{ supabase }} />
}
