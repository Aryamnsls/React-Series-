export interface IMacros {
    protein: number;
    carbs: number;
    fats: number;
}

export class Macros implements IMacros {
    protein: number = 0;
    carbs: number = 0;
    fats: number = 0;
}

export class Food {
    name: string = '';
    image?: string;
    calories: number = 0;
    weight?: number;
    macros: Macros = new Macros();
}