// import './toast.css';

/**
 * 加载中 loading
 * 信息提示 toast 弹框
 */

let overlayCount = 0,
    removeCount = 0,
    timer = null;

function loadingShow(container) {
  container = container || $('body');
  let seconds = 300;
  overlayCount++;
  let overlay = $('.loading');

  if(overlay.length == 0) {
    var sHtml = '';
    sHtml += `<div class="ifind-loading-overlay1 loading"></div>
      <div class="ifind-loading-container">
        <div class="ifind-loading-img">
          <img src="./imgs/loading.png" />
          <p>正在载入...</p>
        </div>
      </div>
    `;

    container ? container.append(sHtml) : $('body').append(sHtml);
    let $overlay = container.find('.ifind-loading-overlay1');
    let $container = container.find('.ifind-loading-container');
    if(container.selector != 'body') {
      $overlay.css('position', 'absolute');
      $container.css('position', 'absolute');
    }

    $overlay.fadeIn(seconds);
    $container.fadeIn(seconds);
  } else {
    let $overlay = container.find('.ifind-loading-overlay1');
    let $container = container.find('.ifind-loading-container');

    $overlay.stop(true, true).show();
    $container.stop(true, true).show();
  }
}

function loadingHide(seconds = 300) {
  removeCount++;
  if(removeCount < overlayCount) {
    return;
  }

  var $overlay = $('.ifind-loading-overlay1');
  var $container = $('.ifind-loading-container');

  $overlay.fadeOut(seconds, () => {
    $overlay.remove();
  })

  $container.fadeOut(seconds, () => {
    $container.remove();
  })
}

function faildMsg(text, sec = 1500, func = null) {
  showMsg(text, false, sec, func);
}

function successMsg(text, sec = 1000, func = null) {
  showMsg(text, true, sec. func);
}

function showMsg(text, success = false, sec = 1500, func = null) {
  if(!text) {
    return
  }

  var sHtml = '';
  var className = success ? 'success' : 'failure';
  sHtml += `<div class="dmp-tip-overlay"></div>
    <div class="dmp-tip-container">
      <div class="dmp-tip-text">
        <i class="${className}"></i>
        <p title="${text}">${text}</p>
      </div>
    </div>
  `;

  $('body').append(sHtml);

  var $overlay = null,
      $container = null;

  $overlay = $('.dmp-tip-overlay');
  $container = $('.dmp-tip-container');
  success ? $container.addClass('success') : $container.addClass('error');

  let _w = $container.width();
  $overlay.fadeIn(400);
  // $container.css('margin-left', _w / 2).fadeIn(400);

  setTimeout(function() {
    $overlay.fadeOut(800, function() {
      $(this).remove()
    });
    $container.fadeOut(800, function() {
      $(this).remove()
    })

    setTimeout(function() {
      func &&　func()
    }, 800)
  }, sec)
}