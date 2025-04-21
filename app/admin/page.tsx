'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminTable from '@/components/AdminTable'
import DisponibilidadForm from '@/components/DisponibilidadForm'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin) {
      router.push('/login')
    }
  }, [router])

  return (
    <main className="min-h-screen bg-slate-50 p-6 space-y-10">
      <h1 className="text-2xl font-bold text-[#9A3324]">Panel de administración</h1>
      <AdminTable />
      <hr />
      <DisponibilidadForm />
    </main>
  )
}
