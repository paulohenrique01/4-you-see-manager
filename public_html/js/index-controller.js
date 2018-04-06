var indexModule = angular.module('app', ['ngRoute', 'ngAnimate', 'http']).value('duScrollOffset', 100);

indexModule.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'pages/home.html',
                    controller: 'IndexCtrl',
                    controllerAs: 'indexCtrl'
                }).                
                otherwise({
                    redirectTo: '/'
                });
      

    }]);

indexModule.controller('IndexCtrl', ['HttpService',
    function (HttpService) {

        var self = this;
        
        self.loadInit = function (){
            getAllMidia();
        };
        
        /*
         * Carrega as mídias cadastradas.
         */
        function getAllMidia() {
            HttpService.get('timeline', null,
                    null, function (data, status) {
                        self.arrayTimeLine = data;                       
                    }, function (data, status) {
                // Todo error...
            });
        }

}]);
