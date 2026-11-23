import { useMemo, useState } from 'react';
import { filterProducts } from '../utils';

const initialFilters = { from: '', to: '', onlyDiscount: false, sort: 'default' };

// Состояние фильтров + отфильтрованный список товаров
export function useProductsFilter(products) {
  const [filters, setFilters] = useState(initialFilters);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const changeFilter = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  return { filters, changeFilter, filtered };
}
