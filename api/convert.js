const fdb = require('./database/firebase');
const json2xls = require('json2xls');

const bodyParser = require('body-parser')
export default function (req, res, next) {

    bodyParser.json()(req, res, (err) => {
        if (err) {
            return next(err)
        }
        if (req.body !== undefined) {
            var json = req.body?.data;
            var xls = json2xls(json);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(xls, 'binary');
            return;
            next();
        }

        // console.log(fdb.db);
        res.end(JSON.stringify('Properly Not Found!(Firebase Error) '));
        return;
        next();
    });
}