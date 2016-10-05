enchant();

window.onload = function() {
  var X = 320;
  var Y = 320;
  var core = new Core(X, Y);
  core.preload('chara1.png');
  core.fps = 15;
  core.onload = function() {
    var bear = new Sprite(32, 32);
    bear.image = core.assets['chara1.png'];
    bear.x = 0;
    bear.y = 0;

    bear.addEventListener('enterframe', function() {
      this.x += 10;
      if (this.x > X) this.x = 0;
    });

    core.rootScene.addChild(bear);
  }
  core.start();
}

