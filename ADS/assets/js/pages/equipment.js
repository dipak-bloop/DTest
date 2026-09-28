if ($(window).width() > 991) {
    $(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
    $(".tabing-main .tab-titles li:first").addClass("active-li")
    $(".tabing-main .tab-titles li a").on("click", function (event) {
        event.preventDefault()
        $(".tabing-main .tab-titles li").removeClass("active-li")
        $(this).parent().addClass("active-li");
        $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
        $($(this).attr('href')).addClass("active");
    })
}

if ($(window).width() < 992) {
    $(".tab-content-main .mobile-tab-title").on("click", function (event) {
        event.preventDefault();
        $(".tabContent").not($(this).siblings(".tabContent")).stop().slideUp();
        if ($(this).parent(".tab-content-main").hasClass("activeTab")) {
            $(".tab-content-main").removeClass("activeTab")
            $(this).siblings(".tabContent").stop().slideUp();
        }
        else {
            $(".tab-content-main").removeClass("activeTab")
            $(this).parent(".tab-content-main").addClass("activeTab")
            $(this).siblings(".tabContent").stop().slideDown();
        }
    })
}
$(".tab-content-main:first-child .mobile-tab-title").trigger("click");