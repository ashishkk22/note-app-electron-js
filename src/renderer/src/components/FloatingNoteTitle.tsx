import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps, FC } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{selectedNote.title}</span>
    </div>
  )
}
