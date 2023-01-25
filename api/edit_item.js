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
                // invoice_name : $route.params.invoice_name ,
                // edited_data : this.form
                console.log(req.body?.edited_data);
                fdb.db.collection('Invoices').doc(req.body?.invoice_name).collection('invoice_data')
                    .doc(req.body?.edited_data.no).set(req.body?.edited_data , {merge : true}).then(res=>{
                        console.log(res)
                    }).catch(e=>{
                        console.log(e)
                    })


            } catch (error) {
                res.end(JSON.stringify("error on firebase : ") + error);
                return;
                next();
            }
            res.end(JSON.stringify("Invoice : " + req.body?.invoice_name + " and  Edited Succusfully"));
            return;
            next();
        }

        // console.log(fdb.db);
        res.end(JSON.stringify('Properly Not Found!(Firebase Error) '));
        return;
        next();
    });
}