const normalServer = require('./services/normalServer.js');
const compressedServer = require('./services/compressedServer');

compressedServer.listen(3000, () =>
    console.log(`Compressed server escuchando en puerto 3000`)
);

normalServer.listen(4000, () =>
    console.log(`Normal server escuchando en puerto 4000`)
);