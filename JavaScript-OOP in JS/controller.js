function Controller(factory, viewElements) {

  var module = {
    controls: {},
    shapes: [],
    init: function() {
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
    selectTool: function(e) {
      var shapeTypes = factory.getTypes();
      shapeTypes.forEach(function(type) {
        if (type === e.target.id) {
          this.controls.type = type;
        }
      }.bind(this));
    },
    renderCanvas: function() {
      this.clearCanvas();
      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].render();
      }
    },
    clearCanvas: function() {
      viewElements.context.clearRect(0, 0, viewElements.canvas.width, viewElements.canvas.height);
    },
    startDrawing: function(e) {
      this.controls.start = true;
      this.controls.x0 = e.layerX;
      this.controls.y0 = e.layerY;
    },
    drawing: function(e) {
      if (!this.controls.start) {
        return
      }
      this.renderCanvas();
      //var width,
      //    height,
      //    startX,
      //    startY;
      //var color = viewElements.colorInput.value;
      this.controls.shape = factory.createShape(viewElements, this.controls, e);
      //switch (this.controls.type) { // what is it? controller shouldn't know about exact shapes and how to create them!
      //  case 'rectangle':
      //    width = Math.abs(this.controls.x0 - e.layerX);
      //    height = Math.abs(this.controls.y0 - e.layerY);
      //    startX = Math.min(this.controls.x0, e.layerX);
      //    startY  = Math.min(this.controls.y0, e.layerY);
      //    this.controls.shape = factory.createShape('rectangle', viewElements.context, {
      //      width: width,
      //      height: height,
      //      startX: startX,
      //      startY: startY,
      //      color: color
      //    });
      //    break;
      //  case 'ellipse':
      //    startX = this.controls.x0;
      //    startY = this.controls.y0;
      //    width = Math.abs(this.controls.x0 - e.layerX);
      //    height = Math.abs(this.controls.y0 - e.layerY);
      //    this.controls.shape = factory.createShape('ellipse', viewElements.context, {
      //      width: width,
      //      height: height,
      //      startX: startX,
      //      startY: startY,
      //      color: color
      //    });
      //    break;
      //  case 'line':
      //  default:
      //    startX = this.controls.x0;
      //    startY = this.controls.y0;
      //    this.controls.shape = factory.createShape('line', viewElements.context, {
      //      startX: startX,
      //      startY: startY,
      //      nextX: e.layerX,
      //      nextY: e.layerY,
      //      color: color
      //    });
      //    break;
      //
      //}
      this.controls.shape.render();
    },
    stopDrawing: function(e) {
      if (e.type === 'mouseup' && (this.controls.x0 !== e.layerX || this.controls.y0 !== e.layerY)) {
        this.shapes.push(this.controls.shape);
      }
      this.controls.start = false;
    },
    setColor: function() {
      this.shapes.forEach(function(shape) {
        if (shape.selected) {
          shape.props.color = viewElements.colorInput.value ? viewElements.colorInput.value : '#000';
        }
      });
      this.renderCanvas();
    },
    clear: function() {
      viewElements.context.clearRect(0, 0, viewElements.canvas.width, viewElements.canvas.height);
      this.shapes = [];
    },
    selectShape: function(e) {
      if (this.controls.x0 == e.layerX && this.controls.y0 == e.layerY) {
        for(var i = 0; i < this.shapes.length; i++) {
          this.shapes[i].selected = this.shapes[i].isSelected(e.layerX, e.layerY);
          if (this.shapes[i].selected) {
            for (var j = 0; j < this.shapes.length; j++) {
              if (this.shapes[i].id !== this.shapes[j].id) {
                this.shapes[j].selected = false;
              }
            }
          }
        }
        this.renderCanvas();
      }
    },
    saveCanvas: function() {
      if (this.shapes.length != 0) {
        viewElements.json.value = JSON.stringify(this.shapes);
      }
    },
    loadCanvas: function() {
      var fromJSON = JSON.parse(viewElements.json.value);
        this.shapes = [];
        for (var i = 0; i < fromJSON.length; i++) {
          this.shapes.push(factory.createShape(fromJSON[i].props, viewElements, fromJSON[i].props));
        }
        this.renderCanvas();
    }
  };

  module.init();

}