import { render, screen } from '@testing-library/react'
import App from './App'
import { BOT_URL, heroContent, programBlocks } from './data/content'

describe('Лендинг Безопасно.Форум', () => {
  it('показывает главный экран с ключевыми фактами', () => {
    render(<App />)
    expect(screen.getByText(heroContent.title)).toBeInTheDocument()
    expect(screen.getByText(heroContent.date)).toBeInTheDocument()
    expect(screen.getByText(/Москва/i)).toBeInTheDocument()
  })

  it('даёт прямую ссылку на бота для бесплатного пропуска', () => {
    render(<App />)
    const cta = screen.getAllByRole('link', { name: /пропуск/i })[0]
    expect(cta).toHaveAttribute('href', BOT_URL)
  })

  it('отображает все смысловые блоки программы', () => {
    render(<App />)
    programBlocks.forEach((block) => {
      expect(screen.getByText(block.title)).toBeInTheDocument()
    })
  })
})

