var app = angular.module('bloggerApp', ['ngRoute', 'ui.router']);

//*** Router Provider ***
app.config(function($routeProvider) {
  $routeProvider
      .when('/', {
	      templateUrl: 'pages/index.html',
		  controller: 'IndexController',
          controllerAs: 'vm'
		  })

      .when('/blog-list', {
	      templateUrl: 'pages/blog-list.html',
		  controller : 'ListController',
          controllerAs: 'vm'
		  })

      .when('/blog-add', {
	      templateUrl: 'pages/blog-add.html',
		  controller: 'AddController',
          controllerAs: 'vm'
		  })
    
        .when('/blog-edit/:id', {
	      templateUrl: 'pages/blog-edit.html',
		  controller: 'EditController',
          controllerAs: 'vm'
		  })
    
        .when('/blog-delete/:id', {
	      templateUrl: 'pages/blog-delete.html',
		  controller: 'DeleteController',
          controllerAs: 'vm'
		  })

      .otherwise({redirectTo: '/'});
    });


//*** State provider ***
app.config(function($stateProvider) {
    $stateProvider
        .state('blog-list', {
          url: '/blog-list',
          templateUrl: 'pages/blog-list.html',
          controller : 'ListController'
        });
});


//*** REST Web API functions ***
function getAllBlogs($http) {
    return $http.get('/api/blogs');
}

function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, id, data) {
    return $http.put('/api/blogs/' + id, data);
}

function addBlog($http, data) {
    return $http.post('/api/blogs/', data);
}

function deleteBlogById($http, id) {
    return $http.delete('/api/blogs/' + id);
}


//*** Controllers ***
app.controller('IndexController', function IndexController() {
    var vm = this;
    vm.pageHeader = {
        title: "Alex' Blog"
    };
    vm.message = "This is my blog site";
});

app.controller('ListController', function ListController($http) {
    var vm = this;
    vm.pageHeader = {
        title: 'Blog List'
    };
    
    getAllBlogs($http)
      .success(function(data) {
        vm.blogs = data;
        vm.message = "Blog data found!";
      })
      .error(function (e) {
        vm.message = "Could not get list of blogs";
      });
});

app.controller('AddController', [ '$http', '$routeParams', '$state', function AddController($http, $routeParams, $state) {
    var vm = this;
    vm.blog = {};
    vm.pageHeader = {
        title: 'Blog Add'
    }; 
    
    vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogText = userForm.blogText.value;
               
        addBlog($http, data)
          .success(function(data) {
            vm.message = "Blog data added!";
            $state.go('blog-list');
          })
          .error(function (e) {
            vm.message = "Could not add blog " + userForm.blogTitle.text + " " + userForm.blogText.text;
          });
    }
}]);

app.controller('EditController', [ '$http', '$routeParams', '$state', function EditController($http, $routeParams, $state) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Blog Edit'
    };
    
    getBlogById($http, vm.id)
      .success(function(data) {
        vm.blog = data;
        vm.message = "Blog data found!";
      })
      .error(function (e) {
        vm.message = "Could not get blog given id of " + vm.id;
      });
    
    vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogText = userForm.blogText.value;
               
        updateBlogById($http, vm.id, data)
          .success(function(data) {
            vm.message = "Blog data updated!";
            $state.go('blog-list');
          })
          .error(function (e) {
            vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
          });
    }
}]);

app.controller('DeleteController', [ '$http', '$routeParams', '$state', function DeleteController($http, $routeParams, $state) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Blog Delete'
    };
    
    getBlogById($http, vm.id)
      .success(function(data) {
        vm.blog = data;
        vm.message = "Blog data found!";
      })
      .error(function (e) {
        vm.message = "Could not get blog given id of " + vm.id;
      });
    
    vm.submit = function() {
        var data = {};      
        deleteBlogById($http, vm.id)
          .success(function(data) {
            vm.message = "Blog data deleted!";
            $state.go('blog-list');
          })
          .error(function (e) {
            vm.message = "Could not delete blog given id of " + vm.id;
          });
    }
    
    vm.cancel = function() {
        $state.go('blog-list');
    }
}]);