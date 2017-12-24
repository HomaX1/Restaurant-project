(function () {
    'use strict';

    var content = '#content',
        arrayProducts =[],
        locationObj = window.location.href;


    header.innerHTML = MyApp.templates.header();
    footer.innerHTML = MyApp.templates.footer();
    home.innerHTML = MyApp.templates.home();


    headerFunctions.headerRender();
    homeFunctions.homeRender();


    var mainFunctions = {
        renderPage: function(tag, template, resp) {
            $(content).children().empty();
            if(resp) {
                tag.innerHTML = template({menu: resp});
            }else {
                tag.innerHTML = template();
            }
        },
        pageNavigation: function() {

            $('.navigation, .footer-navigation, .main-header__logo, .menu-icons').click(function (event) {

                var pageId = event.target.id;

                switch (pageId) {
                    case 'home-link':
                    case 'logo-link':
                        mainFunctions.renderPage(home, MyApp.templates.home);
                        homeFunctions.homeRender();
                        locationObj = '#';
                        break;
                    case 'all-link':
                    case 'menu-link':
                        $.get('/menu.json', function (resp) {
                            arrayProducts = resp;
                            mainFunctions.renderPage(menu, MyApp.templates.menu, resp);
                            locationObj = '#menu';
                        });
                        break;
                    case 'dishes-link':
                        mainFunctions.renderPage(reservation, MyApp.templates.menu, arrayProducts);
                        locationObj = '#menu/dishes';
                        break;
                    case 'soups-link':
                        mainFunctions.renderPage(reservation, MyApp.templates.menu, arrayProducts);
                        locationObj = '#menu/soups';
                        break;
                    case 'salads-link':
                        mainFunctions.renderPage(reservation, MyApp.templates.menu, arrayProducts);
                        locationObj = '#menu/salads';
                        break;
                    case 'desserts-link':
                        mainFunctions.renderPage(reservation, MyApp.templates.menu, arrayProducts);
                        locationObj = '#menu/desserts';
                        break;
                    case 'beverages-link':
                        mainFunctions.renderPage(reservation, MyApp.templates.menu, arrayProducts);
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
            });
        }
    };

    mainFunctions.pageNavigation();

})();
