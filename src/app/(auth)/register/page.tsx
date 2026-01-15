'use client'

import { useRouter } from 'next/navigation'
import RegisterFormClean from '@/components/auth/RegisterFormClean'

export default function RegisterPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/auth/login?message=registration_success')
  }

  return <RegisterFormClean onSuccess={handleSuccess} />
}
