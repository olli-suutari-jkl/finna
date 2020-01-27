/* Add your custom template javascript here */
var locationUrl = "";

function loadJsOrCssFile(filename, filetype){
    if (filetype=="js") { //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css") { //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

// Function for checking if page exists and redirecting accordingly.
function checkUrlForContent(url) {
    try {
        $.get( url, function() {
            window.location = url;
          });
    }
    catch(e) {
        // Page not found... console.log(e)
    }
}

function appendSearchBar () {
    /* Hide category browse button on search results?
    if (locationUrl.indexOf('/Search/') > -1) {
        console.log("DO HIDE!");
        $('.browse-categories-li-item').css('display', 'none')
    }*/
    if (locationUrl == "https://keski.finna-test.fi/beta/Search/Advanced" ||
        $('.adv_search_links').length) {
        $('.searchContent').css('display', 'none')
        return;
    }
    if (locationUrl.toLowerCase().indexOf ('/content/help') > -1) {
        $('#searchHelpLink').css('display', 'none')
    }
    if (locationUrl.indexOf('/Search/History') > -1) {
        $('.history-btn').css('display', 'none');
        return;
    }
    // If user has a search historry, append the history button.
    try {
        $.get( 'https://keski.finna-test.fi/beta/Search/History', function( data ) {
            //console.log(data)
            if (data.indexOf('<h4>Hakuhistoria on tyhj') > -1 ||
            data.indexOf('There are currently no') > -1) {
                $('.history-btn').css('display', 'none');
                return;
            }
          });
    }
    catch(e) {
        // Page not found... console.log(e)
        //$('.history-btn').css('display', 'inline');
    }
}

function addSelectedNav() {
    if (locationUrl == 'https://keski.finna-test.fi/beta/') {
        $('.navbar-brand').addClass("selected-nav");
    }
    if (locationUrl.indexOf('/Content/kirjastot') > -1) {
        $('header li a[href$="/kirjastot"]').addClass("selected-nav");
    }
    else if (locationUrl.indexOf('/Content/info') > -1) {
        $('header li a[href$="/info"]').addClass("selected-nav");
    }
    else if (locationUrl.indexOf('/Content/ekirjasto') > -1) {
        $('header li a[href$="/ekirjasto"]').addClass("selected-nav");
    }
    else if (locationUrl.indexOf('/Feedback/Home') > -1) {
        $('header li a[href$="/Feedback/Home"]').addClass("selected-nav");
    }
    else {
        var linksInTipsMenu = [];
        $('#menu_Vinkit a').each(function(){
            //do something with the link element
            if (locationUrl.indexOf(this.href) > -1) {
                $('#menu_Vinkit').addClass("selected-nav");
                $('#menu_Vinkit').addClass("selected-nav");
                var linkEnding = this.href.substring(this.href.lastIndexOf("/") + 1);
                $('li a[href$="' + linkEnding + '"]').addClass("selected-nav");
            }
         });
    }
}

function leftNavigationScrollDisplay() {
    if ($('.content-navigation-menu').length) {
        $(".content-navigation-menu h2 a").first().parent().addClass('selected-sub-nav');
        var navSections = [];
        $(".content-navigation-menu h2 a").each(function(){
            var selector = $(this.hash).selector;
            selector = selector.substr(1);
            navSections.push(selector);

       });
       var navSectitionsWithPos = [];
       for (i = 0; i < navSections.length; i++) {
            var position = window.scrollY + document.getElementById(navSections[i]).getBoundingClientRect().top
            navSectitionsWithPos.push( { 'id': navSections[i], 'pos':  position } );
        }

        var navSectitionsWithPosEnd = [];
        for (i = 0; i < navSectitionsWithPos.length; i++) {
            var positionEnd = 99999999;
            if (i < navSectitionsWithPos.length -1) {
                positionEnd = navSectitionsWithPos[i + 1].pos;
            }
            // Add end pos + adjusted -+ 80px to accommodate margins.
            navSectitionsWithPosEnd.push( { 'id': navSectitionsWithPos[i].id,
            'pos':  navSectitionsWithPos[i].pos -80, 'posEnd': positionEnd + 80 } );
        }

        // Reference: http://www.html5rocks.com/en/tutorials/speed/animations/
        let last_known_scroll_position = 0;
        let ticking = false;
        function doSomething(scroll_pos) {
            // Do something with the scroll position
            for (i = 0; i < navSectitionsWithPosEnd.length; i++) {
                if (scroll_pos >= navSectitionsWithPosEnd[i].pos &&
                    scroll_pos <= navSectitionsWithPosEnd[i].posEnd) {
                     $('.selected-sub-nav').removeClass('selected-sub-nav');
                     var newSelected = $('h2 a[href$="#' + navSectitionsWithPosEnd[i].id + '"');
                     newSelected.parent().addClass('selected-sub-nav');
                }
            }
        }
        // Add/remove selected nav element class based on scroll pos.
        window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
            doSomething(last_known_scroll_position);
            ticking = false;
            });

            ticking = true;
        }
        });

    }
}


function finnaCustomInit() {
    loadJsOrCssFile("https://fonts.googleapis.com/css?family=Lato|Open+Sans&display=swap", "css");
    //loadJsOrCssFile("https://use.fontawesome.com/releases/v5.12.0/css/all.css", "css") 
    //loadJsOrCssFile("https://use.fontawesome.com/releases/v5.12.0/css/v4-shims.css", "css")
    //loadJsOrCssFile("https://use.fontawesome.com/releases/v5.12.0/js/all.js", "js")
    //loadJsOrCssFile("https://use.fontawesome.com/releases/v5.12.0/js/v4-shims.js", "js")

    locationUrl = window.location.href;
    if (locationUrl.indexOf('?lng=fi') > -1) {
        locationUrl = locationUrl.replace('?lng=fi', '');
    }
    else if(locationUrl.indexOf('?lng=en-gb') > -1) {
        locationUrl = locationUrl.replace('?lng=en-gb', '');
    }
    // Change English to "In English" and "Suomi" to "Suomeksi"
    /*
    if (document.documentElement.lang.toLowerCase() === "fi") {
        console.log("HEY HEY")
        $('.lang a[href$="=en-gb"]').text("In English")
    }
    else {
        $('.lang a[href$="=fi"]').text("Suomeksi")
    }
    */
   // Adding base url would break # navigation in sidebars.
   //var base = document.createElement('base');
   //base.href = 'https://keski.finna-test.fi/beta/';
   //document.getElementsByTagName('head')[0].appendChild(base);

   addSelectedNav();
   appendSearchBar();
   leftNavigationScrollDisplay();

}
