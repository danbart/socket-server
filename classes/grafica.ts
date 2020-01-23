/*  Este código va en el backend
    Es la nueva clase de GraficaData

    Si este archivo ya existe, reemplazarlo por este nuevo.
    Esta simplificado pero funciona de la misma manera
    que en la sección anterior.
*/

export class GraficaData {

    private labels: string[] = [];
    private valores: number[] = [0, 0, 0, 0];

    constructor() { }

    setLabels( labels: string[] ) {
        this.labels = labels;
    }

    getDataGrafica() {
        return [
            { data: this.valores, label: 'Preguntas' }
        ];
    }

    incrementarValor( opcion: number, valor: number ) {

        this.valores[opcion] += valor;
        return this.getDataGrafica();

    }


}

// export class GraficaData {

//     private meses: string[] = ['enero', 'febrero', 'marzo', 'abril'];
//     private valores: number[] = [0, 0, 0, 0];

//     constructor() {}

//     getDataGrafica() {

//         return [
//             { data: this.valores, label: 'Ventas'}
//         ]
//     }

//     incremetarValor( mes: string,  valor: number ) {
        
//         mes = mes.toLocaleLowerCase().trim();

//         for( let i in this.meses ) {

//             if ( this.meses[i] === mes ) {
//                 this.valores[i] += valor;
//             }
//         }


//         return this.getDataGrafica();
//     }
