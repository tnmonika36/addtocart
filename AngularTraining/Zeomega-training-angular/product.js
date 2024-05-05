
        var appProduct = angular.module('appProduct', []);
        appProduct.service("productService", function($http){
            var baseUrl = "http://localhost:3050/products";
            this.products = [];
            this.cartProducts = [];
            this.cartTotal = 0;

            // Get products from the server
            this.getProducts = function() {
                return $http.get(baseUrl)
                            .then(function(response) {
                                this.products = response.data; // Update products array
                                return response.data;
                            }.bind(this)); // Bind the context
            }

            // Add new product to the server
            this.addNewProduct = function (productname, productprice) {
                var newProduct = {
                    name: productname,
                    cost: productprice
                };

                return $http.post(baseUrl, newProduct)
                            .then(function(response) {
                                this.products.push(response.data); // Add new product to array
                                return response.data;
                            }.bind(this)); // Bind the context
            }

            this.addToCart = function (id) {
                var existingProduct = this.cartProducts.find(function(item) { // Find product by id
                    return item.id === id;
                });

                // If the product is already in the cart, increase its quantity
                if (existingProduct) {
                    existingProduct.cartProductQuantity++;
                    this.totalCart(); // Recalculate cart total
                } else {
                    var product = this.products.find(function(item) { // Find product by id
                        return item.id === id;
                    });

                    // If the product is valid, add it to the cart
                    if (product) {
                        this.cartProducts.push({
                            id: product.id,
                            cartProductname: product.name,
                            cartProductprice: product.cost,
                            cartProductQuantity: 1
                        });
                        this.totalCart(); // Recalculate cart total
                    }
                }
            }

            // Calculate cart total
            this.totalCart = function (){
                this.cartTotal = this.cartProducts.reduce(function(total, product) {
                    return total + (product.cartProductprice * product.cartProductQuantity);
                }, 0);
            }

            this.removeFromCart = function (idx){
                var index = this.cartProducts.findIndex(function(item) {
                    return item.id === idx;
                });
                if (index !== -1) {
                    // confirmation message is displayed before removing the product from cart
                    var confirmMsg = confirm("Would you like to delete Product from your cart?");
                    if (confirmMsg){
                        var removedProduct = this.cartProducts[index];
                        var removedProductTotal = removedProduct.cartProductprice * removedProduct.cartProductQuantity;
                        this.cartTotal -= removedProductTotal;
                        this.cartProducts.splice(index, 1);
                    }
                }
            }

            //to calculate cart total after incrementing the product quantity
            this.increment = function (idx) {
                var product = this.cartProducts.find(function(item) {
                    return item.id === idx;
                });
                if (product) {
                    product.cartProductQuantity++;
                    this.totalCart(); // Recalculate cart total
                }
            }

            //to calculate cart total after decrementing the product quantity
            this.decrement = function (idx) {
                var product = this.cartProducts.find(function(item) {
                    return item.id === idx;
                });
                if (product && product.cartProductQuantity > 1) {
                    product.cartProductQuantity--;
                    this.totalCart(); // Recalculate cart total
                }
            }

        }) 

        appProduct.controller("productController", function($scope, productService){
            $scope.products = [];
            $scope.cartProducts = productService.cartProducts;
            $scope.cartTotal = productService.cartTotal;
            $scope.productname = '';
            $scope.productprice='';
            $scope.regexPattern = /^[0-9!@#$%^&*(),.?":{}|<>]+$/;
            
            // Function to check for valid input
            $scope.isValidInput = function(inputValue) {
                return $scope.regexPattern.test(inputValue);
            };

            // Get products from the server
            productService.getProducts().then(function(data) {
                $scope.products = data;
            });

            $scope.addNewProduct = function() {
                var isValid = $scope.isValidInput($scope.productname);
                if (isValid) {
                    alert('Please enter valid product Name');
                    $scope.productname = '';
                }
                else{
                    productService.addNewProduct($scope.productname, $scope.productprice).then(function(data) {
                        $scope.products.push(data);
                        $scope.productname = '';
                        $scope.productprice = '';
                    });
                }
            }

            $scope.addToCart = function(id) {
                productService.addToCart(id);
                $scope.cartTotal = productService.cartTotal;
            }

            $scope.removeFromCart = function(idx) {
                productService.removeFromCart(idx);
                $scope.cartTotal = productService.cartTotal;
            }

            $scope.increment = function (id){
                productService.increment(id);
                $scope.cartTotal = productService.cartTotal
            }

            $scope.decrement = function (id){
                productService.decrement(id);
                $scope.cartTotal = productService.cartTotal
            }
        })
   