'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('isAdmin') === 'true'
      setIsAdmin(auth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/login')
  }

  if (!isAdmin) return null

  return (
    <TooltipProvider>
      <nav className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-md backdrop-blur-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/admin')}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-5 w-5 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Panel admin</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hover:bg-accent hover:text-destructive"
            >
              <LogOut className="h-5 w-5 text-red-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Cerrar sesión</TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>
  )
}
