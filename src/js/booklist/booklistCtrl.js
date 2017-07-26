/**
 *   project:
 *   site:cbim,
 *   author：lize,
 *   time:2017/7/21
 */
app.controller('bookListCtrl',function($scope,$http){
    //这是左侧导航栏
    $scope.booklist = [];
    $http.get('../src/data/bookslist.json').success(function(res){
        $scope.booklist = res;
        console.log($scope.booklist);
    })
})
app.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('bookdetail', {
            url: '/bookdetail/:bookId',//注意这里在路由中传参数的方式
            views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                    templateUrl: 'tpls/bookList.html'
                },
                'seebook@bookdetail':{
                    // url: '/bookdetail',
                    templateUrl: 'tpls/bookDetail.html',
                    controller:'bookDetail',
                    resolve:{
                        load: ['$ocLazyLoad', function($ocLazyLoad){
                            return $ocLazyLoad.load([
                                'js/bookDetailModule/bookDetailModule.js'
                            ]);
                        }]
                    }
                }
            }
            // templateUrl: 'tpls/addBookForm.html'
        })
    .state('addbook',{
        url:'/addbook',
        views:{
            '':{
                templateUrl: 'tpls/bookList.html'
            },
            'addbook@addbook':{
                templateUrl: 'tpls/addBookForm.html',
                controller:'bookAddCtrl',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'js/bookAddModule/bookAddModule.js'
                        ]);
                    }]
                }
            }
        }
    })
});


