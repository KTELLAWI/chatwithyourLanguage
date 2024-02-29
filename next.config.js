/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
      
    //   serverActions: {
    //     allowedOrigins: ["bookish-sniffle-jwq4xg7649cjjp6-3000.app.github.dev:3000" /* or Codespace port forward url, no including scheme */, "localhost:3000"]
    //   }
    //   },
    images:{
        domains:["github.com"]
    },
    // headers: [
        
    //     {
    //       key: 'Access-Control-Allow-Origin',
    //       value: process.env.NEXT_PUBLIC_APP_URL,
    //     },
    // ],
}

module.exports = nextConfig
