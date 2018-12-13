#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const configFile = path.resolve(process.cwd(), 'upldng.config.json');
let config;
let endpoint;

if (fs.existsSync(configFile)) {
  config = JSON.parse(fs.readFileSync(configFile))
  endpoint = config.endpoint;
} else {
  console.error('No config file present in current directory.');
  process.exit(1);
}

const dir = path.resolve(process.cwd())

fs.readdir(dir, (err, files) => {
    const matched = files.filter(file => {
        let ln = file.length - 4;
        return (file.substr(ln) == '.jpg')
    })
    matched.forEach(image => {
        let imagePath = path.resolve(process.cwd(), image);
        let imageFile = fs.readFileSync(imagePath);
        axios.post(endpoint, {
                data: imageFile,
                name: image
            })
            .then(response => {
                console.log(`Upload of ${image} successful.`)
            })
            .catch(error => {
                console.log(error)
            });
    })
})