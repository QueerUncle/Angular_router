/**
 *   project:
 *   site:cbim,
 *   author：lize,
 *   time:2017/7/21
 */
var bookListModule = angular.module('myApp.bookListModel',[]);
bookListModule.controller('bookListModuleCtrl',function($scope,$http,$state,$stateParams){
    //这是分页内容
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItens = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize:5,
        currentPage:1
    };
    $scope.setPagingData = function(data,page,pageSize){
        var pageData = data.slice((page - 1)*pageSize,page*pageSize);
        $scope.books = pageData;
        $scope.totalServerItems = data.length;
        if(!$scope.$$phase){
            //$$phase 是 angluar 内部使用的状态标志位，用于标识当前是否处于 digest 状态。
            $scope.$apply();
        }
    };
    console.log($stateParams);
    $scope.getPagedDataAsync = function(pageSize,page,searchText){
        setTimeout(function(){
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('./data/books' + $stateParams.bookType + '.json')//通过传值调用不同json
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else{
                $http.get('/angular_resouer/src/data/books'+$stateParams.bookType+'.json')
                    //可写全路径，也可以写相对路径
                    .success(function(res){
                        console.log(res)
                        console.log(page)
                        console.log(pageSize)
                        $scope.setPagingData(res,page,pageSize);
                    })
            }
        },100);
    };
        console.log($scope.pagingOptions.pageSize)
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    $scope.$watch('pagingOptions',function(newVal,oldVal){
        if(newVal !==oldVal && newVal.currentPage !==oldVal.currentPage){
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage,$scope.filterOptions.filterText);
        }
    },true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'books',//表格中显示的数据来源
        rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
        '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
        '<div ng-cell></div>' +
        '</div></div>',
        multiSelect: false,//是否能多选
        enableCellSelection: true, //是否能选择单元格
        enableRowSelection: false,//是否能选择行
        enableCellEdit: true,//是否能修改内容
        enablePinning: true,  //是否被锁住了
        i18n: 'zh-cn',
        columnDefs: [{
            field: 'index',//这里是数据中的属性名
            displayName: '序号', //这里是表格的每一列的名称
            width: 60,//表格的宽度
            pinnable: false,
            sortable: true//是否能排序
        }, {
            field: 'name',
            displayName: '书名',
            enableCellEdit: true
        }, {
            field: 'author',
            displayName: '作者',
            enableCellEdit: true,
            width: 220,
            pinnable: true,
            sortable: true
        }, {
            field: 'pubTime',
            displayName: '出版日期',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'price',
            displayName: '定价',
            enableCellEdit: true,
            width: 120,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'bookId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
        enablePaging: true,//是否能翻页
        showFooter: true,//是否显示表尾
        totalServerItems: 'totalServerItems',//数据的总条数
        pagingOptions: $scope.pagingOptions,//分页部分
        filterOptions: $scope.filterOptions,//数据过滤部分
    };
})