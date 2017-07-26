/**
 *   project:
 *   site:cbim,
 *   author：lize,
 *   time:2017/7/24
 */


//俩种写法，   可以自定义子模块     也可以   直接用；
// var  bookAddModule = angular.module('myApp.bookAddModule',['ngAnimate', 'ngSanitize','ui.bootstrap','ui.router']);
// bookAddModule.controller('bookAddCtrl',function($scope,$http,$state, $stateParams){
angular.module('myApp');
app.controller('bookAddCtrl',function($scope,$http,$state, $stateParams){
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
        function abf(){
            $scope.userInfo={};//空
            $scope.userInfo.dt = new Date();//日历
            $scope.popup2 = {
                opened: false
            };
            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };
            $scope.sites=[ //下拉列表
                {id:0,site:'计算机'},
                {id:1,site:'金融'},
                {id:2,site:'哲学'},
                {id:3,site:'历史'}
            ];
            $scope.userInfo.zw = '1';//默认选中一个
        };
        abf();//执行
        $scope.geto =function(user){
            $scope.userInfo = user
            console.log()
            console.log($scope.userInfo.dt.toISOString().slice(0,10))//日期格式化
            $http({
                url:'data/books5.json',
                method:'POST',
                data:$scope.userInfo,
                data:JSON.stringify($scope.userInfo)
            }).success(function(da){
                console.log(da);
                // console.log($stateParams);
                window.history.back();
            });
        };
        $scope.setFormData = function(){//清空
            abf();
        }
    })