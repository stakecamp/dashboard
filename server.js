const pathUtils = require('path');
const express = require('express');
const ge = require('greenlock-express');
const app = express();
const appDir = pathUtils.resolve(__dirname, './build');

app.use(express.static(appDir));

app.get('*', function (req, res) {
  res.sendFile(pathUtils.resolve(appDir, 'index.html'));
});

ge.init({
    maintainerEmail: 'info@stakecamp.com',
    packageRoot: __dirname,
    configDir: pathUtils.join(__dirname, 'greenlock.d'),
    cluster: false
})
// Serves on 80 and 443
// Get's SSL certificates magically!
.serve(app);