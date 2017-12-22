(function () {
    'use strict';

    var content = '#content',
        locationObj = window.location.href;


    header.innerHTML = MyApp.templates.header();
    footer.innerHTML = MyApp.templates.footer();
    home.innerHTML = MyApp.templates.home();


    headerFunctions.headerRender();
    homeFunctions.homeRender();


    var mainFunctions = {
        renderPage: function(tag, template) {
            $(content).children().empty();
            tag.innerHTML = template();
        },
        pageNavigation: function() {

            $('.navigation, .footer-navigation, .main-header__logo').click(function (event) {

                var pageId = event.target.id;

                switch (pageId) {
                    case 'home-link':
                    case 'logo-link':
                        mainFunctions.renderPage(home, MyApp.templates.home);
                        homeFunctions.homeRender();
                        locationObj = '#';
                        break;
                    case 'menu-link':
                        mainFunctions.renderPage(menu, MyApp.templates.menu);
                        locationObj = '#menu';
                        break;
                    case 'reservation-link':
                        mainFunctions.renderPage(reservation, MyApp.templates.reservation);
                        locationObj = '#reservation';
                        break;
                    case 'gallery-link':
                        mainFunctions.renderPage(gallery, MyApp.templates.gallery);
                        locationObj = '#gallery';
                        break;
                    case 'contacts-link':
                        mainFunctions.renderPage(contacts, MyApp.templates.contacts);
                        locationObj = '#contacts';
                        break;
                }
            });
        }
    };

    mainFunctions.pageNavigation();

})();
