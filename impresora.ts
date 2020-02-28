export enum TipoHoja{
    A1, A2, A3, A4
}

export class Impresiones{
    tipo : TipoHoja
    cantidad : number
    color : boolean

    constructor(tipo : TipoHoja, cantidad : number, color : boolean){
        this.tipo = tipo
        this.cantidad = cantidad
        this.color = color
    }
}

export class Impresora{
    nombre : string
    colaImpresion : Impresiones[]
    //costoEspec : number
    //ordImpresion : number

    constructor(nombre : string){
        this.nombre = nombre
        this.colaImpresion = []
        //this.costoEspec = 0
    }
    
    //Aqui haremos todos nuestros calculos
    calcularCostoColor(ord : number) : number{
        let conColor = this.colaImpresion[ord].color
        if(conColor == true){
            return 1.5
        }else{
            return 0.5
        }
    }
    calcularCostoTipoHoja(ord : number){
        let tipoDeHoja = this.colaImpresion[ord].tipo
        if (tipoDeHoja == 0){
            return 3
        }else if(tipoDeHoja == 1){
            return 2
        }else if(tipoDeHoja == 2){
            return 1
        }else if(tipoDeHoja == 3){
            return 0.5
        }
    }
    calcularCosto(ordImpresion : number) : number{
        let costoColor = this.calcularCostoColor(ordImpresion)
        let costoTipoHoja = this.calcularCostoTipoHoja(ordImpresion)
        let cantidadHojas = this.colaImpresion[ordImpresion].cantidad
        let costoEspec = cantidadHojas * costoTipoHoja * costoColor
        return costoEspec
    }
    calcularCostoTotal() : number{
        let costoAcum = 0
        let costoColor = 0
        let costoTipoHoja = 0
        let cantidadHojas = 0
        for (let i = 0; i < this.colaImpresion.length ; i++){
            costoColor = this.calcularCostoColor(i)
            costoTipoHoja = this.calcularCostoTipoHoja(i)
            cantidadHojas = this.colaImpresion[i].cantidad
            costoAcum = costoAcum + cantidadHojas * costoColor * costoTipoHoja
        }
        return costoAcum;
    }
    //Aqui mostraremos todos nuestros calculos
    mostrarImpresiones(){
        for (let i = 0 ; i < this.colaImpresion.length; i++){
            console.log(this.colaImpresion[i].tipo)
        }
    }

}

export class Operario{
    nombre : string
    impresion : Impresiones
    impresora : Impresora

    constructor(nombre : string, impresora : Impresora){
        this.nombre = nombre
        this.impresora = impresora
    }

    enviarImpresion(impresion){
        this.impresora.colaImpresion.push(impresion)
    }
}

let main = () => {
    //Primero simularemos ver la cola de impresion

    //Instanciamos el objeto impresora
    let impresora = new Impresora("HP")

    //Instaciamos en objeto Operario
    let operarioPrincipal = new Operario("Ignacio", impresora)

    //Instanciamos las impresiones
    let impresion1 = new Impresiones(TipoHoja.A2, 3, true)
    let impresion2 = new Impresiones(TipoHoja.A4, 5, true)

    //Enviamos las impresiones a la cola
    operarioPrincipal.enviarImpresion(impresion1)
    operarioPrincipal.enviarImpresion(impresion2)

    //Mostramos las impresion
    //impresora.mostrarImpresiones()
    //console.log(impresora.calcularCosto(0))
    console.log("El costo de total de la cola de impresion es: "+impresora.calcularCostoTotal())

}
main()