export class CadenaHtml {

  constructor(){

  }
 
getEncabezado():string{
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nivel tóner</title>
    
    <link rel="stylesheet" href="/bootstrap/bootstrap.min.css" />
    <script src="/js/bootstrap.js"></script>

    <style>


a:link {
  color: blue;
}

a:visited {
  color: blue;
}

a:hover {
  color: green;
}

a:active {
  color: red;
}

a:link, a:visited {
  text-decoration: none;
}

tr:hover {background-color: #D6EEEE;}
</style>
</head>
<body>
  <input class="form-control" id="myInput" type="text" placeholder="Search..">
<table  class="table table-bordered table-striped" id="tabla">
<thead>
  <tr>
    <th>Modelo</th>
    <th>Ip</th>
    <th>Nº Serie</th>
    <th>Localización</th>
    <th>Conectada</th>
    <th>Negro</th>
    <th>Cyan</th>
    <th>Amarillo</th>
    <th>Rojo</th>
  </tr> 
</thead>`
   ;
}
}

