"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const formidable_1 = __importDefault(require("formidable"));
const mv_1 = __importDefault(require("mv"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = 3000;
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.post('/upload', (req, res) => {
    var form = new formidable_1.default.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = __dirname + "/" + files.filetoupload.name;
        mv_1.default(oldpath, newpath, function (err) {
            if (err)
                throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
});
app.listen(port, () => console.log(`App listening on ${port}!`));
//# sourceMappingURL=app.js.map