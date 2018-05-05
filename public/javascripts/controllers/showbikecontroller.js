var app = angular.module('Bikeshop');

app.controller('showbikeController', ['$scope','$http', '$location','sharedProperties', function($scope, $http,$location,sharedProperties) {
    var Bid = sharedProperties.getProperty();

    findOne(Bid);
    if (window.performance) {
        console.info("window.performance works fine on this browser");
    }
    if (performance.navigation.type == 1) {
        $location.path('/bikes');
        console.info( "This page is reloaded" );
    } else {
        console.info( "This page is not reloaded");
    }
    function findOne(id) {
            $http.get('/bikes/'+Bid)
                .success(function (data) {
                    sharedProperties.setProperty(Bid);
                    $scope.bikes = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
}]);