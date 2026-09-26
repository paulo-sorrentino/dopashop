'use client';

import React, { useState, useMemo } from 'react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'dopamine' | 'price-desc' | 'price-asc' | 'rating'>('dopamine');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Desejos ✨' },
    { id: 'luxo', label: '👑 Mega Luxo' },
    { id: 'tech', label: '⚡ Tech Futurista' },
    { id: 'hype', label: '🔥 Hypebeast' },
    { id: 'conforto', label: '☁️ Puro Conforto' },
  ];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'dopamine') return b.dopamineLevel - a.dopamineLevel;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-colors duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vitrine Terapêutica Antiestresse</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-theme-heading tracking-tight">
            Catálogo dos Seus Maiores Desejos
          </h2>
          <p className="text-xs sm:text-sm text-theme-muted mt-1">
            Escolha tudo o que quiser. O preço é astronômico, mas o custo real é sempre R$ 0,00.
          </p>
        </div>

        {/* Count indicator */}
        <div className="text-[11px] sm:text-xs text-theme-muted bg-theme-card border border-theme-subtle px-3 py-1.5 rounded-full w-fit shadow-xs">
          Mostrando <strong className="text-pink-600 dark:text-pink-400">{filteredProducts.length}</strong> produtos para alívio imediato
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        
        {/* Category Tabs (Horizontal swipeable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-md shadow-pink-600/25 scale-102'
                  : 'bg-theme-card hover:bg-theme-elevated text-theme-body border border-theme-subtle'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          
          {/* Search box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar desejos..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-theme-card border border-theme-subtle text-theme-heading placeholder:text-theme-muted focus:outline-hidden focus:border-pink-500 shadow-xs"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto py-2 pl-3 pr-8 text-xs font-semibold rounded-xl bg-theme-card border border-theme-subtle text-theme-body focus:outline-hidden focus:border-pink-500 cursor-pointer appearance-none shadow-xs"
            >
              <option value="dopamine">⚡ Maior Dopamina</option>
              <option value="price-desc">💰 Maior Preço Fictício</option>
              <option value="price-asc">🪙 Menor Preço</option>
              <option value="rating">⭐ Melhor Avaliação</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-8 sm:p-12 text-center rounded-3xl bg-theme-card border border-theme-subtle my-6 shadow-xs">
          <p className="text-theme-muted text-xs sm:text-sm">Nenhum desejo encontrado com esse termo de busca.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todos');
            }}
            className="mt-3 text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline cursor-pointer"
          >
            Limpar filtros de busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </section>
  );
};
