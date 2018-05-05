var app = angular.module('Bikeshop');

app.controller('editdonationController', ['$scope','$http', '$location','sharedProperties', function($scope, $http,$location,sharedProperties) {
    if (window.performance) {
        console.info("window.performance works fine on this browser");
    }
    if (performance.navigation.type == 1) {
        $location.path('/donations');
        console.info( "This page is reloaded" );
    } else {
        console.info( "This page is not reloaded");
    }
    var id = sharedProperties.getProperty();

    $scope.message = "Donation edited!"
    $scope.formData = {};
    $scope.amount = 1000;
    $scope.options = [{ name: "PayPal", id: 0 }, { name: "Direct", id: 1 }];
    $scope.formData.paymentOptions = $scope.options[0];

    $scope.formData.paymenttype = 'PayPal';
    $scope.formData.amount = 1000;
    $scope.formData.upvotes = 0;

    $scope.edit = function () {
        $scope.formData.paymenttype = $scope.formData.paymentOptions.name;
            $http.put('/donations/' + id, $scope.formData)
                .success(function (data) {
                    console.log(data);
                    $location.path('/donations');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
}]);