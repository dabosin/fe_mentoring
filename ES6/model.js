class Shape {
  constructor (context, props) {
      this.selected = false;
      this.props = props;
      this.context = context;
  }

  render () {
    console.log(`Add render method for ${this.type}`);
  }

  isSelected () {
    console.log(`Add selection method for ${this.type}`);
  }

  addAppearance (color, selected) {
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.shadowBlur = selected ? 2 : 0;
    this.context.shadowOffsetX = selected ? 5 : 0;
    this.context.shadowOffsetY = selected ? 5 : 0;
    this.context.shadowColor = selected ? this.props.color : '';
  }

  toJSON () {
    const props = this.props;
    props.type = this.type;
    props.context = this.context;
    return {
      props
    };
  }
}

class Rectangle extends Shape {
  constructor (context, props) {
    super(context, props);
    this.type = 'rectangle';
  }

  render () {
    this.addAppearance(this.props.color, this.selected);
    this.context.strokeRect(this.props.startX, this.props.startY, this.props.width, this.props.height);
  }

  isSelected(x, y) {
    if (
      x > this.props.startX &&
      x < (this.props.startX + this.props.width) &&
      y > this.props.startY &&
      y < (this.props.startY + this.props.height)
    ) {
      return true;
    }
  }
}


class Ellipse extends Shape {
  constructor(context, props) {
    super(context, props);
    this.type = 'ellipse';
  }

  render() {
    this.addAppearance(this.props.color, this.selected);
    this.context.beginPath();

    this.context.moveTo(this.props.startX, this.props.startY - this.props.height / 2);

    this.context.bezierCurveTo(
      this.props.startX + this.props.width / 2, this.props.startY - this.props.height / 2,
      this.props.startX + this.props.width / 2, this.props.startY + this.props.height / 2,
      this.props.startX, this.props.startY + this.props.height / 2);

    this.context.bezierCurveTo(
      this.props.startX - this.props.width / 2, this.props.startY + this.props.height / 2,
      this.props.startX - this.props.width / 2, this.props.startY - this.props.height / 2,
      this.props.startX, this.props.startY - this.props.height / 2);

    this.context.stroke();

    this.context.closePath();
  }

  isSelected(x, y) {
    if (
      x > (this.props.startX - this.props.width / 2) &&
      x < (this.props.startX + this.props.width / 2) &&
      y > (this.props.startY - this.props.height / 2) &&
      y < (this.props.startY + this.props.height / 2)
    ) {
      return true;
    }
  }
}

class Line extends Shape {
  constructor(context, props) {
    super(context, props);
    this.type = 'line';
  }

  render() {
    this.addAppearance(this.props.color, this.selected);
    this.context.beginPath();
    this.context.moveTo(this.props.startX, this.props.startY);
    this.context.lineTo(this.props.nextX, this.props.nextY);
    this.context.stroke();
    this.context.closePath();
  }

  isSelected(x, y) {
    if (
      x > Math.min(this.props.startX, this.props.nextX) &&
      x < Math.max(this.props.startX, this.props.nextX) &&
      y > Math.min(this.props.startY, this.props.nextY) &&
      y < Math.max(this.props.startY, this.props.nextY)
    ) {
      return true;
    }
  }
}

class ShapeFactory {

  static createShape(props, controls, e) {
    const {type} = controls;
    const {context} = props;
    let width;
    let height;
    let startX;
    let startY;
    const color = props.colorInput.value;
    switch (type) {
      case 'rectangle':
        width = Math.abs(controls.x0 - e.layerX);
        height = Math.abs(controls.y0 - e.layerY);
        startX = Math.min(controls.x0, e.layerX);
        startY  = Math.min(controls.y0, e.layerY);
        return new Rectangle(context, {
          width,
          height,
          startX,
          startY,
          color
        });
      case 'ellipse':
        startX = controls.x0;
        startY = controls.y0;
        width = Math.abs(controls.x0 - e.layerX);
        height = Math.abs(controls.y0 - e.layerY);
        return new Ellipse(context, {
          width,
          height,
          startX,
          startY,
          color
        });
      case 'line':
      default:
        startX = controls.x0;
        startY = controls.y0;
        return new Line(context, {
          startX,
          startY,
          nextX: e.layerX,
          nextY: e.layerY,
          color
        });
    }
  }

  static getTypes() {
    return ['ellipse', 'rectangle', 'line'];
  }
}

const factory = ShapeFactory;
