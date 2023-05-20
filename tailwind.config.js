module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        blue: '#0C18A0',
        yellow: '#FFC107',
        gray: {
          l: '#DEE2E6',
          DEFAULT: '#6C757D'
        }
      },
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        21: '5.25rem',
        22: '5.5rem',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%'
      },
      borderRadius: {
        1: '4px',
        4: '16px',
        6: '24px'
      },
      minWidth: {
        15: '3.75rem'
      },
      minHeight: {
        '50vh': '50vh',
        '80vh': '80vh',
        15: '3.75rem'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
