var modalWrap = '.modal-wrap';

var galleryFunctions = {
    showModalImg: function() {
        $('.gallery-products').on('click', function(e) {
            if(e.target.parentElement.className === 'gallery-product') {
                $(modalWrap).css('display', 'flex');
                $('.modal-product__img').attr('src', e.target.currentSrc || e.target.src);
            }
        })
    },
    closeModalImg: function() {
        $('.modal-product__icon-cancel').on('click', function() {
            $(modalWrap).hide();
        });

        $(document).mouseup(function (e) {
            if ($(modalWrap).has(e.target).length === 0){
                $(modalWrap).hide();
            }
        });
    },
    renderModalImg: function() {
        galleryFunctions.showModalImg();
        galleryFunctions.closeModalImg();
    }


};