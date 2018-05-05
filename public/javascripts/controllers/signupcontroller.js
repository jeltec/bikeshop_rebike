var app = angular.module('Bikeshop');

app.controller('signupController',['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.formData = {};

    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.passwordConf = '';

    //Reset our formData fields
    $scope.formData.email = '';
    $scope.formData.username = '';
    $scope.formData.password = '';
    $scope.formData.passwordConf = '';


    $scope.signUp = function(){
        $http.post('/users', $scope.formData)
            .success(function(data) {
                $scope.users = data;
                $location.path('/');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

]);

