var app = angular.module('Bikeshop');


app.controller('donationsController', ['$scope','$http', '$location', '$route', 'sharedProperties',function($scope, $http,$location,$route,sharedProperties) {
    // create a message to display in our view
    //$scope.message = 'Donations Page!';


    var am = sharedProperties.getSum();
    $scope.amount = am;

    findAll();

    function findAll() {
        sharedProperties.setSum(0);
        am = sharedProperties.getSum();
        $http.get('/donations')
            .success(function (data) {
                $scope.$applyAsync(function () {
                    $scope.donations = data;
                    $scope.donations.forEach(function(item){
                        am += parseInt(item.amount);
                        console.log(am);
                        console.log(data);
                    });
                    sharedProperties.setSum(am) ;
                    $scope.amount = sharedProperties.getSum();
                })
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    $scope.incrementUpvotes = function(id){
          $http.put('/donations/' + id + '/votes')
            .success(function(data) {
                console.log(data);
                findAll();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
          }

    $scope.delete = function(id) {

      if (confirm("Are you sure you want to delete this donation?")) {
              console.log('Deleting id : ' + id);
        $http.delete('/donations/' + id)
            .success(function(data) {
                console.log(data);
                findAll();
                $route.reload('/donations');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
          }
    }

    $scope.find = function(id){
        if (confirm("Are you sure you want to edit this donation?")) {
            sharedProperties.setProperty(id);
            $location.path('/editdonation')
        }
    }
  }
  ]);
