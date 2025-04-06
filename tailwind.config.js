module.exports = {
    theme: {
      extend: {
        animation: {
          'fade-in-out': 'fadeInOut 4s ease-in-out forwards',
        },
        keyframes: {
          fadeInOut: {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '10%': { opacity: 1, transform: 'translateY(0)' },
            '90%': { opacity: 1, transform: 'translateY(0)' },
            '100%': { opacity: 0, transform: 'translateY(10px)' },
          },
        },
      },
    },
    plugins: [],
  };
  