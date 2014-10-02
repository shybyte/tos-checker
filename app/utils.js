function createRegExpForServiceUrl(serviceUrl) {
  if (/^http/.exec(serviceUrl)) {
    return new RegExp(serviceUrl + '.*');
  } else {
    return new RegExp('https?://[^:/]*\\b' + serviceUrl + '.*');
  }
}