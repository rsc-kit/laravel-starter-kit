import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { rscKit } from '@rsc-kit/core/vite'
import { nitro } from 'nitro/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [
    nitro({ preset: "bun", serveStatic: 'inline' }),
    rscKit({
      sourceDir: 'resources/js',
      outDir: 'bootstrap/rsc/vite',
      hotFile: 'public/rsc-hot',
      hostManifest: { command: ['php', 'artisan', 'rsc:host-manifest'] },
    }),
    react({ compiler: true }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
    },
  },
})
