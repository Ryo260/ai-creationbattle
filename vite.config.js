import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // 更新があったらすぐに適用
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'], // キャッシュする静的アセット
      manifest: {
        name: 'AI Creation Battle', // アプリの正式名称
        short_name: 'AI Battle',    // ホーム画面に表示される短い名前
        description: 'AIクリエイションバトルのお題カードディーラー',
        theme_color: '#0f172a',     // アプリのテーマカラー (slate-900と同じ色)
        background_color: '#0f172a',
        display: 'standalone',      // ブラウザのバーを消してアプリっぽく表示
        orientation: 'portrait',    // 縦画面固定（お好みで）
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})