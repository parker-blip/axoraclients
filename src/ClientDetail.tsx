import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

interface ClientItem {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  fileName: string;
  fileUrl?: string;
  uploadedAt?: string;
}

export function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<ClientItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("axora_clients");
    if (!raw) return;
    const list: ClientItem[] = JSON.parse(raw);
    const found = list.find((c) => c.id === id);
    if (!found) return;
    setClient(found);
  }, [id]);

  if (!id) {
    return <div className="min-h-screen bg-[#02010a] text-slate-100 flex items-center justify-center">Invalid client.</div>;
  }

  if (!client) {
    return <div className="min-h-screen bg-[#02010a] text-slate-100 flex items-center justify-center">Client not found.</div>;
  }

  const handleDownload = () => {
    if (!client.fileUrl) {
      alert("No file attached to this client.");
      return;
    }
    const link = document.createElement("a");
    link.href = client.fileUrl;
    link.download = client.fileName;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#02010a] text-slate-100">
      {/* simple nav with back button */}
      <nav className="sticky top-0 bg-[#02010a]/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-xs text-slate-300 hover:text-white">
            ← Back
          </button>
          <Link to="/" className="text-sm font-semibold">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AXORA</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-slate-400">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
              {client.version}
            </span>
            <span>{client.category || "General"}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{client.name}</h1>
          <p className="text-sm text-slate-300">{client.description}</p>
        </div>

        <button
          onClick={handleDownload}
          className="w-full rounded-lg bg-yellow-400 text-slate-900 py-2.5 text-sm font-semibold hover:bg-yellow-300 transition"
        >
          Download {client.fileName}
        </button>

        <p className="text-[11px] text-slate-500">
          Uploaded: {client.uploadedAt ? new Date(client.uploadedAt).toLocaleString() : "Unknown"}
        </p>
      </main>
    </div>
  );
}
