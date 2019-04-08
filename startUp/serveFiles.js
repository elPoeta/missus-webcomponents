const path = require('path');
const express = require('express');

module.exports = app => {
    app.use('/src', express.static(path.resolve(__dirname, "../client", "src")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "public/index.html"));
    });

}