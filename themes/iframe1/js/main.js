$(function () {
    'use strict';
    var $home         = $("#home"),   // Cached Id Form Homepage
        $about        = $("#about"), // Cached Id Form Homepage
        $container    = $("#home .container"), // Cached Id Form Container In Homepage
        $height       = $(window).height(), // Calc Height For Window
        $pad          = $height / 3, // padding of container home page.
        $padPhon      = $height / 3.3, // padding of container home page.
        $padPhonrate  = $height / 5.5, // padding of container home page.                
        $navscroll    = $height / 1.2, // when scroll Change navbar To Black 
        $width        = $(window).width(), // width for window
        $navId        = $("#nav"), // Cached Id Form Nav 
        $buttonTop    = $("#top-button"),
        $licknavbar   = $("#navbar li a"),// Cached Id Form Button Top 
        $navbarToggle = $(".navbar-toggle"),// Cached Id Form Navbar Toggle
        $NavLink      = $(".nav a"), // Cached Class Link .
        $navbarBrand  = $(".navbar-brand"),
        $iconBar      = $(".icon-bar"),
        $simplefilter  = $('.simplefilter li'),
        $navbarNav    = $(".navbar-nav");
    /*
     *-----------------------------------------------
     *         Height & Padding TopFor Home Page
     *-----------------------------------------------
     */
    // padding container 
    $container.css("padding-top", $pad);
    // when width < 700 -> height auto
    if ($width < 700) {
        
        // padding container 
        $container.css("padding-top", $padPhon);
    }
    // Rotation In Mobile 
    if ($height < 200) {
        // padding container 
        $container.css("padding-top", $padPhonrate);
    }
    /*
     *-----------------------------------------------
     *   On Scroll Home Page Change navbar To Black
     *-----------------------------------------------
     */
    $(window).on("scroll", function () {
        var scroll =  $(window).scrollTop();
        if (scroll > 300) {
            $navId.hide();
        } else {
            $navId.show();
        }
        if (scroll > $navscroll) {
            $navId.addClass("navscroll");
            $navId.show();
            $licknavbar.addClass("color-link");
            $navbarBrand.css("color", "#333");
            $navbarToggle.css("border-color", "#333");
            $iconBar.css("background-color", "#333");
        } else {
            $navId.removeClass("navscroll");
            $licknavbar.removeClass("color-link");
            $navbarBrand.css("color", "#fff");
            $navbarToggle.css("border-color", "#fff");
            $iconBar.css("background-color", "#fff");
        }
        // in mobile nav bar Change
        if ($width <= 767 && scroll > $navscroll) {
            $navbarNav.css("background-color", "#fff");
        }
        if ($width <= 767 && scroll < $navscroll) {
            $navbarNav.css("background-color", "#333");
        } else {
            $navbarNav.css("background-color", "transparent");
        }
        // when scroll to service Nav Take padding,
        if (scroll >= $navscroll / 0.5) {
            $navId.addClass("padding-nav");
        } else {
            $navId.removeClass("padding-nav");
        }
        
        // On Scroll Show Icon To Top
        if (scroll > 500) {
            $buttonTop.show();
        } else {
            $buttonTop.hide();
        }
        
    }); // Close Scroll Function 
})