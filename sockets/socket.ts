import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Mapa } from "../classes/mapa";
import { Marcador } from "../classes/marcador";

export const usuariosConectados = new UsuariosLista();
export const mapa = new Mapa();

// eventos del mapa 
export const mapaSockets = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('marcador-nuevo', (marcador: Marcador) => {
        mapa.agregarMarcador( marcador );

        // broadcast para emitir
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });

    // Borrar marcador
    cliente.on('marcador-borrar', (id: string) => {
        mapa.borrarMarcador( id );

        // broadcast para emitir
        cliente.broadcast.emit('marcador-borrar',  id);
    });

    // Mover Marcador
    cliente.on('marcador-mover', (marcador: Marcador) => {
        mapa.moverMarcador( marcador );

        // broadcast para emitir
        cliente.broadcast.emit('marcador-mover',  marcador);
    });

} 

export const conectarCliente = ( cliente: Socket, io:socketIO.Server ) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
    
}

export const desconectar = (cliente: Socket, io: socketIO.Server ) => {
    
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        console.log(usuariosConectados.borrarUsuario(cliente.id));
        io.emit('usuarios-activos', usuariosConectados.getLista());
    })
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload );

    })

}

// Configurar Usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} Configurado`
        });
    } )
}

// Obtener Usuarios
export const obtenerUsuarios = (cliente: Socket,  io: socketIO.Server ) => {

    cliente.on('obtener-usuarios', () => {
        // Mandamos la información a la persona que lo esta solicitando
        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());
    })

}