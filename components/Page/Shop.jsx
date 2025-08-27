import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: Fetch sports products API (replace with your real API later)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Dummy sports product data
        const data = [
          { id: 1, name: "Football", price: "$30" },
          { id: 2, name: "Cricket Bat", price: "$45" },
          { id: 3, name: "Basketball", price: "$25" },
          { id: 4, name: "Tennis Racket", price: "$60" },
          { id: 5, name: "Running Shoes", price: "$80" },
          { id: 6, name: "Goalkeeper Gloves", price: "$35" },
        ];
        setProducts(data);
      } catch (error) {
        console.error("Error fetching sports products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="custom-gradient">
      {/* Hamburger Menu */}
      <HamburgerMenu />
      {/* // Hamburger Menu */}

      <section id="shop" className="py-24">
        <Container>
          <div className="text-center">
            <h3 className="text-3xl text-center font-bold text-white mb-8">
              Sports Shop 🏆
            </h3>

            {loading ? (
              <p className="text-white">Loading products...</p>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-5 rounded-xl bg-white shadow-lg text-black hover:scale-105 transition-transform"
                  >
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <p className="text-gray-700">{product.price}</p>
                    <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      View
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white">No sports products available.</p>
            )}
          </div>
        </Container>
      </section>

      <HomeFooter />
    </div>
  );
}
