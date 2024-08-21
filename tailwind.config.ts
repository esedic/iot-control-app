import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      typography: {
        DEFAULT: {
            css: {
                h1: {
                    fontWeight: '600'
                }
            }
        }
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
