import { appDirectoryName, fileEncoding } from '@shared/constant'
import { NoteInfo } from '@shared/models'
import { CreateNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

export const getRootDir = () => {
  return path.join(homedir(), appDirectoryName)
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName: string) => fileName?.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(path.join(getRootDir(), filename))

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()

  console.log(path.join(rootDir, `${filename}.md`), 'aello9', filename)

  return readFile(path.join(rootDir, `${filename}.md`), { encoding: fileEncoding })
}

export const writeNote: WriteNote = (fileName, content) => {
  const rootDir = getRootDir()

  console.log('writing note ', fileName)

  return writeFile(path.join(rootDir, `${fileName}.md`), content, {
    encoding: fileEncoding
  })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: path.join(rootDir, `Untitled.md`),
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.log('Note creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation Failed',
      message: `All notes must be saved under the ${rootDir} Avoid using other directories !`
    })
    return false
  }

  console.info('Create Note:', filePath)

  await writeFile(filePath, '')

  return filename
}
