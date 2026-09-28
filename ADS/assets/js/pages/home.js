$(document).ready(function () {

    function easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
    }

    function countDecimals(val) {
        if (Math.floor(val) === val) return 0;
        return val.toString().split(".")[1].length || 0;
    }

    function formatNumber(val, decimals) {
        return val.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    function animateCount($el) {

        // Prevent multiple animations
        if ($el.hasClass("counted")) return;

        $el.addClass("counted");

        const end = parseFloat($el.data("countup-number").toString().replace(/,/g, ""));
        const decimals = countDecimals(end);

        const start = 0;
        const duration = 2500;
        let startTime = null;

        function step(timestamp) {

            if (!startTime) {
                startTime = timestamp;
            }

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutQuint(progress);

            const currentValue = Math.abs(
                easedProgress * (end - start) + start
            );

            $el.html(formatNumber(currentValue, decimals));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    function isInViewport(element) {
        const elementTop = element.offset().top;
        const elementBottom = elementTop + element.outerHeight();

        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function checkCountUp() {

        $('[data-countup-number]').each(function () {

            const $this = $(this);

            if (isInViewport($this)) {
                animateCount($this);
            }

        });

    }

    // Run on scroll
    $(window).on('scroll', function () {
        checkCountUp();
    });

    // Run on page load
    checkCountUp();

});