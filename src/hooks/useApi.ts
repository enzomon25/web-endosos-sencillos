import { useState, useEffect } from 'react';

interface Product {
  idProducto: number;
  nombreProducto: string;
}

interface EndorseType {
  idTipoEndoso: number;
  nombreTipoEndoso: string;
  descripcion?: string;
}

const API_URL = import.meta.env.VITE_ENDOSOS_API_URL;
const API_KEY = import.meta.env.VITE_ENDOSOS_API_KEY;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!API_URL || !API_KEY) {
        setError('Configuración del API no encontrada');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/products`, {
          headers: {
            'x-api-key': API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar productos');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export const useEndorseTypes = (productName: string | null) => {
  const [endorseTypes, setEndorseTypes] = useState<EndorseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productName) {
      setEndorseTypes([]);
      return;
    }

    const fetchEndorseTypes = async () => {
      if (!API_URL || !API_KEY) {
        setError('Configuración del API no encontrada');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/products/${productName}/endorse-types`, {
          headers: {
            'x-api-key': API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setEndorseTypes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar tipos de endoso');
        setEndorseTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEndorseTypes();
  }, [productName]);

  return { endorseTypes, loading, error };
};
