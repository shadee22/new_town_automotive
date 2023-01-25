

const fdb = require('./database/firebase');

const bodyParser = require('body-parser')
export default async function (req, res, next) {

    let snapshot = await fdb.db.collection('Invoices');
    await  bodyParser.json()(req, res, async (err) => {
        if (err) {
            return next(err)
        }
        if(req.body?.invoice_name){
            snapshot = await fdb.db.collection('Invoices').doc(req.body?.invoice_name).collection('invoice_data').get().then(res=>{
                return res
            })
            // HHEHHE
            // console.log(snapshot);
            if (snapshot.empty) {
                res.end(JSON.stringify('Mathcing Not Found'));
                return;
                next();
            }
            // if(req.body?.invoice_name !== undefined){
            try {
                var arr = {}
                var array = []
                function json_res(snap) {
                    snap?.forEach(doc => {
                        arr[doc.id] = (doc.data())
                        array.push(doc.data())
                    })
                }
                json_res(snapshot)
                // console.log(json_res(snapshot));
                res.end(JSON.stringify(
                    {
                        obj: arr,
                        arr: array
                    }
                ));
                return;
                next();
    
            } catch (error) {
                console.log('firebase error of snapshot ', error);
            }
        }
        // }

        // console.log(fdb.db);
        res.end(JSON.stringify('Something Went Wrong while getting firebase Data'));
        return;
        next();
    });
}