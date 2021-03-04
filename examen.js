var mapMain;
var params;


// @formatter:off
require([
    "esri/map",
    "esri/config",
    "esri/tasks/ServiceAreaTask",
    "esri/tasks/ServiceAreaParameters",
    "esri/tasks/FeatureSet",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
    "esri/geometry/Point", "esri/graphic", "esri/layers/GraphicsLayer",

    "esri/basemaps",
    "esri/arcgis/utils",
    "esri/geometry/Extent",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer", "esri/tasks/query",
    "esri/dijit/Legend",
    "esri/Color", "dojo/_base/array",



    "dojo/ready",
    "dojo/parser",
    "dojo/dom",
    "dijit/registry",

    "dojo/on",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"],
    function (Map, esriConfig, ServiceAreaTask, ServiceAreaParameters, FeatureSet, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
        Point, Graphic, GraphicsLayer,
        esriBasemaps, arcgisUtils, Extent, ArcGISDynamicMapServiceLayer, FeatureLayer, Query, Legend, Color, arrayUtils,
        ready, parser, dom, registry, on,
        BorderContainer, ContentPane) {
        // @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();


            // Specify the initial extent
            var extentInitial = new Extent({
                "xmin": -455154.0909555567,
                "ymin": 4902324.887442396,
                "xmax": -391023.4242243803,
                "ymax": 4950862.400403417,
                "spatialReference": {
                    "wkid": 102100
                }
            });


            //create a map
            mapMain = new Map("cpCenter", {
                basemap: "gray",
                Zoom: 3,
                extent: extentInitial,

            });


            //  * almacenamos el feature layer en una variable.

            var centros = new FeatureLayer("https://services8.arcgis.com/BtkRLT3YBKaVGV3g/ArcGIS/rest/services/CENTROS_SALUD/FeatureServer/0");

            mapMain.addLayers([centros]);
            // mapMain.on("load", (printservice))


            // Creamos una query para crear un feature set a partir de un feature layer


            var query = new Query();
            query.where = "1=1"

            centros.queryFeatures(query, featureset);
            function featureset(evt) {
                console.log(evt.features)

                var puntosfeatureset = evt.features,





                    // definimos los parametros del service area

                    params = new ServiceAreaParameters();
                params.defaultBreaks = [1];
                params.outSpatialReference = mapMain.spatialReference;
                params.returnFacilities = false;
                params.facilities = puntosfeatureset;






                // guardamos en una variable el servicio de geoprocesamiento de close service area

                var serviceAreaTask = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer/Service%20Area");


                // Resolvemos el service area

                serviceAreaTask.solve(params, function (serviceAreaSolveResult) {

                    var polygonSymbol = new SimpleFillSymbol(
                        "solid",
                        new SimpleLineSymbol("solid", new Color([232, 104, 80]), 2),
                        new Color([232, 104, 80, 0.25])
                    );
                    arrayUtils.forEach(solveResult.serviceAreaPolygons, function (serviceArea) {
                        serviceArea.setSymbol(polygonSymbol);
                        map.graphics.add(serviceArea);
                    });

            });
    

        };
    

    })
});
