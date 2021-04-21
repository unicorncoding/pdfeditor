const path = require('path');
const cmd = require('node-cmd');
const express = require('express');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 8080;
const twoMb = 2048 * 1000;
const temporaryFileDir = '/tmp/';
const upload = multer({
  dest: temporaryFileDir,
  limits: {
    fileSize: twoMb
  }
});

app.use(express.static('public'));
app.get('/', (request, response) => {
  response.sendStatus(200);
});

app.post('/', upload.single('file'), (request, response) => {
  const pdfFilePath = request.file.path;
  // const moreArgs = `--external-hint-tool=ttfautohint --debug 1 --dest-dir ${temporaryFileDir}`;
  const moreArgs = `--debug 1 --dest-dir ${temporaryFileDir}`;
  const {err} = cmd.runSync(`pdf2htmlEX ${pdfFilePath} ${moreArgs}`);
  if (err) {
    throw err;
  }

  const htmlFilePath = temporaryFileDir + path.basename(pdfFilePath + '.html');
  response.type('html').sendFile(htmlFilePath);
});

app.use((error, request, response, _) => {
  response.status(500).type('json').send(error);
});

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});
