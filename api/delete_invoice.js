const fdb = require('./database/firebase');

const bodyParser = require('body-parser')
export default async function (req, res, next) {
    
    bodyParser.json()(req, res, async (err) => {
        if (err) {
            return next(err)
        }
        if(req.body?.invoice_name){
            try {
                fdb.db.collection('Invoices').doc(req.body?.invoice_name).delete().then(res=>{
                    console.log('deleted document' , res);
                });
                console.log(req.body.invoice_name)
                res.end(JSON.stringify('document deleted'));
                return;
                next();
    
            } catch (error) {
                console.log('firebase error of snapshot ', error);
            }
        }
        
        // console.log(fdb.db);
        res.end(JSON.stringify('Something Went Wrong while getting firebase Data'));
        return;
        next();
    });
}