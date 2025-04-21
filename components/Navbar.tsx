'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(auth)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/login')
  }

  if (!isAdmin) return null

  return (
    <nav className="fixed top-4 right-4 bg-white shadow-lg rounded-full flex items-center space-x-2 px-4 py-2 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push('/admin')}
        title="Panel admin"
      >
        <Settings className="h-5 w-5 text-[#9A3324]" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        title="Cerrar sesión"
      >
        <LogOut className="h-5 w-5 text-red-500" />
      </Button>
    </nav>
  )
}
