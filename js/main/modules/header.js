var iconMenu = '.main-header__icon-menu',
    iconCancelMenu = '.navigation__icon-cancel',
    navigation = '.navigation',
    navItem = '.navigation-item',
    insideMenu = '.inside-menu',
    mainHeader = '.main-header',
    insideMenuLink = '.inside-menu__link';


var headerFunctions = {

    resize: function () {
        if (document.documentElement.clientWidth >= 768) {
            $(navigation).css('display', 'flex');
        } else {
            $(navigation).css('display', 'none');
        }
    },
    showMenu: function () {
        $('body').append($(navigation));
        $(navigation).fadeIn().css('display', 'flex');
    },
    closeMenu: function (e) {
        if ($(this).children('.inside-menu').length === 0) {
            $(insideMenu).hide();
            if (document.documentElement.clientWidth >= 768 && $(this).has(e)) {
                $(navigation).css('display', 'flex');
            }else {
                $(navigation).fadeOut(function () {
                    $(mainHeader).after($(navigation));
                });
            }
        }else {
            headerFunctions.showInsideMenu();
            $(insideMenuLink).click(function() {
                if (document.documentElement.clientWidth >= 768 && $(this).has(e)) {
                    $(navigation).css('display', 'flex');
                }else {
                    $(navigation).fadeOut(function () {
                        $(mainHeader).after($(navigation));
                    });
                }
            })
        }

    },
    showInsideMenu: function () {
        $(insideMenu).fadeToggle(250);
    },
    closeInsideMenu: function() {
        $(document).mouseup(function (e) {
            if ($(navigation).has(e.target).length === 0) {
                $(insideMenu).fadeOut();
            }
        });
    },
    headerRender: function () {
        $(window).resize(headerFunctions.resize);
        $(iconMenu).click(headerFunctions.showMenu);
        $(iconCancelMenu).click(headerFunctions.closeMenu);
        $(navItem).click(headerFunctions.closeMenu);
        headerFunctions.closeInsideMenu();
    }
};

