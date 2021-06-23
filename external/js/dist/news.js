var isFrontPage=1===$(".keski-news-home").length,isNewsPage=1===$(".news-page").length,newsList=[],isEnglish=!1;"fi"!==document.documentElement.lang.toLowerCase()&&(isEnglish=!0);var newsCacheStamp=localStorage.getItem("keskiNewsTimestamp");function checkNewsCache(){$.getJSON("https://keski-finna.fi/wp-json/acf/v3/cache",function(a){var b=a[0].acf.news_stamp;if(newsCacheStamp=localStorage.getItem("keskiNewsTimestamp"),newsCacheStamp===b){var c=localStorage.getItem("keskiNews");null===c?(localStorage.setItem("keskiNewsTimestamp",b),fetchNews()):(c=JSON.parse(c),$(c).each(function(){var a=$(this)[0].acf;addNewsToArray(a)}),afterNewsListIsGenerated())}else localStorage.setItem("keskiNewsTimestamp",b),fetchNews()})}function generatePrettyUrl(a){return a=a.replace(/^(?:https?:\/\/)?(?:www\.)?/i,""),("/"===a.substring(a.length-1)||"#"===a.substring(a.length-1))&&(a=a.substring(0,a.length-1)),a}function addFrontPageItems(a){for(var b=0;4>b;b++){var c=a[b].prettyDate,d="";null!==a[b].image&&(d="<img class=\"news-image\" alt=\"\" src=\""+a[b].image+"\">");var e="";if(null!==a[b].link){var f=generatePrettyUrl(a[b].link);e="<p class=\"news-link\"><i class=\"fa fa-globe\" aria-hidden=\"true\"></i><a  href=\""+a[b].link+"\">"+f+"</a></p>"}var g=a[b].title;isEnglish&&null!==a[b].titleEn&&(g=a[b].titleEn);var h=a[b].content;isEnglish&&null!==a[b].contentEn&&(h=a[b].contentEn),h="<div class=\"news-content\">"+h+e+d+"</div>",null==a[b].image&&(a[b].image="https://keski-finna.fi/wp-content/uploads/paakirjasto59_YouTube_820x461_acf_cropped.jpg");var j="<li class='news-item news-li front-page-news-li'><div class='news-container front-page-news-container'><a href='/Content/uutiset?news="+newsList[b].url+"' class='news-item-link' title='"+i18n.get("Read")+": "+g+"'  data-url='"+newsList[b].url+"' data-name='"+g+"' data-message='"+h+"'><img class='news-li-image front-page-news-image' alt='' src='"+a[b].image+"'> <div class='news-text-container front-page-news-text-container'><span class='news-li-title front-page-news-li-title'>"+g+"</span><span class='news-li-date front-page-news-date'>"+c+"</span></div></a></div></li>";$("#keskiNewsUl").append(j)}$("#keskiNews .loader").css("display","none")}function addNewsPageItems(a){for(var b=0;b<a.length;b++){var c=a[b].prettyDate,d="";null!==a[b].image&&(d="<img class=\"news-image\" alt=\"\" src=\""+a[b].image+"\">");var e="";if(null!==a[b].link){var f=generatePrettyUrl(a[b].link);e="<p class=\"news-link\"><i class=\"fa fa-globe\" aria-hidden=\"true\"></i><a  href=\""+a[b].link+"\">"+f+"</a></p>"}var g=a[b].title;isEnglish&&null!==a[b].titleEn&&(g=a[b].titleEn);var h=a[b].content;isEnglish&&null!==a[b].contentEn&&(h=a[b].contentEn),h="<div class=\"news-content\">"+h+e+d+"</div>",null==a[b].image&&(a[b].image="https://keski-finna.fi/wp-content/uploads/paakirjasto59_YouTube_820x461_acf_cropped.jpg");var j="<li class='news-item news-li news-page-news-li'><div class='news-container news-page-news-container'><a href='/Content/uutiset?news="+newsList[b].url+"' class='news-item-link'  title='"+i18n.get("Read")+": "+g+"' data-url='"+newsList[b].url+"' data-name='"+g+"' data-message='"+h+"'><img class='news-li-image news-page-news-image' alt='' src='"+a[b].image+"'> <div class='news-text-container news-page-news-text-container'><span class='news-li-title news-page-news-li-title'>"+g+"</span><span class='news-li-date news-page-news-date'>"+c+"</span></div></a></div></li>";$("#keskiNewsUl").append(j)}$("#keskiNews .loader").css("display","none")}function addNewsToArray(a){var b="",c=null,d="",e=null,f="",g="",h=null,i=null,j="";j=a.perma_link;var k=a.publish_date,l=k.substr(6,4),m=k.substr(3,2),n=k.substr(0,2);g=n+"."+m+".",isNewsPage&&(g+=l),f=new Date,f.setDate(n),f.setMonth(m-1),f.setYear(l),f.setHours(0),f.setMinutes(1);var o=new Date;f>o||(""!=a.link_url&&(h=a.link_url),!1!=a.image&&(i=a.image),b=a.title,""!=a.english_title&&isEnglish&&(c=a.english_title),d=a.content,""!=a.english_content&&isEnglish&&(e=a.english_content),newsList.push({url:j,date:f,prettyDate:g,title:b,content:d,titleEn:c,contentEn:e,image:i,link:h}))}function afterNewsListIsGenerated(){newsList.sort(function(c,a){var b=new Date(c.date),d=new Date(a.date);return d-b}),isFrontPage?addFrontPageItems(newsList):addNewsPageItems(newsList),bindNewsModalFunctionality()}function fetchNews(){$.ajax("https://keski-finna.fi/wp-json/acf/v3/news?per_page=500",{accepts:{xml:"application/json"},dataType:"json",success:function(a){localStorage.setItem("keskiNews",JSON.stringify(a)),$(a).each(function(){var a=$(this)[0].acf;addNewsToArray(a)})},error:function(a,b,c){console.log(c)},complete:function(){afterNewsListIsGenerated()}})}function bindNewsModalFunctionality(){var a=window.location.href;if(a=decodeVal(a),-1<a.indexOf("?news="))for(var b,c=new RegExp(/\?news=.*/g),d=a.match(c)[0],e=0;e<newsList.length;e++)if(b="?news="+newsList[e].url,d===b){var f=newsList[e].url;setTimeout(function(){$(".news-item").find("[data-url=\""+f+"\"]").click()},400)}$(".news-item-link").on("click",function(a){a.preventDefault();var b=$(this).data("name"),c=$(this).data("message");c=c.replace(/^(&nbsp;)+/g,""),c=c.replace(/(<p>&nbsp;<\/p>)+/g,""),c=c.replace(/(<p><\/p>)+/g,""),c=c.replace(/(<p>\s<\/p>)+/g,""),$("#newsModalTitle").replaceWith("<h1 class=\"modal-title\" id=\"newsModalTitle\">"+b+"</h1>"),$("#newsModalBody").replaceWith("<div id=\"newsModalBody\" class=\"modal-body\"><div> <div class=\"feed-content\"><div class=\"holder\">"+c+"</div></div></div></div>"),$("#newsModal").modal("show");var d=$(this).data("url").toString(),e=window.location.href.toString();if(-1===e.indexOf(d)){d=e+"?news="+d;var f={urlValue:d};history.replaceState(f,b,d)}}),$("#newsModal").on("hide.bs.modal",function(){var a=window.location.href;if(a.indexOf("?news=")){var b=new RegExp(/\?news=.*/g);a=a.replace(b,"");var c={urlValue:a};history.replaceState(c,"",a)}})}(isFrontPage||isNewsPage)&&(checkNewsCache(),$(".close-news-modal").text(i18n.get("Close")));
