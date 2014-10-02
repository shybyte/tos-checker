function itShouldMatch(serviceUrl, pageUrl) {
  ok(createRegExpForServiceUrl(serviceUrl).exec(pageUrl), 'Service URL "' + serviceUrl +
    '" should match Page URL "' + pageUrl + '"'
  );
}

function itShouldNotMatch(serviceUrl, pageUrl) {
  ok(!createRegExpForServiceUrl(serviceUrl).exec(pageUrl), 'Service URL "' + serviceUrl +
    '" should not match Page URL "' + pageUrl + '"'
  );
}

test("service url matching", function () {

  itShouldMatch('icloud.com', 'https://www.icloud.com');
  itShouldMatch('icloud.com', 'http://www.icloud.com');
  itShouldMatch('icloud.com', 'http://www.icloud.com/blubber');
  itShouldMatch('icloud.com', 'http://my.icloud.com/blubber');
  itShouldMatch('icloud.com', 'http://my.icloud.com');
  itShouldMatch('icloud.com', 'http://icloud.com');

  itShouldNotMatch('icloud.com', 'http://www.jolicloud.com/');
  itShouldNotMatch('icloud.com', 'http://www.domaininfo.com/icloud.com');

  itShouldMatch('http://hypster.com', 'http://hypster.com');
  itShouldMatch('http://hypster.com', 'http://hypster.com/blubber');

});