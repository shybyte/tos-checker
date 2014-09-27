jQuery(function () {

  function createDataPointViewModel(dataPoint) {
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
    return _.extend({}, dataPoint, {
      badge: badge,
      icon: icon,
      sign: sign
    })
  }

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

  function createServiceViewModel(service) {
    var sortedDataPoints = _.sortBy(_.values(service.pointsData), function (dataPoint) {
      return 0 - dataPoint.tosdr.score;
    });

    return _.extend({}, service, {
      ratingText: RATING_TEXT[service.class],
      linkList: _.map(service.links, function (link, id) {
        return {
          url: link.url,
          name: link.name || id
        }
      }),
      dataPoints: sortedDataPoints.map(createDataPointViewModel)
    });
  }

  function renderPopup(service) {
    $('#page').html(templates.popup(createServiceViewModel(service)));

    // links inside of the dataPoints should open in a new window
    $('.tosdr-points a').attr('target', '_blank');

    $('#closeButton,.close').click(function () {
      window.close();
    });
  }

  var serviceName = window.location.hash.substr(1);
  jQuery.ajax('https://tosdr.org/api/1/service/' + serviceName + '.json').done(renderPopup);

});
