// Aquí tienes una vista general de lo que tenemos cuando JavaScript se ejecuta en un navegador web:
/*
                  [window]
  [DOM]            [BOM]          [JavaScript]
  document       navigator           arrays
  ...            location            objects
*/
/*
Hay un objeto “raíz” llamado window. Tiene dos roles:
  - Primero, es un objeto global para el código JavaScript
     - El objeto global proporciona variables y funciones que están disponibles en todo el código, al igual que aquellas que están integradas en el lenguaje o el entorno.
  -Segundo, representa la “ventana del navegador” y proporciona métodos para controlarla.
*/

// let nombre = 'jesús'

// window.nombre = nombre

// function saludar () {
//   const nombre = window.prompt('¿Como te llamas?')
//   window.alert('Hola ' + nombre)
// }

// window.saludar = saludar

/*
===== Interacción: alert, prompt, confirm =====
*/
/* Las funciones alert/confirm/prompt también forman parte de BOM: no están directamente relacionadas
con el documento, sino que representan métodos puros de comunicación del navegador con el usuario. */

/* alert */
// Muestra un mensaje y espera a que el usuario presione “Aceptar”.

// alert('Hola')

/* prompt */
/*
La función prompt acepta dos argumentos: prompt(title, default)
  - title - El texto a mostrar al usuario.
  - default - Un segundo parámetro opcional, el valor inicial del campo de entrada.

Muestra una ventana modal con un mensaje de texto, un campo de entrada para el visitante y
los botones OK/CANCELAR.

La llamada a prompt retorna el texto del campo de entrada o null si la entrada fue cancelada.
*/

// const result = prompt('¿Como te sientes hoy?')
// alert(result)

/* confirm */
// La sintaxis: confirm(pregunta)
// La función confirm muestra una ventana modal con una pregunta y dos botones: OK y CANCELAR.
// El resultado es true si se pulsa OK y false en caso contrario.

// const result2 = confirm('Eres mayor de edad?')

// if (result2) {
//   alert('Bienvenido')
// } else {
//   alert('Para la proxima')
// }

/*
Todos estos métodos son modales: detienen la ejecución del script y no permiten que el usuario
interactúe con el resto de la página hasta que la ventana se haya cerrado.

Hay dos limitaciones comunes a todos los métodos anteriores:
  - La ubicación exacta de la ventana modal está determinada por el navegador. Normalmente, está en el centro.
  - El aspecto exacto de la ventana también depende del navegador. No podemos modificarlo.
*/

/*
===== DOM (Modelo de Objetos del Documento) =====
*/

/* Según el Modelo de Objetos del Documento (DOM), cada etiqueta HTML es un objeto, incluso el texto dentro de una etiqueta también es un objeto y todos estos objetos son accesibles empleando JavaScript, y podemos usarlos para modificar la página.*/

/* Todas las operaciones en el DOM comienzan con el objeto document. Este es el principal “punto de entrada” al DOM, desde ahí podremos acceder a cualquier nodo.*/

/* document */
// Por ejemplo, document.body es el objeto que representa la etiqueta <body>.
// console.log('body:')
// console.log(document.body)

// document.body.style.backgroundColor = '#333'

// console.log('html:')
// console.log(document.documentElement)
// console.log('head:')
// console.log(document.head)

/*
===== BOM (Modelo de Objetos del Navegador) =====
*/
/* El Modelo de Objetos del Navegador (Browser Object Model, BOM) son objetos adicionales
proporcionados por el navegador (entorno host) para trabajar con todo excepto el documento. */

/*
Por ejemplo:
1) El objeto navigator proporciona información sobre el navegador y el sistema operativo.
Hay muchas propiedades, pero las dos más conocidas son:
  - navigator.userAgent: acerca del navegador actual.
  - navigator.platform: acerca de la plataforma (ayuda a distinguir Windows/Linux/Mac, etc.).
2) El objeto location nos permite leer la URL actual y puede redirigir el navegador a una nueva.
*/

// const SO = navigator.platform

// if (SO === 'Win32') {
//   alert('Decarga para windows')
// } else if ( SO === 'MacOs') {
//   alert('Decarga para Mac')
// }

// function irOtraPagina () {
//   if(confirm('¿Quieres ir a youtube?')) {
//     location.href = 'https://youtube.com'
//   }
// }

// irOtraPagina()

// if (navigator.platform === 'Win32') {
//   alert('estas en windows')
// } 

/*
===== Trabajando con el DOM =====
*/
/*
===== Hijos: childNodes, firstChild, lastChild =====
*/
// Existen dos términos que vamos a utilizar de ahora en adelante:
/*
Nodos hijos (childNodes) – elementos que son hijos directos, es decir sus descendientes inmediatos.
Por ejemplo, <head> y <body> son hijos del elemento <html>.

Descendientes – todos los elementos anidados de un elemento dado, incluyendo los hijos, sus hijos y así sucesivamente.
*/

// console.log('nodos hijos:')
// console.log(document.documentElement)

// console.log('Decendietes (childNodes):')
// console.log(document.body.childNodes)

// console.log('firstChild:')
// console.log(document.body.firstChild)

// console.log('lastChild:')
// console.log(document.body.lastChild)

/*
===== Colecciones del DOM
*/

// console.log('Colecciones del Dom con childNodes:')
// for (let i=0;i < document.body.childNodes.length; i++){
//   console.log(document.body.childNodes[i])
// }

/*
Como podemos ver, childNodes parece un array. Pero realmente no es un array,
sino más bien una colección – un objeto especial iterable.
Hay dos importantes consecuencias de esto:
  - Podemos usar for para iterar sobre él.
  - Los métodos de Array no funcionan, porque no es un array. (push, pop, shift, unshift, etc.)

La primera consecuencia es agradable. La segunda es tolerable, porque podemos usar Array.from para crear un array “real”
desde la colección si es que queremos usar métodos del array.
*/

// console.log(Array.from(document.body.childNodes))

/*
===== Hermanos y el padre =====
*/
// Los hermanos son nodos que son hijos del mismo padre.
// Por ejemplo, aquí <head> y <body> son hermanos.
/*
El hermano siguiente está en la propiedad nextSibling
y el anterior – en previousSibling.
*/

// El padre está disponible en parentNode.
// console.log(document.body.childNodes[3].parentNode)

// console.log('body después de head nextSibiling')
// console.log(document.head.nextSibling)
// console.log('head antes de body previousSibling')
// console.log(document.body.previousSibling)

/*
En childNodes podemos ver nodos de texto, nodos elementos y si existen, incluso los nodos de comentarios.

Pero para muchas tareas no queremos los nodos de texto o comentarios.

Solamente quisieramos las etiquetas y formularios de la estructura de la página.
*/

/*
===== Navegación solo por elementos =====
*/
/*
Los enlaces son similares a los de arriba, solo que tienen dentro la palabra Element:
  - children – solo esos hijos que tienen el elemento nodo.
  - firstElementChild, lastElementChild – el primer y el último elemento hijo.
  - previousElementSibling, nextElementSibling – elementos vecinos.
  - parentElement – elemento padre.
*/

// console.log('nodos hijos:')
// console.log(document.documentElement)

// console.log('Decendietes (children):')
// console.log(document.body.children)

// console.log('firstElementChild:')
// console.log(document.body.children.firstElementChild)

// console.log('lastElementChild:')
// console.log(document.body.lastElementChild)

// console.log('body después de head nextElementSibling')
// console.log(document.head.nextElementSibling)
// console.log('head antes de body previousElementSibling')
// console.log(document.body.previousElementSibling)

// console.log('Colecciones del Dom con Children:')
// for (let i=0;i < document.body.children.length; i++){
//   console.log(document.body.children[i])
// }

// Dado un nodo del DOM, podemos ir a sus inmediatos vecinos utilizando las propiedades de navegación.
/*
Hay dos conjuntos principales de ellas:
  - Para todos los nodos: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.

  - Para los nodos elementos: parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.
*/

/*
===== innerHTML: los contenidos =====
*/
/*
La propiedad innerHTML permite obtener el HTML dentro del elemento como
un string.
También podemos modificarlo. Así que es una de las formas más poderosas
de cambiar la página.

* innerHTML hace una sobrescritura completa del contenido del elemento.
*/

// = añade el contenido al final del elemento. (una sobrescritura del antiguo).

// += añade el contenido al final del elemento. (una concatenación del antiguo y el nuevo).

// document.body.children[0].innerHTML += '<h1>Hola</h1>'
// console.log(document.body.children[0].innerHTML += '<h2>Como estas</h2>')

/*
===== outerHTML: el elemento completo =====
*/
/*
La propiedad outerHTML devuelve el HTML completo del elemento.
También podemos modificarlo.
A diferencia de innerHTML, outerHTML no hace una sobrescritura del contenido del elemento.
*/

// console.log(document.body.children[0])
// document.body.children[0].outerHTML = '<h1>Hola</h1>'
// console.log(document.body.children[0].outerHTML)


/*
===== nodeValue/data: contenido del nodo de texto =====
*/

/* Otros tipos de nodos, como los nodos de texto, tienen su contraparte:
propiedades nodeValue y data.
Estas dos son casi iguales para uso práctico, solo hay pequeñas diferencias
de especificación. */

// console.log('nodeValue:')
// console.log(document.body.childNodes)
// console.log(document.body.childNodes[3].nodeValue)

/* 
* El textContent proporciona acceso al texto dentro del elemento: solo texto, menos todas las <tags>.
Escribir en textContent es mucho más útil, porque puede insertar de forma segura texto generado por el usuario y protegerse de inserciones HTML no deseadas, los caracteres especiales y etiquetas son tratados exactamente como texto.
*/

// console.log(document.body.firstElementChild.textContent)

// innerHTML - Es interpretado como HTML.
// document.body.innerHTML = '<h1>Hola</h1>'
// textContent - Es interpretado como texto.
// document.body.textContent = '<h1>Hola</h1>'

/*
  - innerHTML - El contenido HTML dentro del elemento.
  - outerHTML - El contenido HTML completo del elemento.
  - nodeValue/data - El contenido del nodo de texto.
  - textContent - El texto dentro del elemento HTML, sin las etiquetas.
  - hidden - La propiedad hidden permite ocultar un elemento.
*/

/*
===== La propiedad “hidden” =====
*/
// Cuando se establece en true, hace lo mismo que CSS display:none.

// console.log(document)
// document.body.firstElementChild.textContent = 'dentro de root'
// document.body.firstElementChild.hidden = true
// document.body.firstElementChild.style.display = 'none'

// setTimeout(function () {
//   document.body.firstElementChild.hidden = false
// }, 3000)

// setTimeout(function () {
//   document.body.firstElementChild.hidden = true
// }, 6000)

/*
===== Atributos y propiedades =====
*/
/*
Todos los atributos son accesibles usando los siguientes métodos:
  - elemento.hasAttribute(nombre) – comprueba si existe.
  - elemento.getAttribute(nombre) – obtiene el valor.
  - elemento.setAttribute(nombre, valor) – establece el valor.
  - elemento.attributes – devuelve una colección de objetos de atributos.
  - elemento.removeAttribute(nombre) – elimina el atributo.
*/

// console.log('hasAttribute:')
// console.log(document.body.firstElementChild.hasAttribute('id'))
// console.log('getAttribute:')
// console.log(document.body.firstElementChild.getAttribute('id'))
// console.log('setAttribute:')
// document.body.firstElementChild.setAttribute('class', 'rootClass btn')
// console.log('getAttribute:')
// console.log(document.body.firstElementChild.getAttribute('class'))
// console.log('attributes:')
// console.log(document.body.firstElementChild.attributes)
// console.log('removeAttribute:')
// console.log(document.body.firstElementChild.removeAttribute('class'))

/*
Los atributos HTML tienen las siguientes características:
Su nombre no distingue entre mayúsculas y minúsculas (id es igual a ID).
Sus valores son siempre strings.
*/

// Creando atributos
/*
Atributos personalizados:
Cuando escribimos HTML, usamos muchos atributos estándar. Pero, ¿qué pasa con los no personalizados y personalizados?
*/

// document.body.firstElementChild.innerHTML = `
// <div class="order" data-order-status="nuevo">
//   Pedido #1
// </div>

// <div class="order" data-order-status="pendiente">
//   Pedido #2
// </div>

// <div class="order" data-order-status="cancelado">
//   Pedido #3
// </div>
// `

// const element = document.body.firstElementChild.children

// Para evitar conflictos, existen atributos data-*.
/* Todos los atributos que comienzan con “data-” están reservados para
el uso de los programadores. Están disponibles en la propiedad dataset. */

// console.log(element[0].getAttribute('order-status'))
// element[0].dataset.orderStatus = 'nuevo'
// element[1].dataset.orderStatus = 'nuevo'
// element[2].dataset.orderStatus = 'nuevo'

/*
===== Creando un elemento =====
*/

/*
Para crear nodos DOM, hay dos métodos:
  - Crea un nuevo nodo elemento HTML:
  document.createElement(etiqueta)

  - Crea un nuevo nodo texto:
  document.createTextNode(text)

La mayor parte del tiempo necesitamos crear nodos de elemento.
*/

// Mensaje
// 1 paso crear el elemento
// const div = document.createElement('div')
// document.body.append(div)
// const div2 = document.createElement('div')
// div.append(div2)


// 2 paso establecer sus valores
// div.textContent = 'Esto es un mensaje de prueba ✏️'
// div.className = 'message-text'
// div.style.padding = '5px'
// div.style.border = '1px solid #333'

/* Hemos creado el elemento. Pero hasta ahora solamente está en una variable llamada div, no en la página y no la podemos ver. */

/*
===== Métodos de inserción =====
*/
/* Para hacer que el div aparezca, necesitamos insertarlo en algún lado dentro de document. Por ejemplo, en el elemento <body>,
referenciado por document.body. */

/*
Métodos de inserción, ellos especifican diferentes lugares donde insertar nOs(nodos o strings):
  - node.append() – agrega nOs al final,
  - node.prepend() – inserta nOs al principio,
  - node.before() –- inserta nOs antes de,
  - node.after() –- inserta nOs después de
*/

//3 paso insertar el div al html
// document.body.prepend(div)

// const ul = document.createElement('ul')

// const firstLi = document.createElement('li')
// const nextLi = document.createElement('li')


// const prevLi = document.createElement('li')
// const lastLi = document.createElement('li')

// const text = document.createTextNode('firstLi')

// firstLi.append(text)
// lastLi.append('lastLi')
// nextLi.append('nextLi')
// prevLi.append('prevLi')

// ul.prepend(firstLi) // al principio
// firstLi.after(nextLi) // después
// ul.append(lastLi) // al final
// lastLi.before(prevLi) // antes

// document.body.firstElementChild.prepend(ul)

/*
En otras palabras, los strings son insertados en una manera segura, tal como lo hace elem.textContent.
Entonces, estos métodos solo pueden usarse para insertar nodos DOM como piezas de texto.
*/

/*
===== insertAdjacentHTML/Text/Element =====
*/
/*
Pero ¿y si queremos insertar un string HTML “como html”, con todas las etiquetas y demás funcionando, de la misma manera que lo hace elem.innerHTML?
*/

/*
Podemos usar otro métodos muy versátil: 
insertAdjacentHTML(donde, html).

El método tiene dos hermanos:
  - insertAdjacentText(donde, texto) – es insertado “como texto” en vez de HTML
  - insertAdjacentElement(donde, elemento) – inserta un elemento.

El primer parámetro es un palabra código que especifica dónde insertar.
  Debe ser uno de los siguientes:
  - "beforebegin" inserta html inmediatamente antes del elemento
  - "afterbegin" – inserta html dentro del elemento, al principio
  - "beforeend" – inserta html dentro del elemnto, al final
  - "afterend" – inserta html inmediatamente después del elemento

El segundo parámetro es un string HTML, que es insertado “como HTML”
*/

// const root = document.body.firstElementChild

// // beforebegin insrtea html antes del elemento
// root.insertAdjacentHTML('beforebegin', '<p style="color:red">antes del root</p>')
// // afterend insrtea html después del elemento
// root.insertAdjacentHTML('afterend', '<p>después del root</p>')

// // afterbegin insrtea html dentro y antes del elemento
// root.insertAdjacentHTML('afterbegin', '<p>dentro y antes</p>')
// // beforeend insrtea html dentro y después del elemento
// root.insertAdjacentHTML('beforeend', '<p>dentro y después</p>')

/*
===== Eliminación de nodos =====
*/
// Para quitar un nodo, tenemos el método node.remove().
  // root.remove()
  // console.log(document.body.firstElementChild)
  // document.body.firstElementChild.remove()
  // console.log(document.body.firstElementChild)

/*
===== Buscar elementos =====
*/
/*
Las propiedades de navegación del DOM son ideales cuando los elementos están cerca unos de otros, pero, ¿y si no lo están? ¿Cómo obtener un elemento arbitrario de la página?

Para estos casos existen métodos de búsqueda adicionales y sólo pueden
ser llamados en el objeto document
*/

// console.log('getElementById:')
// const root = document.getElementById('root')
// console.log(root)

// console.log('querySelector:')
// const id = document.querySelector('#root')
// console.log(id)

// const clase =  document.createElement('div')
// clase.className = 'clase'
// root.insertAdjacentElement('beforeend', clase)

// const qsClase = document.querySelector('.clase')
// console.log('querySelector:')
// console.log(qsClase)

// for (let i=0;i<3;i++) {
//   const div = document.createElement('div')
//   div.className = 'item'
//   root.insertAdjacentElement('beforeend', div)
// }

// Este método es muy poderoso, porque se puede utilizar cualquier selector de CSS.

// console.log('querySelectorAll:')
// const qsAll = document.querySelectorAll('div')
// console.log(Array.from(qsAll))

/* 
También hay otros métodos que permiten buscar nodos por una etiqueta,
una clase, etc. 

hoy en día son historia, ya que querySelector es más poderoso
y corto de escribir. 
*/
// console.log('getElementsByClassName:')
// console.log(document.getElementsByClassName('item'))
// console.log('getElementsByTagName:')
// console.log(document.getElementsByTagName('div'))

/*
===== matches =====
*/
/*
El elemento.matches(css) no busca nada, sólo comprueba si el elemento coincide
con el selector CSS dado. Devuelve true o false.
Este método es útil cuando estamos iterando sobre elementos (como en un array)
y tratando de filtrar los que nos interesan.
*/
// console.log(document.body.firstElementChild.matches('#root'))

/*
===== closest =====
*/
/*
Los ancestros de un elemento son: el padre, el padre del padre, su padre y así sucesivamente. Todos los ancestros juntos forman la cadena de padres desde el elemento hasta la cima.

El método elemento.closest(css) busca el ancestro más cercano que coincide con el selector CSS. El propio elemento también se incluye en la búsqueda.

En otras palabras, el método closest sube del elemento y comprueba cada uno de los padres. Si coincide con el selector, entonces la búsqueda se detiene y devuelve dicho ancestro.
*/

// console.log(document.head.closest('html'))

/*
Y mencionemos un método más para comprobar la relación hijo-padre, ya que a veces es útil: elemento.contains(elemento2)
*/

// console.log('contains()')
// const p = document.createElement('p')
// console.log(document.body.contains(root))

/* 
===== Practicas DOM - Ejemplos ===== 
*/

/* Ejemplos para pintar una lista ordenada en el DOM */

// const frutas = [
//   {
//     id: 1,
//     nombre: 'Manzana'
//   },
//   {
//     id: 2,
//     nombre: 'Pera'
//   },
//   {
//     id: 3,
//     nombre: 'Uva'
//   },
//   {
//     id: 4,
//     nombre: 'Mango'
//   },
//   {
//     id: 5,
//     nombre: 'Platano'
//   }
// ]

// const root = document.getElementById('root')

// 1) ejemplo 1 ====*
// const ol = document.createElement('ol')

// root.insertAdjacentElement('afterbegin', ol)

// for (let i = 0; i < frutas.length; i++) {
//   const li = document.createElement('li')
//   li.textContent = frutas[i].nombre
//   ol.insertAdjacentElement('beforeend', li)
// }

// 2) ejemplo 2 ====*
// let html = ''

// html += '<ol>'
// for (let i = 0; i < frutas.length; i++) {
//   html += `
//   <li>${frutas[i].nombre}</li>
//   `
// }
// html += '</ol>'

// root.insertAdjacentHTML('beforeend', html)

// ====> Ejercicio con el DOM
/*
- Crear tabla que contenga solo usuarios que tengan correo de Academlo (podemos usar método [endsWith](https://www.w3schools.com/jsref/jsref_endswith.asp))
- Crear una tabla que muestre a las personas en rango de 20 y 40 años
- Crear una tabla que contenga la información de todos los usuarios incluyendo sus redes sociales
*/

/*
===== Javascript Avanzado =====
*/

/*
===== Recursividad =====
*/



/*
=== Debugging & Apilamiento (contexto de ejecución y pila) ===
*/



/*
==== Funciones de primera clase ===
*/


/*
==== Funciones Callback ===
*/



// ====> Ejercicio con Callback
/*
1) Crear una función que use el ciclo for para recorrer todos los elementos de un arreglo y ejecute una función(callback) por cada uno de los elementos, cada vez que el callback se ejecute recibirá como parámetro el elemento en la posición i y este podrá ser utilizado en el callback.

2) Crear una función que use el ciclo `for` para recorrer todos los elementos de un arreglo y ejecute una función (callback) para cada uno de los elementos, cada vez que el callback se ejecute recibirá como parámetro el elemento en la posición `i` y retornará `true` si el elemento cumple con una condición especificada en el callback, en caso contrario retornara `false`, algunos ejemplos pueden ser:
  - Tenemos el arreglo `[2, 3, 4]`, y la condición del callback será que el elemento que recibe sea igual a 3, al ejecutar el callback para cada elemento este retornará `false, true, false`
  - Tenemos el arreglo de usuarios la condición del callback será que el usuario tenga correo de academlo, por lo cual al ejecutar el callback por cada elemento de array (que sería cada usuario) lo que este retornará será `true, true, false, true, false`
Finalmente nuestra función principal devolverá en un arreglo nuevo todos los elementos para los cuales el callback haya devuelto true

3) Crear una función que use el ciclo `for` para recorrer todos los elementos de un arreglo y ejecute una función (callback) por cada elemento **hasta** que encuentre un elemento que cumpla con una condición provista por el callback, cuando un elemento cumpla con la condición nuestra función principal retornara el elemento que cumplió con la condición, por ejemplo:
  - Tenemos el arreglo `[2, 3, 4]`, y la condición del callback será que el elemento que recibe sea igual a 3, al ejecutar el callback para cada elemento la función principal retornará 3, ya que es el primer elemento que cumple la condición.
  - Tenemos el arreglo de usuarios y la condición del callback será que el usuario tenga correo de academlo, por lo cual al ejecutar el callback por cada elemento de array (que sería cada usuario) lo que este retornará será lo siguiente, ya que es el primer elemento que cumple con la condición
*/


/*
==== Funciones de orden superior (High Order Functions) ===
*/
/*
===== Closure =====
*/



/*
===== Bucles =====
*/



/*
===== Funciones Flecha =====
*/



/*
Métodos para arrays
*/

