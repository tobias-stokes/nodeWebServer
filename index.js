// Initialize web server
const express = require('express');
const app = express();
const ips = viewIps();
const port = process.env.PORT || 3000;
    app.listen(port, (request, response) => {
        logStart();
    });
    app.use(express.static('public'));
    app.use(express.json());

// List ip Addresses
function viewIps() {
    'use strict';

    const { networkInterfaces } = require('os');

    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    return Object.values(results);
}

// Log start
function logStart() {
    console.log("");
        console.log('****************************************');
        console.log('* Starting web server          ');
        console.log(`*    Port set to ${port}       `);
        console.log(`*       Listening to URL's     `)
                for (let i = 0; i < ips.length; i++) {
                    console.log(`*          http://${ips[i]}:${port} `);
                }
        console.log('****************************************');
}