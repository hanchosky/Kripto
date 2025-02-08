// Descripción: Este archivo define la clase Cryptocurrency para representar la información de una criptomoneda.
// la clase Cryptocurrency tiene cuatro propiedades: id, name, symbol y price_usd.

export default class Cryptocurrency {
    constructor(
      public id: string,
      public name: string,
      public symbol: string,
      public price_usd: number
    ) {}
  }
  