import dayjs from 'dayjs';

export interface ISignupFormInitialValues {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: ReturnType<typeof dayjs>;
  role: string;
}

export interface IAuth {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  role: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  userId: number;
  discountedPrice: number;
}

export interface ICart {
  productId: number;
  userId: number;
  price: number;
  count: number;
  id: number;
}

export interface IWishlist {
  productId: number;
  userId: number;
  id: number;
}

export interface IAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  town: string;
  postCode: string;
  phone: string;
  email: string;
  notes: string;
}

export interface IOrder {
  items: {
    productId: number;
    discountedPrice: number;
    quantity: number;
    price: number;
    discountPercentage: number;
    total: number;
  }[];
  address: IAddress;
  finalTotal: number;
  userId: number;
  id: number;
}

export interface IReview {
  id?: number;
  comment: string;
  productId: number;
  userId: number;
  star: number;
}

// export interface IReviewDetails {
//   comment: string;
//   star: number;
//   userId: number;
//   productId: string | undefined;
// }

export interface IProductModal {
  isOpen: boolean;
  type: 'add' | 'edit';
  values: {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    id?: number;
  };
}
