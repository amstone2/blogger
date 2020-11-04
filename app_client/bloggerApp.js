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
      .when('/login', {
	      templateUrl: 'auth/login.view.html',
		  controller: 'LoginController',
          controllerAs: 'vm'
      })
      .when('/register', {
	      templateUrl: 'auth/register.view.html',
		  controller: 'RegisterController',
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

function updateBlogById($http, authentication, id, data) {
  return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function addBlog($http, authentication, data) {
    return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function deleteBlogById($http, authentication, id) {
    return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
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
    
    getAllBlogs($http, authentication)
      .success(function(data) {
        vm.blogs = data;
        vm.message = "Blog data found!";
      })
      .error(function (e) {
        vm.message = "Could not get list of blogs";
      });
});

app.controller('AddController', [ '$http', '$routeParams', '$state', 'authentication', function AddController($http, $routeParams, $state, authentication) {
    var vm = this;
    vm.blog = {};
    vm.pageHeader = {
        title: 'Blog Add'
    }; 
    
    vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogText = userForm.blogText.value;
               
        addBlog($http, authentication, data)
          .success(function(data) {
            vm.message = "Blog data added!";
            $state.go('blog-list');
          })
          .error(function (e) {
            vm.message = "Could not add blog " + userForm.blogTitle.text + " " + userForm.blogText.text;
          });
    }
}]);

app.controller('EditController', [ '$http', '$routeParams', '$state', 'authentication', function EditController($http, $routeParams, $state, authentication) {
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
               
        updateBlogById($http, authentication, vm.id, data)
          .success(function(data) {
            vm.message = "Blog data updated!";
            $state.go('blog-list');
          })
          .error(function (e) {
            vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
          });
    }
}]);

app.controller('DeleteController', [ '$http', '$routeParams', '$state', 'authentication', function DeleteController($http, $routeParams, $state, authentication) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Blog Delete'
    };
    
    getBlogById($http, authentication,  vm.id)
      .success(function(data) {
        vm.blog = data;
        vm.message = "Blog data found!";
      })
      .error(function (e) {
        vm.message = "Could not get blog given id of " + vm.id;
      });
    
    vm.submit = function() {
        var data = {};      
        deleteBlogById($http, authentication, vm.id)
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

/** 
app.controller('RegisterController', [ '$http', '$location', 'authentication', function RegisterController($htttp, $location, authentication) {
  var vm = this;
  
  vm.pageHeader = {
    title: 'Create a new Blooger account'
  };
  
  vm.credentials = {
    name : "",
    email : "",
    password : ""
  };
  
  vm.returnPage = $location.search().page || '/';
  
  vm.onSubmit = function () {
    vm.formError = "";
    if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
      vm.formError = "All fields required, please try again";
      return false;
    } else {
      vm.doRegister();
    }
  };

  vm.doRegister = function() {
    vm.formError = "";
    authentication
      .register(vm.credentials)
      .error(function(err){
        vm.formError = "Error registering. Try again with a different email address."
        //vm.formError = err;
      })
      .then(function(){
        $location.search('page', null); 
        $location.path(vm.returnPage);
      });
  };
}]);

app.controller('LoginController', [ '$http', '$location', 'authentication', function LoginController($htttp, $location, authentication) {
  var vm = this;

  vm.pageHeader = {
    title: 'Sign in to Blogger'
  };

  vm.credentials = {
    email : "",
    password : ""
  };

  vm.returnPage = $location.search().page || '/';

  vm.onSubmit = function () {
    vm.formError = "";
    if (!vm.credentials.email || !vm.credentials.password) {
         vm.formError = "All fields required, please try again";
      return false;
    } else {
         vm.doLogin();
    }
  };

  vm.doLogin = function() {
    vm.formError = "";
    authentication
      .login(vm.credentials)
      .error(function(err){
        var obj = err;
        vm.formError = obj.message;
      })
      .then(function(){
        $location.search('page', null); 
        $location.path(vm.returnPage);
      });
  };
}]); 

*/
