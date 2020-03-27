export function positionWithinWindow(node) {
  var windowBounds = {
    top: window.scrollY,
    left: window.scrollX,
    bottom: window.innerHeight + window.scrollY,
    right: window.innerWidth + window.scrollX
  };
  var elementBounds = node.getBoundingClientRect();
  var style = {};
  var pad = 0;
  if(elementBounds.left < windowBounds.left + pad) {
    style.left = windowBounds.left + pad;
  }
  if(elementBounds.top < windowBounds.top + pad) {
    style.top = windowBounds.top + pad;
  }
  if(elementBounds.right > windowBounds.right - pad) {
    style.right = pad;
  }
  if(elementBounds.bottom > windowBounds.bottom - pad) {
    style.bottom = pad;
  }
  return style;
}

export function positionPopover(triggerRect, contentRect, options = {}) {
  // currently only uses anchor right-center;
  const windowPadding = options.windowPadding || 10;
  const triggerPadding = options.triggerPadding || 14;
  let style = {
    top: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2,
    left: triggerRect.right + triggerPadding
  };
  style = keepWithinWindowBounds(style, contentRect, windowPadding);
  return style;
}

function keepWithinWindowBounds(style, contentRect, pad) {
  var bounds = {
    top: window.scrollY + pad,
    left: window.scrollX + pad,
    bottom: window.innerHeight + window.scrollY - pad,
    right: window.innerWidth + window.scrollX - pad
  };
  if(style.left < bounds.left) {
    style.left = bounds.left;
  }
  if(style.top < bounds.top) {
    style.top = bounds.top;
  }
  if(style.left + contentRect.width > bounds.right) {
    style.left = bounds.right - contentRect.width;
  }
  if(style.top + contentRect.height > bounds.bottom) {
    style.top = bounds.bottom - contentRect.height;
  }
  return style;
}
