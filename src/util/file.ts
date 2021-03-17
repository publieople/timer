/**
 * Export csv file
 * 
 * @param  titleAndData all rows
 * @param  fileName     file name 
 * @since 0.0.7
 */
export function exportCsv(titleAndData: any[][], fileName: string) {
    const csv = titleAndData.map(row => row.reduce((a, b) => `${a},${b}`)).reduce((a, b) => `${a}\r\n${b}`)
    const blob = new Blob(['\ufeff' + csv], { type: "text/csv" })

    exporrtBlob(blob, fileName + '.csv')
}

/**
 * Export json file
 * @param data  data
 * @param fileName  the name of file
 * @since 0.0.7
 */
export function exportJson(data: any[], fileName: string) {
    const jsonStr = JSON.stringify(data)
    var blob = new Blob([jsonStr], { type: 'text/json' })

    exporrtBlob(blob, fileName + '.json')
}

/**
 * @param fileName  The name of file with suffix
 */
function exporrtBlob(blob: Blob, fileName: string) {
    const ele: HTMLElement = document.createElement("a")
    const link = ele as HTMLAreaElement
    link.href = URL.createObjectURL(blob)
    link.hidden = true
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}