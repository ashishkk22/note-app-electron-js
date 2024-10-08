import { deleteNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { FC } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { ActionButton, ActionButtonProps } from './ActionButton'

export const DeleteNoteButton: FC<ActionButtonProps> = ({ children, className, ...props }) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDeletion = async () => {
    await deleteNote()
  }

  return (
    <ActionButton onClick={handleDeletion} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
