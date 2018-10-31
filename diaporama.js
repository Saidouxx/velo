/* Le diaporama passe automatiquement à la diaporama suivante toutes les 5 secondes. 
   L’utilisateur peut toutefois choisir de mettre le diaporama en pause. 
   Il peut également reculer ou avancer manuellement à l’aide d’un clic de souris, 
   ainsi qu’avec les touches gauche et droite de son clavier.*/

// POUR LE DIAPORAMA 

//Indiquer une variable avec numero
// une variable pour l'id prev
// un écouteur d'évènement pour l'id prev 
// une variable pour l'id next 
// un écouteur d'évènement pour l'id next 
// Une fonction showImage pour montrer l'image
// une variable i vide
// une variable x pour la class slides
// Une fonction plusIndex pour ajouter un index 
// Une fonction autoSlide pour que le Diaporama change de photo automatiquement 
// Une fonction play pour la lecture 
// Une fonction stop pour la pause 


var intervalId;
// declaration objet diaporama (var diaporama = {})
var diaporama = {
    // proprietes (prop: "valeur")
    index: 0,
    prevBtn: document.getElementById('prev'),
    nextBtn: document.getElementById("next"),
    playBtn: document.getElementById("btn1"),
    stopBtn: document.getElementById("btn2"),
    // methodes (methode: function(){...})
    init: function() {
        var that = this;
        this.prev();
        this.next();
        // this.play();
        this.stop();
        this.showImage();
        this.playBtn.addEventListener("click", function(){
            that.play()
        });
        // il faudrait mettre le event listener du bouton play, qui appelerait la methode this.play()
        // this.play() // lance le defilement auto 
        this.play();
    },
    nbr: function (n) {
        this.index = this.index + n;
        //console.log('je suis plusIndex')
        this.showImage(this.index);
    },
    showImage: function (n) {
        console.log(this.index)
        var slide = document.getElementsByClassName("infos");
        // est ce que l'index est superieur (index > 2) alors l'index est réinitialisé à : index = 0
        if (n > slide.length - 1) { // je verifie si l'index est superieur à la derniere image
            this.index = 0 // j'affiche la premiere image 
        };
        // est ce que l'index est inferieur (index < 0) alors l'index est réinitialisé à : index = x.length - 1
        if (n < 0) { // je verifie si l'index est inferieur à la premiere image 
            this.index = slide.length - 1 //j'affiche la derniere image
        };
        for (var i = 0; i < slide.length; i++) {
            slide[i].style.display = "none";
        }
        slide[this.index].style.display = "block";
    },
    prev: function(){
        var that = this;
        this.prevBtn.addEventListener("click", function () {
            console.log(that);
            that.nbr(-1)
        })
    },
    next: function() {
        var that = this;
        this.nextBtn.addEventListener("click", function () {
            console.log(that.next);
            that.nbr(1);
        })
    },
    play: function() {
        var that = this;
        clearInterval(intervalId)
        intervalId = setInterval(function () {
            that.nbr(1)
        }, 2000);
        //this.playBtn.addEventListener("click", function () {
        //});
    },   
    stop: function() {
        var that = this;
        this.stopBtn.addEventListener("click", function () {
            clearInterval(intervalId);
        });
    },

    // Affiche des informations sur un événement clavier
    infosClavier: function(e) {
        console.log(e.keyCode)
       if (e.keyCode == 39 ){
           console.log('fleche droite')
           diaporama.nbr(1)
       }
       if (e.keyCode == 37) {
           console.log('fleche gauche')
           diaporama.nbr(-1)
       }
    },
    
    
}
diaporama.init()



// Gestion de l'appui et du relâchement d'une touche du clavier
//document.getElementsByClassName('caroussel').document.addEventListener("keydown", infosClavier);
window.document.addEventListener("keyup",function(e){
    diaporama.infosClavier(e)
});

