import { Marcador } from './marcador';


export class Mapa {

    // objeto de tipo marcador entre llaves para decir que va atener varias llaves
    // el valor del objeto va a ser de tipo marcador
    private marcadores: { [key: string]: Marcador } = {
        '1': {
            id: '1',
            nombre: 'Danilo',
            lng: -91.8092319,
            lat: 14.9588665,
            color: '#dd8fee'
          },
          '2': {
            id: '2',
            nombre: 'Melissa',
            lng: -91.8055841,
            lat:  14.9587421,
            color: '#790af0'
          },
          '3': {
            id: '3',
            nombre: 'Juan',
            lng: -91.7872271,
            lat:  14.9630851,
            color: '#19884b'
          }
    };

    constructor() {}

    getMarcadores() {
        return this.marcadores;
    }

    agregarMarcador( marcador: Marcador ) {
      this.marcadores[ marcador.id ] = marcador;
    }

    borrarMarcador(id: string ) {
        // delete para eliminar propiedades de un objeto
        // las llaves para hacer referencia al objeto
        delete this.marcadores[id];
        return this.getMarcadores();
    }

    moverMarcador( marcador: Marcador ) {

        // hacemos referencia al marcador 
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;

    }


}
