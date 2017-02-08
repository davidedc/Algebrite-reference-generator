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


      // isolate header comments
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
              generatedTiddler = match.replace(/###\s*/,"").replace(/=====*/,"");

              // isolate tags
              var tags = [];
              const regexTags = /Tags\s*-*([\S\s]*?)^[\w ]*\s---/mg;
              let m2;
              while ((m2 = regexTags.exec(generatedTiddler)) !== null) {
                  // This is necessary to avoid infinite loops with zero-width matches
                  if (m2.index === regexTags.lastIndex) {
                      regexTags.lastIndex++;
                  }
                  
                  // The result can be accessed through the `m2`-variable.
                  m2.forEach((match2, groupIndex2) => {
                      if (groupIndex2 != 0) {
                      //console.log(`Found match, group ${groupIndex2}: ${match2}`);
                      tags = match2.split(',').map(eachString => eachString.trim().replace(/ /g,"_"));
                      console.log("tags: " + tags.toString());
                    }
                  });
              }

          });



      }

      fs.writeFileSync(items[i] + ".tid", generatedTiddler)


    }
}
