const fdb = require('./database/firebase');

const bodyParser = require('body-parser')
export default function (req, res, next) {

    bodyParser.json()(req, res, (err) => {
        if (err) {
            return next(err)
        }
        if (req.body?.invoice_name !== undefined) {
            const currentTime = new Date();
            try {
                fdb.db.collection('Invoices').doc(req.body?.invoice_name).set({
                    invoice_name: req.body?.invoice_name,
                    timestamp: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds()
                });

                fdb.db.collection('Invoices').doc(req.body?.invoice_name).collection('invoice_data')
                    .doc(req.body?.form.no).set(req.body?.form)
            } catch (error) {
                res.end(JSON.stringify("error on firebase : ") + error);
                return;
                next();
            }
            res.end(JSON.stringify("Invoice : " + req.body?.invoice_name + " Created Succusfully"));
            return;
            next();
        }

        // console.log(fdb.db);
        res.end(JSON.stringify('No Proper Invoice Not Found found'));
        return;
        next();
    });
}