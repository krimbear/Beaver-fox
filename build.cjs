const fs=require('fs');
const names=['forest','characters','children'];const urls=Object.fromEntries(names.map(n=>[n,'data:image/png;base64,'+fs.readFileSync('assets/'+n+'.png').toString('base64')]));
let html=fs.readFileSync('index.html','utf8'),css=fs.readFileSync('styles.css','utf8').replace(/^\uFEFF/,''),js=fs.readFileSync('game.js','utf8');
css=css.replace("url('assets/characters.png')",`url('${urls.characters}')`);
js='const EMBEDDED_IMAGES='+JSON.stringify(urls)+';\n'+js.replace('im.src=`assets/${name}.png`','im.src=EMBEDDED_IMAGES[name]');
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+css+'</style>').replace('<script src="game.js"></script>','<script>'+js+'</script>');
fs.writeFileSync('Beaver_Forest.html',html);
console.log('Standalone HTML created:',fs.statSync('Beaver_Forest.html').size,'bytes');

