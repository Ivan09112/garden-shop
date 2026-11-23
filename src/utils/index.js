// Актуальная цена товара (со скидкой, если она есть)
export const getFinalPrice = (product) =>
  product.discont_price ?? product.price;

export const hasDiscount = (product) =>
  product.discont_price !== null &&
  product.discont_price !== undefined &&
  product.discont_price < product.price;

export const getDiscountPercent = (product) =>
  Math.round(100 - (product.discont_price / product.price) * 100);

// $199 или $199.50
export const formatPrice = (value) => {
  const rounded = Math.round(value * 100) / 100;
  return `$${Number.isInteger(rounded) ? rounded : rounded.toFixed(2)}`;
};

// Итог в корзине в формате макета: $541,00
export const formatTotal = (value) => `$${value.toFixed(2).replace('.', ',')}`;

export const SORT_OPTIONS = [
  { value: 'default', label: 'by default' },
  { value: 'newest', label: 'newest' },
  { value: 'price-desc', label: 'price: high-low' },
  { value: 'price-asc', label: 'price: low-high' },
];

// Фильтрация и сортировка списка товаров
export function filterProducts(products, { from, to, onlyDiscount, sort }) {
  const min = from === '' ? -Infinity : Number(from);
  const max = to === '' ? Infinity : Number(to);

  const result = products.filter((product) => {
    const price = getFinalPrice(product);
    if (price < min || price > max) return false;
    if (onlyDiscount && !hasDiscount(product)) return false;
    return true;
  });

  switch (sort) {
    case 'newest':
      return result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case 'price-desc':
      return result.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    case 'price-asc':
      return result.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    default:
      return result;
  }
}

export const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Правила валидации для react-hook-form
export const formRules = {
  name: {
    required: 'Enter your name',
    minLength: { value: 2, message: 'Name is too short' },
  },
  phone: {
    required: 'Enter your phone number',
    pattern: {
      value: /^\+?[\d\s()-]{7,20}$/,
      message: 'Invalid phone number',
    },
  },
  email: {
    required: 'Enter your email',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email',
    },
  },
};
