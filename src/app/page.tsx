import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { ShopProvider } from '@/context/ShopContext';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductCatalog } from '@/components/ProductCatalog';
import { CartDrawer } from '@/components/CartDrawer';
import { DopamineWheelModal } from '@/components/DopamineWheelModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { DeliveryTrackerModal } from '@/components/DeliveryTrackerModal';
import { SavingsVaultModal } from '@/components/SavingsVaultModal';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <ThemeProvider>
      <ShopProvider>
        <main className="min-h-screen flex flex-col bg-theme-page text-theme-body selection:bg-pink-500 selection:text-white w-full overflow-x-hidden relative transition-colors duration-300">
          <Navbar />
          <HeroBanner />
          <ProductCatalog />
          <Footer />

          {/* Mobile Fixed Navigation Dock */}
          <MobileBottomNav />

          {/* Dynamic Modals & Drawers */}
          <CartDrawer />
          <DopamineWheelModal />
          <CheckoutModal />
          <DeliveryTrackerModal />
          <SavingsVaultModal />
        </main>
      </ShopProvider>
    </ThemeProvider>
  );
}
