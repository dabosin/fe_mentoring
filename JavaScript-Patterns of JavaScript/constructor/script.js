(function () {

	var dictatorsElem = document.getElementById('dictators');
	var div = document.createElement('div');


	// Constructor pattern

	function Dictator( name, country, look ) {
		this.name = name;
		this.country = country;
		this.look = look;
	}

	Dictator.prototype.render = function() {

		var dictatorElem = div.cloneNode(false);

		var eyesElem = div.cloneNode(false);
		var mouthElem = div.cloneNode(false);
		var nameElem = div.cloneNode(false);
		var headElem = div.cloneNode(false);


		eyesElem.className = "eyes";
		mouthElem.className = "mouth";
		nameElem.className = "name";

		headElem.className = "head";
		headElem.appendChild(eyesElem);
		headElem.appendChild(mouthElem);

		dictatorElem.className = "dictator";
		dictatorElem.appendChild(headElem);
		dictatorElem.appendChild(nameElem);
		var dictator = dictatorElem.cloneNode(true);
		for (var i = 0; i < dictator.childNodes.length; i++) {
			if (dictator.childNodes[i].className == 'name') {
				dictator.childNodes[i].innerHTML = this.name;
				break;
			}
		}
		if (this.look.hair) {
			var hairElem = div.cloneNode(false);
			hairElem.className = "hair";
			dictator.childNodes[0].insertBefore(hairElem, dictator.childNodes[0].firstChild);
		}
		if (this.look.mustache) {
			var mustacheElem = div.cloneNode(false);
			mustacheElem.className = "mustache";
			dictator.childNodes[0].appendChild(mustacheElem);
		}
		dictatorsElem.appendChild(dictator);
	};

	// END Constructor pattern

	var pinocet = new Dictator( 'A. Pinochet', 'Chile', {
		hair: true,
		mustache: true
	} );

	var mussolini = new Dictator('B. Mussolini', 'Italy', {
		hair: false,
		mustache: false
	});

	var pot = new Dictator( 'Pol Pot', 'Cambodia', {
		hair: true,
		mustache: false
	} );

	var dictatorsList = [pinocet, mussolini, pot];

	dictatorsList.forEach(function(dictator) {
		dictator.render();
	});

})();
