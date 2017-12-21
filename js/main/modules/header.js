var iconMenu = '.main-header__icon-menu',
    iconCancelMenu = '.navigation__icon-cancel',
    navigation = '.navigation',
    navItem = '.navigation-item',
    insideMenu = '.inside-menu',
    mainHeader = '.main-header';


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
    closeMenu: function () {
        $(insideMenu).hide();
        $(navigation).fadeOut(function () {
            $(mainHeader).after($(navigation));
        });
    },
    showInsideMenu: function () {
        if ($(this).children('.inside-menu').length === 0) {
            $(insideMenu).hide();
        } else {
            $(insideMenu).fadeToggle(250);
        }
    },
    headerRender: function () {
        $(window).resize(headerFunctions.resize);
        $(iconMenu).click(headerFunctions.showMenu);
        $(iconCancelMenu).click(headerFunctions.closeMenu);
        $(navItem).click(headerFunctions.showInsideMenu);
    }
};

