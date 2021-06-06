export class Postdonare {
    completedAt: number;
    cod_donator: string;
    grupa: string;
    Rh: string;
    Syphilis: string;
    HIV: string;

    constructor(completedAt: number,
        cod_donator: string,
        grupa: string,
        Rh: string,
        Syphilis: string,
        HIV: string) {

        this.completedAt = completedAt;
        this.cod_donator = cod_donator;
        this.grupa = grupa;
        this.Rh = Rh;
        this.Syphilis = Syphilis;
        this.HIV = HIV;
    }
}




export class Predonare {
    completedAt: string;
    cod_donator: string;
    Hb: number;
    Glicemie: number;
    Ht: number;
    Ga: number;
    Gr: number;
    Pl: number;
    Ly: number;
    Mo: number;
    GrProcente: number;
    TA: string;
    P: number;
    G: number;
    H: number;


    constructor(
        completedAt: string,
        cod_donator: string,
        Hb: number,
        Glicemie: number,
        Ht: number,
        Ga: number,
        Gr: number,
        Pl: number,
        Ly: number,
        Mo: number,
        GrProcente: number,
        TA: string,
        P: number,
        G: number,
        H: number) {
        this.completedAt = completedAt;
        this.cod_donator = cod_donator;
        this.Hb = Hb;
        this.Glicemie = Glicemie;
        this.Ht = Ht;
        this.Ga = Ga;
        this.Gr = Gr;
        this.Pl = Pl;
        this.Ly = Ly;
        this.Mo = Mo;
        this.GrProcente = GrProcente;
        this.TA = TA;
        this.P = P;
        this.G = G;
        this.H = H;
    }
}


