<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../resources/views/front/styles.css">
    <!-- 1. Load libraries -->
     <!-- Polyfill(s) for older browsers -->
    <script src="../resources/views/front/node_modules/core-js/client/shim.min.js"></script>
    <script src="../resources/views/front/node_modules/zone.js/dist/zone.js"></script>
    <script src="../resources/views/front/node_modules/reflect-metadata/Reflect.js"></script>
    <script src="../resources/views/front/node_modules/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="../resources/views/front/systemjs.config.js"></script>
    <script>
      System.import('../resources/views/front/app').catch(function(err){ console.error(err); });
    </script>
    <!-- Base href pour initialiser la route -->
    <base href="../resources/views/front/">
  </head>
  <body>
    <router></router>
  </body>
</html>