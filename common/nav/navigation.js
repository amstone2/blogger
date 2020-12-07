var app = angular.module('bloggerApp');

//*** Directives ***
app.directive('navigation', function() {
    return {
      restrict: 'EA',
      templateUrl: '/nav/navigation.html',
      controller: 'NavigationController',
      controllerAs: 'vm'
    };
});

//*** Controller ***
app.controller('NavigationController', ['$state', '$location', 'authentication', function NavigationController($state, $location, authentication) {
    var vm = this;
    vm.currentPath = $location.path();
    vm.currentUser = function()  {
        return authentication.currentUser();
    }
    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    };
}]);