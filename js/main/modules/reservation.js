var tableNumberInput = '#table-number',
    formSelect = '.form-select',
    selectFrom = '.form-select-from',
    selectTo = '.form-select-to',
    formSelectList = '.form-select-list',
    formSelectListFrom = '.form-select-list-from',
    formSelectListTo = '.form-select-list-to',
    validName = '#valid-name',
    validPhone = '#valid-phone',
    validTableNumber = '#valid-table-number',
    formInput = '.form-reservation__input',
    successSubmit = '.form-reservation__text',
    selectTextFrom = '.form-select__text-from',
    selectTextTo = '.form-select__text-to',
    firstName = '#first-name',
    phoneNumber = '#phone-number';

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

            if (!$(e.target).hasClass('disabled-time')) {
                if ($(e.target.parentElement).hasClass('form-select-list-from')) {
                    $(successSubmit).hide();
                    $(formSelectList).fadeOut();
                    optionValue = e.target.innerText;
                    $(selectTextFrom).text(optionValue);
                    $(selectFrom).removeClass('border');
                } else {
                    $(successSubmit).hide();
                    $(formSelectList).fadeOut();
                    optionValue = e.target.innerText;
                    $(selectTextTo).text(optionValue);
                    $(selectTo).removeClass('border');
                }
            }

        });
    },
    numberTransfer: function () {
        $('.scheme-tables').on('click', function (e) {
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

                $('.form-select-list-from li').each(function (index, item) {
                    var itemFrom = parseInt($(item).text());

                    timesArray.forEach(function (timesArrayElem) {
                        for (var i = timesArrayElem.timeFrom; i < timesArrayElem.timeTo; i++) {
                            if (itemFrom === i) {
                                $(item).addClass('disabled-time');
                            }
                        }
                    });
                });

                $('.form-select-list-to li').each(function (index, item) {
                    var itemTo = parseInt($(item).text());

                    timesArray.forEach(function (timesArrayElem) {

                        for (var i = timesArrayElem.timeFrom + 1; i <= timesArrayElem.timeTo; i++) {
                            if (itemTo === i) {
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

            $('.scheme-tables__item').each(function (index, tableItem) {
                var bookedTables = response.filter(function (item) {
                    return item.tableNumber === +$(tableItem).attr('data-id');
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
        $('.form-reservation__button').on('click', function (e) {
            e.preventDefault();

            if ($(firstName).val() === '') {
                $(firstName).addClass('border');
                $(validName).text('Please, enter your name!').show();
            }
            if ($(phoneNumber).val() === '') {
                $(phoneNumber).addClass('border');
                $(validPhone).text('Please, enter your phone number!').show();
            }
            if ($(tableNumberInput).val() === '') {
                $(tableNumberInput).addClass('border');
                $(validTableNumber).text('Click on the table you want to book on the picture!').show();
                reservationFunctions.numberTransfer();
            }
            if ($(selectTextFrom).text() === 'none') {
                $(selectFrom).addClass('border');
            }
            if ($(selectTextTo).text() === 'none') {
                $(selectTo).addClass('border');
            }
            if ($(formInput).val() !== '' && $(tableNumberInput).val() !== '' && $(selectTextFrom).text() !== 'none' && $(selectTextTo).text() !== 'none') {
                $(successSubmit).fadeIn();

                var successReservation = {
                    firstName: $(firstName).val(),
                    phoneNumber: $(phoneNumber).val(),
                    tableNumber: $(tableNumberInput).val(),
                    timeFrom: $(selectTextFrom).text(),
                    timeTo: $(selectTextTo).text()
                };

                console.log(successReservation);
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