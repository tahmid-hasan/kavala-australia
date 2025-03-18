import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
import preact from '@preact/preset-vite'
import cleanup from '@by-association-only/vite-plugin-shopify-clean'

export default defineConfig({
  plugins: [
    cleanup(),
    shopify(),
    preact()
  ],
  build: {
    emptyOutDir: false
  }
})
