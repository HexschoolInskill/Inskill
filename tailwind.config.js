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
      zIndex: {
        '-1': '-1'
      },
      spacing: {
        '2px': '2px',
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
        19: '4.75rem',
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
      },
      fontSize: {
        h1: [
          '40px',
          {
            lineHeight: '48px',
            letterSpacing: '0.08em'
          }
        ],
        h2: [
          'clamp(24px, 2vw, 32px)',
          {
            lineHeight: '38.4px',
            letterSpacing: '0.1em'
          }
        ],
        h3: [
          '28px',
          {
            lineHeight: '33.6px'
          }
        ],
        h4: [
          '24px',
          {
            lineHeight: '28.8px'
          }
        ],
        h5: [
          '20px',
          {
            lineHeight: '24px'
          }
        ],
        h6: [
          '16px',
          {
            lineHeight: '19.6px'
          }
        ],
        'fs-1': [
          '40px',
          {
            lineHeight: '60px'
          }
        ],
        'fs-2': [
          '32px',
          {
            lineHeight: '48px'
          }
        ],
        'fs-3': [
          '28px',
          {
            lineHeight: '42px'
          }
        ],
        'fs-4': [
          '24px',
          {
            lineHeight: '36px'
          }
        ],
        'fs-5': [
          '16px',
          {
            lineHeight: '24px'
          }
        ],
        hint: [
          '12px',
          {
            lineHeight: '20px'
          }
        ]
      }
    }
  }
}
