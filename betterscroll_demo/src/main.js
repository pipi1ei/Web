import BScroll from 'better-scroll';
import html2canvas from 'html2canvas';

// new BScroll('.img-c', {
//   scrollY: true,
//   click: true,
//   bounce: false,
//   preventDefaultException: { tagName: /^(IMG|INPUT|TEXTAREA|BUTTON|SELECT)$/ }
// })

// document.querySelector('img').src = './demo.png';
// new BScroll('.img-c', {
//   scrollY: true,
//   click: true,
//   bounce: false,
//   preventDefaultException: { tagName: /^(IMG|INPUT|TEXTAREA|BUTTON|SELECT)$/ }
// })

// setTimeout(() => {
//   bscroll()
// }, 2000)

function bscroll() {
  console.log("ssss")
  new BScroll('.img-c', {
    scrollY: true,
    click: true,
    bounce: false,
    preventDefaultException: { tagName: /^(IMG|INPUT|TEXTAREA|BUTTON|SELECT)$/ }
  })
}

function toCanvas() {
  var dpr = window.devicePixelRatio || 1;

    var dom = document.getElementById('app'),
        domWidth = dom.clientWidth,
        domHeight = dom.clientHeight,
        canvas = document.createElement('canvas');
      
    canvas.width = domWidth * dpr;
    canvas.height = domHeight * dpr;
    canvas.style.width = domWidth + 'px';
    canvas.style.height = domHeight + 'px';
    // canvas.getContext('2d').scale(dpr, dpr);

    var opts = {
      scale: dpr,
      canvas: canvas,
      useCORS: true
    }

    html2canvas(dom, opts).then((canvas2) => {
      // document.body.appendChild(canvas2);

      var img = new Image()

      img.crossOrigin='Anonymous';
      img.src = canvas2.toDataURL("image/png");
      // canvas2.toDataURL("image/png");

      document.body.appendChild(img)
    })
}

toCanvas()