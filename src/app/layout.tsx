import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Cog, HeartPulse, History, Wrench, PawPrint } from 'lucide-react'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto]">
      <main className="p-4 pb-24 max-w-3xl mx-auto w-full">{children}</main>
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <ul className="mx-auto max-w-3xl grid grid-cols-6 text-xs">
          <li><Tab to="/" icon={<Home size={22} />} label="Inicio" /></li>
          <li><Tab to="/animals" icon={<PawPrint size={22} />} label="Animales" /></li>
          <li><Tab to="/maintenance" icon={<Wrench size={22} />} label="Mantenimiento" /></li>
          <li><Tab to="/health" icon={<HeartPulse size={22} />} label="Salud" /></li>
          <li><Tab to="/history" icon={<History size={22} />} label="Historial" /></li>
          <li><Tab to="/settings" icon={<Cog size={22} />} label="Ajustes" /></li>
        </ul>
      </nav>
    </div>
  )
}

function Tab({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center p-2 ${isActive ? 'text-white' : 'text-gray-400'}`
      }
      >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}
