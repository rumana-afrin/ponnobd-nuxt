!(function (e) {
  'use strict'
  e(document).ready(function () {
    e('.odometer').length &&
      e('.odometer').each(function () {
        e(this).appear(function () {
          var o = e(this).attr('data-count')
          e(this).html(o)
        })
      }),
      e('.has-dropdown > a').click(function (o) {
        o.preventDefault()
        var t = e(this).next('.sidebar-submenu'),
          s = e(this).parent()
        'block' === t.css('display')
          ? (t.slideUp(200), s.removeClass('active'))
          : (e('.sidebar-submenu').not(t).slideUp(200),
            e('.has-dropdown.active').removeClass('active'),
            s.addClass('active'),
            t.slideDown(200))
      }),
      e('.dashboard-body__bar-icon').on('click', function () {
        e('.sidebar-menu').addClass('show-sidebar'),
          e('.sidebar-overlay').addClass('show')
      }),
      e('.sidebar-menu__close, .sidebar-overlay').on('click', function () {
        e('.sidebar-menu').removeClass('show-sidebar'),
          e('.sidebar-overlay').removeClass('show')
      }),
      e('.counterup-item').each(function () {
        e(this).isInViewport(function (e) {
          if ('entered' === e)
            for (
              var o = 0;
              o < document.querySelectorAll('.odometer').length;
              o++
            ) {
              var t = document.querySelectorAll('.odometer')[o]
              t.innerHTML = t.getAttribute('data-odometer-final')
            }
        })
      }),
      e('.add').on('click', function () {
        e(this).prev().val() < 999 &&
          e(this)
            .prev()
            .val(+e(this).prev().val() + 1)
      }),
      e('.sub').on('click', function () {
        e(this).next().val() > 1 &&
          e(this).next().val() > 1 &&
          e(this)
            .next()
            .val(+e(this).next().val() - 1)
      })
  }),
    e(document).ready(function () {
      e('.sub-menu, .inner-menu').hide(),
        e('.menu-item').hover(
          function () {
            const o = e(this).attr('id').split('-')[2]
            e(`#sub-menu-${o}`).stop(!0, !0).slideDown(300)
          },
          function () {
            const o = e(this).attr('id').split('-')[2]
            e(`#sub-menu-${o}`).stop(!0, !0).slideUp(300)
          }
        ),
        e('.sub-menu-item').hover(
          function () {
            const o = e(this).closest('.sub-menu').attr('id').split('-')[2],
              t = e(this).attr('id').split('-')[2]
            e(`#inner-menu-${o}-${t}`).stop(!0, !0).slideDown(300)
          },
          function () {
            const o = e(this).closest('.sub-menu').attr('id').split('-')[2],
              t = e(this).attr('id').split('-')[2]
            e(`#inner-menu-${o}-${t}`).stop(!0, !0).slideUp(300)
          }
        ),
        e('.sub-menu').hover(
          function () {
            e(this).stop(!0, !0).show()
          },
          function () {
            e(this).stop(!0, !0).slideUp(300)
          }
        ),
        e('.inner-menu').hover(
          function () {
            e(this).stop(!0, !0).show()
          },
          function () {
            e(this).stop(!0, !0).slideUp(300)
          }
        )
    }),
    e(window).on('scroll', function () {
      e(window).scrollTop() >= 60
        ? e('.header').addClass('fixed-header')
        : e('.header').removeClass('fixed-header')
    })
  var o = e('.scroll-top')
  if (
    (e(window).scroll(function () {
      e(window).scrollTop() > 300 ? o.addClass('show') : o.removeClass('show')
    }),
    o.on('click', function (o) {
      o.preventDefault(), e('html, body').animate({ scrollTop: 0 }, '300')
    }),
    e('.sidebar-overlay, .close-hide-show').on('click', function () {
      e('.sidebar-menu-wrapper').removeClass('show'),
        e('.sidebar-overlay').removeClass('show')
    }),
    e('.scroll-top').length > 0)
  ) {
    var t = e('.scroll-top'),
      s = e('.scroll-top path'),
      n = s[0].getTotalLength()
    s.css({
      transition: 'none',
      strokeDasharray: n + ' ' + n,
      strokeDashoffset: n
    }),
      s[0].getBoundingClientRect(),
      s.css({ transition: 'stroke-dashoffset 10ms linear' })
    var a = function () {
      var o = e(window).scrollTop(),
        t = e(document).height() - e(window).height(),
        a = n - (o * n) / t
      s.css('strokeDashoffset', a)
    }
    a(),
      e(window).on('scroll', a),
      e(window).on('scroll', function () {
        e(this).scrollTop() > 50 ? t.addClass('show') : t.removeClass('show')
      }),
      t.on('click', function (o) {
        return (
          o.preventDefault(), e('html, body').animate({ scrollTop: 0 }, 800), !1
        )
      })
  }
  function i () {
    e(window).width() > 530 &&
      (e('.search--form').removeClass('search-form--active'),
      e('.logo-wrapper').removeClass('d-none'))
  }
  e(document).ready(function () {
    e('#accordionFlushExample .accordion-item').each(function () {
      var o = e(this)
      'true' === o.find('.accordion-button').attr('aria-expanded') &&
        o.addClass('active')
    }),
      e('#accordionFlushExample').on('shown.bs.collapse', function (o) {
        e(o.target).closest('.accordion-item').addClass('active')
      }),
      e('#accordionFlushExample').on('hidden.bs.collapse', function (o) {
        e(o.target).closest('.accordion-item').removeClass('active')
      })
  }),
    e('.search-toggle--btn').click(function () {
      e('.search--form').toggleClass('search-form--active'),
        e('.logo-wrapper').toggleClass('d-none')
    }),
    i(),
    e(window).resize(function () {
      i()
    }),
    e('.cart--btn,.request-link').on('click', function () {
      e('.cart-box').addClass('show-cart-box'),
        e('.sidebar-overlay').addClass('show')
    }),
    e('.close--btn, .sidebar-overlay').on('click', function () {
      e('.cart-box').removeClass('show-cart-box'),
        e('.sidebar-overlay').removeClass('show')
    }),
    e('.filter--btn').on('click', function () {
      e('.filter--box').addClass('show-cart-box'),
        e('.sidebar-overlay').addClass('show')
    }),
    e('.close--btn, .sidebar-overlay').on('click', function () {
      e('.filter--box').removeClass('show-cart-box'),
        e('.sidebar-overlay').removeClass('show')
    }),
    e('.note--btn').on('click', function () {
      e('.note--box').addClass('show-note--box')
    }),
    e('.coupon--btn').on('click', function () {
      e('.coupon--box').addClass('show-note--box')
    }),
    e('.cancel--btn').on('click', function () {
      e('.note--box,.coupon--box').removeClass('show-note--box')
    }),
    e('.filter-group').on('click', function () {
      e(this).toggleClass('show')
    }),
    e('.sub-menu-item').hover(function () {
      e('.sub-menu-item').removeClass('active'), e(this).addClass('active')
    })
})(jQuery)
const rangeInput = document.querySelectorAll('.range-input input')
;(priceInput = document.querySelectorAll('.price-input input')),
  (progress = document.querySelector('.sliderr .progresss'))
let priceGap = 100
rangeInput.forEach(e => {
  e.addEventListener('input', e => {
    let o = parseInt(rangeInput[0].value)
    ;(maxValue = parseInt(rangeInput[1].value)),
      maxValue - o < priceGap
        ? 'range-min' === e.target.className
          ? (rangeInput[0].value = maxValue - priceGap)
          : (rangeInput[1].value = o + priceGap)
        : ((priceInput[0].value = o),
          (priceInput[1].value = maxValue),
          (progress.style.left = (o / rangeInput[0].max) * 100 + '%'),
          (progress.style.right =
            100 - (maxValue / rangeInput[1].max) * 100 + '%')),
      rangeInput[0].max
  })
})
var mzOptions = { zoomWidth: '400', zoomHeight: '250' }
