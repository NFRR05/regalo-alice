/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/Hero';
import { ReasonsCarousel } from './components/ReasonsCarousel';
import { QuoteSection } from './components/QuoteSection';
import { BentoGallery } from './components/BentoGallery';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <main className="bg-[#fafafa] min-h-screen">
      <Hero />
      <ReasonsCarousel />
      <BentoGallery />
      <QuoteSection />
      <Footer />
    </main>
  );
}
