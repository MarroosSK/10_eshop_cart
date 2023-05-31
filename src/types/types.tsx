export interface ProductType {
    title: string;
    image: string;
    currencyFormat: string;
    currencyId: string;
    description: string;
    id: number;
    isFreeShipping: boolean;
    price: number;
    availableSizes: {
        sizeId: string;
        sizeSize: string;
        sizeQuantity: number;
      }[];
}

export interface DarkModeType{
    mode: "light" | "dark";
}