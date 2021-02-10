<div>
    <style>
        .gameContainer {
            width: 800px;
            margin: auto;
        }
        .gameBody {
            width: 800px;
            height: 600px;
            background: #22AA22;
            position: relative;
        }

        .title {
            text-align: center;
        }
        .controls {
            background: gray;
            width: 100%;
            height: 200px;
            position: absolute;
            bottom: 0;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }

        .endTurnButton {
            background: green;
            border: 1px solid black;
            border-radius: 5px;
            padding: 8px;
            margin: 8px;
        }
    </style>
    <div class="gameContainer">
        <h2 class="title">Aliens Don't Like Veggies</h2>
        <div id="gameBody" class="gameBody">
            <div id="gameControls" class="controls"></div>
        </div>
    </div>
</div>

<script src="vendor/pixi/pixi.min.js"></script>
<script src="vendor/jquery/dist/jquery.min.js"></script>
<script type="module" src="js/main.js"></script>