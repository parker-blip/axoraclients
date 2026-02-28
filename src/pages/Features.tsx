import { useNavigate } from 'react-router-dom'
import { Zap, Shield, Settings, Swords, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Features() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimized from the ground up to deliver maximum FPS with minimal latency. Experience smooth gameplay even on lower-end systems.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Undetectable',
      description: 'Advanced bypass systems keep you under the radar on all major servers. Our detection evasion is constantly updated.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Every aspect can be customized to match your playstyle. From HUD layouts to keybinds, make it truly yours.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Swords,
      title: 'PvP Optimized',
      description: 'Built specifically for competitive PvP. Features like auto-clicker, reach, and velocity give you the edge.',
      color: 'from-red-400 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">Ax</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold">Axora</span>
                <span className="text-yellow-400 text-xs tracking-widest">CLIENTS</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('/')} className="text-sm text-zinc-400 hover:text-white">Home</button>
              <span className="text-sm text-yellow-400">Features</span>
              <a href="https://discord.gg/axoras" target="_blank" className="text-sm text-zinc-400 hover:text-white">Discord</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Why Choose <span className="text-yellow-400">Axora</span></h1>
            <p className="text-xl text-zinc-400">Built for performance, designed for victory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-yellow-400/50 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">Ax</span>
            </div>
            <span className="text-white font-bold">Axora</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-zinc-500">
            <button onClick={() => navigate('/')} className="hover:text-yellow-400">Home</button>
            <button onClick={() => navigate('/features')} className="hover:text-yellow-400">Features</button>
            <a href="https://discord.gg/axoras" target="_blank" className="hover:text-yellow-400">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
