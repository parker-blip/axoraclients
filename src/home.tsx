import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, ChevronRight, Shield, Code, Zap, Menu, X, Sparkles, Users, Lock, Globe } from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/5 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">Ax</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">Axora</span>
                <span className="text-yellow-400 text-xs tracking-widest">CLIENTS</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('/features')} className="text-sm text-zinc-400 hover:text-white">Features</button>
              <a href="#download" className="text-sm text-zinc-400 hover:text-white">Download</a>
              <a href="https://discord.gg/axoras" target="_blank" className="text-sm text-zinc-400 hover:text-white">Discord</a>
            </div>

            <a href="#download" className="hidden md:flex px-6 py-2.5 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all">
              Download Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-400 text-sm">Minecraft 1.8 - 1.21</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-white">Axora</span>{' '}
            <span className="text-yellow-400">Clients</span>
          </h1>

          <p className="text-xl text-zinc-400 mb-8">Free Minecraft Utility Mods</p>
          
          <p className="text-zinc-500 max-w-2xl mx-auto mb-12">
            Premium Minecraft clients packed with 100+ modules for basehunting, 
            automation, and combat. All features are free with no paywalls.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#download" className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-all">
              Download for 1.8+
            </a>
            <a href="https://discord.gg/axoras" target="_blank" className="px-8 py-4 bg-zinc-800 text-white rounded-lg border border-zinc-700 hover:bg-zinc-700">
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">Ax</span>
            </div>
            <span className="text-white font-bold">Axora</span>
          </div>
          <p className="text-zinc-600 text-sm">© 2024 Axora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
