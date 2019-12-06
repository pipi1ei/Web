export function array2String(string) {  
  return string.replace('[', '').replace(']', '').replace(new RegExp('\"', "g"), '')
}