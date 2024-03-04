const fs = require('node:fs/promises')
const path = require('path')

;(async function() {
  try {
    const doneList = await fs.readFile('./weibo.json', 'utf8')
    console.log(JSON.parse(doneList).length)
    // const res = await fs.readFile('./temp.json', 'utf8')
    // const list = JSON.parse(res).data.paginationData.pageList
    // const doneList = await fs.readFile('./weibo.json', 'utf8')
    // const ret = JSON.parse(doneList).concat(list)
    // await fs.writeFile('./weibo.json', JSON.stringify(ret))
    // console.log('success')
  } catch (error) {
    console.error('there was an error:', error)
  }
})()
