const data = require('./hlasovani_rady.json');
const fs = require('node:fs');

const a = data.data;

(Array(5).fill(0)).forEach((item, index) => {
  fs.writeFile(`${__dirname}/hlasovani_updated_${index}.json`, JSON.stringify(a.slice(index * 1000, (index +1) * 1000), null, 2), err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
})
