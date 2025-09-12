"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HomeFooter from "../../HomePage/HomeFooter";
import HamburgerMenu from "../../HomePage/HamburgerMenu";
import { getProductBySlug, addToCart } from "../../../utils/fetchApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetail() {
  const params = useParams();
  const { slug } = params;
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);

  // ✅ Load logged-in user from localStorage
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await getProductBySlug(slug);
        if (res?.status) {
          setProduct(res.data);
          setMainImage(res.data.images?.[0]?.image_url || "");

          // initial price
          const price =
            res.data.discount_price && Number(res.data.discount_price) > 0
              ? Number(res.data.discount_price)
              : Number(res.data.price);
          setTotalPrice(price);
        } else {
          router.push("/products");
        }
      } catch (error) {
        console.error(error);
        router.push("/products");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug, router]);

  // ✅ Recalculate when quantity changes
  useEffect(() => {
    if (product) {
      const unitPrice =
        product.discount_price && Number(product.discount_price) > 0
          ? Number(product.discount_price)
          : Number(product.price);
      setTotalPrice(unitPrice * quantity);
    }
  }, [quantity, product]);

  // ✅ Add to Cart
  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please log in to add products to your cart.");
      return;
    }

    try {
      const cartData = {
        user_id: userId, // ✅ user.id milega kyunki ab object save kar rahe hain
        product_id: product.id,
        quantity,
        total_price: totalPrice,
      };

      const res = await addToCart(cartData);

      if (res?.status) {
        toast.success(res.message || "Product added to cart!");
      } else {
        toast.error(res.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <HamburgerMenu />
      <div className="container mx-auto py-16 px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Images */}
          <div className="lg:w-1/2">
            <img
              src={mainImage || "https://via.placeholder.com/500"}
              alt={product.product_name}
              className="w-full h-[400px] object-cover rounded-xl mb-4"
            />
            <div className="flex gap-2">
              {product.images?.map((img) => (
                <img
                  key={img.id}
                  src={img.image_url}
                  alt="product thumbnail"
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImage === img.image_url
                      ? "border-yellow-400"
                      : "border-gray-700"
                  }`}
                  onClick={() => setMainImage(img.image_url)}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2 flex flex-col justify-start">
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              {product.product_name}
            </h1>

            {/* Dynamic Price */}
            <p className="text-xl mb-2">
              Price:{" "}
              <span className="font-semibold text-red-400">
                ${totalPrice.toFixed(2)}
              </span>{" "}
              <span className="text-sm text-gray-400">(x {quantity})</span>
            </p>

            {/* Short Description */}
            {product.short_description && (
              <div className="mb-4">
                <h2 className="text-yellow-400 font-bold text-lg mb-1">
                  Short Description
                </h2>
                <p className="text-gray-300">
                  {product.short_description.replace(/<[^>]+>/g, "")}
                </p>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="grid grid-cols-12 gap-4 mt-6 items-center">
              {/* Quantity */}
              <div className="col-span-12 md:col-span-6">
                <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden w-full h-12">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    className="px-4 h-full text-xl text-white font-bold hover:bg-gray-600 transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    max={product.stock}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          1,
                          Math.min(product.stock, Number(e.target.value))
                        )
                      )
                    }
                    className="w-full h-full text-center text-black font-bold text-lg outline-none"
                  />
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        prev < product.stock ? prev + 1 : prev
                      )
                    }
                    className="px-4 h-full text-xl text-white font-bold hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="col-span-12 md:col-span-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>

            {/* Full Description */}
            {product.description && (
              <div className="mb-4 pt-3">
                <h2 className="text-yellow-400 font-bold text-lg mb-1">
                  Description
                </h2>
                <div
                  className={`text-gray-300 overflow-hidden transition-all duration-300`}
                  style={{ maxHeight: showFullDesc ? "none" : "100px" }}
                >
                  {product.description.replace(/<[^>]+>/g, "")}
                </div>
                {product.description.length > 100 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="mt-2 text-red-500 font-semibold underline"
                  >
                    {showFullDesc ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <HomeFooter />
      <ToastContainer />
    </div>
  );
}
