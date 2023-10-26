export interface IFetchFoodData {
    text: string;
    parsed: [
        {
            food: {
                label: string;
                image: string;
                nutrients: {
                    ENERC_KCAL: number;
                    PROCNT: number
                    FAT: number;
                    CHOCDF: number;
                }
            }
        }
    ],
    hints: [
        {
            measures: [
                {
                    weight: number;
                }
            ]
        }
    ]
}