export function stopEvent(evt) {
  if(evt.stopPropagation) evt.stopPropagation();
  if(evt.preventDefault) evt.preventDefault();
  if(evt.preventDefault) evt.preventDefault();
  if(evt.nativeEvent && evt.nativeEvent.stopImmediatePropagation) {
    evt.nativeEvent.stopImmediatePropagation();
  }
}
