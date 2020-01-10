let count = 1
export default function originPJSONP(option) {  
  // 1.从传入的 option 中取出 url
  let url = option.url

  // 2.在 body 中添加 script 标签
  const body = document.getElementsByTagName('body')[0]
  const script = document.createElement('script')

  // 3.内部产生一个不重复的 callback
  const callback = 'jsonp' + count++

  // 4.监听 window 上的 jsonp 的调用
  return new Promise((resolve, reject) => {
    try{
      window[callback] = result => {
        body.removeChild(script)
        resolve(result)
      }
      const params = handleParam(option.data)
      script.src = url + '?callback=' + callback + params
    }catch(e){
      body.removeChild(script)
      reject(e)
    }
  })

  
}

function handleParam(data) {  
  let params = ''
  for(let key in data){
    let value = data[key] !== undefined ? data[key] : ''
    params += `&${key}=${encodeURIComponent(value)}`
  }
  return params
}