export interface Category {
    CategoryID: number;
    CategoryName: string;
    Description: string;
  }
  
  export interface Product {
    ProductID: number;
    ProductName: string;
    CategoryID: number;
    Price: number;
    Description?: string;
  }