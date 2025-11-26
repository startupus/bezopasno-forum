import type { ReactNode } from 'react'

type CTAButtonProps = {
  href: string
  label: string
  variant?: 'primary' | 'secondary' | 'secondary-light'
  icon?: ReactNode
}

/** Универсальная кнопка-ссылка с TailGrids-стилем */
export const CTAButton = ({ href, label, variant = 'primary', icon }: CTAButtonProps) => {
  const baseStyles =
    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
  
  let variantStyles = ''
  if (variant === 'primary') {
    variantStyles = 'bg-[#FF0000] text-white shadow-lg shadow-[rgba(255,0,0,0.4)] hover:bg-white hover:text-[#0F172A]'
  } else if (variant === 'secondary') {
    // Для темного фона - светлые цвета
    variantStyles = 'border border-white/40 bg-white/10 text-white hover:bg-white/30 hover:border-white/60'
  } else if (variant === 'secondary-light') {
    // Для светлого фона - темные цвета
    variantStyles = 'border border-[#0F172A]/30 bg-[#0F172A]/5 text-[#0F172A] hover:bg-[#0F172A]/10 hover:border-[#0F172A]/50'
  }

  const isExternal = href.startsWith('http')

  return (
    <a
      href={href}
      className={`${baseStyles} ${variantStyles}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {label}
      {icon}
    </a>
  )
}

