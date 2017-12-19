$(function () {

    'use strict';

    var iconMenu = $('.main-header__icon-menu'),
        iconCancelMenu = $('.navigation__icon-cancel'),
        navigation = $('.navigation'),
        navItem = $('.navigation-item'),
        insideMenu = $('.inside-menu'),
        mainHeader = $('.main-header'),
        header = $('.header');


    $(window).resize(function(){
        if (document.documentElement.clientWidth >= 768) {
            header.css('position', 'absolute');
            navigation.css('display', 'flex');
        }else {
            header.css('position', 'static');
            navigation.css('display', 'none');
        }
    });

    var showMenu = function () {
        $('body').append(navigation);
        navigation.fadeIn().css('display', 'flex');
    };

    var closeMenu = function () {
        insideMenu.hide();
        navigation.fadeOut(function () {
            mainHeader.after(navigation);
        });
    };

    var showInsideMenu = function () {
        if($(this).children('.inside-menu').length === 0) {
            insideMenu.hide();
        }else {
            insideMenu.fadeToggle(250);
        }
    };

    iconMenu.click(showMenu);
    iconCancelMenu.click(closeMenu);
    navItem.click(showInsideMenu);

});
