# Tercera entrega del proyecto final

Tercera entrega del proyecto final que integra Twilio, Nodemailer, Mongo db, express, etc.

## Organización del proyecto

El código de este proyecto podrás visualizarlo en la carpeta src, la cual contiene los siguientes archivos y carpetas:

1. index.js = es el archivo que inicializa el funcionamiento del servidor y la conexión con la base de datos de Mongo DB.
2. Services = en esta carpeta encontrarás los archivos vinculados a todos los servicios que va a necesitar el proyecto. En este caso tenemos a auth.js, que mediante passport se encargan de realizar el sign up y el login de usuarios con las validaciones pertinentes y avisos via mail en caso de un nuevo sign up. También tenemos a database.js, que contiene la función de conexión con la base de datos. Luego, tenemos a log4jsConfig, encargada de brindar el servicio de loggers en reemplazo de console.logs. Asimismo, encontrarás la carpeta notifications.js, que realiza las funciones asociadas a nodemailer y twilio. Y por último, server.js, que contiene configuraciones de passport, un middleware para atajar errores y el main router /api.
3. Models = en esta carpeta se encuentran todos los modelos de los objetos con los que se van a estar trabajando en el proyecto y en mongo DB. Hay un modelo para productos, otro para carritos, otro para usuarios y otro para categorías. Los modelos son exportados a la carpeta api, para ser utilizados en ella.
3. Api = es la carpeta que va a trabajar con los modelos explicados previamente. Para cada archivo, encontrarás las funciones CRUD pertinentes a mongo DB. Los modelos son utilizados para comunicarse con la base de datos. Incluso, encontrarás un archivo llamado error.js, que contiene una variable const de error, y una clase Api Error para ser utilizada en el atajado de errores a lo largo del proyecto. El archivo index.js exporta algunas de estas APIS (productos y errores no, puesto que me daba errores de imports y exports al trasladarlos a este archivo, por ende, estos últimos fueron importados a mano en los archivos donde cumplirían su utilidad).
4. Controllers = hace un llamado a las APIS de la carpeta api. Los controllers, incorporando las funcionalidades de las APIS y su comunicación con la DB, realizan todas las operaciones necesarias para trabajar con las queries en postman. Todos los controllers son exportados a un archivo index.js, y de allí exportados nuevamente para ser utilizadas en las routes o endpoints.
5. Routes = Contiene todos los endpoints para los distintos objetos con los que se está trabajando: carritos, productos, usuarios y categorías. Para cada endpoint habrá una función exportada de los controllers.
6. Config = mediante dotenv, nos trae todas las variables de entorno necesarias para el proyecto (string de conexión a la DB, usuarios y keys de gmail, números de telefono, cuenta y key de twilio, etc.).

## Endpoints y su funcionalidad

### USUARIOS: localhost:3000/api/auth/signup

Aquí deberás hacer un POST para registrar un usuario en la base de datos respetando el modelo de Mongoose. ATENCIÓN: revisar muy bien a la hora de colocar los campos a completar. Es muy común confundir "lastName" con "lastname". En este proyecto la N del name va en MAYÚSCULA. 
Si falta un campo requerido obtendrás un error que te informará sobre los campos inválidos (el campo admin: si no se coloca el boolean true, automáticamente es registrado con false.). 
Si registras un usuario con el mismo username, no se te permitirá crearlo dado que ya existe. A su vez, no se te permitirá crear un usuario con una edad menor a 18 años.
Si el registro sale con éxito, se te informará por postman y podrás visualizar a tu usuario registrado en la collection "users". Incluso, recibirás un mail que te avisará acerca del registro nuevo. 

### USUARIOS: localhost:3000/api/auth/login

Aquí deberás realizar el login con el username y la password únicamente en una solicitud POST. En postman simplemente completa los campos "email" y "password" con los datos que correspondan (Sugerenciea: no olvidar la contraseña puesta, puesto que en la DB aparecerá encriptada).
Si alguno de los dos datos, o ambos, tienen algún error, se te notificará con un mensaje de error avísandote acerca de los campos invalidos.

### USUARIOS: localhost:3000/api/auth/logout

Es una solicitud POST que destruye la sesión creada y para realzar querys deberás realizar el log in nuevamente. Verás un mensaje de despedida al aplicar esta función.

### USUARIOS: localhost:3000/api/hello

Es una solicitud GET que te brinda los datos de la sesión y el id del usuario.

### CATEGORÍAS: localhost:3000/api/categories

Es una solicitud GET que te traerá todas las categorías de productos disponibles en la DB. Si no tienes categorías creadas no te preocupes, podrás crearlas con el endpoint POST que explicaré más adelante.

### CATEGORÍAS: localhost:3000/api/categories/:id

Solicitud GET que te trae una categoría en particular brindando como parámetro el id de la categoría. Si brindas un id inválido, se te informará mediante un error.

### CATEGORÍAS: localhost:3000/api/categories

Es una solicitud POST que te permitirá crear una categoría respetando el modelo de mongoose. Cuando tengas categorías creadas podrás probar las dos solicitudes GET anteriores.

### CATEGORÍAS: localhost:3000/api/categories/:id

Es una solitud PUT que te permitirá modificar una categoría ya existente. Deberás pasar por parámetro el id de la categoría que deseas modificar y en el body no deben faltarte los campos de "name" y "description", puesto que si no, recibirás un error.

### CATEGORÍAS: localhost:3000/api/categories/:id

Es una solicitud DELETE que te permitirá eliminar una categoría SIEMPRE Y CUANDO no tenga productos asociados a la misma. Si hay productos que pertenecen a la categoría, no podrás eliminarla. Para probarla, deberás pasar el id de la categoría por parámetro.

### PRODUCTOS: localhost:3000/api/products

Es una solicitud GET que te permitirá traer todos los productos presentes en la base de datos. Si no tienes productos en la base, deberás crearlos mediante una solicitud POST, en el endpoint que explicaré en breve.

### PRODUCTOS: localhost:3000/api/products/:id

Es una solicitud GET que te permitirá traer un solo producto al pasar su id como parámetro en el endpoint. Si pasas un id inválido, obtendrás un error. 

### PRODUCTOS: localhost:3000/api/products

Es una solicitud POST que te permitirá crear un producto respetando el modelo de mongoose correspondiente. Si no lo respetas, no podrás crearlo. Deberás pasarle incluso un ID correspondiente a una categoría en particular de las que tengas creadas en la base de datos. De esa manera, el producto quedará asociado a esa categoría.

### PRODUCTOS: localhost:3000/api/products/:id

Es una solicitud PUT que te permitirá modificar un producto creado en tu base de datos. Respetando los campos correspondientes y pasando el id de un producto existente podrás modificarlo sin inconvenientes.

### PRODUCTOS: localhost:3000/api/products/:id

Es una solicitud DELETE que te permitirá eliminar un producto de tu base de datos. Deberás pasar un id válido puesto que si no recibirás un error. 

### CARRITOS: localhost:3000/api/cart

Es una solicitud GET que te permitirá visualizar el carrito del usuario con el que te has logueado. Si no realizas el login previo no estarás autorizado a visualizar el carrito, puesto que cada usuario tiene su propio carrito.

### CARRITOS: localhost:3000/api/cart/add

Deberás realzar una operación POST, en la que agregarás productos al carrito. Deberás completar dos campos: "productId" y "amount". En productId deberás pasar el id de algún producto presente en la base de datos (si le pasas uno inválido obtendrás un error). Y en amount deberás pasar el número de items que llevarás de ese producto (ATENCIÓN: cada producto cuenta con su stock propio, por lo tanto si agotas stock no podrás seguir insertando ese producto en el carrito). Si deseas agregar otro producto solamente cambia el id y listo!

### CARRITOS: localhost:3000/api/cart/remove

Aquí podrás realizar una solicitud POST. Deberás pasar el id del producto que deseas eliminar del carrito (si pasas el id de un producto que no está en el carrito recibirás un error) y la cantidad a eliminar. Por ende, deberás completar los siguientes campos "productId" y "amount". La cantidad es opcional, si no queres podes evitarla, pero al no poner una cantidad y solamente el id eliminarás todos los items que tengas de ese producto por lo tanto tener cuidado.

### CARRITOS: localhost:3000/api/cart/order

Por último, tenemos esta solicitud POST para crear la orden de tu carrito. No podrás crear la orden con el carrito vacío, por lo tanto deberás agregar al menos un producto o recibirás un aviso de alerta. Una vez que tengas productos en el carrito, podrás crear tu orden. Recibirás un aviso por whatsapp acerca de tu compra.

En el archivo .env.example encontrarás todas las credenciales que vas a necesitar para probar el proyecto. Gracias por leer!







