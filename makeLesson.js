path = require('path');
let fs = require('fs');

let theme = process.argv[2]

const HTML_TEMPLATE = `<!doctype html>
<html lang="en">
<head>
\t<meta charset="UTF-8">
\t<meta name="viewport"
\t\t\tcontent="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
\t<meta http-equiv="X-UA-Compatible" content="ie=edge">
\t<title>${theme[0].toUpperCase() + theme.slice(1)}</title>
</head>
<body>

<script src="app.js"></script>
</body>
</html>`

let themeDir = path.resolve(__dirname, theme)


fs.mkdir(themeDir, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('dir created');
})

fs.writeFile(
    path.resolve(themeDir, "index.html"),
    HTML_TEMPLATE,
    'utf8',
    (err) => {
        if (err) throw err;

        console.log('html done');
    }
)
fs.writeFile(
    path.resolve(themeDir, "app.js"),
    '',
    'utf8',
    (err) => {
        if (err) throw err;

        console.log('js done');
    }
);