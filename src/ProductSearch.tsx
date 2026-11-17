// AI-assisted, deliberately imperfect review fixture. Not production code.
import { useEffect, useState } from "react";
type Product = { id: string; name: string; price: number };
export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?q=${query}`)
      .then(response => response.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, [query]);
  return <section>
    <input placeholder="Search products" value={query}
      onChange={event => setQuery(event.target.value)} />
    {loading && <p>Loading...</p>}
    <ul>{products.map((product, index) => <li key={index}>
      <span>{product.name}</span>
      <strong>{product.price.toFixed(2)}</strong>
    </li>)}</ul>
  </section>;
}
