var FeriApp = angular.module('FeriApp');

FeriApp.controller('MapaController', function ($rootScope,$scope, $state, $cordovaGeolocation) {
    var options = { timeout: 10000, enableHighAccuracy: true };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log("Funcionó el mapa");
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'idle', function() {
            var marcadorPosicion = new google.maps.Marker({
                map: $scope.map,
                animation : google.maps.Animation.DROP,
                position: latLng
            });
            var infoUsuario = new google.maps.InfoWindow({
                content: "Esta es tu posición actual!"
            });
            google.maps.event.addListener(marcadorPosicion, 'click', function () {
                infoUsuario.open($scope.map, marcadorPosicion);
            });
            $scope.marcadores = [];
            $scope.strings = [];
            $scope.infoFeria=[];
            for(var i in $rootScope.ferias){
                $scope.marcadores[i] = new google.maps.Marker({
                    map : $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng($rootScope.ferias[i].latitud_feria,$rootScope.ferias[i].longitud_feria)
                });
                $scope.strings[i] = $rootScope.ferias[i].nombre_feria;
                console.log($scope.strings[i]);
                $scope.infoFeria[i] = new google.maps.InfoWindow({
                    content: $scope.strings[i]
                });
            }
            google.maps.event.addListener($scope.marcadores[0], 'click', function () {
                $scope.infoFeria[0].open($scope.map, $scope.marcadores[0]);
            });
            google.maps.event.addListener($scope.marcadores[1], 'click', function () {
                $scope.infoFeria[1].open($scope.map, $scope.marcadores[1]);
            });
            google.maps.event.addListener($scope.marcadores[2], 'click', function () {
                $scope.infoFeria[2].open($scope.map, $scope.marcadores[2]);
            });
        });
    }, function (error) {
        console.log("No funcionó el mapa");
    });
});

FeriApp.controller('MapaFeriaController', function ($rootScope, $scope, $state, $stateParams, $cordovaGeolocation) {
    var options = { timeout: 10000, enableHighAccuracy: true };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log("Funcionó el mapa");
        var latLng = new google.maps.LatLng($rootScope.ferias[$rootScope.feria_index].latitud_feria, $rootScope.ferias[$rootScope.feria_index].longitud_feria);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.mapFeria = new google.maps.Map(document.getElementById("map2"), mapOptions);
        google.maps.event.addListenerOnce($scope.mapFeria, 'idle', function () {
            $scope.marcadoresLocales = [];
            $scope.stringsLocales = [];
            $scope.infoLocal= [];
            for (var i in $rootScope.locales) {
                if ($rootScope.ferias[$rootScope.feria_index].id_feria == $rootScope.locales[i].id_feria_local) {
                    console.log($rootScope.locales[i]);
                    $scope.marcadoresLocales[i] = new google.maps.Marker({
                        map: $scope.mapFeria,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng($rootScope.locales[i].latitud_local, $rootScope.locales[i].longitud_local)
                    });
                    $scope.stringsLocales[i] = "Local '"+$rootScope.locales[i].nombre_local+"'";
                    $scope.infoLocal[i] = new google.maps.InfoWindow({
                        content: $scope.stringsLocales[i]
                    });
                }
            }
            if($rootScope.feria_index==0){
                google.maps.event.addListener($scope.marcadoresLocales[0], 'click', function () {
                    $scope.infoLocal[0].open($scope.mapFeria, $scope.marcadoresLocales[0]);
                });
                google.maps.event.addListener($scope.marcadoresLocales[1], 'click', function () {
                    $scope.infoLocal[1].open($scope.mapFeria, $scope.marcadoresLocales[1]);
                });
                google.maps.event.addListener($scope.marcadoresLocales[2], 'click', function () {
                    $scope.infoLocal[2].open($scope.mapFeria, $scope.marcadoresLocales[2]);
                });
                google.maps.event.addListener($scope.marcadoresLocales[3], 'click', function () {
                    $scope.infoLocal[3].open($scope.mapFeria, $scope.marcadoresLocales[3]);
                });
            }
            if ($rootScope.feria_index == 1) {
                google.maps.event.addListener($scope.marcadoresLocales[4], 'click', function () {
                    $scope.infoLocal[4].open($scope.mapFeria, $scope.marcadoresLocales[4]);
                });
            }
            if ($rootScope.feria_index == 2) {
                google.maps.event.addListener($scope.marcadoresLocales[5], 'click', function () {
                    $scope.infoLocal[5].open($scope.mapFeria, $scope.marcadoresLocales[5]);
                });
            }
        });
    }, function (error) {
        console.log("No funcionó el mapa");
    });
});

FeriApp.controller('MuroFeriaController', function ($rootScope, $scope, $state, $stateParams, $cordovaGeolocation) {
    $scope.cantLocales = function () {
        var cantLocales = 0;
        for (var i in $rootScope.locales) {
            if ($rootScope.ferias[$rootScope.feria_index].id_feria == $rootScope.locales[i].id_feria_local) {
                cantLocales++;
            }
        }
        return cantLocales;
    };
    $scope.variable = 0;
    $rootScope.feria_index = 0;
    $scope.ratingFull = {};
    $scope.ratingFull.rate = 3;
    $scope.ratingFull.max = 5;

    $scope.ratingHalf = {};
    $scope.ratingHalf.rate = 3.5;
    $scope.ratingHalf.max = 5;

    $scope.reset = function () {
        $scope.ratingFull.rate = 0;
    }
});

FeriApp.controller('CotizacionController', function ($rootScope, $scope, $state) {
    $scope.capturar_indice_producto = function (indice) {
        $rootScope.producto_index = indice;
    };
    $scope.busqueda_producto_precio = function (id_producto) {
        $scope.resultado_busqueda = [];
        for (var i in $rootScope.precio_producto_local) {
            if ($rootScope.precio_producto_local[i].id_producto == id_producto) {
                $scope.resultado_busqueda.push($rootScope.precio_producto_local[i]);
            }
        }
        return $scope.resultado_busqueda;
    }
    $scope.buscar_local = function (id_local) {
        var local = {};
        for (var i in $rootScope.locales) {
            if ($rootScope.locales[i].id_local == id_local) {
                local = $rootScope.locales[i];
                return local;
                break;
            }
        }
    };
});