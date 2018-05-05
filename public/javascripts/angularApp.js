var app = angular.module('Bikeshop', ['ngRoute']);
app.service('sharedProperties',function () {
    var id;
    var sum = 0;
    return{
        getProperty:function () {
            return id;
        },
        setProperty:function (value) {
            id = value;
        },
        getSum:function () {
            return sum;
        },
        setSum:function (value) {
            sum = value;
        },
    }
});
app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

             // route for the donate page
            .when('/donate', {
                templateUrl : 'pages/donate.ejs',
                controller  : 'donateController'
            })

             // route for the donations page
            .when('/donations', {
                templateUrl : 'pages/donations.ejs',
                controller  : 'donationsController'
            })


            .when('/addbike', {
                templateUrl : 'pages/addbike.ejs',
                controller  : 'addbikeController'
            })

            .when('/bikes', {
                templateUrl : 'pages/bikes.ejs',
                controller  : 'bikesController'
            })

            .when('/signup', {
                templateUrl : 'pages/signup.ejs',
                controller  : 'signupController'
            })

            .when('/editdonation',{
                templateUrl : 'pages/editdonations.ejs',
                controller  : 'editdonationController'
            })

            .when('/showbike',{
                templateUrl : 'pages/showbike.ejs',
                controller  : 'showbikeController'
        });
    });


  
  


