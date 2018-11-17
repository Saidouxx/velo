var canvas = {
	moncanvas: document.getElementById('canvas'),
	en_dessin: false,
	nomElt: document.getElementById('nom'),
	prenomElt: document.getElementById('prenom'),
	submitSignElt: document.getElementById('submitSign'),
	effacerBtn: document.getElementById('effacer'),
	trait: 0,
	width: 480,
	height: 360,


	init: function () {
		this.trait = 0;
		this.ctx = this.moncanvas.getContext('2d');
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 2;
		// Evenements souris
		this.moncanvas.addEventListener("mousedown", this.mouseDown.bind(this));
		this.moncanvas.addEventListener("mousemove", this.mouseMove.bind(this));
		this.moncanvas.addEventListener("mouseup", this.mouseUp.bind(this));
		// Evenements tactiles
		this.moncanvas.addEventListener("touchstart", this.touchStart.bind(this));
		this.moncanvas.addEventListener("touchend", this.touchEnd.bind(this));
		this.moncanvas.addEventListener('touchmove', this.touchMove.bind(this));
		this.moncanvas.addEventListener('touchcancel', this.touchCancel.bind(this));
		// Evenements bouton envoyer
		this.submitSignElt.addEventListener("click", this.submitSign.bind(this));
		// Evenements bouton effacer
		this.effacerBtn.addEventListener('click', this.clearCanvas.bind(this));
	},

	mouseDown: function (e) {
		// Bouton de souris activé
		// Dessin activé
		this.en_dessin = true;
		// Repositionnement du début du tracé
		this.ctx.moveTo(e.offsetX, e.offsetY);
	},

	mouseMove: function (e) {
		// Mouvement de souris 
		if (this.en_dessin) this.dessiner(e.offsetX, e.offsetY);
		this.trait++;
	},

	mouseUp: function (e) {
		// Bouton de souris relâché 
		// Dessin désactivé
		this.en_dessin = false;
	},
	// Ajoute un segment au tracé 
	dessiner: function (x, y) {
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	},
	
	// Fonction pour envoyer une signature
	submitSign: function (e) {
		// ajouter une condition (nom et prénom) pour autoriser la signature
		if (this.trait > 30) {
			console.log("Autoriser la signature");
		} else {
			console.log("Pas de signature")
		}
	},
	// Fonction Effacer le canvas 
	clearCanvas: function () {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.beginPath();
		this.en_dessin = false;
		this.trait = 0;
	},

	// Fonction pour le tactile
	touchStart: function (e) {
		this.en_dessin = true;
	},
	touchEnd: function (e) {
		this.en_dessin = false;
	},
	touchMove: function (e) {
		var rect = this.moncanvas.getBoundingClientRect();
		this.x = e.touches[0].clientX - rect.left;
		this.y = e.touches[0].clientY - rect.top;
		if (this.en_dessin) this.dessiner(this.x, this.y);
		e.preventDefault();

	},
	touchCancel: function (e) {
		this.en_dessin = false;

	},
};
canvas.init();

// Bloque le scroll sur le Canvas
document.body.addEventListener("touchstart", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);
document.body.addEventListener("touchend", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);
document.body.addEventListener("touchmove", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);