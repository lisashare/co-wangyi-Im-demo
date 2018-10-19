
const cookie = {
  //写cookies 
  setCookie: function(name, value) { 
    let days = 1
    let exp = new Date()
    exp.setTime(exp.getTime() + days*24*60*60*1000)
    document.cookie = name + '=' + escape (value) + ';expires=' + exp.toGMTString()
  },
  //读取cookies 
  readCookie: function (objName) {
    // let arr = null
    // let reg = new RegExp('(^| )'+name+'=([^;]*)(;|$)')
    // if (document.cookie && (arr = document.cookie.match(reg))) {
    //   return unescape(arr[2])
    // } else {
    //   return null;
    // } 
    var search = objName + '='
    if (document.cookie.length > 0) {
	  var offset = document.cookie.indexOf(search)
	  if (offset != -1) {
		  offset += search.length
		  var end = document.cookie.indexOf(';', offset)
		  if (end == -1) end = document.cookie.length
		  return unescape(document.cookie.substring(offset, end))
	  } else {
		  return ''
	  }
    }
    return ''
  }, 
  //删除cookies 
  delCookie: function (name) { 
    let cval = this.readCookie(name)
    if (cval!=null) {
      document.cookie = name + '=' + cval + ';expires=' + (new Date(0)).toGMTString()
      console.log(this.readCookie(name))
    }
  }  
  // delCookie (name) {
  //   var exp = new Date()
  //   exp.setTime(exp.getTime() - 1)
  //   var cval = this.readCookie(name)
  //   if (cval != null) {
  //     document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  //     // console.log(name + '=' + cval + ';expires=' + exp.toGMTString())
  //   }
  // }
}

export default cookie
