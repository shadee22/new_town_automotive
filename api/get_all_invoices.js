const fdb = require('./database/firebase');

const bodyParser = require('body-parser')
export default async function (req, res, next) {

    const snapshot = await fdb.db.collection('Invoices').get().then(res => {
        return res
    });
    bodyParser.json()(req, res, (err) => {
        if (err) {
            return next(err)
        }
        try {
            var docs = []
            snapshot.forEach(doc => {
                docs.push(doc.id)
            });
            res.end(JSON.stringify(docs));
            return;
            next();

        } catch (error) {
            console.log('firebase error of snapshot ', error);
        }
        // console.log(fdb.db);
        res.end(JSON.stringify('Something Went Wrong while getting firebase Data'));
        return;
        next();
    });
}