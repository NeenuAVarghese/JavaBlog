(function() {
    'use strict';

    angular
        .module('javaBlogApp')
        .controller('PostDetailController', PostDetailController);

    PostDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Post', 'User', 'Blog'];

    function PostDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Post, User, Blog) {
        var vm = this;

        vm.post = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('javaBlogApp:postUpdate', function(event, result) {
            vm.post = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
