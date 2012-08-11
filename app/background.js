function log(message) {
    console.log(message);
}

var services = [];

function loadService(serviceName,points) {
    jQuery.ajax('http://tos-dr.info/services/' + serviceName + '.json', {success:function (service) {
        service.urlRegExp = new RegExp('https?://[^:]*' + service.url + '.*');
        service.points = points.points;
        if (!service.tosdr) {
            service.tosdr = {rated:false};
        }
        services.push(service);
        localStorage.setItem(serviceName,JSON.stringify(service));
    }});
}


jQuery.ajax('http://tos-dr.info/index/services2.json', {success:function (servicesIndex) {
    for (var serviceName in servicesIndex) {
        loadService(serviceName,servicesIndex[serviceName]);
    }
}});


function getService(tab) {
    var matchingServices = services.filter(function (service) {
        return service.urlRegExp.exec(tab.url);
    });
    return matchingServices.length > 0 ? matchingServices[0] : null;
}

function getIconForService(service) {
    var rated = service.tosdr.rated;
    var imageName =  rated ? rated.toLowerCase() : 'false';
    return '/images/class/'+imageName+'.png';
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
            popup: 'popup.html#'+service.id
        })
        chrome.pageAction.show(tabId);
    }
}

chrome.tabs.onUpdated.addListener(onUrlChanged);