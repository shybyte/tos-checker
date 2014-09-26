jQuery(function () {

    function renderDataPoint(dataPoint) {
            var badge, icon, sign;
            if (dataPoint.tosdr.point == 'good') {
                badge = 'badge-success';
                icon = 'thumbs-up';
                sign = '+';
            } else if (dataPoint.tosdr.point == 'bad') {
                badge = 'badge-warning';
                icon = 'thumbs-down';
                sign = '-';
            } else if (dataPoint.tosdr.point == 'blocker') {
                badge = 'badge-important';
                icon = 'remove';
                sign = '×';
            } else if (dataPoint.tosdr.point == 'neutral') {
                badge = 'badge-neutral';
                icon = 'arrow-right';
                sign = '→';
            } else {
                badge = '';
                icon = 'question-sign';
                sign = '?';
            }
            return '<li class="point"><div class="' + dataPoint.tosdr.point + '"><h5><span class="badge ' + badge
                    + '" title="' + dataPoint.tosdr.point + '"><i class="icon-' + icon + ' icon-white">' + sign + '</i></span> ' + dataPoint.title + ' <a href="' + dataPoint.discussion + '" target="_blank" class="label context">Discussion</a></h5><p>'
                    + dataPoint.tosdr.tldr + '</p></div></li>';
    }

    var NOT_RATED_TEXT = "We haven't sufficiently reviewed the terms yet. Please contribute to our group: <a target=\"_blank\" href=\"https:\/\/groups.google.com/d/forum/tosdr\">tosdr@googlegroups.com</a>.";
    var RATING_TEXT = {
        0:NOT_RATED_TEXT,
        "false":NOT_RATED_TEXT,
        "A":"The terms of service treat you fairly, respect your rights and follows the best practices.",
        "B":"The terms of services are fair towards the user but they could be improved.",
        "C":"The terms of service are okay but some issues need your consideration.",
        "D":"The terms of service are very uneven or there are some important issues that need your attention.",
        "E":"The terms of service raise very serious concerns."
    };

    function renderPopup(name) {
        var service = JSON.parse(localStorage[name]);
        renderPopupHtml(name, service.name, service.url, service.tosdr.rated, RATING_TEXT[service.tosdr.rated],
            service.points, service.links);
    }

    function isEmpty(map) {
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    function renderPopupHtml(name, longName, domain, verdict, ratingText, points, links) {
        var headerHtml = '<div class="modal-header">'
            + '<h3><a href="http://tosdr.org/#' + name + '" target="_blank"><img src="images/tosdr-logo-32.png" alt="" class="pull-left" />'
            + '</a></small>'
            + '<button id="closeButton" data-dismiss="modal" class="close pull-right" type="button">×</button></h3></div>';
        var classHtml = '<div class="tosdr-rating"><label class="label ' + verdict + '">'
            + (verdict ? 'Class ' + verdict : 'No Class Yet') + '</label><p>' + ratingText + '</p></div>';
        var bodyHtml = '<div class="modal-body">' + classHtml + '<section class="specificissues"> <ul class="tosdr-points"></ul></section>';

        // Add Links
        if (isEmpty(links)) {
            bodyHtml += '<section><a href="http://tosdr.org/get-involved.html" class="btn" target="_blank"><i class="icon  icon-list-alt"></i> Get Involved</a></section>';
        } else {
            bodyHtml += '<section><h4>Read the Terms</h4><ul class="tosback2">';
            for (var i in links) {
                bodyHtml += '<li><a target="_blank" href="' + links[i].url + '">' + (links[i].name ? links[i].name : i) + '</a></li>';
            }
            bodyHtml += '</ul></section>';
        }

        bodyHtml += '<a target="_blank" href="https://tosdr.org/get-involved.html">Get Involved!</a>';

        bodyHtml += '</div>';

        $('#page').html(headerHtml + bodyHtml);

        jQuery.ajax('https://tosdr.org/api/1/service/'+name+'.json', {success: function (serviceData) {
          var dataPoints = _.sortBy(_.values(serviceData.pointsData), function (dataPoint) {
            return 0 - dataPoint.tosdr.score;
          });
          dataPoints.forEach(function (dataPoint) {
            $('.tosdr-points').append(renderDataPoint(dataPoint));
          });
          $('.tosdr-points a').attr('target', '_blank');
        }});

    }

    var serviceName = window.location.hash.substr(1);
    renderPopup(serviceName);

    $('#closeButton,.close').click(function () {
        window.close();
    });
});
