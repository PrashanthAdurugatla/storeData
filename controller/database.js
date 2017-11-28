var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://me6564:Myaccount@8686@ds151955.mlab.com:51955/heroku_mfvpcggh';

/** getAllRoutes controller logic that current does model logic too -connects to Mongo database and
 * queries the Routes collection to retrieve all the routes and build the output usig the
 * ejs template mongodb.ejs found in views directory
 * @param request
 * @param response
 *
 */
module.exports.storeData =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of routes

        var info = JSON.parse(request.body.info);

        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);


        var Customers = db.collection('CUSTOMERS');

        var customerdata = {
            _id: customerID,
            FIRSTNAME: info.firstname,
            LASTNAME: info.lastname,
            STREET: info.address,
            CITY: info.city,
            STATE: info.state,
            ZIP: info.zipCode,
            PHONE: info.telephone
        };

        Customers.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        });




        var Billing = db.collection('BILLING');

        var billingdata = {
            _id: billingID,
            customerID
            NAME: card.name,
            TYPE: card.type,
            NUMBER: card.number,
            EXP: card.exp,
            SECURITYNUM: card.securitynum,

        };

        Billing.insertOne(billingdata, function (err, result){
            if (err) throw err;
        });

        var Shipping = db.collection('SHIPPING');

        var shippingdata = {
            _id: shippingID,
            customerID,
            STREET: info.address,
            CITY: info.city,
            STATE: info.state,
            ZIP: info.zipCode,

        };

        Shipping.insertOne(shippingdata, function (err, result){
            if (err) throw err;
        });

        var Orders = db.collection('ORDERS');

        var orderdata = {
           CustomerID,
           billingID,
            shippingID,
            DATE: info.date,
            ORDERTOTAL: cart,


        }

        //Showing in comments here some alternative read (find) requests
        //this gets Routes where frequency>=10 and sorts by name
        // Routes.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Routes by name
        //  Routes.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {

        response.send("success");
        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function