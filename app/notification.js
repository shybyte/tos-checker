var view;


jQuery(function () {

    var NOT_RATED_TEXT = "We haven't sufficiently reviewed the terms yet. Please contribute to our group: <a target=\"_blank\" href=\"https:\/\/groups.google.com/d/forum/tosdr\">tosdr@googlegroups.com</a>.";
    var RATING_TEXT = {
        0: NOT_RATED_TEXT,
        "false": NOT_RATED_TEXT,
        "A": "The terms of service treat you fairly, respect your rights and follows the best practices.",
        "B": "The terms of services are fair towards the user but they could be improved.",
        "C": "The terms of service are okay but some issues need your consideration.",
        "D": "The terms of service are very uneven or there are some important issues that need your attention.",
        "E": "The terms of service raise very serious concerns."
    };

    function renderPoints(name, service)
    {

    var points = service.points;
        for (var i = 0; i < points.length; i++) {
            jQuery.ajax('http://tosdr.org/points/' + points[i] + '.json', { success: function (dataPoint) {

                switch (dataPoint.tosdr.point) {
                    case 'good': dataPoint.symbol = { badge: ' badge-success', icon: ' icon-plus ', sign: '+' }; break;
                    case 'mediocre': dataPoint.symbol = { badge: 'badge-warning', icon: ' icon-minus ', sign: '-' }; break;
                    case 'alert': dataPoint.symbol = { badge: ' badge-important', icon: ' icon-remove ', sign: 'x' }; break;
                    case 'not bad': dataPoint.symbol = { badge: ' badge-neutral', icon: ' icon-arrow-right ', sign: '->' }; break;
                    default: dataPoint.symbol = { badge: '', icon: ' icon-question-sign ', sign: '?' }; break;
                }

                console.log(dataPoint);
                console.log('#popup-point-' + name + '-' + dataPoint.id);
                if(typeof dataPoint != 'undefined')
                {
                    console.log($('#popup-point-' + name + '-' + dataPoint.id));

                    $('#popup-point-' + name + '-' + dataPoint.id).directives({
                          
                                            'h5+' : 'name',
                                            'i.icon' : 'symbol.sign',
                                           // 'p': 'tosdr.tldr',
                                                          'div@class+': 'tosdr.point',
                                            '.badge@class+': 'symbol.badge',
                                            'span@title': 'tosdr.point',
                                            '+i.icon@class': 'symbol.icon',

                    })
                    .render(dataPoint);
                }else{

                $('#popup-point-' + name + '-' + dataPoint.id).remove();

                }
                
            }
            });
        }

    }

    function renderNotification(name) {

        console.log(name);
        var service = JSON.parse(localStorage[name]);

        console.log(service);

        var view = new ViewModel(name, service.name, service.url, service.tosdr.rated, RATING_TEXT[service.tosdr.rated],
            service.points, service.links);

        $('#page')
        //tell PURE what to do
        .directives({
            '+h3': 'longName',
            'img.site-logo@src': 'logo',
            'a.tosdr-link@href': 'link',

            'div.tosdr-rating label': 'verdictText',
            'div.tosdr-rating label@class+': 'verdictClass',
            '.tosdr-rating p': 'ratingText'
            /*
            // Whenever we need to render the points
            'section' : function(){ return "";} //set to visible
            'li':
            {
                'pid<-pointIds': {
                    '@id': 'pid'

                }
            }
*/
        })
        //generate the HTML
        .render(view);

        //renderPoints(name, service);
    }

    function ViewModel(name, longName, domain, verdict, ratingText, points, links) {
        this.link = 'http://tosdr.org/#' + name;
        this.logo = 'http://tosdr.org/logo/' + name + '.png';
        this.longName = longName;
        this.verdictText = verdict ? 'Class ' + verdict : 'No Class Yet';
        this.points = points;
        this.verdictClass = 'label ' + verdict;
        this.ratingText = ratingText;
        this.pointIds = new Array();

        for (var i = 0; i < points.length; i++) {
            this.pointIds.push('popup-point-' + name + '-' + points[i]);
        }

    }

    var serviceName = window.top.location.hash.substr(1);
    renderNotification(serviceName);


});

setTimeout(function(){ window.close();}, 10000);