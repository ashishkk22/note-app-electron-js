import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { AUTO_SAVING_TIME } from '@shared/constant'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { debounce } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)

  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = debounce(async (content: NoteContent) => {
    console.log('debounce auto saving ')
    if (!selectedNote) return

    console.log('Auto Saving', selectedNote.title)

    await saveNote(content)
  }, AUTO_SAVING_TIME)

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = await editorRef.current?.getMarkdown()

    if (content) {
      await saveNote(content)
    }
  }

  return {
    selectedNote,
    editorRef,
    handleAutoSaving,
    handleBlur
  }
}
