import { useProgressStore } from '../stores/progress'
import { useWrongbookStore } from '../stores/wrongbook'
import { useRecordsStore } from '../stores/records'

/** 导出全部做题记录与进度为 JSON 文件（跨浏览器迁移用） */
export function exportBackup() {
  const payload = {
    app: 'sd-pass',
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: useProgressStore().$state,
    wrongbook: useWrongbookStore().$state,
    records: useRecordsStore().$state
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

/** 从 JSON 备份文件还原做题记录与进度 */
export function importBackup(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        if (data.app !== 'sd-pass' || !data.progress) {
          throw new Error('备份文件格式不正确')
        }
        useProgressStore().restore(data.progress)
        useWrongbookStore().restore(data.wrongbook)
        useRecordsStore().restore(data.records)
        resolve()
      } catch (e) {
        reject(e instanceof Error ? e : new Error('备份文件解析失败'))
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsText(file, 'utf-8')
  })
}
