/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                // Bounces 5 times 1s equals 5 seconds
                'jump': 'jump 1s'
              },
            keyframes: {
                jump: {
                    '0%, 100%': { transform:'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                  }
            },
            screens: {
                sm: '480px',
                md: '768px',
                lg: '1200px',
                xl: '1440px',
          },
            width: {
                '1/7': '14.2857143%',
                '2/7': '28.5714286%',
                '3/7': '42.8571429%',
                '4/7': '57.1428571%',
                '5/7': '71.4285714%',
                '6/7': '85.7142857%',

                '1/8': '12.5%',
                '2/8': '25%',
                '3/8': '27.5%',
                '4/8': '50%',
                '5/8': '62.5%',
                '6/8': '75%',
                '7/8': '87.5%',
            }
        },
        maxHeight: {
                   '0': '0',
                   '1/4': '25%',
                   '1/2': '50%',
                   '3/4': '75%',
                   'full': '100%',
                  },
        variants: {
        fill: ['hover', 'focus'], // this line does the trick
        },
    },
}

