import { ActionButton, ActionButtonProps } from '@/components'
import { FC } from 'react'
import { LuFileSignature } from 'react-icons/lu'

export const NewNoteButton: FC<ActionButtonProps> = ({ children, className, ...props }) => {
  return (
    <ActionButton {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
