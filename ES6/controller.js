function Controller(factory, viewElements) {

  const module = {
    controls: {},
    shapes: [],
    init: function () {
      viewElements.controls.addEventListener('click', this.selectTool.bind(this));
      viewElements.colorInput.addEventListener('change', this.setColor.bind(this));
      viewElements.clearButton.addEventListener('click', this.clear.bind(this));
      viewElements.saveButton.addEventListener('click', this.saveCanvas.bind(this));
      viewElements.loadButton.addEventListener('click', this.loadCanvas.bind(this));
      viewElements.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
      viewElements.canvas.addEventListener('mousemove', this.drawing.bind(this));
      viewElements.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
      viewElements.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
      viewElements.canvas.addEventListener('click', this.selectShape.bind(this));
    },
    selectTool(e) {
      const shapeTypes = factory.getTypes();
      for (let type of shapeTypes) {
        if (type === e.target.id) {
          this.controls.type = type;
        }
      }
    },
    renderCanvas() {
      this.clearCanvas();
      for (let shape of this.shapes) {
        shape.render();
      }
    },
    clearCanvas() {
      viewElements.context.clearRect(0, 0, viewElements.canvas.width, viewElements.canvas.height);
    },
    startDrawing(e) {
      this.controls.start = true;
      this.controls.x0 = e.layerX;
      this.controls.y0 = e.layerY;
    },
    drawing(e) {
      if (!this.controls.start) return;
      this.renderCanvas();
      this.controls.shape = factory.createShape(viewElements, this.controls, e);
      this.controls.shape.render();
    },
    stopDrawing(e) {
      if (e.type === 'mouseup' && (this.controls.x0 !== e.layerX || this.controls.y0 !== e.layerY)) {
        this.shapes.push(this.controls.shape);
      }
      this.controls.start = false;
    },
    setColor() {
      for (let shape of this.shapes) {
        if (shape.selected) {
          shape.props.color = viewElements.colorInput.value ? viewElements.colorInput.value : '#000';
        }
      }
      this.renderCanvas();
    },
    clear() {
      viewElements.context.clearRect(0, 0, viewElements.canvas.width, viewElements.canvas.height);
      this.shapes = [];
    },
    selectShape(e) {
      if (this.controls.x0 == e.layerX && this.controls.y0 == e.layerY) {
        for (let i = 0; i < this.shapes.length; i++) {
          this.shapes[i].selected = this.shapes[i].isSelected(e.layerX, e.layerY);
          if (this.shapes[i].selected) {
            for (let j = 0; j < this.shapes.length; j++) {
              if (this.shapes[i].id !== this.shapes[j].id) {
                this.shapes[j].selected = false;
              }
            }
          }
        }
        this.renderCanvas();
      }
    },
    saveCanvas() {
      if (this.shapes.length != 0) {
        viewElements.json.value = JSON.stringify(this.shapes);
      }
    },
    loadCanvas() {
      const shapesJSON = JSON.parse(viewElements.json.value);
      this.shapes = [];
      for (let shape of shapesJSON) {
        this.shapes.push(factory.createShape(shape.props, viewElements, shape.props));
      }
      this.renderCanvas();
    }
  };

  module.init();
}