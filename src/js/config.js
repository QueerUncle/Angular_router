/**
 *   project:
 *   site:cbim,
 *   author：lize,
 *   time:2017/7/11
 */
angular.module("myApp");

app.run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
    }]);
// 按模块化加载其他的脚本文件
app.constant('Modules_Config', [
    {
        name: 'treeControl',
        serie: true,
        files: [
            "Scripts/angular-bootstrap/ui-bootstrap-tpls-0.14.3.min.js"
        ]
    }
]);
app.config(["$ocLazyLoadProvider","Modules_Config",routeFn]);
function routeFn($ocLazyLoadProvider,Modules_Config){
    $ocLazyLoadProvider.config({
        debug:false,
        events:false,
        modules:Modules_Config
    });
};