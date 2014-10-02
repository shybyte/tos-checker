function log(message) {
    console.log(message);
}

var services = [];
var RATING_TEXT = {
    "D": "The terms of service are very uneven or there are some important issues that need your attention.",
    "E": "The terms of service raise very serious concerns."
};

function loadService(serviceName, serviceIndexData) {
    jQuery.ajax('http://tosdr.org/services/' + serviceName + '.json', { success: function (service) {
        if (!service.url) {
            console.log(serviceName+' has no service url');
            return;
        }
        service.urlRegExp = createRegExpForServiceUrl(service.url);
        service.points = serviceIndexData.points;
        service.links = serviceIndexData.links;
        if (!service.tosdr) {
            service.tosdr = { rated: false };
        }
        services.push(service);
        localStorage.setItem(serviceName, JSON.stringify(service));
    }
    });
}


jQuery.ajax('http://tosdr.org/index/services.json', { success: function (servicesIndex) {
    for (var serviceName in servicesIndex) {
        loadService(serviceName, servicesIndex[serviceName]);
    }
}
});


function getService(tab) {
    var matchingServices = services.filter(function (service) {
        return service.urlRegExp.exec(tab.url);
    });
    return matchingServices.length > 0 ? matchingServices[0] : null;
}

function getIconForService(service) {
    var rated = service.tosdr.rated;
    var imageName = rated ? rated.toLowerCase() : 'false';
    return '/images/class/' + imageName + '.png';
}


function checkNotification(service) {

    var last = localStorage.getItem('notification/' + service.name + '/last/update');
    var lastRate = localStorage.getItem('notification/' + service.name + '/last/rate');
    var shouldShow = false;

    if (!service.tosdr.rated) { return; }

    var rate = service.tosdr.rated;
    console.log(rate);
    if (rate === 'D' || rate === 'E') {

        if (last) {
            var lastModified = parseInt(Date.parse(last));
            log(lastModified);
            var daysSinceLast = (new Date().getTime() - lastModified) / (1000 * 60 * 60 * 24);
            log(daysSinceLast);

            if (daysSinceLast > 7) {
                shouldShow = true;
            }
        } else {
            shouldShow = true;
        }

    } else if (lastRate === 'D' || lastRate === 'E') {
        shouldShow = true;
    }


    if (shouldShow) {

        localStorage.setItem('notification/' + service.name + '/last/update', new Date().toDateString());
        localStorage.setItem('notification/' + service.name + '/last/rate', rate);

        var opt = {
            type: "basic",
            title: service.id,
            message: RATING_TEXT[rate],
            iconUrl: './images/icon-128.png'
        }

        var notification = chrome.notifications.create('tosdr-notify', opt, function(event){
            console.log(event)
        });

        chrome.notifications.onButtonClicked.addListener(function(){
            chrome.tabs.create({
                url: 'http://tosdr.org/#' + service.id
            });
        });

    }



}

function onUrlChanged(tabId, changeInfo, tab) {
    var service = getService(tab);
    if (service) {
        chrome.pageAction.setIcon({
            tabId: tabId,
            path: getIconForService(service)
        });
        chrome.pageAction.setPopup({
            tabId: tabId,
            popup: 'popup.html#' + service.id
        })
        chrome.pageAction.show(tabId);

        checkNotification(service);
    }
}

chrome.tabs.onUpdated.addListener(onUrlChanged);
