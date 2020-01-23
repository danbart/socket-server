import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados, mapa } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';


const router = Router();

// mapa atraves de api
router.get('/mapa', ( req: Request, res: Response  ) => {

    res.json( mapa.getMarcadores() );

});


// Graficas
const grafica = new GraficaData();

router.get('/grafica', (req: Request, res: Response) => {
    res.json(
        grafica.getDataGrafica()
    )
});

router.post('/grafica', (req: Request, res: Response) => {

    const mes      = req.body.mes;
    const unidades = Number(req.body.unidades);

    grafica.incremetarValor( mes, unidades );

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica())

    res.json(grafica.getDataGrafica())
});

router.post('/grafica/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})

// Mensajes
router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta Bien!!'
    })
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload = { cuerpo, de };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    })
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})

// Servicios para obtener todos los IDs de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[] ) => {
        
        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        })
    })
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => { 

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista(),
    })
    
})


export default router;