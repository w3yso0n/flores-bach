'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('isAdmin') === 'true') {
      router.push('/admin')
    }
  }, [router])

  const handleLogin = () => {
    if (password === 'flores25') {
      localStorage.setItem('isAdmin', 'true')
      router.push('/admin')
    } else {
      setError('Contraseña incorrecta 😢')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-lg shadow max-w-sm w-full space-y-4">
        <h1 className="text-xl font-bold text-[#9A3324] text-center">Inicio de sesión</h1>
        <Label>Contraseña de admin</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button onClick={handleLogin}>Ingresar</Button>
      </div>
    </div>
  )
}
