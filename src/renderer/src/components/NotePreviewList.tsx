import { notesMock } from '@/store/mocks'
import { ComponentProps, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { NotePreview } from './NotePreview'

export const NotePreviewList: FC<ComponentProps<'ul'>> = ({ className, ...props }) => {
  if (notesMock.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No notes yet !</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notesMock.map((note) => (
        <NotePreview
          title={note.title}
          lastEditTime={note.lastEditTime}
          key={note.title + note.lastEditTime}
        />
      ))}
    </ul>
  )
}
