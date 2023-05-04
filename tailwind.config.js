/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    screens : {
      '2xl': {'max': '1340px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1200px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '991px'},
      // => @media (max-width: 1023px) { ... }

      'lgb': {'max': '910px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '674px'},
      // => @media (max-width: 639px) { ... }

      'smg': {'max': '574px'},
      // => @media (max-width: 639px) { ... }

      'xs': {'max': '474px'},
      // => @media (max-width: 639px) { ... }

      'xsg': {'max': '450px'},
      // => @media (max-width: 639px) { ... }

      'xxsg': {'max': '390px'},
      // => @media (max-width: 639px) { ... }
    },
    boxShadow:{
      "custom" : "3px 3px 17px 1px #736c6c3d"
    },
    extend: {
      maxWidth: {
        '800mx': '800px',
      },
      
      height: {
        '560h': '560px',
      },
      spacing: {
        '320w' : "320px",
        "230h" : "230px",
        '500w' : '500px',
        "200h" : "200px",
        '250w' : "250w",
        "675h" : "675px",
        "550h" : "550px",
        '450h' : "450px",
      },
      lineHeight: {
        'leading-10p': '10px',
        'leading-20p': '20px',

      },
      colors: {
        "grayShade" : "#E7E7E7",
        'greenog' : "#00AA45",
        "secondary" : "#172327",
        "gray-light" : "#2e393d",
        "greenshine" : "#00ff84",
        "light-fff" : "#ffffffa1",
        "greenlight" : "#e5f6ec",
        "gold" : "#F2B344",
        "borderlight" : "#DDE6ED",
        "light-blue":"#d9e8fd",
        "photo-bg" : "#0000005e "
      },       
      fontFamily:{
        "Lexend" : ['Lexend', 'sans-serif'],
        "Red-Hat" : ['Red Hat Display', 'sans-serif']
      },
      backgroundImage:{
          grayBackground:"url('../src/assets/images/gray-bg.png')",
          thinkingBg:"url('../src/assets/images/thinking.png')",
          faqBg : "url('../src/assets/images/faq-bg.png')",
      },
      boxShadow: {
        "custom" : " 1px 3px 20px 5px #00000029",
        "custom2" : "0px 0px 100px 26px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)"
      },
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}