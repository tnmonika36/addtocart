##Installation:

To run the Gadgets store application locally, follow these steps:

1.Clone the repository: Clone the project repository to your local machine using Git. 
Open your terminal or command prompt and run the following command:
git clone https://github.com/tnmonika36/addtocart.git


2. Install Node.js: If you haven't already, install Node.js from the official website: Node.js.

3. Install AngularJS using npm install angular.

4.Start the JSON server using the json-server package:
    npx json-server@0.17.4 product.json -p 3050

5.Open product.html in your browser.



# Features:

The Gadgets Store application's functionalities:

1.Add New Products:
Users have the option to input the product name and price.
Upon submission, the new product is added to the store's inventory.

2.View Available Products:
The application retrieves product data from a JSON server.
It then presents this data to users, allowing them to browse through the available products.

3.Add Products to the Push cart:
Users can easily add products to the push cart by clicking on a designated button associated with each product.

4.Manage the Push cart:
Users have the ability to adjust the quantity of products in their Push cart.
They can also remove products from the Push cart entirely if needed.

5.Calculate Total Price:
The application dynamically computes the total price of all items currently present in the Push cart.
It automatically updates this total whenever changes are made to the contents of the Push cart.