var firstPlayer = (function () {
    var playerSelector = [];

    // cache Dom
    var initPlayer = document.querySelectorAll('.selector');
    var RemoveX = document.getElementById('✕');
    var RemoveY = document.getElementById('O');
    var RemoveLowerText = document.getElementById("lowerText")
    var divP1 = document.createElement("div");
    var nodeP1 = document.createElement("p");
    var nodeC1 = document.createElement("p");
    var divP2 = document.createElement("div");
    var nodeP2 = document.createElement("p");
    var nodeC2 = document.createElement("p");
    var divTie = document.createElement("div");
    var nodeTie = document.createElement("p");
    var nodeTieCount = document.createElement("p");
    var nodeTie = document.createElement("p");
    var classSelector = document.getElementById("selectorContainer");

    // initial player selector event
    initPlayer.forEach((selection) => {
        selection.addEventListener('click', _selectInitalPlayer)
    });
    
    function _selectInitalPlayer(e) {

            playerSelector.push(e.target.id);

            // remove initial HTML
            RemoveX.remove();
            RemoveY.remove();
            RemoveLowerText.remove();

            // HTML for player 1 count
            classSelector.appendChild(divP1);
            divP1.appendChild(nodeP1);
            divP1.appendChild(nodeC1);
            nodeC1.id = "CX";
            nodeP1.innerHTML = "Player X";
            nodeC1.innerHTML = "0";

            // HTML for tie count
            classSelector.appendChild(divTie);
            divTie.appendChild(nodeTie);
            divTie.appendChild(nodeTieCount);
            nodeTieCount.id = "CT";
            nodeTie.innerHTML = "Tie";
            nodeTieCount.innerHTML = "0";

            // HTML for player 2 count
            classSelector.appendChild(divP2);
            divP2.appendChild(nodeP2);
            divP2.appendChild(nodeC2);
            nodeC2.id = "CO";
            nodeP2.innerHTML = "Player O";
            nodeC2.innerHTML = "0";   
    }
    return {
        playerSelector: playerSelector
    }
})();


var checkWinner = (function () {
    var playerXWinCounter = 0;
    var playerOWinCounter = 0;
    var tieWinCounter = 0;
    var winner;

    function analyser() {
        // cache DOM
        var grid1 = document.getElementById('grid1').innerHTML;
        var grid2 = document.getElementById('grid2').innerHTML;
        var grid3 = document.getElementById('grid3').innerHTML;
        var grid4 = document.getElementById('grid4').innerHTML;
        var grid5 = document.getElementById('grid5').innerHTML;
        var grid6 = document.getElementById('grid6').innerHTML;
        var grid7 = document.getElementById('grid7').innerHTML;
        var grid8 = document.getElementById('grid8').innerHTML;
        var grid9 = document.getElementById('grid9').innerHTML;
        var xCount = document.getElementById('CX');
        var oCount = document.getElementById('CO');
        var tCount = document.getElementById('CT');
        var winAudio = document.getElementById("winAudio");
        var tieAudio = document.getElementById("tieAudio");

        // X wins
        if (grid1 === "✕" && grid2 === "✕" && grid3 === "✕" 
            || grid4 === "✕" && grid5 === "✕" && grid6 === "✕" || grid7 === "✕" && grid8 === "✕" && grid9 === "✕" 
            || grid1 === "✕" && grid4 === "✕" && grid7 === "✕" || grid2 === "✕" && grid5 === "✕" && grid8 === "✕" 
            || grid3 === "✕" && grid6 === "✕" && grid9 === "✕" || grid1 === "✕" && grid5 === "✕" && grid9 === "✕" 
            || grid3 === "✕" && grid5 === "✕" && grid7 === "✕") 
            {
            playerXWinCounter++;
            xCount.innerHTML = playerXWinCounter.toString();
            checkWinner.winner = true;
            winAudio.play();
            console.log(firstPlayer.playerSelector)
        } 

        // O wins
        if (grid1 === "O" && grid2 === "O" && grid3 === "O" 
            || grid4 === "O" && grid5 === "O" && grid6 === "O" || grid7 === "O" && grid8 === "O" && grid9 === "O" 
            || grid1 === "O" && grid4 === "O" && grid7 === "O" || grid2 === "O" && grid5 === "O" && grid8 === "O" 
            || grid3 === "O" && grid6 === "O" && grid9 === "O" || grid1 === "O" && grid5 === "O" && grid9 === "O" 
            || grid3 === "O" && grid5 === "O" && grid7 === "O") 
            {
            playerOWinCounter++;
            oCount.innerHTML = playerOWinCounter.toString();
            checkWinner.winner = true;
            winAudio.play();
        } 

        // Draw 
        if (firstPlayer.playerSelector.length === 10 && checkWinner.winner !== true ) {
            tieWinCounter++;
            tCount.innerHTML = tieWinCounter.toString();
            checkWinner.winner = true;
            tieAudio.play();
        }
    };

    return {
        analyser: analyser,
        winner: winner
    }
})();


var gameBoardUpdater = (function () {
    // cache DOM
    var _grids = document.querySelectorAll('.grid');
    var xAudio = document.getElementById("xAudio");
    var oAudio = document.getElementById("oAudio");

    // player clickEvents
    _grids.forEach((grid) => {
        grid.addEventListener('click', _render)
    });

    // reset board clickEvent
    _grids.forEach((grid) => {
        grid.addEventListener('click', _renderNewBoard)
    });

    // announce winner clickEvent
    _grids.forEach((grid) => {
        grid.addEventListener('click', checkWinner.analyser)
    });

    function _render(e) {
        var symbol = firstPlayer.playerSelector.slice(-1);

        if (e.target.innerText === "" && symbol.toString() === "✕" ) {
            e.target.innerHTML = symbol;
            e.target.setAttribute("animation", "animate");
            firstPlayer.playerSelector.push("O")
            xAudio.play();
            console.log(firstPlayer.playerSelector)

        } else if (e.target.innerText === "" && symbol.toString() === "O" ) {
            e.target.innerHTML = symbol;
            e.target.setAttribute("animation", "animate");
            firstPlayer.playerSelector.push("✕")
            oAudio.play();
            console.log(firstPlayer.playerSelector)
        }
    };

    function _renderNewBoard() {
        if (checkWinner.winner === true) {
            _grids.forEach(function(elem) {
                elem.innerHTML = "";
                elem.removeAttribute("animation")
            });
            checkWinner.winner = false;
            firstPlayer.playerSelector.splice(1);
        }
    }
})();