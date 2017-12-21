var homeFunctions = {
    slider: function () {
        $('.fade').slick({
            /*autoplay: true,
            autoplaySpeed: 5000,*/
            dots: false,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'
        });
    },
    arrowsStyle: function () {
        $('.slick-arrow').text('');
        $('.slick-prev').html('<i class="arrow fa fa-chevron-left" aria-hidden="true"></i>');
        $('.slick-next').html('<i class="arrow fa fa-chevron-right" aria-hidden="true"></i>');
    },
    homeRender: function () {
        this.slider();
        this.arrowsStyle();
    }
};

