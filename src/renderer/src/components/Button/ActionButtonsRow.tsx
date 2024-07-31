import { DeleteNoteButton, NewNoteButton } from '@/components'
import { ComponentProps, FC } from 'react'

export const ActionButtonsRow: FC<ComponentProps<'div'>> = (props) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
