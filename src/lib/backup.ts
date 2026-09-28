'use client'

// 备份导出/导入：JSON 格式与旧版 Vue 站点完全兼容（app: 'sd-pass', version: 1），
// 旧备份文件可直接导入，新备份也可被旧版还原

import { useProgressStore } from '@/lib/stores/progress'
import { useRecordsStore } from '@/lib/stores/records'
import { useWrongbookStore } from '@/lib/stores/wrongbook'

export function exportBackup(): void {
  const payload = {
    app: 'sd-pass',
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: {
      chapters: useProgressStore.getState().chapters,
      subjectiveRead: useProgressStore.getState().subjectiveRead,
      examDate: useProgressStore.getState().examDate,
    },
    wrongbook: { ids: useWrongbookStore.getState().ids },
    records: { list: useRecordsStore.getState().list },
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ruankao-backup-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function importBackup(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result))
        if (data.app !== 'sd-pass' || !data.progress) {
          throw new Error('备份文件格式不正确')
        }
        useProgressStore.getState().restore(data.progress)
        useWrongbookStore.getState().restore(data.wrongbook)
        useRecordsStore.getState().restore(data.records)
        resolve()
      } catch (e) {
        reject(e instanceof Error ? e : new Error('备份文件解析失败'))
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsText(file, 'utf-8')
  })
}
