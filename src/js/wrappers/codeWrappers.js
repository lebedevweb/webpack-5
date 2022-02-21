function setListener(element, type, handler) {
  if (element) {
    element.addEventListener(type, handler, false);
  }
}

function removeListener(element, type, handler) {
  if (element) {
    element.removeEventListener(type, handler, false);
  }
}

function removeClass(element, value) {
  if (element) {
    element.classList.remove(value);
  }
}

function addClass(element, value) {
  if (element) {
    element.classList.add(value);
  }
}

function toggleClass(element, value) {
  if (element) {
    element.classList.toggle(value);
  }
}

export {
  setListener, removeListener, addClass, removeClass, toggleClass,
};
