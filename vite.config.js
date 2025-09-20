import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  publicDir: 'images',
  plugins: [
    {
      name: 'copy-music',
      writeBundle() {
        // Crear directorio Musica en docs si no existe
        const musicDir = join('docs', 'Musica')
        if (!existsSync(musicDir)) {
          mkdirSync(musicDir, { recursive: true })
        }
        
        // Copiar archivos de música
        const musicFiles = ['cancion1.mp3', 'cancion2.mp3', 'cancion3.mp3', 'cancion4.mp3', 'cancion5.mp3', 'cancion6.mp3']
        musicFiles.forEach(file => {
          try {
            copyFileSync(join('Musica', file), join(musicDir, file))
            console.log(`Copiado: ${file}`)
          } catch (error) {
            console.error(`Error copiando ${file}:`, error.message)
          }
        })
      }
    }
  ]
}) 