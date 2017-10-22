'use strict';

angular.module('menu').component('menu', {
    templateUrl: 'static/js/menu/menu.template.html',
    controller: ['$auth', '$location', '$scope', 'toaster', 'menu1Service', function MenuController($auth, $location, $scope, toaster, menu1Service) {
        //Display the Menu Tabs for authenticated users only
        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        $scope.$watch(
            menu1Service.getSelectedTab, function(newValue, oldValue) {
                $scope.selectedMenuTab = menu1Service.getSelectedTab();
            }
        );
        $scope.updateSelectedMenuTab = menu1Service.updateSelectedTab;

        $scope.$watch(
            menu1Service.getLoggedUser, function(newValue, oldValue) {
                $scope.loggedUser = menu1Service.getLoggedUser();
                console.log($scope.loggedUser.id);
            }
        );

        $scope.signOut = function() {
            if(!$auth.isAuthenticated()) {
                return;
            }
            $auth.logout().then(function() {
                toaster.pop({
                    type: 'success',
                    body: 'Logging out',
                    showCloseButton: true
                });

                $location.url('/signIn')
                $scope.updateSelectedMenuTab('signIn');
            })
        }
    }]
});