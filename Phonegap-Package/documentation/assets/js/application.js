// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!(function ($) {
  $(function () {
    var $window = $(window)
    var $body = $(document.body)

    var navHeight = $('.navbar').outerHeight(true) + 10

    $body.scrollspy({
      target: '.bs-sidebar',
      offset: navHeight,
    })

    $window.on('load', function () {
      $body.scrollspy('refresh')
    })

    $('.bs-docs-container [href=#]').click(function (e) {
      e.preventDefault()
    })

    // back to top
    setTimeout(function () {
      var $sideBar = $('.bs-sidebar')

      $sideBar.affix({
        offset: {
          top: function () {
            var offsetTop = $sideBar.offset().top
            var sideBarMargin = parseInt(
              $sideBar.children(0).css('margin-top'),
              10,
            )
            var navOuterHeight = $('.bs-docs-nav').height()

            return (this.top = offsetTop - navOuterHeight - sideBarMargin)
          },
          bottom: function () {
            return (this.bottom = $('.bs-footer').outerHeight(true))
          },
        },
      })
    }, 100)

    setTimeout(function () {
      $('.bs-top').affix()
    }, 100)

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: '[data-toggle=tooltip]',
      container: 'body',
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    $('.bs-docs-navbar').tooltip({
      selector: 'a[data-toggle=tooltip]',
      container: '.bs-docs-navbar .nav',
    })

    // popover demo
    $('[data-toggle=popover]').popover()

    // button state demo
    $('#fat-btn').click(function () {
      var btn = $(this)
      btn.button('loading')
      setTimeout(function () {
        btn.button('reset')
      }, 3000)
    })

    // carousel demo
    $('.bs-docs-carousel-example').carousel()

    $(window).scroll(function () {
      let scrarea = $('.bs-sidebar.affix')
      if (scrarea.length > 0) {
        let height = scrarea.height()
        //let innerheight = $('.bs-sidenav').height() + 20
        let distance =
          $('.bs-sidenav .active').offset().top -
          $('.bs-sidenav li:first').offset().top +
          100

        //console.log(height + ' ' + distance + ' ' + innerheight)
        if (distance >= height) {
          scrarea.scrollTop(height)
        } else {
          scrarea.scrollTop(0)
        }
      }
    })
  })
})(window.jQuery)
