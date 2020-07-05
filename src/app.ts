import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'formidable';
import mv from 'mv';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get('/', (req, res) => res.sendFile(__dirname +'/index.html'))
app.post('/upload',(req,res) => {
     var form = new formidable.IncomingForm();
     form.parse(req, function (err, fields, files) {
     var oldpath = files.filetoupload.path;
     var newpath = __dirname + "/" + files.filetoupload.name;
     mv(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
         
          res.end();
          });
     });
});
app.listen(port, () => console.log(`App listening on ${port}!`));