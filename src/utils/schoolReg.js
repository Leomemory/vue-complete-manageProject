// 判断字符串是否为数字和字母组合
export function checkNumberLetter (ele) {
  let re = /^[0-9a-zA-Z]*$/
  if (!re.test(ele)) {
    return false
  } else return true
}

// 判断字符串是否为汉字
export function checkChinese (ele) {
  var regex = /^[\u4E00-\u9FA5]+$/
  if (!regex.test(ele)) {
    return false
  } else return true
}