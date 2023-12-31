

export const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function convertStringToValidNumber(strNum: string | number): number | null {
  if (typeof strNum === 'number') return strNum
  if (typeof strNum === 'string') {
    if (strNum.length > 0) {
      const numFromStr: number = Number(strNum)
      // if number conversion was successful
      if (!isNaN(numFromStr)) {
        return numFromStr
      }
    }
  }
  return null
}

export function isNonEmptyArray(arr: any): boolean {
  return Array.isArray(arr) && arr?.length > 0
}

export function isEmptyArray(arr: any): boolean {
  return Array.isArray(arr) && arr?.length === 0
}
