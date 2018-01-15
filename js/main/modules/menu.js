var sortInfo = '.sorts-info',
    sortText = '.sorts-info__text',
    sortList = '.sorts-list';

var menuFunctions = {

    listShow: function (filterResp) {
        $(sortInfo).click(function () {
            $(sortList).fadeToggle();
        });
        menuFunctions.selectOption(filterResp);
    },
    selectOption: function (filterResp) {

        $(sortList).click(function (e) {
            $(sortList).fadeOut();

            var optionText = $(e.target).text();

            switch (optionText) {
                case 'from cheap to expensive':
                    filterResp.sort(menuFunctions.increaseSort);
                    menu.innerHTML = MyApp.templates.menu({menu: filterResp});
                    $(sortText).text(optionText);
                    menuFunctions.listShow(filterResp);
                    break;
                case 'from expensive to cheap':
                    filterResp.sort(menuFunctions.decreaseSort);
                    menu.innerHTML = MyApp.templates.menu({menu: filterResp});
                    $(sortText).text(optionText);
                    menuFunctions.listShow(filterResp);
                    break;
            }
        });

        $('body').mouseup(function (e) {
            if ($('.sorts').has(e.target).length === 0) {
                $(sortList).fadeOut();
            }
        });
    },
    increaseSort: function (a, b) {
        var priceA = parseFloat(a.price);
        var priceB = parseFloat(b.price);

        if (priceA > priceB) return 1;
        if (priceA < priceB) return -1;
    },
    decreaseSort: function (a, b) {
        var priceA = parseFloat(a.price);
        var priceB = parseFloat(b.price);

        if (priceA > priceB) return -1;
        if (priceA < priceB) return 1;
    }

};
