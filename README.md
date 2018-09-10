# Librería Markdown Links


## Descripción General

Los archivos `Markdown` contienen _links_ que muchas veces están rotos o ya no son 
válidos y eso perjudica mucho el valor de la información que se quiere compartir.
Por ese motivo, se desarrolló esta librería para verificar los links y reportar
algunas estadísticas:

- Total de links encontrados.
- Total de links únicos (que no se repiten en el archivo).
- Total de links rotos.

## Instrucciones de instalación

### Desde GitHub

Con el comando `npm install Geraldine13/lim20181-Track-FE-markdown-list`

![instalación](https://s15.postimg.cc/5vfotzvhn/instalaci_n.png)

Ver en archivo package.json la dependencia creada.

![dependencia](https://s15.postimg.cc/u88mlqqcr/Dependencia.png)

### Directo con el nombre de la librería

Con el comando `npm i mdlinkslaboratoria`

![instdirecta](https://s15.postimg.cc/uz1crosrv/instdirect.png)

Ver en archivo package.json la dependencia creada.

![depdirecta](https://s15.postimg.cc/tjzs2z74b/depdirect.png)

Para usarlo programáticamente en ambos casos, se debe importar con `require`, ver ejemplo:

![require](https://s15.postimg.cc/owybepw7v/require.png)

## Versión

1.0.1

## Ejemplos del uso

`md-links --help`
- Para saber el uso general de la librería colocamos en consola.

![help](https://s15.postimg.cc/5k2tufm9n/help.png)

`md-links ./some/example.md`
- Al pasarle sólo la ruta o archivo .md , debe imprimir en consola todos los links encontrados, con los siguientes datos: ruta de ubicación, el link y el nombre.

  * La ruta puede ser Absoluta o Relativa.

![ruta](https://s15.postimg.cc/9uhhqgu23/ruta.png)

`md-links ./some/example.md --validate`
- Al pasarle la ruta o archivo .md con la opción '--validate' , debe imprimir en consola todos los links encontrados, incluyendo los estados; que para el caso de exitoso será el código '200 OK'.

![validate](https://s15.postimg.cc/ehnjs6zej/validate.png)

`md-links ./some/example.md --stats`
- Al pasarle la ruta o archivo .md con la opción '--stats' , debe imprimir en consola la siguiente estadística:

  * Total: todos los links encontrados.
  * Unique: links únicos/que no se repiten. 


![stats](https://s15.postimg.cc/d3vwwi2ln/stats.png)

`md-links ./some/example.md --validate --stats` o  
`md-links ./some/example.md --stats --validate`
- Al pasarle la ruta o archivo .md con la opción '--stats' y '--validate' , debe imprimir en consola la estadística anterior (de --stats) y ahora se incluirá el dato de la cantidad de los links rotos:

  * Total: todos los links encontrados.
  * Unique: links únicos/que no se repiten. 
  * Broken: Links fallidos o rotos.

![stats&validate](https://s15.postimg.cc/l9dyv419n/statsyvalidate.png)

### BACKLOG

- Para la implementación de la librería se realizó el backlog en el proyecto del repositorio. [Ver Backlog](https://github.com/Geraldine13/lim20181-Track-FE-markdown-list/projects/1)

![backlog](https://s15.postimg.cc/hsgi5pc3v/backlog.png)

### Pruebas / tests

- Las pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.

![test](https://s15.postimg.cc/nfcv379hn/test.png)