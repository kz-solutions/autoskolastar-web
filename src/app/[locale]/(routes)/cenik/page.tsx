"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface Item {
  id: string;
  price: number;
  category_id: number;
  price_per_hour: number;
  translations?: Array<{ label: string }>;
}

interface Category {
  id: number;
  translations?: Array<{ label: string; description: string }>;
}

type PricingCategory = {
  id: string | number;
  label: string;
};

type PricingItem = {
  id: string | number;
  label: string;
  category_id: string | number;
  price: string;
  price_per_hour: string;
};

const Page = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const t = useTranslations("HomePage");

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

  const price = (price: number) => {
    if (!price) return "-";
    return t(
      "priceTemplate",
      {
        price,
      },
      {
        number: {
          currency: {
            style: "currency",
          },
        },
      },
    );
  };

  return (
    <div className="min-h-screen h-full flex flex-col content-center px-64 py-36 gap-12">
      {categories
        .filter(
          (cat) =>
            items.find((item) => item.category_id === cat.id) !== undefined,
        )
        .map((category) => (
          <div key={category.id} className="flex flex-col">
            <h3 className="text-xl">{category.translations?.[0]?.label}</h3>
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
                      <td>{item.translations?.[0]?.label}</td>
                      <td className="text-end px-8 py-1">
                        {price(item.price)}
                      </td>
                      <td className="text-end pl-8 py-1">
                        {price(item.price_per_hour)}
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
