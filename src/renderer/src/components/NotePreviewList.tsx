import { useNotesList } from '@renderer/hooks/useNotesList'
import { isEmpty } from 'lodash'
import { ComponentProps, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { NotePreview } from './NotePreview'

type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect: () => void
}

export const NotePreviewList: FC<NotePreviewListProps> = ({ className, onSelect, ...props }) => {
  const { notes, handleNoteSelect, selectedNoteIndex } = useNotesList({ onSelect })

  if (!notes) return null

  if (isEmpty(notes)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No notes yet !</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          title={note.title}
          lastEditTime={note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={handleNoteSelect(index)}
          key={note.title + note.lastEditTime}
        />
      ))}
    </ul>
  )
}
