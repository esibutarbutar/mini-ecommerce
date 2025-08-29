export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    createdAt: Date;
     name: string;   
     email: string; 
}