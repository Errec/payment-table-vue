export default (table, category) => [...table].sort((a,b) => {
  if(a[category] > b[category]){return 1}
  if(a[category] < b[category]){return -1}
  return 0
})