var KEYS = (function () {
  // 机顶盒上、下、左、右、确认键、机顶盒事件
  var KEY_STB = [
    1,
    2,
    3,
    4,
    13,
    15,
    8,
    768
  ];
  var KEY_NOTE = [
    38,
    40,
    37,
    39,
    13,
    15
  ];

  function isUpKey(keyCode) {
    return KEY_STB[0] == keyCode || KEY_NOTE[0] == keyCode;
  }
  function isDownKey(keyCode) {
    return KEY_STB[1] == keyCode || KEY_NOTE[1] == keyCode;
  }
  function isLeftKey(keyCode) {
    return KEY_STB[2] == keyCode || KEY_NOTE[2] == keyCode;
  }
  function isRightKey(keyCode) {
    return KEY_STB[3] == keyCode || KEY_NOTE[3] == keyCode;
  }
  function isEnterKey(keyCode) {
    return KEY_STB[4] == keyCode || KEY_NOTE[4] == keyCode;
  }
  function isBackKey(keyCode) {
    return KEY_STB[6] == keyCode;
  }
  /**
   * 768机顶盒事件
   * @param {Object} keyCode
   */
  function isBoxKey(keyCode) {
    return KEY_STB[7] == keyCode;
  }
  return { isUpKey: isUpKey, isDownKey: isDownKey, isLeftKey: isLeftKey, isRightKey: isRightKey, isEnterKey: isEnterKey, isBackKey: isBackKey, isBoxKey: isBoxKey }
})();

function getKeyName(keyCode) {
  switch (true) {
    case KEYS.isUpKey(keyCode):
      return KEY.UP;
    case KEYS.isDownKey(keyCode):
      return KEY.DOWN;
    case KEYS.isLeftKey(keyCode):
      return KEY.LEFT;
    case KEYS.isRightKey(keyCode):
      return KEY.RIGHT;
    case KEYS.isEnterKey(keyCode):
      return KEY.OK;
    case KEYS.isBackKey(keyCode):
      return KEY.BACK;
    case KEYS.isBoxKey(keyCode):
      return 'BOX';
  }
}
