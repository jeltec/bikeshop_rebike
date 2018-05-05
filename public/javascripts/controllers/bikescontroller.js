var app = angular.module('Bikeshop');


app.controller('bikesController',['$scope','$http', '$location', 'sharedProperties',function($scope, $http, $location, sharedProperties) {
    // create a message to display in our view
    var filter;
    var arr = [];

    $scope.message = 'Thanks everyone for donating!';
    findAll();

    function findAll() {
        $http.get('/bikes')
            .success(function (data) {
                $scope.bikes = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.incrementUsers= function(id){
        $http.put('/bikes/' + id + '/users')
            .success(function(data) {
                findAll();
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete?")) {
            console.log('Deleting id : ' + id);
            $http.delete('/bikes/' + id)
                .success(function(data) {
                    console.log(data);
                    findAll();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }

    $scope.find = function(id){
            sharedProperties.setProperty(id);
            $http.get('/bikes/'+sharedProperties.getProperty())
                .success(function(data) {
                    $scope.bikes = data;
                    $location.path('/showbike');
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
    }
}]);