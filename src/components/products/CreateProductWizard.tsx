"use client";

import { useState } from 'react';
import { createProduct } from '@/lib/api/create-product';
import type { CreatePublicationData } from '@/types';
import { useToast } from '@/hooks/useToast';

const initialForm: CreatePublicationData = {
  title: '',
  description: '',
  price: 0,
  category_id: '',
  condition: 'new',
  location_region: '',
  location_city: '',
  offers_shipping: false,
  pickup_available: false,
};

export default function CreateProductWizard() {
  const [form, setForm] = useState<CreatePublicationData>(initialForm);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  // Maneja el cambio de todos los inputs (text, select, textarea, checkbox, number)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: string | number | boolean = value;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      fieldValue = e.target.checked;
    } else if (name === 'price') {
      fieldValue = Number(value);
    }
    setForm(f => ({
      ...f,
      [name]: fieldValue,
    }));
  };

  // Maneja el submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct(form);
      showToast('Producto creado', 'success');
      setForm(initialForm);
    } catch (error) {
      showToast('No se pudo crear el producto', 'error');
      // console.error(error); // para debug, opcional
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mt-8">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Título
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input"
          required
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium">
          Precio (DKK)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="input"
          required
          min={1}
        />
      </div>
      <div>
        <label htmlFor="category_id" className="block text-sm font-medium">
          Categoría
        </label>
        <input
          id="category_id"
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="condition" className="block text-sm font-medium">
          Condición
        </label>
        <select
          id="condition"
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="input"
        >
          <option value="new">Nuevo</option>
          <option value="like_new">Como nuevo</option>
          <option value="good">Bueno</option>
          <option value="fair">Aceptable</option>
        </select>
      </div>
      <div className="flex gap-4">
        <div>
          <label htmlFor="location_region" className="block text-sm font-medium">
            Región
          </label>
          <input
            id="location_region"
            name="location_region"
            value={form.location_region}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="location_city" className="block text-sm font-medium">
            Ciudad
          </label>
          <input
            id="location_city"
            name="location_city"
            value={form.location_city}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="offers_shipping"
            checked={form.offers_shipping}
            onChange={handleChange}
          />{" "}
          Ofrece envío
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="pickup_available"
            checked={form.pickup_available}
            onChange={handleChange}
          />{" "}
          Permite retiro
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Creando..." : "Crear producto"}
      </button>
    </form>
  );
}
