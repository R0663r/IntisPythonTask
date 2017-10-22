'use strict';

angular.module('home').component('home', {
    templateUrl: 'static/js/home/home.template.html',
    controller: ['$scope', 'menu1Service', function HomeController($scope, menu1Service) {
        $scope.$watch(
            menu1Service.getSelectedTab, function(newValue, oldValue) {
                $scope.selectedMenuTab = menu1Service.getSelectedTab();
            }
        );
        $scope.updateSelectedMenuTab = menu1Service.updateSelectedTab;
    }]
});