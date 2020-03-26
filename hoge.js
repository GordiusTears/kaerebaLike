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
    
    
    var div_form  = document.createElement('div');
    div_form.style.gridColumn = "1 / 2";
    div_form.style.gridRow    = "1 / 5";
    div_form.id = "div_form";
    
    form_affl.appendChild(div_form);
    
    GenerateForm(div_form);
    

    
    var div_linkstr = document.createElement('div');
    div_linkstr.id = "div_linkstr";
    
    div_linkstr.style.gridColumn  = "2 / 3";
    div_linkstr.style.gridRow     = "1 / 3";

    form_affl.appendChild(div_linkstr);


    var div_preview = document.createElement('div');
    div_preview.id = "div_preview";
    
    div_preview.style.gridColumn = "2 / 3";
    div_preview.style.gridRow    = "3 / 5";
    form_affl.appendChild(div_preview);

    
    var p_link_str = document.createElement('p');
    
    var textarea_link_str  = document.createElement('textarea');
    textarea_link_str.id = "link_string";
    textarea_link_str.rows = 3;
    textarea_link_str.cols = 50;
    textarea_link_str.readonly = "readonly";
    p_link_str.appendChild(textarea_link_str);
    
    var button_copy = document.createElement('input');
    button_copy.type  = "button";
    button_copy.value = "クリップボードにコピー";
//    button_copy.addEventListener('click', CopyTextarea(), false);
    
    button_copy.onclick = function(){
        CopyTextarea();
    };


    div_linkstr.appendChild(p_link_str);
    div_linkstr.appendChild(button_copy);

    var div_html_preview = document.createElement('div');
    div_html_preview.id = "link_html";
    div_preview.appendChild(div_html_preview);

}
//
//
// Generate Forms
function GenerateForm(div_form){
    var myForm    = document.createElement('form');
    myForm.setAttribute("action","#");
    myForm.setAttribute("method","post");
    // inside "div_form" 

    var title_item       = document.createElement('p');
    title_item.innerHTML =  "アイテムタイトル" ;

    var textarea_item    = document.createElement('textarea');
    textarea_item.id     = "str_item";
    textarea_item.cols   = 50;
    textarea_item.rows   = 1;

    var title_img_url       = document.createElement('p');
    title_img_url.innerHTML = "画像 url" ;

    var p_img_url         = document.createElement('p');
    var textarea_img_url      = document.createElement('textarea');
    textarea_img_url.id   = "url_image";
    textarea_img_url.cols = 50;
    textarea_img_url.rows = 2;
    p_img_url.appendChild(textarea_img_url);

    // Amazon
    var title_amazon           = MakeTitleAmazon();
    

    var p_amazon_url     = document.createElement('p');
    var textarea_amazon      = document.createElement('textarea');
    textarea_amazon.id   = "url_amazon";
    textarea_amazon.cols = 50;
    textarea_amazon.rows = 3;
    p_amazon_url.appendChild(textarea_amazon);

    // Rakuten
    var title_rakuten           = MakeTitleRakuten();
    

    var p_rakuten_url     = document.createElement('p');
    var textarea_rakuten      = document.createElement('textarea');
    textarea_rakuten.id   = "url_rakuten";
    textarea_rakuten.cols = 50;
    textarea_rakuten.rows = 3;
    p_rakuten_url.appendChild(textarea_rakuten);
    
    // Yahoo
    var title_yahoo           = MakeTitleYahoo();
    

    var p_yahoo_url     =  MakeTextareaYahoo();
    

    var button_creat = document.createElement('input');
    button_creat.type  = "button";
    button_creat.value = "生成" ;
    button_creat.onclick = function() {
        ShowLinkString();    
    };
    

    var button_clear     = document.createElement('input');
    button_clear.type    = "button";
    button_clear.value   = "クリア" ;
    button_clear.onclick = function() {
        ClearTextarea();
    };
    

    myForm.appendChild(title_item);
    myForm.appendChild(textarea_item);
    myForm.appendChild(title_img_url);
    myForm.appendChild(p_img_url);
    myForm.appendChild(title_amazon);
    myForm.appendChild(p_amazon_url);
    myForm.appendChild(title_rakuten);
    myForm.appendChild(p_rakuten_url);
    myForm.appendChild(title_yahoo);
    myForm.appendChild(p_yahoo_url);
    myForm.appendChild(button_creat);
    myForm.appendChild(button_clear);
    div_form.appendChild(myForm);
    
}
function MakeTitleAmazon(){
    var a = document.createElement('p');
    a.innerHTML = "Amazonリンク url" ;
    return a;
}
function MakeTitleRakuten(){
    var a = document.createElement('p');
    a.innerHTML = "楽天リンク url" ;
    return a;
}
function MakeTitleYahoo(){
    var a = document.createElement('p');
    a.innerHTML = "Yahoo!ショッピング url" ;
    return a;
}

function MakeTextareaYahoo(){
    var a = document.createElement('p');
    var textarea_yahoo      = document.createElement('textarea');
    textarea_yahoo.id   = "url_yahoo";
    textarea_yahoo.cols = 50;
    textarea_yahoo.rows = 3;
    a.appendChild(textarea_yahoo);
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




