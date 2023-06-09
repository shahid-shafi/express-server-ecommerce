const fs = require('fs');

const filename = '../data/myusers.json';
const fieldsToDelete = ['role'];

// Read the JSON data from the file
const jsonData = JSON.parse(fs.readFileSync(filename));

// Delete the specified fields from the JSON object
jsonData.forEach((item) => {
    for (const field of fieldsToDelete) {
        delete item[field];
    }
})

// Write the modified JSON data back to the file
fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));

console.log('Fields deleted successfully!');