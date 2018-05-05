var app = angular.module('Bikeshop');

app.controller('donateController', ['$scope', '$location', '$http', '$route', function($scope, $location, $http,$route) {
    $scope.formData = {};
    $scope.message = 'Help us so we can help the people from Waterford';
    $scope.amount = 1000;
    $scope.options = [{ name: "PayPal", id: 0 }, { name: "Direct", id: 1 }];
    $scope.formData.paymentOptions = $scope.options[0];

    //Reset our formData fields
    $scope.formData.paymenttype = 'PayPal';
    $scope.formData.amount = 1000;
    $scope.formData.upvotes = 0;

    $scope.addDonation = function(){
      $scope.formData.paymenttype = $scope.formData.paymentOptions.name;
       $http.post('/donations', $scope.formData)
            .success(function(data) {
                $scope.donations = data;
                $location.path('/donations');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
              });
            };
  }
  ]);
