import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Upload, Trash2, Plus, Download, Eye, EyeOff } from 'lucide-react'

export default function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [newClient, setNewClient] = useState({
    name: '',
    tagline: '',
    description: '',
    version: '',
    status: 'Available'
  })

  useEffect(() => {
    const savedClients = localStorage.getItem('axora_clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  const handleLogin = () => {
    if (password === atob('UEBya2VyRDN2aXNzZXIyMDEx')) {
      setIsAuthenticated(true)
    } else {
      alert('Wrong password')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size <= 5 * 1024 * 1024) {
      setSelectedFile(file)
    } else {
      alert('File too large! Max 5MB.')
    }
  }

  const addClient = async () => {
    if (!newClient.name || !newClient.tagline) {
      alert('Please fill in name and tagline')
      return
    }

    let fileData = ''
    let fileName = ''
    let fileSize = 0

    if (selectedFile) {
      fileData = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(selectedFile)
      })
      fileName = selectedFile.name
      fileSize = selectedFile.size
    }

    const client = {
      id: Date.now().toString(),
      name: newClient.name,
      tagline: newClient.tagline,
      description: newClient.description,
      version: newClient.version || 'v1.0.0',
      status: newClient.status,
      statusColor: newClient.status === 'Available' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' : 'bg-zinc-700 text-zinc-400',
      iconColor: 'from-yellow-400 to-orange-500',
      fileData,
      fileName,
      fileSize
    }

    const updated = [...clients, client]
    setClients(updated)
    localStorage.setItem('axora_clients', JSON.stringify(updated))
    setNewClient({ name: '', tagline: '', description: '', version: '', status: 'Available' })
    setSelectedFile(null)
  }

  const deleteClient = (id: string) => {
    if (confirm('Delete this client?')) {
      const updated = clients.filter(c => c.id !== id)
      setClients(updated)
      localStorage.setItem('axora_clients', JSON.stringify(updated))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900/80 p-8 rounded-2xl border border-zinc-800">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mb-6 mx-auto">
            <Lock className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-zinc-700 bg-zinc-950 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          <button onClick={handleLogin} className="w-full mt-4 py-3 bg-yellow-400 text-black font-bold rounded-xl">
            Unlock
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-zinc-800 rounded-lg">Back to Site</button>
        </div>

        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-yellow-400" /> Add New Client
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client Name *"
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              className="px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-950 text-white"
            />
            <input
              type="text"
              placeholder="Version"
              value={newClient.version}
              onChange={(e) => setNewClient({...newClient, version: e.target.value})}
              className="px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-950 text-white"
            />
            <input
              type="text"
              placeholder="Tagline *"
              value={newClient.tagline}
              onChange={(e) => setNewClient({...newClient, tagline: e.target.value})}
              className="px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-950 text-white md:col-span-2"
            />
            <textarea
              placeholder="Description"
              value={newClient.description}
              onChange={(e) => setNewClient({...newClient, description: e.target.value})}
              className="px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-950 text-white md:col-span-2 h-24"
            />
            <div className="md:col-span-2">
              <input type="file" onChange={handleFileSelect} accept=".jar,.zip" className="hidden" id="file" />
              <label htmlFor="file" className="block px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-950 cursor-pointer">
                {selectedFile ? selectedFile.name : 'Click to upload file (.jar, .zip)'}
              </label>
            </div>
          </div>
          
          <button onClick={addClient} className="mt-6 px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl">
            <Upload className="w-5 h-5 inline mr-2" /> Add Client
          </button>
        </div>

        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold">Manage Clients ({clients.length})</h2>
          </div>
          {clients.map((client) => (
            <div key={client.id} className="p-6 flex items-center justify-between border-b border-zinc-800">
              <div>
                <h3 className="font-bold text-lg">{client.name}</h3>
                <p className="text-sm text-zinc-400">{client.tagline}</p>
              </div>
              <button onClick={() => deleteClient(client.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
