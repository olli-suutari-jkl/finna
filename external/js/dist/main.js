var locationUrl="";locationUrl=window.location.href;function importJsOrCssFile(a,b){if("js"==b){var c=document.createElement("script");c.setAttribute("type","text/javascript"),c.setAttribute("src",a)}else if("css"==b){var c=document.createElement("link");c.setAttribute("rel","stylesheet"),c.setAttribute("type","text/css"),c.setAttribute("href",a)}"undefined"!=typeof c&&document.getElementsByTagName("head")[0].appendChild(c)}function checkUrlForContent(a){try{$.get(a,function(){window.location=a})}catch(a){}}function generateAccessibleExternalLink(a){var b="avautuu uudessa v\xE4lilehdess\xE4";return"fi"!==document.documentElement.lang.toLowerCase()&&(b="opens in a new tab"),a.insertAdjacentHTML("beforeend","<span class=\"sr-only\"> ("+b+")</span>"),a}function addNoOpener(a){let b=(a.getAttribute("rel")||"").split(" ");b.includes("noopener")||b.push("noopener"),a.setAttribute("rel",b.join(" ").trim())}function appendSearchBar(){return-1<locationUrl.indexOf("/Search/Advanced")||$(".adv_search_links").length?($("section[role=search] .search-form-container").removeClass("search-form-container"),$("section[role=search]").css("visibility","hidden"),$("section[role=search]").removeClass("searchContent"),void $("section[role=search]").removeAttr("role")):(-1<locationUrl.toLowerCase().indexOf("/content/help")&&$("#searchHelpLink").parent().css("display","none"),-1<locationUrl.indexOf("/Search/History"))?void $(".history-btn").parent().css("display","none"):void 0}function addSelectedNav(){if(-1<locationUrl.indexOf("/Content/kirjastot"))$("header li a[href$=\"/kirjastot\"]").addClass("selected-nav");else if(-1<locationUrl.indexOf("/Content/info"))$("header li a[href$=\"/info\"]").addClass("selected-nav");else if(-1<locationUrl.indexOf("/Content/help_opac"))$("header li a[href$=\"/info\"]").addClass("selected-nav");else if(-1<locationUrl.indexOf("/Content/help_accessibility"))$("header li a[href$=\"/info\"]").addClass("selected-nav");else if(-1<locationUrl.indexOf("/Content/help_keski"))$("header li a[href$=\"/info\"]").addClass("selected-nav");else if(-1<locationUrl.indexOf("/Feedback/Home"))$("header li a[href$=\"/Feedback/Home\"]").addClass("selected-nav");else if(-1<locationUrl.indexOf("/Content/accessibility-statement"))$("footer li a[href$=\"/Content/accessibility-statement\"]").parent().addClass("selected-nav");else{if(-1<locationUrl.indexOf("/Search/Results"))return;$("#menu_Vinkit a").each(function(){if(-1<locationUrl.indexOf(this.href)){console.log(this.href),$("#menu_Vinkit").addClass("selected-nav");var a=this.href.substring(this.href.lastIndexOf("/")+1);$("#menu_Vinkit li a[href$=\""+a+"\"]").addClass("selected-nav")}}),$("#menu_eaineisto a").each(function(){if(-1<locationUrl.indexOf(this.href)){$("#menu_eaineisto").addClass("selected-nav");var a=this.href.substring(this.href.lastIndexOf("/")+1);$("li a[href$=\""+a+"\"]").addClass("selected-nav")}}),$("footer a").each(function(){-1<locationUrl.indexOf(this.href)&&$("li a[href$=\""+window.location.pathname+"\"]").addClass("selected-nav")})}}function leftNavigationScrollDisplay(){if($(".content-navigation-menu").length){function f(a){for(i=0;i<d.length;i++)if(a>=d[i].pos&&a<=d[i].posEnd){$(".selected-sub-nav").removeClass("selected-sub-nav");var b=$("h2 a[href$=\"#"+d[i].id+"\"");b.parent().addClass("selected-sub-nav")}}$(".content-navigation-menu h2 a").first().parent().addClass("selected-sub-nav");var a=[];$(".content-navigation-menu h2 a").each(function(){try{var b=$(this.hash)[0].id;b!==void 0&&a.push(b)}catch(a){}});var b=[];for(i=0;i<a.length;i++){var c=window.scrollY+document.getElementById(a[i]).getBoundingClientRect().top;b.push({id:a[i],pos:c})}var d=[];for(i=0;i<b.length;i++){var e=99999999;i<b.length-1&&(e=b[i+1].pos),d.push({id:b[i].id,pos:b[i].pos-80,posEnd:e+80})}let g=0,h=!1;window.addEventListener("scroll",function(){g=window.scrollY,h||(window.requestAnimationFrame(function(){f(g),h=!1}),h=!0)})}}function smartPaginationDisplay(){var a=$(".pagination-text .total").text();""!=a,$(".pagination-text span").each(function(){var a=$(this).text();("N\xE4ytet\xE4\xE4n "==a||"Showing "==a||" results of "==a)&&$(this).css("display","none");var b=$(a+"strong");" results of "===b&&$(this).css("display","none")});var b=$(".pagination-text").html().replace(" results of "," / ");if($(".pagination-text").html(b),$(".pagination-text strong").each(function(){var a=$(this).text();a=a.replace(/ /g,""),$(this).text(a)}),$(".pagination-container").css("visibility","visible"),$(".sort-option-container .sort-button span").prepend("<span class=\"sort-by\">"+i18n.get("Order")+":</span>"),$(".limit-option-container .sort-button span").prepend("<span class=\"results-on-page\">"+i18n.get("Show")+":</span>"),$(".control-container .view-dropdown .dropdown-toggle").prepend("<span class=\"results-on-page\">"+i18n.get("View")+":</span>"),$(".fa-last-page").length){var c=$(".fa-last-page").parent(),d=new RegExp(/page=\d*/g),e=d.exec(c[0]);e=e[0].replace("page=",""),d=new RegExp(/page=\d*/g);var f=d.exec(locationUrl);f=null==f?0:f[0].replace("page=","");var g=e-f;475>$(window).width()&&($(".pagination .fa-arrow-alt-right").parent().css("display","none"),2!=f&&$(".pagination .fa-arrow-alt-left").parent().css("display","none")),2<g?$(".fa-last-page").prepend(" "+e):2>g&&($(".fa-arrow-alt-right").addClass("fa-last-page"),$(".fa-arrow-alt-right").removeClass("fa-arrow-alt-right"),$(c).parent().css("display","none")),2==f&&($(".pagination .fa-first-page").parent().css("display","none"),$(".fa-arrow-alt-left").addClass("fa-first-page"),$(".fa-arrow-alt-left").removeClass("fa-arrow-alt-left"))}"fi"===document.documentElement.lang.toLowerCase()?$(".filter-text:contains(\"Keski-kirjastot\")")&&$(".filter-text").each(function(){var a=$(this).text();a=a.replace("Keski-kirjastot > ",""),$(this).text(a)}):$(".filter-text:contains(\"Keski Libraries\")")&&$(".filter-text").each(function(){var a=$(this).text();a=a.replace("Keski Libraries > ",""),$(this).text(a)}),$(".filter-value").each(function(){$(this).hasClass("filters-and")||$(this).hasClass("filters-or")||(!$(this).addClass("title-value-pair"),!$(this).removeClass("filter-value"))});var h=$("div [data-facet=\"online_boolean:1\"] .avail-count").text();0==h&&$("div [data-facet=\"online_boolean:1\"]").parent().parent().css("display","none");var j=$("#side-panel-subtitle_lng_str_mv .collapsed");$(j).click(),setTimeout(function(){var a=$("#side-collapse-subtitle_lng_str_mv .list-group-item").text();"Ei tietoja"==a||"No data available"==a?$("#side-collapse-subtitle_lng_str_mv").parent().css("display","none"):$("#side-panel-subtitle_lng_str_mv button").click()},800)}function homeLibFunctionality(){var a=document.getElementById("libFrame"),b=document.createElement("style");b.type="text/css",b.innerHTML="#libFrame { transition: height 500ms;}",document.head.appendChild(b),window.addEventListener("message",function(b){var c=b.data;if("resize"===c.type){var d=c.value;520>d&&(d=520),767<$(window).width()&&setTimeout(function(){var a=$("#keskiNewsUl").height();a=$(".news-page-link-container").height()+a,a=Math.floor(a);var b=$("#libFrame").height();b<a&&140>a-b&&(d=a+17,$("#libFrame").css("height",d+"px"),$("#libFrame").attr("height",d+"px"))},1e3),a.style.height=d+"px"}else if("redirect"===c.type)try{window.location.href=c.value}catch(a){console.log("Redirect failed: "+a)}})}function isValue(a){if(null!==a&&void 0!==a&&0!==a.length&&!isNaN(a)&&"NaN"!==a&&"undefined"!==a||""!==$.trim(a)){if("number"==typeof a)return!0;var b=a.replace(/<p>/g,"");return b=b.replace(/<\/p>/g,""),b=$.trim(b),1<=b.length}return!1}function decodeVal(a){return isValue(a)?(a=decodeURI(a),a=a.toLowerCase(),a):a}-1<locationUrl.indexOf("/beta/")&&(window.location=locationUrl.replace("/beta/","/")),-1<locationUrl.indexOf("/content/")&&(window.location=locationUrl.replace("/content/","/Content/")),-1<locationUrl.indexOf("/web/arena")&&(window.location=locationUrl.replace("/web/arena","")),-1<locationUrl.indexOf("?lng=fi")?locationUrl=locationUrl.replace("?lng=fi",""):-1<locationUrl.indexOf("?lng=en-gb")&&(locationUrl=locationUrl.replace("?lng=en-gb","")),importJsOrCssFile("https://fonts.googleapis.com/css?family=Lato|Open+Sans&display=swap","css"),window.moment||(console.log("Load moment."),importJsOrCssFile("/keski/themes/custom/js/lib/moment.min.js","js")),window.tileLayer||(console.log("Load Leaflet tile fallback."),importJsOrCssFile("https://keski-finna.fi/external/finna/js/lib/leafletTileFallback.min.js","js")),window.i18n||(-1<locationUrl.indexOf("a-pre.fi")?require("https://keski-finna.fi/external/finna/js/jquery.translate.js",loadPolyfills()):require("https://keski-finna.fi/external/finna/js/dist/jquery.translate.js",loadPolyfills()));function loadPolyfills(){-1<navigator.userAgent.indexOf("MSIE ")||-1<navigator.userAgent.indexOf("Trident/")?require("https://polyfill.io/v3/polyfill.min.js?features=es2015%2Ces2016%2Ces2017%2Ces5%2Ces6%2CArray.prototype.includes%2CString.prototype.includes%2Cdefault%2Cblissfuljs%2CArray.of%2CArray.prototype.some%2CNumber.EPSILON%2Cdocument%2CArray.prototype.every%2CArray.prototype.fill%2CArray.prototype.filter%2CArray.prototype.find%2CArray.prototype.forEach%2CArray.prototype.reduce%2CArray.prototype.lastIndexOf%2CArray.prototype.indexOf%2CscrollIntoView%2CscrollX%2CscrollY%2CArray.isArray%2CArray.from%2Ces7%2Ces2019%2Ces2018",loadContentScripts()):loadContentScripts()}function loadContentScripts(){setTimeout(function(){return-1<locationUrl.indexOf("a-pre.fi")?(importJsOrCssFile("https://keski-finna.fi/external/finna/js/newsTest.js","js"),void importJsOrCssFile("https://keski-finna.fi/external/finna/js/eventsTest.js","js")):void(importJsOrCssFile("https://keski-finna.fi/external/finna/js/dist/news.js","js"),importJsOrCssFile("https://keski-finna.fi/external/finna/js/dist/events.js","js"))},1400)}var isIOS=!1,testSafari=navigator.vendor&&-1<navigator.vendor.indexOf("Apple")&&navigator.userAgent&&-1==navigator.userAgent.indexOf("CriOS")&&-1==navigator.userAgent.indexOf("FxiOS");(testSafari||/^((?!chrome|android).)*safari/i.test(navigator.userAgent))&&(isIOS=!0);var isIPad=null!=navigator.userAgent.match(/iPad/i),isIPhone=null!=navigator.userAgent.match(/iPhone/i)||null!=navigator.userAgent.match(/iPod/i);(isIPad||isIPhone)&&(isIOS=!0);function addCssToDocument(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("style");c.setAttribute("type","text/css"),c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a)),b.appendChild(c)}function require(a,b){var c=document.createElement("script");c.src=a,c.type="text/javascript",c.addEventListener("load",b),document.getElementsByTagName("head")[0].appendChild(c)}function fixFooterPosition(){var a=$(".main").innerHeight();if(769>window.innerWidth||1300<a)return void $("#jsFootPositionFix").css("height","0px");var b=window.innerHeight,c=Math.round(a+$("footer").innerHeight()+$("header").innerHeight()-b);0>c?(c=Math.abs(c),c-=45,$("#jsFootPositionFix").css("height",c+"px")):$("#jsFootPositionFix").css("height","0px")}function main(){function a(){new Date-c<200?setTimeout(a,200):(d=!1,fixFooterPosition(),setTimeout(function(){fixFooterPosition()},100))}addSelectedNav(),appendSearchBar(),leftNavigationScrollDisplay();var b=Array.prototype.slice.call(document.querySelectorAll("a[target=\"_blank\"]"));b.forEach(function(a){generateAccessibleExternalLink(a)}),1===$(".keski-news-home").length&&homeLibFunctionality(),-1<locationUrl.indexOf("/Search/Results")&&(window.onload=function(){smartPaginationDisplay()},$("#browseLi").css("display","none")),-1<locationUrl.indexOf("/Record/keski")&&(window.onload=function(){$(".finnaQrcodeLinkRecord").parent().css("display","none"),$(".export-toggle").parent().css("display","none")}),$(".main").append("<div class=\"sr-hidden\" aria-hidden=\"true\" id=\"jsFootPositionFix\" style=\"height: 0;\">&nbsp;</div>"),fixFooterPosition();var c,d=!1;$(window).resize(function(){c=new Date,!1===d&&(d=!0,setTimeout(a,200))})}main();
