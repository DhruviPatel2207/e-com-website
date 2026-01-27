export const WISHLIST_ENDPOINTS = {
  GET_USERS_WISHLISTS: (userId: number) => `/wishlist?userId=${userId}`,
  ADD_USER_WISHLISTS: '/wishlist',
  DELETE_USER_WISHLISTS: (objectId: number) => `/wishlist/${objectId}`,
};

export const PRODUCTS_ENDPOINTS = {
  GET_ALL_PRODUCTS: '/products',
  ADD_PRODUCT: '/products',
  EDIT_PRODUCT: (id: number) => `/products/${id}`,
  DELETE_PRODUCT_ITEM: (id: number) => `/products/${id}`,
  DELETE_ALL_ITEM: (id: number) => `/products/${id}`,
};

export const USER_ENDPOINTS = {
  GET_ALL_AUTH_DATA: '/users',
  GET_ALL_AUTH_DATA_ITEM: (email: string) => `/users?email=${email}`,
  ADD_USER_AUTH_DATA: '/users',
};

export const CART_ENDPOINTS = {
  GET_USERS_CART_ITEM: (userId: number, productId: number) =>
    `/cart?userId=${userId}&productId=${productId}`,
  GET_USER_CART_LIST: (userId: number) => `/cart?userId=${userId}`,
  ADD_USER_CART_ITEM: '/cart',
  EDIT_CART_ITEM: (id: number) => `/cart/${id}`,
  DELETE_CART_ITEM: (id: number) => `/cart/${id}`,
  EDIT_CART_DEC_ITEM: (id: number) => `/cart/${id}`,
};

export const ORDER_ENDPOINTS = {
  ADD_ORDER_DETAILS: '/orders',
  GET_ORDER_DETAILS: (userId: number) => `/orders?userId=${userId}`,
};

export const REVIEW_ENDPOINTS = {
  GET_REVIEWS: (productId: string) => `/review?productId=${productId}`,
  ADD_REVIEWS: '/review',
};
