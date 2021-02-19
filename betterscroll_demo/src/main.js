import BScroll from 'better-scroll';

new BScroll('.img-c', {
  scrollY: true,
  click: true,
  bounce: false,
  preventDefaultException: { tagName: /^(IMG|INPUT|TEXTAREA|BUTTON|SELECT)$/ }
})