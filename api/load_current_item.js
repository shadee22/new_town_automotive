

const fdb = require('./database/firebase');

const bodyParser = require('body-parser')
export default async function (req, res, next) {
    bodyParser.json()(req, res, async (err) => {
        if (err) {
            return next(err)
        }
        var out = []
        console.log('invoice_name ', req.body.invoice_name)
        console.log('item code ', req.body.item_code)
        let snapshot = await fdb.db.collection('Invoices').doc(req.body?.invoice_name)
            .collection('invoice_data').doc(req.body?.item_code).get()

        // console.log(snapshot);
        if (!snapshot) {
            res.end(JSON.stringify('Matching Not Found'));
            return;
            next();
        }
        try {
            // consolew.log('snapshot is ', snapshot.data());
            res.end(JSON.stringify({
                data : snapshot.data()
            }));
            return;
            next();

        } catch (error) {
            console.log('firebase error of snapshot ', error);
        }
        res.end(JSON.stringify('Something Went Wrong while getting firebase Data'));
        return;
        next();
    });
}