var compressor = require('node-minify');
var fs = require('fs');


const LEVEL_CONFIG_DIR = 'src/level-conf'
var levelConfigurations = fs.readdirSync(LEVEL_CONFIG_DIR);

levelConfigurations.forEach(dir => {
  const leveldir = LEVEL_CONFIG_DIR + '/' + dir;
  try{
    fs.readdirSync(leveldir);
    buildLevel(leveldir);
  } catch(err){
    console.log(leveldir, ' is not a directory');
  }
});

compressor.minify({
    compressor: 'no-compress',
    input: ['src/**/*.js' ],
    output: 'dist/game.js',
    callback: function (err, min) {}
});

compressor.minify({
  compressor: 'uglifyjs',
  input: ['src/**/*.js'],
  output: 'dist/game.min.js',
  callback: function (err, min) {}
});

function buildLevel(leveldir){
  console.log("Building level from directory: ", leveldir);
  const levelConfig = JSON.parse(fs.readFileSync(leveldir + '/config.json', 'utf-8'));

  let levelData = '';
  const levelOutputPath = 'src/levels/' + levelConfig.levelName + 'level.js';
  levelData += `var ${levelConfig.levelName}HalfwayPoint = ${levelConfig.halfwayPoint};\n`;
  levelData += `var ${levelConfig.levelName}BossPoint = ${levelConfig.screens - 2};\n`;
  levelData += `var ${levelConfig.levelName}maps = [];\n\n`;

  for(var i = 1; i <= levelConfig.screens; i++){
    var file = fs.readFileSync(leveldir + '/' + levelConfig.levelName + i + '.json', 'utf-8');
    levelData += `${levelConfig.levelName}maps[${i - 1}] = ${file.replace(/\s/g,'')}\n`;
  }
  
  const levelFile = fs.writeFileSync(levelOutputPath, levelData);
  
}
