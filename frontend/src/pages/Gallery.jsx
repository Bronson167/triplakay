import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Download } from 'lucide-react'
import axios from 'axios'
import { backendUrl } from '../App'
import fond from '../assets/fond.jpg'
import { Helmet } from "react-helmet-async";

const Galerie = () => {
  const [medias, setMedias] = useState([])
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/gallery/list`)
        console.log(res)

        if (res.data.success) {
          setMedias(res.data.media) // ✅ objets complets
        } else {
          toast.error(res.data.message || 'Erreur serveur')
        }
      } catch (error) {
        toast.error('Erreur lors du chargement des médias.')
      }
    }

    fetchMedias()
  }, [])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : 'auto'
  }, [lightbox])

  const filteredMedias = medias.filter(item => {
    if (filter === 'image') return item.type === 'image'
    if (filter === 'video') return item.type === 'video'
    if (filter === 'promo') return item.isPromo === true
    return true
  })

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      const date = new Date().toISOString().split('T')[0]
      link.download = `Handlers-${date}`
      link.href = blobUrl

      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(blobUrl)
    } catch {
      toast.error('Échec du téléchargement.')
    }
  }

  return (
    <div className="relative py-8 px-6 pb-4 bg-gray-50 dark:bg-gray-950 transition-colors">
       
    
      <Helmet>
        <title>Galerie | Handlers</title>
        <meta
          name="description"
          content="Découvrez notre galerie de projets et réalisations en marketing digital, développement web et mobile, et vidéo live streaming."
        />

        {/* Open Graph pour le partage sur les réseaux sociaux */}
        <meta property="og:title" content="Galerie | Handlers" />
        <meta
          property="og:description"
          content="Découvrez notre galerie de projets et réalisations en marketing digital, développement web et mobile, et vidéo live streaming."
        />
        {/* <meta
          property="og:image"
          content="https://handlerscreationagency.com/og-gallery.jpg"
        /> */}
        <meta property="og:type" content="website" />

        {/* Robots pour le SEO */}
        <meta name="robots" content="index, follow" />
      </Helmet>
      {/* Filtres */}


      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {[
          { key: 'all', label: 'Tous' },
          { key: 'image', label: 'Images' },
          { key: 'video', label: 'Vidéos' },
          { key: 'promo', label: 'Promotions' }
        ].map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`px-5 py-2 rounded-full font-medium transition-all
              ${
                filter === btn.key
                  ? 'bg-primary text-white shadow'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Galerie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMedias.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="relative h-[300px] rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-cover bg-center"
            style={{ backgroundImage: `url(${fond})` }}
          >
            {/* overlay */}
            <div className="absolute inset-0 bg-white/70 dark:bg-black/60 z-0" />

            {/* Media */}
            <div
              onClick={() => setLightbox(item)}
              className="relative z-10 w-full h-full group-hover:scale-105 transition-transform"
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>

            {/* Badge promo */}
            {item.isPromo && (
              <span className="absolute top-3 left-3 z-20 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
                PROMO
              </span>
            )}

            {/* Download */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload(item.url)
              }}
              className="absolute bottom-3 right-3 z-20 bg-purple-700 hover:bg-purple-800 text-white p-2 rounded-full shadow transition"
            >
              <Download size={18} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
          onClick={() => setLightbox(null)}
        >
          {lightbox.type === 'image' ? (
            <img
              src={lightbox.url}
              alt=""
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={lightbox.url}
              controls
              autoPlay
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Galerie
