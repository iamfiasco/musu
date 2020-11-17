const id3 = require("node-id3")
const fs = require("fs")
const path = require("path")


if(Array.prototype.last === undefined){
	Array.prototype.last = function(){
		return this[this.length - 1]
	}
}

function crawl(bPath){
	// promise based function to retrieve children files and folders inside bPath
	return new Promise(function(resolve, reject){
		fs.readdir(bPath, function(err, contents){
			const fullPaths = contents.map(elems => path.join(bPath, elems))
			Promise.all(fullPaths.map(content => {
				return new Promise(function(resolve, reject){
					fs.lstat(content, (err, stats)=>{
						if(err){
							reject(err)
						}
						else{
							if(stats.isFile()){
								resolve([content])
							}
							else if(stats.isDirectory()){
								crawl(content).then(resolve)
							}
							else{
								resolve([])
							}
						}
					})
				})
			}))	
			.then(contents => {
				return contents.reduce((a,c)=>{
					return a.concat(...c)
				}, [])	
			})
			.then(resolve).catch(console.err)
		})
	})
}

function filterMusic(contents){
	const musicExts = ["mp3", "wma", "flac", "m4a"]
	return contents.filter(elem => {
		if(musicExts.indexOf(elem.split(".").last()) > -1){
			return true
		}
		else{
			return false
		}
	})
}


function getTags(fpath){
	return new Promise(function(resolve, reject){
		id3.read(fpath, function(err, tags){
			if(err){
				reject(err)
			}
			else{
				resolve(tags)
			}
		})
	})
}



function filterTags(tags){
	const legitTags = ["title", "artist", "album", "genre", "trackNumber", "year", "publisher", "image"]
	let res = {}
	for(let i in tags){
		if(legitTags.indexOf(i) > -1){
			if(i === "image"){
				res[i] = tags[i].imageBuffer
				continue
			}
			res[i] = tags[i]
		}
	}
	return res
}

//crawl("/home/oem/drawer/tdownload/music/Red Hot Chili Peppers - The Getaway (2016) [MP3~320Kbps]~[Hunter] [FRG]").then(filterMusic).then(musics => {
//	return Promise.all(musics.map(getTags))
//}).then(console.log)



(async function main(){
	const musics = await crawl("/home/oem/drawer/tdownload/music/A Perfect Circle - Eat The Elephant (2018) 320/")
	const tags = await getTags(musics[0])
	console.log(filterTags(tags))
}())
