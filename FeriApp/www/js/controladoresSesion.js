var FeriApp= angular.module('FeriApp');

FeriApp.controller('SignUpController', function ($scope, $ionicLoading) { //$cordovaFacebook, $cordovaGooglePlus
    /*
     * Learn how facebooks graph api works: https://developers.facebook.com/docs/graph-api/quickstart/v2.2
     * The array params "public_profile", "email", "user_friends" are the permissions / data that the app is trying to access.
    */
    $scope.fbLogin = function () {

        //$cordovaFacebook.login(["public_profile", "email", "user_friends"])
        //.then(function (success) {
        //    /*
        //     * Get user data here. 
        //     * For more, explore the graph api explorer here: https://developers.facebook.com/tools/explorer/
        //     * "me" refers to the user who logged in. Dont confuse it as some hardcoded string variable. 
        //     * 
        //    */
        //    //To know more available fields go to https://developers.facebook.com/tools/explorer/
        //    $cordovaFacebook.api("me?fields=id,name,picture", [])
        //    .then(function (result) {
        //        /*
        //         * As an example, we are fetching the user id, user name, and the users profile picture
        //         * and assiging it to an object and then we are logging the response.
        //        */
        //        var userData = {
        //            id: result.id,
        //            name: result.name,
        //            pic: result.picture.data.url
        //        }
        //        //Do what you wish to do with user data. Here we are just displaying it in the view
        //        $scope.fbData = JSON.stringify(userData, null, 4);


        //    }, function (error) {
        //        // Error message
        //    })

        //}, function (error) {
        //    // Facebook returns error message due to which login was cancelled.
        //    // Depending on your platform show the message inside the appropriate UI widget
        //    // For example, show the error message inside a toast notification on Android
        //});

    }

    /*
     * Google login
    */

    $scope.googleLogin = function () {

        $ionicLoading.show({ template: 'Loading...' });
        ///*
        // * Google login. This requires an API key if the platform is "IOS".
        // * Example: $cordovaGooglePlus.login('yourApiKey')
        //*/
        //$cordovaGooglePlus.login()
        //.then(function (data) {

        //    $scope.googleData = JSON.stringify(data, null, 4);
        //    $ionicLoading.hide();

        //}, function (error) {

        //    // Google returns error message due to which login was cancelled.
        //    // Depending on your platform show the message inside the appropriate UI widget
        //    // For example, show the error message inside a toast notification on Android
        //    $ionicLoading.hide();

        //});
    }
});

FeriApp.controller('UserController', function ($http, $scope, $state, $rootScope) {
    $scope.data = { mail:"", password: "" };
    $scope.error_login = false;
    $scope.datos_usuario = {};
    $scope.campos_vacios_registro=false;
    $scope.login = function () {
        var bandera = 0;
        if($scope.data.mail!=""){
            for (var i in $rootScope.sesiones) {
                if ($scope.data.mail.toLowerCase() == $rootScope.sesiones[i].correo_sesion && $scope.data.password == $rootScope.sesiones[i].password_sesion) {
                    $rootScope.sesion_logueada = $rootScope.sesiones[i];
                    console.log($rootScope.sesion_logueada);
                    if($rootScope.sesion_logueada.rol_sesion=="cliente"){
                        $rootScope.esCliente = true;
                        $rootScope.esUsuario = false;
                        bandera = 1;
                        $state.go('app_cliente.home_cliente');
                    }else{
                        $rootScope.esUsuario = true;
                        $rootScope.esCliente = false;
                        bandera = 1;
                        $state.go('app_usuario.home_usuario');
                    }
                    break;
                }
            }
        }

        if (bandera == 0) {
            $scope.error_login = true;
        }
    };
    $scope.registro_usuario = function () {
        //validación de campos
        if ($scope.datos_usuario.nombre_sesion != "") {
            $scope.datos_usuario.id_sesion = ($rootScope.sesiones.length + 1) * 1000 + ($rootScope.sesiones.length + 1) * 100 + ($rootScope.sesiones.length + 1) * 10 + ($rootScope.sesiones.length + 1);
            $scope.datos_usuario.rol_sesion = "usuario";
            $rootScope.sesiones.push({ id_sesion: $scope.datos_usuario.id_sesion, nombre_sesion: $scope.datos_usuario.nombre_sesion, correo_sesion: $scope.datos_usuario.correo_sesion, password_sesion: $scope.datos_usuario.password_sesion, rol_sesion: $scope.datos_usuario.rol_sesion });
            console.log($rootScope.sesiones);
            $state.go('login');
        } else {
            $scope.campos_vacios_registro = true;
        }
    };
    $rootScope.captura_index= function (indice) {
        $rootScope.feria_index = indice;
    };
    $rootScope.capturar_indice_oferta = function (indice) {
        $rootScope.oferta_index = indice;
    };
    $rootScope.capturar_indice_local = function (indice) {
        $rootScope.indice_local = indice;
    };
    $scope.local_de_oferta = function (id_local) {
        var local={};
        for(var i in $rootScope.locales){
            if($rootScope.locales[i].id_local == id_local){
                local=$rootScope.locales[i];
                return local;
                break;
            }
        }
    };
    $scope.nombre_feria_de_local_de_oferta = function (id_local) {
        var feria = {};
        for (var i in $rootScope.locales) {
            if ($rootScope.locales[i].id_local == id_local) {
                for (var j in $rootScope.ferias) {
                    if ($rootScope.ferias[j].id_feria == $rootScope.locales[i].id_feria_local) {
                        feria = $rootScope.ferias[j];
                        return feria.nombre_feria;
                        break;
                    }
                }
                break;
            }
        }

    };
    $scope.imagen_feria_de_local_de_oferta = function (id_local) {
        var feria = {};
        for (var i in $rootScope.locales) {
            if ($rootScope.locales[i].id_local == id_local) {
                for (var j in $rootScope.ferias) {
                    if ($rootScope.ferias[j].id_feria == $rootScope.locales[i].id_feria_local) {
                        feria = $rootScope.ferias[j];
                        return feria.imagen_feria;
                        break;
                    }
                }
                break;
            }
        }

    };
    $scope.nombre_producto_de_oferta = function (id_producto_oferta) {
        var producto = {};
        for(var i in $rootScope.productos){
            if (id_producto_oferta == $rootScope.productos[i].id_producto) {
                producto = $rootScope.productos[i];
                return producto.nombre_producto;
                break;
            }
        }
    };

});

FeriApp.controller('AppController', function ($http, $scope, $state, $rootScope, $ionicSideMenuDelegate) {
    $scope.go = function (state) {
        $state.go(state);
    };
    $rootScope.logueado = false;
    $rootScope.sesiones = [
        { id_sesion: 1111, nombre_sesion: "Pablo Salinas", correo_sesion: "pablo.salinasc@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
        { id_sesion: 2222, nombre_sesion: "Sebastian Calderon", correo_sesion: "sebastian.calderon@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
       { id_sesion: 3333, nombre_sesion: "Veronica Dominguez", correo_sesion: "veronica.dominguez@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
        { id_sesion: 4444, nombre_sesion: "Daniel Morales", correo_sesion: "sebastian.calderon@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
       { id_sesion: 5555, nombre_sesion: "Rodrigo Mendoza", correo_sesion: "rodrigo.mendoza@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
        { id_sesion: 6666, nombre_sesion: "Cliente Uno", correo_sesion: "cliente1@usach.cl", password_sesion: "1234", rol_sesion: "cliente" },
        { id_sesion: 7777, nombre_sesion: "Cliente Dos", correo_sesion: "cliente2@usach.cl", password_sesion: "1234", rol_sesion: "cliente" },
        { id_sesion: 8888, nombre_sesion: "Cliente Tres", correo_sesion: "cliente3@usach.cl", password_sesion: "1234", rol_sesion: "cliente" }
    ];
    $rootScope.ferias = [
        {id_feria: 1111, latitud_feria:-33.4906832 ,longitud_feria:-70.7667169 ,nombre_feria:"Feria Modelo 3",comuna_feria:"Maipú",imagen_feria:"img/modelo3.jpg"},
        { id_feria: 2222, latitud_feria: -33.449877, longitud_feria: -70.687286, nombre_feria: "Feria Informática USACH", comuna_feria: "Estación Central", imagen_feria: "img/diinf.jpg" },
        { id_feria: 3333, latitud_feria: -33.4703495, longitud_feria: -70.7481123, nombre_feria: "Feria El descanso", comuna_feria: "Maipú", imagen_feria: "img/eldescanso.jpg" }
    ];
    $rootScope.locales=[
        { id_local: 1234, id_feria_local: 1111, codigo_qr_local: "/img/qrmodelo3-1.jpg", latitud_local: -33.4903173, longitud_local: -70.7660641,nombre_local:"Don Pancho", descripcion_local: "Se vende Papas.", id_cliente_local: 1234, },
        { id_local: 2345, id_feria_local: 1111, codigo_qr_local: "/img/qrmodelo3-2.jpg", latitud_local: -33.49022, longitud_local: -70.7660104,nombre_local:"Don manuel", descripcion_local: "Se vende Frutas.", id_cliente_local: 2345, },
        { id_local: 3456, id_feria_local: 1111, codigo_qr_local: "/img/qrmodelo3-3.jpg", latitud_local: -33.4904012, longitud_local: -70.7662022, nombre_local: "Verduras varias", descripcion_local: "Se vende frutos secos.", id_cliente_local: 3456, },
        { id_local: 4567, id_feria_local: 1111, codigo_qr_local: "/img/qrmodelo3-4.jpg", latitud_local: -33.4906832, longitud_local: -70.7667169,nombre_local:"Legumbres y verduras tiernas", descripcion_local: "Se vende Mote.", id_cliente_local: 2345, },
        { id_local: 5678, id_feria_local: 2222, codigo_qr_local: "/img/qrferiausach-1.jpg", latitud_local: -33.449877, longitud_local: -70.687286,nombre_local:"FeriApp", descripcion_local: "Stand del proyecto FeriApp, grupo del ramo de Proyecto de Ingeniería de Informática.", id_cliente_local: 2345 },
        { id_local: 6789, id_feria_local: 3333, codigo_qr_local: "/img/qrdescanso-1.jpg", latitud_local: -33.4703495, longitud_local: -70.7481123, nombre_local: "Los melones de María", descripcion_local: "Se vende melones y sandias", id_cliente_local: 3456 }
    ];
    $rootScope.productos = [
        { id_producto: 1111, nombre_producto: "Acelga", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1112, nombre_producto: "Achicoria", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1113, nombre_producto: "Ajo", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1114, nombre_producto: "Ají", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1115, nombre_producto: "Albahaca", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1116, nombre_producto: "Alcachofa", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1117, nombre_producto: "Apio", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1118, nombre_producto: "Arveja Verde", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1119, nombre_producto: "Berenjena", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1120, nombre_producto: "Betarraga", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1121, nombre_producto: "Bruselas", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1122, nombre_producto: "Brócoli", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1123, nombre_producto: "Caigua", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1124, nombre_producto: "Camote", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1125, nombre_producto: "Cebolla", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1126, nombre_producto: "Cebollín", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1127, nombre_producto: "Cebollín baby", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1128, nombre_producto: "Choclo", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1129, nombre_producto: "Ciboulette", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1130, nombre_producto: "Cilantro", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1131, nombre_producto: "Coliflor", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1132, nombre_producto: "Corazón de apio", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1133, nombre_producto: "Espinaca", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1134, nombre_producto: "Espárragos", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1135, nombre_producto: "Fruto del paraíso", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1136, nombre_producto: "Haba", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1137, nombre_producto: "Jengibre", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1138, nombre_producto: "Lechuga", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1139, nombre_producto: "Locoto", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1140, nombre_producto: "Melón", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1141, nombre_producto: "Orégano", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1142, nombre_producto: "Papa", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1143, nombre_producto: "Pepino dulce", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1144, nombre_producto: "Pepino ensalada", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1145, nombre_producto: "Perejil", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1146, nombre_producto: "Pimiento", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1147, nombre_producto: "Poroto granado", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1148, nombre_producto: "Poroto verde", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1149, nombre_producto: "Puerro", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1150, nombre_producto: "Rabanito", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1151, nombre_producto: "Ramas de apio", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1152, nombre_producto: "Repollo", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1153, nombre_producto: "Rábano", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1154, nombre_producto: "Sandia", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1155, nombre_producto: "Tomate", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1156, nombre_producto: "Zanahoria", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1157, nombre_producto: "Zapallo", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1158, nombre_producto: "Zapallo italiano", tipo_producto: "Hortaliza", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1159, nombre_producto: "Aceituna", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1160, nombre_producto: "Arándana (cran)", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1161, nombre_producto: "Arándano (blue)", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1162, nombre_producto: "Babaco", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1163, nombre_producto: "Breva", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1164, nombre_producto: "Caqui", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1165, nombre_producto: "Cereza", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1166, nombre_producto: "Chirimoya", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1167, nombre_producto: "Ciruela", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1168, nombre_producto: "Coco", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1169, nombre_producto: "Damasco", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1170, nombre_producto: "Durazno", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1171, nombre_producto: "Feijoa", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1172, nombre_producto: "Frambuesa", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1173, nombre_producto: "Frutilla", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1174, nombre_producto: "Granada", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1175, nombre_producto: "Guayaba", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1176, nombre_producto: "Higo", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1177, nombre_producto: "Kiwi", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1178, nombre_producto: "Limón", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1179, nombre_producto: "Lúcuma", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1180, nombre_producto: "Mandarina", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1181, nombre_producto: "Mango", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1182, nombre_producto: "Manzana", tipo_producto: "Fruta", imagen_producto: "img/manzana.jpg" },
        { id_producto: 1183, nombre_producto: "Maracuyá", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1184, nombre_producto: "Membrillo", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1185, nombre_producto: "Mora", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1186, nombre_producto: "Naranja", tipo_producto: "Fruta" ,imagen_producto:"img/naranja.jpg"},
        { id_producto: 1187, nombre_producto: "Nectarín", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1188, nombre_producto: "Níspero", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1189, nombre_producto: "Palta", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1190, nombre_producto: "Papaya", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1191, nombre_producto: "Pera", tipo_producto: "Fruta", imagen_producto: "img/pera.jpg" },
        { id_producto: 1192, nombre_producto: "Pera asiática", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1193, nombre_producto: "Piña", tipo_producto: "Fruta", imagen_producto: "img/pina.jpg" },
        { id_producto: 1194, nombre_producto: "Plátano", tipo_producto: "Fruta", imagen_producto: "img/platano.jpg" },
        { id_producto: 1195, nombre_producto: "Pomelo", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1196, nombre_producto: "Tumbo", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1197, nombre_producto: "Tuna", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
        { id_producto: 1198, nombre_producto: "Uva", tipo_producto: "Fruta", imagen_producto: "img/logoFeriApp.png" },
    ];
    $rootScope.ofertas = [
        { id_ofertas: 1112,id_local: 1234, id_producto_oferta: 1184, precio_oferta: "$1.000", medida_oferta: "kilogramo" },
        { id_ofertas: 1113, id_local: 2345, id_producto_oferta: 1198, precio_oferta: "$1.500", medida_oferta: "kilogramo" },
        { id_ofertas: 1114, id_local: 3456, id_producto_oferta: 1173, precio_oferta: "$1.000", medida_oferta: "cuarto de kilogramo" },
        { id_ofertas: 1115, id_local: 6789, id_producto_oferta: 1170, precio_oferta: "$800", medida_oferta: "medio kilogramo" },
        { id_ofertas: 1116, id_local: 5678, id_producto_oferta: 1154, precio_oferta: "$5.000", medida_oferta: "dos unidades" }
    ]
    $rootScope.precio_producto_local = [
        { id_local: 1234, id_producto: 1142, precio_producto: 500, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" },
        
        { id_local: 2345, id_producto: 1182, precio_producto: 800, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 2345, id_producto: 1186, precio_producto: 800, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 2345, id_producto: 1193, precio_producto: 2200, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 2345, id_producto: 1128, precio_producto: 800, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 2345, id_producto: 1181, precio_producto: 1200, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 2345, id_producto: 1173, precio_producto: 2200, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 2345, id_producto: 1170, precio_producto: 700, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },

        { id_local: 3456, id_producto: 1134, precio_producto: 1200, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 3456, id_producto: 1156, precio_producto: 700, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 3456, id_producto: 1128, precio_producto: 600, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 3456, id_producto: 1131, precio_producto: 1100, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 3456, id_producto: 1125, precio_producto: 1200, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" },

        { id_local: 4567, id_producto: 1147, precio_producto: 1200, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 4567, id_producto: 1148, precio_producto: 1000, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 4567, id_producto: 1138, precio_producto: 1500, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" },

        { id_local: 5678, id_producto: 1186, precio_producto: 600, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" }, //repetido
        { id_local: 5678, id_producto: 1191, precio_producto: 800, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 5678, id_producto: 1193, precio_producto: 1800, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" }, //repetido
        { id_local: 5678, id_producto: 1194, precio_producto: 700, unidad_medida: "Kilogramo", fecha_precio: "2016-12-10T18:25:43-05:00" }, //repetido para cotizar
        
        { id_local: 6789, id_producto: 1140, precio_producto: 500, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" },
        { id_local: 6789, id_producto: 1154, precio_producto: 3000, unidad_medida: "Unidad", fecha_precio: "2016-12-10T18:25:43-05:00" }
    ];
});

FeriApp.controller('MenuController', function ($http, $scope, $state, $rootScope, $cordovaBarcodeScanner) {
    $scope.desloguear = function () {
        $rootScope.esUsuario = false;
        $rootScope.esCliente = false;
        $rootScope.sesion_logueada = {};
        $state.go('root');
    }
    $scope.scanBarcode = function () {
        $cordovaBarcodeScanner.scan().then(function (imageData) {
            var local;
            for (var i in $rootScope.locales) {
                if ($rootScope.locales[i].id_local == imageData.text) {
                    local = imageData.text;
                    $rootScope.indice_local = i;
                    break;
                }
            }
            if (typeof local !== "undefined") {
                alert("Local Encontrado");
                $state.go('app_usuario.puesto');
            } else {
                alert("El codigo escaneado no corresponde a un local");
            }

        }, function (error) {
            alert("A ocurrido un error -> " + error);
        });
    };
});