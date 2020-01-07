import expres from 'express';
import { SERVER_PORT } from '../global/environment';

export default class Server {

    public app: expres.Application;
    public port: number;

    constructor() {
        this.app = expres();
        this.port = SERVER_PORT;
    }

    start( callback: Function ) {
        this.app.listen( this.port, callback() );
    }


}