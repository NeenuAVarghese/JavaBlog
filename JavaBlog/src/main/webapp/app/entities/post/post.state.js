(function() {
    'use strict';

    angular
        .module('javaBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('post', {
            parent: 'entity',
            url: '/post',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Posts'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/post/posts.html',
                    controller: 'PostController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('post-detail', {
            parent: 'entity',
            url: '/post/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Post'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/post/post-detail.html',
                    controller: 'PostDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Post', function($stateParams, Post) {
                    return Post.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'post',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('post-detail.edit', {
            parent: 'post-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/post/post-dialog.html',
                    controller: 'PostDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Post', function(Post) {
                            return Post.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('post.new', {
            parent: 'post',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/post/post-dialog.html',
                    controller: 'PostDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                postName: null,
                                postContent: null,
                                voteCount: 0,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('post', null, { reload: 'post' });
                }, function() {
                    $state.go('post');
                });
            }]
        })
        .state('post.edit', {
            parent: 'post',
            url: '/{id}/addVotes',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/post/vote.html',
                    controller: 'VoteUpController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        entity: ['Post', function(Post) {
                            return Post.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('post', null, { reload: 'post' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('post.delete', {
            parent: 'post',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/post/post-delete-dialog.html',
                    controller: 'PostDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Post', function(Post) {
                            return Post.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('post', null, { reload: 'post' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
