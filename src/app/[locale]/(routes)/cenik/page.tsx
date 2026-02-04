"use client";

import React, { useEffect, useState } from "react";

interface Item {
  id: string;
  label: string;
  price: number;
  category_id: number;
  price_per_hour: number;
}

interface Category {
  id: number;
  label: string;
}

const Page = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch("/api/pricing-items");
      const data = await res.json();
      setItems(data);
    };

    const loadCategories = async () => {
      const res = await fetch("/api/pricing-categories");
      const data = await res.json();
      setCategories(data);
    };

    loadItems();
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen h-full flex flex-col content-center px-64 py-36 gap-12">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col">
          <h3 className="text-xl">{category.label}</h3>
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left w-auto py-1"></th>
                <th className="text-right w-40 px-8 py-1">Cena</th>
                <th className="text-right w-min whitespace-nowrap pl-8 py-1">
                  Kondiční jízdy za 1 vyuč. hodinu
                </th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) => item.category_id === category.id)
                .map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td>{item.label}</td>
                    <td className="text-end px-8 py-1">{item.price}</td>
                    <td className="text-end pl-8 py-1">
                      {item.price_per_hour}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Page;
