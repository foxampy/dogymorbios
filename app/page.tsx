import { redirect } from 'next/navigation'

export default function Home() {
  // Перенаправление на onboarding или dashboard
  redirect('/onboarding')
}

