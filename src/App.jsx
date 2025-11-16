import { useEffect, useState } from 'react'

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tight">
          <span className="text-black">GD</span>
          <span className="text-blue-600">Portfolio</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#work" className="hover:text-black">Karya</a>
          <a href="#about" className="hover:text-black">Tentang</a>
          <a href="#testimonials" className="hover:text-black">Testimoni</a>
          <a href="#contact" className="hover:text-black">Kontak</a>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-gray-700">
          <span className="sr-only">Toggle menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-3 text-gray-700">
            <a href="#work" onClick={() => setOpen(false)} className="hover:text-black">Karya</a>
            <a href="#about" onClick={() => setOpen(false)} className="hover:text-black">Tentang</a>
            <a href="#testimonials" onClick={() => setOpen(false)} className="hover:text-black">Testimoni</a>
            <a href="#contact" onClick={() => setOpen(false)} className="hover:text-black">Kontak</a>
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="relative pt-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50"/>
      <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-blue-600 bg-blue-50 rounded-full px-3 py-1 ring-1 ring-blue-100">Graphic Designer</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">Mewujudkan Identitas Visual yang Kuat dan Berkesan</h1>
          <p className="mt-4 text-gray-600">Saya membantu brand dan bisnis menonjol melalui desain logo, kemasan, sosial media, dan materi promosi yang estetis dan fungsional.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800">Lihat Portofolio</a>
            <a href="#contact" className="px-5 py-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-50">Hubungi Saya</a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-900">5+ tahun</p>
              <p>Pengalaman</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">120+ proyek</p>
              <p>Selesai</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">40+ brand</p>
              <p>Dipercaya</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-200/60 to-purple-200/60 border border-black/5 shadow-xl"/>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-black/5">
            <p className="text-xs text-gray-500">Keahlian</p>
            <div className="mt-2 flex gap-2 flex-wrap">
              {['Branding','Logo','Poster','Kemasan','Sosmed','UI Visual'].map(t => (
                <span key={t} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkGrid() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const r = await fetch(`${base}/projects`)
        if (!r.ok) throw new Error('Gagal memuat proyek')
        const data = await r.json()
        setProjects(data.items || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const placeholder = [
    { title: 'Branding Cafe Mocha', subtitle: 'Brand Identity', description: 'Konsep logo dan paket brand', images: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop'], tags: ['Logo','Branding','Figma'] },
    { title: 'Poster Festival Musik', subtitle: 'Poster Design', description: 'Poster A2 full color', images: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop'], tags: ['Poster','Illustrator'] },
    { title: 'Desain Kemasan Teh', subtitle: 'Packaging', description: 'Kemasan premium', images: ['https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop'], tags: ['Packaging','Mockup'] },
    { title: 'Konten Sosial Media', subtitle: 'Content', description: 'Grid Instagram', images: ['https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop'], tags: ['Sosmed','Canva'] },
  ]

  const list = loading || error || (projects?.length === 0) ? placeholder : projects

  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Karya Pilihan</h2>
            <p className="text-gray-600 mt-2">Kumpulan proyek branding, poster, kemasan, dan konten.</p>
          </div>
          <a href="#contact" className="hidden md:inline-block text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Minta Penawaran</a>
        </div>
        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded">{error} • menampilkan contoh</div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, idx) => (
            <article key={idx} className="group rounded-xl overflow-hidden border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=1200&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"/>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                  {p.year && (<span className="text-xs text-gray-500">{p.year}</span>)}
                </div>
                {p.subtitle && <p className="text-sm text-blue-600 mt-0.5">{p.subtitle}</p>}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.description}</p>
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.slice(0,4).map((t, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Tentang Saya</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">Saya adalah graphic designer dengan fokus pada branding dan visual marketing. Saya percaya desain yang baik mampu menyampaikan cerita dan nilai brand dengan jelas. Saya terbiasa bekerja dengan Adobe Illustrator, Photoshop, InDesign, juga Figma untuk kolaborasi.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white border border-black/5">
              <p className="text-gray-500">Layanan</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-800">
                <li>Brand Identity & Logo</li>
                <li>Desain Kemasan</li>
                <li>Poster & Marketing Kit</li>
                <li>Konten Sosial Media</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white border border-black/5">
              <p className="text-gray-500">Tools</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Illustrator','Photoshop','InDesign','Figma','Lightroom','Canva'].map(t => (
                  <span key={t} className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-black/5 shadow-xl">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop" alt="Designer portrait" className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const r = await fetch(`${base}/testimonials`)
        const data = await r.json()
        setItems(data.items || [])
      } catch {
        setItems([
          { client_name: 'Andi', company: 'Kopi Nusantara', quote: 'Desain logo dan kemasan sangat profesional, meningkatkan penjualan kami.' },
          { client_name: 'Sari', company: 'EventKo', quote: 'Poster dan materi promosi rapi, mudah dikomunikasikan.' },
        ])
      }
    }
    load()
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Testimoni Klien</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <div key={i} className="p-6 rounded-xl border border-black/5 bg-gray-50">
              <p className="text-gray-800">“{t.quote}”</p>
              <p className="mt-4 text-sm text-gray-600">— {t.client_name}{t.company ? `, ${t.company}` : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const r = await fetch(`${base}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!r.ok) throw new Error('Gagal mengirim pesan')
      setStatus('Pesan terkirim! Saya akan segera menghubungi Anda.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (e) {
      setStatus(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Mari Bekerja Sama</h2>
          <p className="mt-2 text-gray-600">Ceritakan kebutuhan desain Anda—branding, poster, kemasan, atau konten sosial media.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-black/5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Nama</label>
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama Anda"/>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@domain.com"/>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Subjek</label>
            <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Desain branding untuk coffee shop"/>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Pesan</label>
            <textarea required rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ceritakan proyek Anda secara singkat"/>
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button disabled={loading} className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-60">{loading ? 'Mengirim...' : 'Kirim Pesan'}</button>
            {status && <p className="text-sm text-gray-600">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 border-t border-black/5 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Graphic Designer Portfolio</p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <a href="#" className="hover:text-black">Behance</a>
          <a href="#" className="hover:text-black">Dribbble</a>
          <a href="#" className="hover:text-black">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <Hero />
      <WorkGrid />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
