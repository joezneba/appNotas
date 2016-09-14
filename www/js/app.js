    (function(){
      var app = angular.module('starter', ['ionic','starter.notestore'])
      /*var notas = [
        {id:'1',titulo:'Nota 1', descripcion:'Descripcion 1'},
        {id:'2',titulo:'Nota 2', descripcion:'Descripcion 2'},
        {id:'3',titulo:'Nota 3', descripcion:'Descripcion 3'}
      ];
      function getNota(id){
        return notas.filter(function(nota){
          return nota.id === id;
        })[0];
      }
      function updateNota(nota) {
        for (var i = 0; i < notas.length; i++) {
         if(notas[i].id===nota.id){
           notas[i]=nota;
           return;
         }
        }
       }

       function createNota(nota){
         notas.push(nota);
       }

       app.factory('NoteStore',function(){
         var notas = [
           {id:'1',titulo:'Nota 1', descripcion:'Descripcion 1'},
           {id:'2',titulo:'Nota 2', descripcion:'Descripcion 2'},
           {id:'3',titulo:'Nota 3', descripcion:'Descripcion 3'}
         ];
         return{
           list: function(){
             return notas;
           },
           get:function(id){
             return notas.filter(function(nota){
               return nota.id === id;
             })[0];
           },
           create: function(nota){
             notas.push(nota);
           },
           update:function(nota){
             for (var i = 0; i < notas.length; i++) {
              if(notas[i].id===nota.id){
                notas[i]=nota;
                return;
              }
             }
           }
         };
       });
       */
      app.config(function($stateProvider, $urlRouterProvider){
        $stateProvider.state('list',{
          url:'/list',
          templateUrl:'templates/list.html'
        });
        $stateProvider.state('edit',{
          url:'/edit/:id',
          controller:'EditCtrl',
          templateUrl:'templates/edit.html'
        });
        $stateProvider.state('create',{
          url:'/create',
          controller:'CreateCtrl',
          templateUrl:'templates/edit.html'
        });
        $urlRouterProvider.otherwise('/list');

      });


      app.controller('ListCtrl',function($scope, NoteStore){
        $scope.notas= NoteStore.list();
        $scope.remove=function(id){
          NoteStore.remove(id);
        };
      });
      app.controller('EditCtrl',function($scope,$state,NoteStore){
        $scope.id=$state.params.id;
        $scope.nota=angular.copy(NoteStore.get($scope.id));
        $scope.save=function() {
          NoteStore.update($scope.nota);
          $state.go('list');0
        }
      });
      app.controller('CreateCtrl',function($scope,$state,NoteStore){
        $scope.nota={id:new Date().getTime().toString(),titulo:'',descripcion:''};
        $scope.save=function() {
          NoteStore.create($scope.nota);
          $state.go('list');
        };
      });

      app.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });
}());
