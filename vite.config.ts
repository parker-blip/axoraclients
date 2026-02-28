import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs'
import { join } from 'path'

function inlineCssPlugin() {
  return {
    name: 'inline-css',
    closeBundle() {
      const distDir = join(process.cwd(), 'dist')
      const htmlPath = join(distDir, 'index.html')
      if (!existsSync(htmlPath)) return
      let html = readFileSync(htmlPath, 'utf-8')
      const linkRegex = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi
      let match
      while ((match = linkRegex.exec(html)) !== null) {
        const href = match[1]
        const cssPath = join(distDir, href.replace(/^\.\//, ''))
        if (existsSync(cssPath)) {
          const css = readFileSync(cssPath, 'utf-8')
          html = html.replace(match[0], `<style>${css}</style>`)
          unlinkSync(cssPath)
        }
      }
      writeFileSync(htmlPath, html)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile(), inlineCssPlugin()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
})
