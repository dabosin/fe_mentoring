const viewElements = {
  canvas: document.getElementById('canvas'),
  context: canvas.getContext('2d'),
  controls: document.getElementById('shapes'),
  colorInput: document.getElementById('color'),
  clearButton: document.getElementById('clear'),
  saveButton: document.getElementById('save-to-json'),
  loadButton: document.getElementById('load-from-json'),
  json: document.getElementById('json')
};

const module = new Controller(factory, viewElements);