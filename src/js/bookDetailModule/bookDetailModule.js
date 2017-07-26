/**
 *   project:
 *   site:cbim,
 *   author：lize,
 *   time:2017/7/24
 */


//俩种写法，   可以自定义子模块     也可以   直接用；
// var bookDetailModule = angular.module('myApp.bookDetailModule',[]);

    // bookDetailModule.controller('bookDetail',function($scope,$http,$state,$stateParams){
    //     console.log($stateParams);
    // })
angular.module('myApp')
app.controller('bookDetail',function($scope,$http,$state,$stateParams){
    console.log($stateParams);
})