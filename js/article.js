//load template
const parser = new DOMParser();
let htmlDoc;

function loadTemplate() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        //function to apply loaded template
        htmlDoc = parser.parseFromString(this.responseText, 'text/html');
        applyTemplate(htmlDoc);
    }
    xhttp.open("GET", "../template/articletemplate.html");
    xhttp.send();
}

function applyTemplate(newdoc){
    const thumbnail = document.getElementById("article_thumbnail").getAttribute('src');
    const title = document.getElementById("article_title");
    const date = document.getElementById("article_date");
    const cocntent = document.getElementById("article_content");

    //console.log(newdoc.body);
    //insert content to template from this html
    newdoc.getElementById("article_title").innerHTML = title.innerHTML;
    newdoc.getElementById("article_date").innerHTML = date.innerHTML;
    newdoc.getElementById("article_content").innerHTML = cocntent.innerHTML;
    newdoc.getElementById("article_thumbnail").setAttribute('src', thumbnail);

    //create load page and fade out
    let loadpage = generateLoadingPage();
    let loadpagecss = loadpage.getAttribute("style");
    loadpagecss += "animation-name: fadeOut; animation-duration: 1.5s; animation-fill-mode: forwards;";
    loadpage.setAttribute("style",loadpagecss);
    console.log(loadpage);
    //create animation css
    const fadeoutcss = 
    "<style>\
        @keyframes fadeOut {\
            from {opacity: 1; visibility:visible;}\
            99% {visibility:visible}\
            to {opacity: 0; visibility:hidden;}\
        }\
    </style>";
    document.head.insertAdjacentHTML("beforeend",fadeoutcss);
    newdoc.body.insertAdjacentElement("afterbegin",loadpage);
    
    document.body = newdoc.body;
    
}

function generateLoadingPage(){
    let loadpage = document.createElement("div");
    let loadicon = document.createElement("div");
    loadpage.setAttribute("class", "w3-gray w3-display-container");
    loadpage.setAttribute("style", "position:fixed;top:0;left:0;width:100%;height:100%;");
    loadicon.setAttribute("class", "w3-display-middle lds-ellipsis");
    loadicon.innerHTML="<div></div><div></div><div></div><div></div>";
    loadpage.appendChild(loadicon);
    return loadpage;
}

window.onload = function(){
    //create a loading page
    document.body.insertAdjacentElement("afterbegin",generateLoadingPage());

    document.title = document.title + " - RH";
    
    //change emoji to twemoji
    try { twemoji.parse(document.body); }
    catch (error) { console.log(error) }
    
    //call template
    loadTemplate();
};