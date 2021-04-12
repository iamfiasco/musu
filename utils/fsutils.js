require("dotenv").config()
const fs = require("fs")
const path = require("path")
const superarr = require("./superarr.js")

superarr.init()

function filterExts(arr, allowed_exts=["mp3", "m4a", "flac", "wmv"]){
  return arr.filter((fpath)=>{
    return allowed_exts.indexOf(fpath.split(".").last()) > -1
  })
}

function fsCrawl(basePath){
  return new Promise(function(resolve, reject){
    fs.readdir(basePath, function(err, contents){
      if(err)
        return reject(err)
      else{
        let fullPaths = contents.map((fpath)=>path.join(basePath, fpath))
        Promise.all(fullPaths.map(function(fpath){
          return new Promise(function(resolve, reject){
            fs.lstat(fpath, function(err, stats){
              if(err)
                return reject(err)
              else if(stats.isFile())
                return resolve([fpath])
              else if(stats.isDirectory())
                return crawl(fpath).then(resolve)
              else
                return resolve([])
            })
          })
        }))
          .then((sparseContentArr)=>{
            return sparseContentArr.reduce((a,e)=>a.concat(e), [])
          })
          .then(resolve)
          .catch(reject)
      }
    })
  })
}


module.exports = {
  filterExts,
  fsCrawl
}

crawl(process.env.MPATH).then(filterExts).then(console.log).catch(console.error)
