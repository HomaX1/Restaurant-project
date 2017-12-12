this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["footer"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<footer>\r\n    super footer\r\n</footer>";
},"useData":true});
this["MyApp"]["templates"]["header"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<a class=\"header-link\" href=\"#\">\r\n    <img class=\"header-link__logo\" src=\"#\" alt=\"Logo\">\r\n</a>\r\n<nav class=\"footer-nav\">\r\n    <a class=\"footer-nav__item\" href=\"#\">menu</a>\r\n    <a class=\"footer-nav__item\" href=\"#\">reservations</a>\r\n    <a class=\"footer-nav__item\" href=\"#\">gallery</a>\r\n    <a class=\"footer-nav__item\" href=\"#\">about us</a>\r\n    <a class=\"footer-nav__item\" href=\"#\">Twitter</a>\r\n</nav>\r\n<form class=\"search\" action=\"#\" method=\"get\">\r\n    <button class=\"search__icon\" type=\"button\"></button>\r\n    <input class=\"search__input\" type=\"text\" name=\"search\" placeholder=\"Search\">\r\n</form>\r\n";
},"useData":true});