var app = angular.module('Bikeshop');
app.controller('mainController',['$scope', require('./maincontroller')]);
app.controller('donateController', ['$scope', '$location', '$http','$route', require('./donatecontroller')]);
app.controller('donationsController',['$scope','$http', '$location','$route','sharedProperties', require('./donationscontroller')]);
app.controller('aboutController',['$scope', require('./aboutcontroller')]);
app.controller('contactController',['$scope', require('./contactcontroller')]);
app.controller('addbikeController', ['$scope', '$location', '$http', '$route',require('./addbikecontroller')]);
app.controller('bikesController',['$scope','$http', '$location','sharedProperties',require('./bikescontroller')]);
app.controller('signupController', ['$scope', '$location', '$http', require('./signupcontroller')]);
app.controller('editdonationController', ['$scope', '$location', '$http', require('./editdonationcontroller')]);
app.controller('showbikeController', ['$scope','$http', '$location','sharedProperties', require('./showbikecontroller')]);