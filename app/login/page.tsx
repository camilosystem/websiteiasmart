'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/actions/auth-actions'
import { Lock } from 'lucide-react'

type State = { error?: string } | undefined

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<State, FormData>(
    loginAction,
    undefined
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo / header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: '#7c3aed' }}
          >
            ia
          </div>
          <h1 className="text-2xl font-bold text-foreground text-balance text-center">
            Acceso al Editor
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Introduce la contraseña maestra para continuar.
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-colors"
              />
            </div>
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ background: '#7c3aed' }}
          >
            {pending ? 'Verificando...' : 'Ingresar al Editor'}
          </button>
        </form>
      </div>
    </div>
  )
}
