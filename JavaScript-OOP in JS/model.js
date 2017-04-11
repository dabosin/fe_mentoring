var Shape = (function() {
  var Shape = function(context, props) {
    this.selected = false;
    this.props = props;
    this.context = context;
  };

  Shape.prototype.render = function() {
    console.log('Add render method for ' + this.type);
  };

  Shape.prototype.isSelected = function() {
    console.log('Add selection method for ' + this.type);
  };

  Shape.prototype.addAppearance = function(color, selected) {
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.shadowBlur = selected ? 2 : 0;
    this.context.shadowOffsetX = selected ? 5 : 0;
    this.context.shadowOffsetY = selected ? 5 : 0;
    this.context.shadowColor = selected ? this.props.color : '';
  };

  Shape.prototype.toJSON = function() {
    var props = this.props;
    props.type = this.type;
    props.context = this.context;
    return {
      props: props
    };
  };

  return Shape;

})();

var Rectangle = (function() {

  var Rectangle = function(context, props) {
    Shape.call(this, context, props);
    this.type = 'rectangle';
  };

  Rectangle.prototype = Object.create(Shape.prototype);

  Rectangle.prototype.render = function() {

    this.addAppearance(this.props.color, this.selected);
    this.context.strokeRect(this.props.startX, this.props.startY, this.props.width, this.props.height);
  };

  Rectangle.prototype.isSelected = function(x, y) {
    if (
      x > this.props.startX &&
      x < (this.props.startX + this.props.width) &&
      y > this.props.startY &&
      y < (this.props.startY + this.props.height)
    ) {
      return true;
    }
  };

  return Rectangle;

})();


var Ellipse = (function() {

  var Ellipse = function(context, props) {
    Shape.call(this, context, props);
    this.type = 'ellipse';
  };

  Ellipse.prototype = Object.create(Shape.prototype);

  Ellipse.prototype.render = function() {
    this.addAppearance(this.props.color, this.selected);
    this.context.beginPath();

    this.context.moveTo(this.props.startX, this.props.startY - this.props.height/2);

    this.context.bezierCurveTo(
      this.props.startX + this.props.width/2, this.props.startY - this.props.height/2,
      this.props.startX + this.props.width/2, this.props.startY + this.props.height/2,
      this.props.startX, this.props.startY + this.props.height/2);

    this.context.bezierCurveTo(
      this.props.startX - this.props.width/2, this.props.startY + this.props.height/2,
      this.props.startX - this.props.width/2, this.props.startY - this.props.height/2,
      this.props.startX, this.props.startY - this.props.height/2);

    this.context.stroke();

    this.context.closePath();
  };

  Ellipse.prototype.isSelected = function(x, y) {
    if (
      x > (this.props.startX - this.props.width/2) &&
      x < (this.props.startX + this.props.width/2) &&
      y > (this.props.startY - this.props.height/2) &&
      y < (this.props.startY + this.props.height/2)
    ) {
      return true;
    }
  };

  return Ellipse;

}());

var Line = (function() {

  var Line = function(context, props) {
    Shape.call(this, context, props);
    this.type = 'line';
  };

  Line.prototype = Object.create(Shape.prototype);
  Line.prototype.constructor = Shape;

  Line.prototype.render = function() {
    this.addAppearance(this.props.color, this.selected);
    this.context.beginPath();
    this.context.moveTo(this.props.startX, this.props.startY);
    this.context.lineTo(this.props.nextX, this.props.nextY);
    this.context.stroke();
    this.context.closePath();
  };

  Line.prototype.isSelected = function(x, y) {
    if (
      x > Math.min(this.props.startX, this.props.nextX) &&
      x < Math.max(this.props.startX, this.props.nextX) &&
      y > Math.min(this.props.startY, this.props.nextY) &&
      y < Math.max(this.props.startY, this.props.nextY)
    ) {
      return true;
    }
  };

  return Line;

}());

var ShapeFactory = (function() {

  var ShapeFactory = function() {
  };

  ShapeFactory.prototype = {
    constructor: ShapeFactory,

    createShape: function(props, controls, e) {
      var type = controls.type;
      var width,
          height,
          startX,
          startY;
      var color = props.colorInput.value;
      var context = props.context;
      switch (type) {
        case 'rectangle':
          width = Math.abs(controls.x0 - e.layerX);
          height = Math.abs(controls.y0 - e.layerY);
          startX = Math.min(controls.x0, e.layerX);
          startY  = Math.min(controls.y0, e.layerY);
          return new Rectangle(context, {
            width: width,
            height: height,
            startX: startX,
            startY: startY,
            color: color
          });
        case 'ellipse':
          startX = controls.x0;
          startY = controls.y0;
          width = Math.abs(controls.x0 - e.layerX);
          height = Math.abs(controls.y0 - e.layerY);
          return new Ellipse(context, {
            width: width,
            height: height,
            startX: startX,
            startY: startY,
            color: color
          });
        case 'line':
        default:
          startX = controls.x0;
          startY = controls.y0;
          return new Line(context, {
            startX: startX,
            startY: startY,
            nextX: e.layerX,
            nextY: e.layerY,
            color: color
          });
      }
    },

    getTypes: function() {
      return ['ellipse', 'rectangle', 'line'];
    }

  };

  return ShapeFactory;

})();

var factory = new ShapeFactory();