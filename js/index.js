function loadArticleList() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        //function to apply loaded list
        article_list = JSON.parse(this.responseText);
        const cards = generateCards(article_list);
        const content_container = document.getElementById("content_container");
        cards.forEach((item,index) => {
            renderCard(content_container,item);
        });
    }
    xhttp.open("GET", "./articlelist.json");
    xhttp.send();
}

function generateCards(json){
    let card_list = [];
    let template;

    json.forEach((element,index) => {
        template = copyTemplate(); //template will direct to old template that we make before. Always copy new template to make each card.
        template.getElementsByClassName("card-content")[0].innerHTML = 
        "<p>" +element.title +"</p>"
        +"<p>" +element.date +"</p>"
        +"<p>" +element.content +"...</p>";
        template.getElementsByClassName("alink")[0].href = element.filepath;

        if(element.thumbnail){ template.getElementsByTagName("img")[0].setAttribute("src", element.thumbnail); }
        else{ template.getElementsByClassName("square-img-container")[0].setAttribute("style" , "display:none;"); }

        card_list.push(template);
    });

    return card_list;
}

function copyTemplate(n=0){
    let card_template;
    
    //copy card_template as new node
    card_template = document.getElementById("card_template").cloneNode(true);
    //this creates (copy) a new node(I mean element)
    card_template.removeAttribute('id'); //remove id
    card_template.className = card_template.className.replace("w3-hide", ""); //show template
    
    return card_template;
}

function renderCard(place,card){
    place.insertBefore(card, place.children[0]); //lastest on top
}

window.onload = function(){
    loadArticleList();
};