//hoge.js
var indent = "    ";

window.onload = function(){

    var head = document.getElementsByTagName('head').item(0);
    var css = document.createElement('link');
    css.id = "cs";
    css.type = "text/css";
    css.rel  = "stylesheet";
    css.href = "kaereba-style.css";
    head.appendChild(css);
    

    var form_affl = document.getElementById('form_affl');
    form_affl.id = "form_affl";
    form_affl.style.display             = "grid";
    form_affl.style.gridTemplateColumns = '1fr 1fr';
    form_affl.style.gridTemplateRows    = "1fr 1fr 1fr 1fr";
    form_affl.style.gridGap             = "2px";
    
    var div_form = makeDivCode("div_form", "1 / 2", "1 / 5");
    div_form.appendChild(GenerateForm());
    form_affl.appendChild(div_form);
    
    var div_linkstr = makeDivCode("div_linkstr", "2 / 3", "1 / 3");
    div_linkstr.appendChild(MakeTextarea("link_string", 50, 3, true));
    div_linkstr.appendChild(MakeButton("クリップボードにコピー", CopyTextarea));
    form_affl.appendChild(div_linkstr);
    
    var div_preview = makeDivCode("div_preview", "2 / 3", "3 / 5");
    form_affl.appendChild(div_preview);
    var div_html_preview = makeDivCode("link_html");
    div_preview.appendChild(div_html_preview);

}

function makeDivCode(id, gridColumn = "", gridRow = ""){
    var a = document.createElement('div');
    a.id = id;
    a.style.gridColumn = gridColumn;
    a.style.gridRow    = gridRow;
    return a;
}
//
//
// Generate Forms
function GenerateForm(div_form){
    var myForm    = document.createElement('form');
    myForm.setAttribute("action","#");
    myForm.setAttribute("method","post");

    var myFromChild = new Array();
    // inside "div_form" 
    myFromChild.push(MakeTitle("アイテムタイトル"));
    myFromChild.push(MakeTextarea("str_item", 50, 1));
    // Image url
    myFromChild.push(MakeTitle("画像url"));
    myFromChild.push(MakeTextarea("url_image", 50, 2));
    // Amazon
    myFromChild.push(MakeTitle("Amazonリンク url"));
    myFromChild.push(MakeTextarea("url_amazon", 50, 3));
    // Rakuten
    myFromChild.push(MakeTitle("楽天リンク url"));
    myFromChild.push(MakeTextarea("url_rakuten", 50,3));
    // Yahoo
    myFromChild.push(MakeTitle("Yahoo!ショッピング url"));
    myFromChild.push(MakeTextarea("url_yahoo", 50, 3));

    myFromChild.push(MakeButton("生成",   ShowLinkString));
    myFromChild.push(MakeButton("クリア", ClearTextarea));
    
    len = myFromChild.length;
    i = 0;
    while (i < len){
        myForm.appendChild(myFromChild[i++]);
    }
    return myForm;
    

}

function MakeButton(buttonName, func){
    var button     = document.createElement('input');
    button.type    = "button";
    button.value   = buttonName ;
    button.onclick = function(){
        func();
    };
    
    return button;
}

function MakeTitle(title){
    var a       = document.createElement('p');
    a.innerHTML =  title;
    return a;
}


function MakeTextarea(id, cols, rows, readonly=false){
    var a = document.createElement('p');
    var textarea    = document.createElement('textarea');
    textarea.id     = id;
    textarea.cols   = cols;
    textarea.rows   = rows;
    textarea.readonly = readonly;
    a.appendChild(textarea);
    return a;
}



// Generate Kaeraba-Like Link
function ShowLinkString(){
    var form_values = GetFormValues();
    console.log(form_values);
//    var link_str  = GenerateLinkString(form_values);
    var link_str  = Kaereba(form_values);
    console.log(link_str);
    document.getElementById("link_string").value = link_str;
    document.getElementById("link_html").innerHTML = link_str;
}
function ClearTextarea(){
    document.getElementById("str_item"   ).value = "";
    document.getElementById("url_image"  ).value = "";
    document.getElementById("url_amazon" ).value = "";
    document.getElementById("url_rakuten").value = "";
    document.getElementById("url_yahoo"  ).value = "";
    document.getElementById("link_string").value = "";
    document.getElementById("link_html").innerHTML ="";
}
function CopyTextarea() {
    var link_str = document.getElementById("link_string");
    link_str.select();
    document.execCommand("copy");
}


//



function GetFormValues(){
    var form_values = {};
    form_values['str_item']    = document.getElementById("str_item"   ).value;
    form_values['image']   = document.getElementById("url_image"  ).value;
    form_values['amazon']  = document.getElementById("url_amazon" ).value;
    form_values['rakuten'] = document.getElementById("url_rakuten").value;
    form_values['yahoo']   = document.getElementById("url_yahoo"  ).value;
    return form_values;
}




function Kaereba (form_values)  {
     const divClass    = "<div class=\"cstmreba\">\n";
     const div_kaerebaLinkBox = GenerateKaerebaLinkBox(form_values);
     const divClassEnd = "</div> <!-- \"cstmreba \" -->\n";

     return divClass + div_kaerebaLinkBox + divClassEnd;
}

function GenerateKaerebaLinkBox(form_values){
    const ind = indent.repeat(1);
    const divClass             = ind + "<div class=\"kaerebalink-box\">\n\n";
    const div_kaerebaLinkImage = GenerateKaerebaLinkImage(form_values);
    const div_kaerebaLinkInfo  = GenerateKaerebaLinkInfo(form_values);
    const divClassEnd          = ind + "</div> <!-- \"kaerebalink-box \" -->\n";

    return divClass + div_kaerebaLinkImage + div_kaerebaLinkInfo + divClassEnd;
}


function GenerateKaerebaLinkImage(form_values){
    const url_image   = form_values['image'];
    const url_amazon  = form_values['amazon'];
    const ind1 = indent.repeat(3);
    const ind2 = indent.repeat(4);
    const ind3 = indent.repeat(5);
    
    const divClass             = ind1 + "<div class=\"kaerebalink-image\">\n";
    const a_start              = ind2 + "<a href=\""  + url_amazon + "\" target=\"_blank\" >\n";
    const a_image              = ind3 + "<img src=\"" + url_image  + "\" style=\"border: none;\" />\n";
    const a_end                = ind2 + "</a>\n";
    const divClassEnd          = ind1 + "</div> <!-- \"kaerebalink-image\"--> \n\n";

    return  divClass + a_start + a_image + a_end + divClassEnd;
}

function GenerateKaerebaLinkInfo(form_values){
    const ind = indent.repeat(2);
    const divClass               = ind + "<div class=\"kaerebalink-info\">\n";
    const div_kaerebaLinkName    = GenerateKaerebaLinkName(form_values);
    const div_kaerebaLinkDetail  = GenerateKaerebaLinkLink(form_values);
    const divClassEnd            = ind + "</div> <!-- \"kaerebalink-info \" -->\n";

    return divClass + div_kaerebaLinkName + div_kaerebaLinkDetail + divClassEnd;
}

function GenerateKaerebaLinkName(form_values){
    const ind1 = indent.repeat(3);
    const ind2 = indent.repeat(4);
    const ind3 = indent.repeat(5);
    const str_item             = form_values['str_item'];
    const url                  = form_values['amazon'];
    const itemTitle_Start      = ind1 + "<div class=\"kaerebalink-name\">\n";
    const link_amazon_a_start  = ind2 + "<a href=\"" + url + "\" target=\"_blank\" >\n";
    const string_item          = ind3 + str_item + "\n";
    const link_amazon_a_end    = ind2 + "</a>\n";
    const itemTitle_End        = ind1 + "</div><!-- \"kaerebalink-name\" -->\n";

    return itemTitle_Start + link_amazon_a_start + string_item + link_amazon_a_end + itemTitle_End;
}

function GenerateKaerebaLinkLink(form_values){
    const ind = indent.repeat(3);
    const divClass              = ind + "<div class=\"kaerebalink-link1\">\n";
    const div_shoplinkamaozn    = GenerateLinkShop(form_values, 'amazon');
    const div_shoplinkrakuten   = GenerateLinkShop(form_values, 'rakuten');
    const div_shoplinkyahoo     = GenerateLinkShop(form_values, 'yahoo');
    const divClassEnd           = ind + "</div> <!-- \"kaerebalink-link1 \" -->\n";

    return divClass + div_shoplinkamaozn + div_shoplinkrakuten + div_shoplinkyahoo + divClassEnd;
}


function GenerateLinkShop(form_values, shop){
    const ind1 = indent.repeat(4);
    const ind2 = indent.repeat(5);
    const url   = form_values[shop];
    const shopName = {  'amazon': 'Amazon', 'rakuten': '楽天市場'  };

    const divClassStart        = ind1 + "<div class=\"shoplink" + shop + "\">\n";
    if (shop == 'yahoo') {
        var divLink              = ind2 + url + "\n";        
    } else {
        var divLink                = ind2 + "<a href=\""+ url + "\" target=\"_blank\">" + shopName[shop]  + "</a>\n";
    }

    const divClassEnd          = ind1 + "</div> <!-- \"shoplink" + shop + "\" -->\n";

    return divClassStart + divLink + divClassEnd;
}




