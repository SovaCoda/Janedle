/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'discord-server-bar': '#1d1f23',
        'discord-server-bar-bright': '#2b2d31',
        'discord-channel-bar': '#2c2e33',
        'discord-channel-bar-bright': '#36393f',
        'discord-chat': '#26282b',
        'discord-chat-bright': '#2f3136',
      },
    },
  },
  plugins: [],
}
