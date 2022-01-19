exports = function(changeEvent) {
  // get documents
  const fullDocument = changeEvent.fullDocument;
  const productDetails = fullDocument.productDetails
  const numInStock = fullDocument.numInStock;
  
  const get_customers_pipeline = [
    {
      '$match': {
        'productIWant': {
          '$in': [
            productDetails.sku
          ]
        }
      }
    }, {
      '$sort': {
        'lifeTimeValue': -1
      }
    }, {
      '$limit': numInStock
    }
  ]
  const guests_collection = context.services.get("mongodb-atlas").db("back_in_stock").collection("guests_2");
  
  guest_documents = guests_collection.aggregate(get_customers_pipeline);
  list_of_guest_documents = guest_documents.toArray();
  
  // list_of_guest_documents.forEach(guest => 
  //             console.log(guest.guestInfo.guest));
  
  var guest_number = 1
  list_of_guest_documents.forEach(guest => {
      var guestInfo = guest.guestInfo
      console.log("No. " + guest_number + ": " + guestInfo.guest + 
      ", Email: " + guestInfo.email +
      ", ProductDesired: " + productDetails.sku) 
      guest_number = guest_number + 1
    }
  );
  
  
  /*
  INPUT MESSAGING SERVICE HERE
  Call other named functions if they are defined in your application:
  const result = context.functions.execute("function_name", arg1, arg2);
  */
};
