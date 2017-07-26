/**
 *   project:
 *   site:cbim,
 *   author：lize,
 *   time:2017/7/21
 */
app.controller('loginCtrl',function($scope,$state){
    $scope.user = {   //录入用户输入的。
        email:'',
        password:''
    };
    $scope.arrs = {   //这个可以在cookie里取。
        email:'lz@136.com',
        possword:'123456'
    };
    $scope.compare = function(user){
        $scope.user = user;
        $scope.semail = angular.equals($scope.user.email,$scope.arrs.email)//对比email;
        $scope.spossword = angular.equals($scope.user.possword,$scope.arrs.possword)//对比密码；
        if($scope.semail&&$scope.spossword){
            // console.log('用户名不对');
            // SweetAlert.swal('登录成功','欢迎登录','success');
            alert("登录成功")
            // $state.go('.booklist')
        }else{
            alert("登录失败")
            // $state.go('.booklist')
            // SweetAlert.swal('登录失败','用户名及密码错误','error');
        }
    }
})