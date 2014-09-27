this["templates"] = this["templates"] || {};

Handlebars.registerPartial("popup", this["templates"]["popup"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                Class ";
  if (helper = helpers['class']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['class']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n                No Class Yet\n            ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <li class=\"point\">\n                    <div class=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tosdr)),stack1 == null || stack1 === false ? stack1 : stack1.point)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                        <h5>\n                            <span class=\"badge ";
  if (helper = helpers.badge) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.badge); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" title=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tosdr)),stack1 == null || stack1 === false ? stack1 : stack1.point)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><i\n                                    class=\"icon-";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " icon-white\">";
  if (helper = helpers.sign) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sign); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i></span>\n                            ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                            <a href=\"";
  if (helper = helpers.discussion) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.discussion); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\" class=\"label context\">Discussion</a>\n                        </h5>\n\n                        <p>";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.tosdr)),stack1 == null || stack1 === false ? stack1 : stack1.tldr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n\n                    </div>\n                </li>\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section>\n            <h4>Read the Terms</h4>\n            <ul class=\"tosback2\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.linkList), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n        </section>\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <li><a target=\"_blank\" href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n                ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\n    <h3>\n        <a href=\"http://tosdr.org/#";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">\n            <img src=\"images/tosdr-logo-32.png\" alt=\"\" class=\"pull-left\"/>\n        </a>\n        <button id=\"closeButton\" data-dismiss=\"modal\" class=\"close pull-right\" type=\"button\">×</button>\n    </h3>\n</div>\n\n<div class=\"modal-body\">\n\n    <div class=\"tosdr-rating\">\n        <label class=\"label ";
  if (helper = helpers['class']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['class']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['class']), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </label>\n\n        <p>";
  if (helper = helpers.ratingText) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ratingText); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n    </div>\n\n    <section class=\"specificissues\">\n        <ul class=\"tosdr-points\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.dataPoints), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        </ul>\n    </section>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.linkList), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <a target=\"_blank\" href=\"https://tosdr.org/get-involved.html\">Get Involved!</a>\n</div>";
  return buffer;
  }));