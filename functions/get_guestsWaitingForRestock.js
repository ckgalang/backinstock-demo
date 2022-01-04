exports = function(changeEvent) {
  // get documents
  const fullDocument = changeEvent.fullDocument;
  const productDetails = fullDocument.productDetails
  const numInStock = fullDocument.numInStock;
  
  const get_customers_pipeline = [
    {
      '$match': {
        'productIWant': productDetails.sku
      }
    }, {
      '$sort': {
        'lifeTimeValue': -1
      }
    }, {
      '$limit': numInStock
    }
  ]
  const collection = context.services.get("mongodb-atlas").db("back_in_stock").collection("guests");
  
  guest_documents = collection.aggregate(get_customers_pipeline);
  list_of_guest_documents = guest_documents.toArray();
  
  list_of_guest_documents.forEach(guest => 
               console.log(guest));
  
  /*
  INPUT MESSAGING SERVICE HERE
  Call other named functions if they are defined in your application:
  const result = context.functions.execute("function_name", arg1, arg2);
  */
};
