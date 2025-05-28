import { render, screen } from '@testing-library/react'
import Page from './page'

jest.mock('next-view-transitions', () => ({
  Link: ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
    <a href={href} className={className}>{children}</a>
  )
}));

jest.mock('~~/blog', () => ({
  getBlogPosts: () => []
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => null
}));

jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => null
}));

jest.mock('../components/iconSocial', () => ({
  __esModule: true,
  default: () => null
}));

jest.mock('~~/app/blog/newsletter-form', () => ({
  NewsletterForm: () => null
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '/',
    }
  },
  usePathname() {
    return '/'
  }
}));

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Page />)
    expect(document.querySelector('main')).toBeInTheDocument()
  })
})