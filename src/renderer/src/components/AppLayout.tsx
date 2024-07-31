import { ComponentProps, FC, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout: FC<ComponentProps<'main'>> = ({ children, className, ...props }) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar: FC<ComponentProps<'aside'>> = ({ children, className, ...props }) => {
  return (
    <aside
      className={twMerge('w-[250px] mt-10 h-[100vh+10px] overflow-hidden', className)}
      {...props}
    >
      {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => {
    return <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}></div>
  }
)

Content.displayName = 'Content'
