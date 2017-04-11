(function() {

function Subject() {
	this.observerList = [];
}

Subject.prototype.addObserver = function( obj ) {
	return this.observerList.push(obj);
};

Subject.prototype.countObservers = function() {
	return this.observerList.length;
};

Subject.prototype.getObserver = function( index ) {
	if( index > -1 && index < this.observerList.length) {
		return this.observerList[ index ];
	}
};

Subject.prototype.notify = function( context ) {
	var observerCount = this.countObservers();
	for (var i = 0; i < observerCount; i++) {
		this.getObserver(i).update( context );
	}
};

function Observer() {
	this.update = function() {

	};
}

function extend( obj, extension ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}

var sunMoon = document.getElementById('sunMoon');

extend( sunMoon, new Subject() );

sunMoon.onclick = function() {
	if(this.getAttribute('data-type') == 'sun') {
		this.setAttribute('data-type', 'moon');
	} else {
		this.setAttribute('data-type', 'sun');
	}
	this.notify( this.getAttribute('data-type') );
};

var sky = document.getElementById('sky');
var stars = document.getElementById('stars');
extend( sky, new Observer );
sky.update = function( value ) {
	if(value == 'sun') {
		this.style.background = 'deepskyblue';
	} else {
		this.style.background = 'black';
	}
};

sunMoon.addObserver( sky );

for(var i = 0 ; i < 1488; i++) {

	var star= document.createElement('div');

	star.className = 'star';
	star.style.left = Math.random() * screen.width + 'px';
	star.style.top = Math.random() * screen.width + 'px';

	extend( star, new Observer );

	star.update = function( value ) {
		if(value == 'sun') {
			this.style.display = 'none';
		} else {
			this.style.display = 'block';
			this.style.left = Math.random()*screen.width + "px";
			this.style.top = Math.random()*screen.height + "px";
		}
	};

	sunMoon.addObserver(star);

	document.body.appendChild(star);

}

	alert('Click on sun/moon');

})();