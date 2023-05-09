//for node.js
//installed module: node-html-parser

//object
function article(filepath, title, date, content, thumbnail){
    this.filepath = filepath;
    this.title = title;
    this.date = date;
    this.content = content;
    this.thumbnail = thumbnail;
}

//function
function htmlToText(tmp="",n=0){
    return tmp.replace(/\s[\s]+\s|<[^>]+>/g, '');
    //remove TAB (multi space) and html tags
}
function getArticleSummary(f,dir){
    const filepath = dir + f;
    const htmlfile = fs.readFileSync(filepath, 'utf-8');
    const document = HTMLParser.parse(htmlfile);
    
    if(document.getElementById("article_title") 
    && document.getElementById("article_date") 
    && document.getElementById("article_content")){
        let article_title = htmlToText(document.getElementById("article_title").innerHTML);
        let article_date = htmlToText(document.getElementById("article_date").innerHTML);
        let article_content = htmlToText(document.getElementById("article_content").innerHTML);
        let article_thumbnail = document.getElementById("article_thumbnail").getAttribute('src');
        
        //reduce content length
        article_content = article_content.substring(0,80);

        return new article(filepath,article_title,article_date,article_content,article_thumbnail);
    }
    else{
        return null;
    }
}

const target_dir = "./article/";

const fs = require('fs');
const HTMLParser = require('node-html-parser');
const path = require('path');
const fullPath = path.join(__dirname, target_dir); 
const files = fs.readdirSync(fullPath);

//[DEBUG]read all files in target dir
try { files.forEach( file => console.log(file) ) }
catch (error) { console.log(error) }

//write all file that legal to article_list
const article_list = [];

try { files.forEach( file => {
    if(path.extname(file)){
      const result = getArticleSummary(file,target_dir);
      if(result) article_list.push(result);
    }
} ) }
catch (error) { console.log(error) }

//debug
article_list.forEach((item,index) => console.log(index +": " +item.title +", " +item.content));


//write json to disk
const json = JSON.stringify(article_list);

fs.writeFile('articlelist.json', json, 'utf8', (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});