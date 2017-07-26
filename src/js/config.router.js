/**
 *   project:
 *   site:cbim,
 *   author：lize,
 *   time:2017/7/21
 */
angular.module('myApp')
app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
        url:'/index',
        templateUrl:'tpls/login.html',
        resolve:{
            load: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'js/login/loginCtrl.js'
                ]);
            }]
        }
    })
    .state('booklist',{
        url:'/{bookType:[0-9]{1,4}}',
        views:{
            '':{
                templateUrl:'tpls/booklist.html',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'js/booklist/booklistCtrl.js'
                        ]);
                    }]
                }
            },
            'bookgrid@booklist':{
                templateUrl:'tpls/bookname.html',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'js/booklistmodule/booklistmodule.js',
                            // 'js/bookDetailModule/bookDetailModule.js'
                        ]);
                    }]
                }
            }
        }
    })
})