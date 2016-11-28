(function() {
    'use strict';

    angular
        .module('javaBlogApp')
        .controller('BlogDetailController', BlogDetailController);

    BlogDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Blog', 'User', 'Entry'];

    function BlogDetailController($scope, $rootScope, $stateParams, previousState, entity, Blog, User, Entry) {
        var vm = this;

        vm.blog = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('javaBlogApp:blogUpdate', function(event, result) {
            vm.blog = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
