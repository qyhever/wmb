export const apiList = [
  {
    url: '/dev/users',
    method: 'get',
    rawResponse: async (req, res) => {
      console.log('req', req)
      res.setHeader('Content-Type', 'application/json;charset=UTF-8')
      res.end(JSON.stringify({
        name: 'zs',
        age: 18
      }))
    }
  }
]
