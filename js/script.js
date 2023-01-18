//variable
let tableauDes = [
    {id: 1, valeur: "557px-Dice-1-b.svg.png"},
    {id: 2, valeur: "2048px-Dice-2-b.svg.png"},
    {id: 3, valeur: "Dice-3-b.svg"},
    {id: 4, valeur: "Dice-4-b.svg.png"},
    {id: 5, valeur: "Dice-5-b.svg.png"},
    {id: 6, valeur: "Dice-6-b.svg.png"}
];
let dePoints = [
    {id: 1, valeur: 0},
    {id: 2, valeur: 0},
    {id: 3, valeur: 0},
    {id: 4, valeur: 0},
    {id: 5, valeur: 0},
    {id: 6, valeur: 0},
    {id: "brelan", valeur: 0},
    {id: "carre", valeur: 0},
    {id: "full", valeur: 0},
    {id: "petiteSuite", valeur: 0},
    {id: "grandeSuite", valeur: 0},
    {id: "yams", valeur: 0},
    {id: "chance", valeur: 0}

];
let tableauDesSelec = [];
let score = [
    {id: 1, valeur: 0},
    {id: 2, valeur: 0},
    {id: 3, valeur: 0},
    {id: 4, valeur: 0},
    {id: 5, valeur: 0},
    {id: 6, valeur: 0},
    {id: "brelan", valeur: 0},
    {id: "carre", valeur: 0},
    {id: "full", valeur: 0},
    {id: "petiteSuite", valeur: 0},
    {id: "grandeSuite", valeur: 0},
    {id: "yams", valeur: 0},
    {id: "chance", valeur: 0}

];
let nombreDesLance = 5;
let tableauDesLancer = [];
let nbLancerTotal = 0;
let chance = false ;
//function qui selectionne tous les des sur le plateau
function selectionnerTousLesDes() {
    //reset le result
    document.getElementById("result").innerText = "";
    tableauDesLancer.forEach(function (element) {
        tableauDesSelec.push(element);
    });
    addInTheTableSelect();
}


/**
 * function qui permet de lancer les dés
 */
function lancerDes() {
    //vide le plateaux
    tableauDesLancer = [];
    document.getElementById("des_lancer").innerHTML = "";
    console.log(nombreDesLance);
    for (let i = 0; i < nombreDesLance; i++) {
        let de = Math.floor(Math.random() * 6) + 1;
        //avec le nb aléatoite recupérer le nom du  dé
        let nomDe = tableauDes.find(function (element) {
            return element.id === de;
        });
        console.log("pe")
        //add le dé dans le tableau
        tableauDesLancer.push(nomDe);
        console.log(tableauDesLancer);
        document.getElementById("des_lancer").innerHTML += "<img id='" + i + "' class='des' src='C:\\Users\\chris\\OneDrive\\Bureau\\IUT\\FrameworkJS\\Yams\\asset\\" + nomDe.valeur + "' alt='dé' class='de'>";
    }

}


/**
 * function qui sauvegarde en memoire le score voulu
 * @param node node représente l'élément du dom donc le button
 * */
function addScore(node) {
    score.forEach((element) => {
        if (typeof element.id !== 'string') {
            if ("des" + element.id === node.parentNode.id && element.valeur === 0) {
                element.valeur = dePoints.filter((point) => {
                    return point.id === element.id
                })[0].valeur
            }
        } else {
            if (element.id === node.parentNode.id && element.valeur === 0) {
                if(element.id === "chance"){
                    chance = true;
                }
                element.valeur = dePoints.filter((point) => {
                    return point.id === element.id
                })[0].valeur
            }
        }

    })
    addInTheTableSelectScore();
}

/**
 * function qui affiche le résultat des point choisi
 * */
function addInTheTableSelectScore() {
    console.log("addInTheTableSelectScore");
    score.forEach((element) => {
        $("#des" + element.id).html(element.valeur);
        //si element.id et un string alors
        if (typeof element.id === 'string') {
            $("#" + element.id).html(element.valeur);
        }
    })
    nbLancerTotal = 0;
    document.getElementById("lancer").disabled = false;
    //reset la balise
    document.getElementById("des_lancer").innerHTML = "";
    //reset le tableau des dés selectionner
    tableauDesSelec = [];
    //reset le tableau des dés selectionner
    tableauDesLancer = [];
    //reset le plateau des dés
    console.log("reset");
    document.getElementById("select").innerHTML = "";
    //reset le nombre de dés à lancer
    nombreDesLance = 5;
    console.log(nombreDesLance);

}

//fonction qui permet de selectionner les dés
function selectionnerDe(id) {
    let de = document.getElementById(id);
    if (!de.classList.contains("selectionne")) {
        de.classList.add("selectionne");
        //Avec l'id chercher le dé dans le tableau des dés selectionner
        tableauDesSelec.push(tableauDesLancer[id]);
        addInTheTableSelect(id);
        if (tableauDesSelec.length === 5) {
            document.getElementById("lancer").disabled = true;
            //reset le result
            document.getElementById("des_lancer").innerText = "";

            AttributionSimple();
            AttributionGrPtSuite();
            AttributionYams();
            AttributionFull();
            AttributionBrelan();

        }
        //reduire le nombre de dés a lancer
        nombreDesLance--;
    }
}

//function qui affiche sur le plateau les dés selectionner
function addInTheTableSelect() {
    //foreach le tableau des dés selectionner
    document.getElementById("select").innerHTML = "";
    tableauDesSelec.forEach(function (element) {
        //add le dé selectionner dans le tableau et crée un noeud img pour l'image du dé
        document.getElementById("select").innerHTML += "<img class='deSelect' id='" + element.id + "' src='C:\\Users\\chris\\OneDrive\\Bureau\\IUT\\FrameworkJS\\Yams\\asset\\" + element.valeur + "' alt='dé' class='de'>";
    });

}


/**
 * function qui defini si il y a un full ou pas
 * */
function AttributionFull() {
    if (tableauDesSelec.filter(isUnique).length === 2) {
        tableauDesSelec.forEach((des) => {
            if (!(tableauDesSelec.filter((e) => e.id === des.id).length >= 4) && !(tableauDesSelec.filter((e) => e.id === des.id).length === 1)) {
                dePoints.forEach((element) => {
                    if (element.id === "full") {
                        if (element.valeur === 0) {
                            element.valeur = 25
                        }
                    }
                })
            }
        });

    }
    affichageTableauScore();
}

/**
 * function qui determine si il y a un brelan ou pas
 * */
function AttributionBrelan() {
    //si il y a 3 fois le meme dé
    if (tableauDesSelec.filter((e) => e.id === tableauDesSelec[0].id).length === 3) {
        dePoints.forEach((element) => {
            if (element.id === "brelan") {
                if (element.valeur === 0) {
                    element.valeur = 20
                }
            }
        })
    }
    affichageTableauScore();
}

/**
 * function qui determine si il y a un yams ou pas
 * */
function isUnique(item, position, array) {
    return array.indexOf(item) === position;
}

/*
* function qui défini si c'est un yams ou pas
* */
function AttributionYams() {
    if (new Set(tableauDesSelec).size === 1) {
        dePoints.forEach((element) => {
            if (element.id === "yams") {
                if (element.valeur === 0) {
                    element.valeur = "50"
                }
            }
        })
    }
    affichageTableauScore();
}

/*
* function qui determine comme Attribution simple sauf qu'elle indique si c'est un grande suite ou une petite et l'ajoute au tab des scores
*
* */
function AttributionGrPtSuite() {
    let tableauDesSelecSuite = tableauDesSelec
    let desSuite = [];
    tableauDesSelecSuite.sort(function (des1, des2) {
        return des1.id - des2.id
    });

    for (let i = 0; i < tableauDesSelecSuite.length; i++) {

        let des = tableauDesSelecSuite[i];
        let desNext;
        if (i === tableauDesSelecSuite.length - 1) {
            desPreviews = tableauDesSelecSuite[tableauDesSelecSuite.length - 2];
            if ((des.id - desPreviews.id) === 1) {
                desSuite.push(des);
            }

        } else {

            desNext = tableauDesSelecSuite[i + 1];
            if ((desNext.id - des.id) === 1) {

                desSuite.push(des);
                desSuite.push(desNext);

            }

        }
    }
    desSuite = desSuite.filter(isUnique)
    console.log(desSuite)
    //tester si les chiffre se suis
    let suisSuite = false;
    suisSuite = desSuite.map((des) => des.id).every((id, index, array) => index === 0 || id === array[index - 1] + 1);

    if (desSuite.length >= 4 && suisSuite) {
        dePoints.forEach((element) => {
            if (element.id === "petiteSuite") {
                if (element.valeur === 0) {
                    element.valeur = 25
                }

            }
        })

    }
    if (desSuite.length >= 5 && suisSuite) {

        dePoints.forEach((element) => {
            if (element.id === "grandeSuite") {
                if (element.valeur === 0) {
                    element.valeur = 40
                }

            }
        })
    }

    affichageTableauScore();
}


/**
 * function qui ajoute en fonction des dés selectionner les points dans le tableau dePoints que pour id de 1 à 6
 *
 * */
function AttributionSimple() {
    //dans le tab tableauDesSelec récuperer  == au id de point
    let pointTotal = 0;
    tableauDesSelec.forEach((deSelect) => {
        dePoints.forEach((element) => {
            if (deSelect.id === element.id) {
                element.valeur = +element.valeur + +deSelect.id
                pointTotal = +deSelect.id + +pointTotal;
            }

            if (element.id === 'chance') {
                if (chance === false) {
                    element.valeur = pointTotal

                }


            }
        })
        //si il y a 4 element pareil dans l'array

        if (tableauDesSelec.filter((e) => e.id === deSelect.id).length >= 4) {
            dePoints.forEach((element) => {
                if (element.id === 'carre') {
                    if (element.valeur === 0) {
                        element.valeur = pointTotal
                    }
                }
            })
        }

    });
    affichageTableauScore();
}

/**
 * affiche dans le tableau des les scores apres chaque lancer
 * */
function affichageTableauScore() {
    dePoints.map((element) => {
        $("#des" + element.id).html(element.valeur + "<button id='addScore' onclick='addScore(this)'>Valider</button>");
        //si element.id et un string alors
        if (typeof element.id === 'string') {
            $("#" + element.id).html(element.valeur + "<button id='addScore' onclick='addScore(this)'>Valider</button>");
        }

    })
}


$(document).ready(function () {
    //quand on clique sur le bouton lancer le jeu lance les des
    $("#lancer").click(function () {
        console.log("lancer")
        if (nbLancerTotal < 2) {
            lancerDes();
            console.log("passe")
        } else {
            //on lance les des
            alert("Vous avez lancé les dés deux fois");
            selectionnerTousLesDes();
        }
        nbLancerTotal++;
    });
    //quand on clique sur un dé on le selectionne
    $(document).on("click", ".des", function () {
        selectionnerDe(this.id);
    });

});