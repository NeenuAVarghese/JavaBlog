(function() {
    'use strict';

    angular
        .module('javaBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entry', {
            parent: 'entity',
            url: '/entry',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Entries'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entry/entries.html',
                    controller: 'EntryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('entry-detail', {
            parent: 'entity',
            url: '/entry/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Entry'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entry/entry-detail.html',
                    controller: 'EntryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Entry', function($stateParams, Entry) {
                    return Entry.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entry',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entry-detail.edit', {
            parent: 'entry-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-dialog.html',
                    controller: 'EntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Entry', function(Entry) {
                            return Entry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entry.new', {
            parent: 'entry',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-dialog.html',
                    controller: 'EntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                title: null,
                                content: null,
                                votes: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entry', null, { reload: 'entry' });
                }, function() {
                    $state.go('entry');
                });
            }]
        })
        .state('entry.edit', {
            parent: 'entry',
            url: '/{id}/addVotes',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/voteUp.html',
                    controller: 'VoteUpController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Entry', function(Entry) {
                            return Entry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entry', null, { reload: 'entry' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entry.delete', {
            parent: 'entry',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-delete-dialog.html',
                    controller: 'EntryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Entry', function(Entry) {
                            return Entry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entry', null, { reload: 'entry' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
