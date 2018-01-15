var schemeTables = '.scheme-tables',
    tableNumberInput = '#table-number',
    formSelect = '.form-select',
    formSelectList = '.form-select-list',
    formSelectListFrom = '.form-select-list-from',
    formSelectListTo = '.form-select-list-to',
    formButton = '.form-reservation__button',
    validName = '#valid-name',
    validPhone = '#valid-phone',
    validTableNumber = '#valid-table-number',
    formInput = '.form-reservation__input',
    successSubmit = '.form-reservation__text',
    tablesItem = '.scheme-tables__item';

var reservationFunctions = {
    showFormList: function () {
        $(formSelect).click(function () {

            if ($(this).hasClass('form-select-from')) {
                $(formSelectListTo).fadeOut();
                $(formSelectListFrom).fadeToggle();
            } else {
                $(formSelectListFrom).fadeOut();
                $(formSelectListTo).fadeToggle();
            }

        });

        $(document).mouseup(function (e) {
            if ($(formSelect).has(e.target).length === 0) {
                $(formSelectList).fadeOut();
            }
        });
    },
    selectOptionList: function () {

        $(formSelectList).click(function (e) {
            var optionValue = '';

            if(!$('.form-select-list li').hasClass('disabled-time')) {
                if ($(e.target.parentElement).hasClass('form-select-list-from')) {
                    $(successSubmit).hide();
                    $(formSelectList).fadeOut();
                    optionValue = e.target.innerText;
                    $('.form-select__text-from').text(optionValue);
                    $('.form-select-from').removeClass('border');
                } else {
                    $(successSubmit).hide();
                    $(formSelectList).fadeOut();
                    optionValue = e.target.innerText;
                    $('.form-select__text-to').text(optionValue);
                    $('.form-select-to').removeClass('border');
                }
            }

        });
    },
    numberTransfer: function () {
        $(schemeTables).on('click', function (e) {
            $(successSubmit).hide();
            $(validTableNumber).hide();
            $(tableNumberInput).removeClass('border');

            if ($(e.target).hasClass('scheme-tables__item') && !$(e.target).hasClass('booked-table')) {
                var dataIdNum = +$(e.target).attr('data-id');
                $(tableNumberInput).val(dataIdNum);
            }

            if (e.target.tagName !== "IMG" && $(e.target).attr('data-times').length > 0) {
                var timesArray = JSON.parse($(e.target).attr('data-times'));

                $('.form-select-list__item').removeClass('disabled-time');

                $('.form-select-list-from li').each(function(index, item) {
                    var itemFrom = parseInt($(item).text());

                    timesArray.forEach(function (timesArrayElem) {
                            for (var i = timesArrayElem.timeFrom; i < timesArrayElem.timeTo; i++) {
                                if(itemFrom === i) {
                                    $(item).addClass('disabled-time');
                                }
                            }
                    });
                });

                $('.form-select-list-to li').each(function(index, item) {
                    var itemTo = parseInt($(item).text());

                    timesArray.forEach(function (timesArrayElem) {

                        for (var i = timesArrayElem.timeFrom + 1; i <= timesArrayElem.timeTo; i++) {
                            if(itemTo === i) {
                                $(item).addClass('disabled-time');
                            }
                        }

                    });
                });
            }
        });
    },
    validation: function () {
        $(formInput).keyup(function (e) {

            $(successSubmit).hide();
            var optionInput = e.target.id;

            switch (optionInput) {
                case 'first-name':
                    if ($(this).val() !== '') {
                        var patternName = /^[A-Za-z]{1,50}$/;

                        if (!patternName.test($(this).val())) {
                            $(this).addClass('border');
                            $(validName).text('You can use latin letters only!').show();
                        } else {
                            $(this).removeClass('border');
                            $(validName).hide();
                        }
                    }
                    break;
                case 'phone-number':
                    if ($(this).val() !== '') {
                        var patternPhone = /^\d{3}[\-]\d{3}[\-]\d{4}$/;

                        if (!patternPhone.test($(this).val())) {
                            $(this).addClass('border');
                            $(validPhone).text('Enter the phone number as in the example!').show();
                        } else {
                            $(this).removeClass('border');
                            $(validPhone).hide();
                        }
                    }
                    break;
            }
        });
    },
    getBookedTables: function () {
        $.get('/tables.json', function (response) {

            $(tablesItem).each(function (index, tableItem) {
                var bookedTables = response.filter(function (item) {
                    return item.tablesNumber === +$(tableItem).attr('data-id');
                });

                if (bookedTables[0].booking !== false && bookedTables[0].booking.length !== 0) {
                    $(tableItem).attr('data-times', JSON.stringify(bookedTables[0].booking));
                } else {
                    $(tableItem).addClass('booked-table');
                }
            });
        });
    },
    sendData: function () {
        $(formButton).on('click', function (e) {
            e.preventDefault();

            if ($('#first-name').val() === '') {
                $(formInput).addClass('border');
                $(validName).text('Please, enter your name!').show();
            }
            if ($('#phone-number').val() === '') {
                $(formInput).addClass('border');
                $(validPhone).text('Please, enter your phone number!').show();
            }
            if ($(tableNumberInput).val() === '') {
                $(tableNumberInput).addClass('border');
                $(validTableNumber).text('Click on the table you want to book on the picture!').show();
                reservationFunctions.numberTransfer();
            }
            if ($('.form-select__text-from').text() === 'none' || $('.form-select__text-to').text() === 'none') {
                $(formSelect).addClass('border');
            }

            if ($(formInput).val() !== '' && $(tableNumberInput).val() !== '' && $('.form-select__text').text() !== 'none') {
                $(successSubmit).fadeIn();
            }
        })
    },
    renderReservation: function () {
        reservationFunctions.getBookedTables();
        reservationFunctions.showFormList();
        reservationFunctions.selectOptionList();
        reservationFunctions.numberTransfer();
        reservationFunctions.validation();
        reservationFunctions.sendData();
    }
};