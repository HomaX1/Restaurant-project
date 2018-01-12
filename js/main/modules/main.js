(function () {
    'use strict';

    var content = '#content',
        pageLink = '',
        locationObj = window.location.href,
        menuPage = '.menu-page',
        allMenuId = '#all-menu';


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

            if (pageLink === 'menu-link') {
                $('.menu-icons__link_all').addClass('activeCategory');
            } else {
                $('.menu-icons__link' + '_' + pageLink).addClass('activeCategory');
            }

            menuFunctions.listShow(filterResp, pageLink);
        },
        pageNavigation: function () {

            $('body').on('click', '.navigation, .footer-navigation, .main-header__logo, .menu-icons, .info-buttons', (function (event) {

                var pageId = event.target.dataset.id;
                $('.navigation-item__link').removeClass('active-page-link');

                switch (pageId) {
                    case 'home-link':
                    case 'logo-link':
                        mainFunctions.renderPage(home, MyApp.templates.home);
                        $('.home-page').addClass('active-page-link');
                        homeFunctions.homeRender();
                        locationObj = '#';
                        break;
                    case 'menu-link':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        $(menuPage).addClass('active-page-link');
                        $(allMenuId).addClass('active-page-link');
                        locationObj = '#menu';
                        break;
                    case 'dishes':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        $(menuPage).addClass('active-page-link');
                        $(allMenuId).addClass('active-page-link');
                        locationObj = '#menu/dishes';
                        break;
                    case 'soups':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        $(menuPage).addClass('active-page-link');
                        $(allMenuId).addClass('active-page-link');
                        locationObj = '#menu/soups';
                        break;
                    case 'salads':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        $(menuPage).addClass('active-page-link');
                        $(allMenuId).addClass('active-page-link');
                        locationObj = '#menu/salads';
                        break;
                    case 'desserts':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        $(menuPage).addClass('active-page-link');
                        $(allMenuId).addClass('active-page-link');
                        locationObj = '#menu/desserts';
                        break;
                    case 'beverages':
                        $.get('/menu.json', mainFunctions.createMenu.bind(pageId));
                        $(menuPage).addClass('active-page-link');
                        $(allMenuId).addClass('active-page-link');
                        locationObj = '#menu/beverages';
                        break;
                    case 'reservation-link':
                        mainFunctions.renderPage(reservation, MyApp.templates.reservation);
                        $('.reservation-page').addClass('active-page-link');
                        locationObj = '#reservation';
                        reservationFunctions.renderReservation();
                        break;
                    case 'gallery-link':
                        $.get('/menu.json', function (resp) {
                            mainFunctions.renderPage(gallery, MyApp.templates.gallery, resp);
                            galleryFunctions.renderModalImg();
                        });
                        $('.gallery-page').addClass('active-page-link');
                        locationObj = '#gallery';
                        break;
                    case 'contacts-link':
                        mainFunctions.renderPage(contacts, MyApp.templates.contacts);
                        $('.contacts-page').addClass('active-page-link');
                        locationObj = '#contacts';
                        break;
                }
            }));
        }
    };
    mainFunctions.pageNavigation();


})();
