(function () {
    'use strict';

    var content = '#content';

    /*,locationObj = document.location;
       var hash = window.location/!*.hash.substr(1)*!/;*
    /*console.log(hash.href);*/

    header.innerHTML = MyApp.templates.header();
    footer.innerHTML = MyApp.templates.footer();
    home.innerHTML = MyApp.templates.home();

    headerFunctions.headerRender();
    homeFunctions.homeRender();


    function renderPage(tag, template) {
        $(content).children().empty();
        tag.innerHTML = template();

        /*   window.location.hash = '#' + $(tag).attr('id');*/
    }

    function pageNavigation() {

        $('.navigation, .footer-navigation').click(function (event) {

            var pageId = event.target.id;

            switch (pageId) {
                case 'home-link':
                    renderPage(home, MyApp.templates.home);
                    homeFunctions.homeRender();
                    break;
                case 'menu-link':
                    renderPage(menu, MyApp.templates.menu);
                    break;
                case 'reservation-link':
                    renderPage(reservation, MyApp.templates.reservation);
                    break;
                case 'gallery-link':
                    renderPage(gallery, MyApp.templates.gallery);
                    break;
                case 'contacts-link':
                    renderPage(contacts, MyApp.templates.contacts);
                    break;
            }
        });
    }

    pageNavigation();

})();
