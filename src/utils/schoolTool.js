//解析json数据
export function selectJsonStrify (array) {
  let SchoolArr = []
  array.forEach((a, i) => {
    let school = a.Value.length > 0 && a.Value.split('|')
    if (school) {
      school.forEach((s, i, ar) => {
        const midStr = s.split(',')
        ar[i] = {name: midStr[0], index: midStr[1], city: a.RowName}
      })
      SchoolArr.push(school)
    }
  })
  return SchoolArr
}
