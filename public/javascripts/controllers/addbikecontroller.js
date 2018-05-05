var app = angular.module('Bikeshop');

app.controller('addbikeController',['$scope', '$location', '$http', '$route',function($scope, $location, $http, $route) {
    $scope.formData = {};
    $scope.thanks = 'Thanks for donating!'
    $scope.message = 'Donate a bike!';
    $scope.year = 2018;
    $scope.goptions = [{name:'M', id:0},{name:'W',id:1}];
    $scope.formData.genderOptions = $scope.goptions[0];
    $scope.toptions = [{ name: 'Road bike', id: 0 }, { name: 'BMX', id: 1 }, { name: 'City bike', id: 2 },{ name: 'Mountain bike', id: 3 }];
    $scope.formData.bikeOptions = $scope.toptions[0];

    //Reset our formData fields
    $scope.formData.year = 2018;
    $scope.formData.brand='';
    $scope.formData.type = 'Road bike';
    $scope.formData.gender = 'M';
    $scope.formData.users = 0;

    $scope.addBike = function(){
        $scope.formData.type = $scope.formData.bikeOptions.name;
        $scope.formData.gender = $scope.formData.genderOptions.name;
        $http.post('/bikes', $scope.formData)
            .success(function(data) {
                $scope.bikes = data;
                $location.path('/bikes');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

]);

