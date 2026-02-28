import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Shield, Zap, Settings } from 'lucide-react'

export default function ClientDetail() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState<any>(null)

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      const clients = JSON.parse(savedClients)
      const found = clients.find((c: any) => c.id === clientId)
      setClient(found || null)
    }
  }, [clientId])

  const handleDownload = () => {
    if (client?.fileData && client?.fileName) {
      const link = document.createElement('a')
      link.href = client.fileData
      link.download = client.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Client Not Found</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
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
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8">
            <ArrowLeft className="w-5 h-5" /> Back to Clients
          </button>

          <div className="bg-zinc-900/50 rounded-3xl p-8 md:p-12 border border-zinc-800">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Download className="w-12 h-12 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold">{client.name}</h1>
                  <span className={`px-3 py-1 text-sm rounded-full ${client.status === 'Available' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' : 'bg-zinc-700 text-zinc-400'}`}>
                    {client.status}
                  </span>
                </div>
                <p className="text-xl text-zinc-400">{client.tagline}</p>
              </div>
            </div>

            <p className="text-lg text-zinc-300 mb-8">{client.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <Shield className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-xs text-zinc-500">Status</p>
                  <p className="font-semibold">{client.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <Zap className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-xs text-zinc-500">Version</p>
                  <p className="font-semibold">{client.version}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <Settings className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-xs text-zinc-500">Type</p>
                  <p className="font-semibold">Minecraft Client</p>
                </div>
              </div>
            </div>

            {client.fileData ? (
              <button onClick={handleDownload} className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-all">
                Download {client.fileName || client.name}
              </button>
            ) : (
              <div className="w-full py-4 bg-zinc-800 text-zinc-500 rounded-xl font-bold text-center border border-zinc-700">
                Download Coming Soon
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
