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
    successSubmit = '.form-reservation__text';

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
    },
    selectOptionList: function () {

        $(formSelectList).click(function (e) {
            var optionValue = '';

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
        });

        $(document).mouseup(function (e) {
            if ($(formSelect).has(e.target).length === 0) {
                $(formSelectList).fadeOut();
            }
        });
    },
    numberTransfer: function () {
        $(schemeTables).on('click', function (e) {
            var dataIdNum = +$(e.target).attr('data-id');

            if (typeof dataIdNum === 'number') {
                $(tableNumberInput).val(dataIdNum);
            }

            $(successSubmit).hide();
            $(validTableNumber).hide();
            $(tableNumberInput).removeClass('border');

        })
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
        reservationFunctions.showFormList();
        reservationFunctions.selectOptionList();
        reservationFunctions.numberTransfer();
        reservationFunctions.validation();
        reservationFunctions.sendData();
    }
};