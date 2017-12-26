(function () {
    'use strict';

    var content = '#content',
        pageLink = '',
        locationObj = window.location.href;


    header.innerHTML = MyApp.templates.header();
    footer.innerHTML = MyApp.templates.footer();
    home.innerHTML = MyApp.templates.home();


    headerFunctions.headerRender();
    homeFunctions.homeRender();


    var mainFunctions = {
        renderPage: function (tag, template, resp) {
            $(content).children().empty();
            if (resp) {
                tag.innerHTML = template({menu: resp});
            } else {
                tag.innerHTML = template();
            }
        },
        createMenu: function (resp) {
            pageLink = this;

            var filterResp = resp.filter(function (respElem) {
                if (respElem.category === pageLink) {
                    return respElem;
                } else if (pageLink === 'menu-link') {
                    return respElem;
                }
            });
            mainFunctions.renderPage(menu, MyApp.templates.menu, filterResp);

        },
        pageNavigation: function () {

            $('body').on('click', '.navigation, .footer-navigation, .main-header__logo, .menu-icons', (function (event) {

                var pageId = event.target.id;

                switch (pageId) {
                    case 'home-link':
                    case 'logo-link':
                        mainFunctions.renderPage(home, MyApp.templates.home);
                        homeFunctions.homeRender();
                        locationObj = '#';
                        break;
                    case 'menu-link':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        locationObj = '#menu';
                        break;
                    case 'dishes':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        locationObj = '#menu/dishes';
                        break;
                    case 'soups':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        locationObj = '#menu/soups';
                        break;
                    case 'salads':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        locationObj = '#menu/salads';
                        break;
                    case 'desserts':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        locationObj = '#menu/desserts';
                        break;
                    case 'beverages':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        locationObj = '#menu/beverages';
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
            }));
        }
    };

    mainFunctions.pageNavigation();

})();
