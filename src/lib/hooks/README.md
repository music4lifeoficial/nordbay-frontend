# NordBay API Hooks

## useProducts
```ts
const { data, isLoading, error } = useProducts({ query: 'sofa', category: 'furniture' });
// data.items: Product[]
// data.total: number
```

## useCreateProduct
```ts
const createProduct = useCreateProduct();
createProduct.mutate({ title: 'Sofa', price: 1000, ... });
```

- Todos los hooks usan el API client con interceptors, manejo de errores y tipado estricto.
- Si ocurre un error de autenticación, el usuario será redirigido automáticamente a login.
- Los datos se cachean y revalidan automáticamente con TanStack Query.

---

> Ejemplo de integración en un componente:
```tsx
import { useProducts, useCreateProduct } from '@/lib/hooks/use-products';

export function ProductList() {
  const { data, isLoading, error } = useProducts({});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <ul>
      {data?.items.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```
