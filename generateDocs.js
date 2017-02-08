// sample usage:
// node generateDocs.js ../Algebrite/sources/

var fs = require('fs');
 
 
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var path = process.argv[2];
 
items = fs.readdirSync(path);
console.log(items);

for (var i=0; i<items.length; i++) {
    console.log(items[i]);
    if (items[i].endsWith(".coffee")){
      var contents = fs.readFileSync(path + "" + items[i], 'utf8');

      var generatedTiddler = "";
      generatedTiddler += "title: " + items[i] + "\n\n"


      const regex = /###\w*=*[\S\s]*?###/mg;
      let m;
      while ((m = regex.exec(contents)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }
          
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
              //console.log(`Found match, group ${groupIndex}: ${match}`);
              generatedTiddler += match.replace(/###\s*/,"").replace(/=====*/,"");
          });
      }

      fs.writeFileSync(items[i] + ".tid", generatedTiddler)


    }
}
