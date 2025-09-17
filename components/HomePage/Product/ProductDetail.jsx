"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HomeFooter from "../../HomePage/HomeFooter";
import Container from "@mui/material/Container";
import HamburgerMenu from "../../HomePage/HamburgerMenu";
import { getProductBySlug, addToCart, submitDynamicForm } from "../../../utils/fetchApi";
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
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // Load logged-in user
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  // Fetch product by slug
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

          // initialize dynamic form values
          if (res.data.form?.fields?.length) {
            const initialData = {};
            res.data.form.fields.forEach((field) => {
              initialData[field.id] = field.type === "checkbox" ? [] : "";
            });
            setFormData(initialData);
          }
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

  // Recalculate total price
  useEffect(() => {
    if (product) {
      const unitPrice =
        product.discount_price && Number(product.discount_price) > 0
          ? Number(product.discount_price)
          : Number(product.price);
      setTotalPrice(unitPrice * quantity);
    }
  }, [quantity, product]);

  // Dynamic form handlers
  const handleFormChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleCheckboxChange = (fieldId, optionValue) => {
    setFormData((prev) => {
      const arr = prev[fieldId] || [];
      return arr.includes(optionValue)
        ? { ...prev, [fieldId]: arr.filter((v) => v !== optionValue) }
        : { ...prev, [fieldId]: [...arr, optionValue] };
    });
  };

  // Add to Cart
  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please log in to add products to your cart.");
      return;
    }

    try {
      const cartData = {
        user_id: userId,
        product_id: product.id,
        quantity,
        total_price: totalPrice,
        form_data: formData, // include form data if any
      };

      const res = await addToCart(cartData);

      if (res?.status) {
        toast.success(res.message || "Product added to cart!");
        setTimeout(() => {
          router.push("/cart/list"); 
        }, 1000);
      } else {
        toast.error(res.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  // Submit dynamic form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!userId) return toast.error("You must be logged in to submit the form!");
    if (!product?.form) return;

    setSubmitting(true);

    const payload = {
      section: "product",
      section_id: product.id,
      user_id: userId,
      form_data: formData,
    };

    const result = await submitDynamicForm(payload);

    if (result.success) {
      toast.success(result.message || "Form submitted successfully!");
      // Reset form
      const clearedData = {};
      product.form.fields.forEach((f) => {
        clearedData[f.id] = f.type === "checkbox" ? [] : "";
      });
      setFormData(clearedData);
    } else {
      toast.error(result.message || "Failed to submit form!");
    }

    setSubmitting(false);
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
    <div className="custom-gradient min-h-screen">
      <Container maxWidth="lg" className="py-10">
      <HamburgerMenu />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Images */}
          <div className="lg:w-1/2">
            <img
              src={mainImage || "https://via.placeholder.com/500"}
              alt={product.product_name}
              className="w-full h-[400px] object-cover rounded-xl mb-4"
            />
            <div className="flex gap-2 overflow-x-auto py-2 px-1 product-gallery snap-x snap-mandatory">
              {product.images?.map((img) => (
                <div
                  key={img.id}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 cursor-pointer overflow-hidden snap-start ${
                    mainImage === img.image_url ? "border-yellow-400" : "border-gray-700"
                  }`}
                  onClick={() => setMainImage(img.image_url)}
                >
                  <img
                    src={img.image_url}
                    alt="product thumbnail"
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                  />
                </div>
              ))}
            </div>
           {/* Dynamic Form */}
          {product.form && (
            <div className="mt-8 bg-gray-900 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-4">{product.form.name} Form</h3>
              <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
                {product.form.fields.map((field) => (
                  <div key={field.id} className="flex flex-col gap-1">
                    <label className="text-gray-200">{field.label}</label>

                    {field.type === "text" && (
                      <input
                        type="text"
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFormChange(field.id, e.target.value)}
                        className="p-2 rounded bg-gray-800 text-white"
                        required
                      />
                    )}

                    {field.type === "textarea" && (
                      <textarea
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFormChange(field.id, e.target.value)}
                        className="p-2 rounded bg-gray-800 text-white"
                        required
                      />
                    )}

                    {field.type === "checkbox" && (
                      <div className="flex flex-wrap gap-2">
                        {field.options.map((opt) => (
                          <label key={opt.id} className="flex items-center gap-1 text-gray-200">
                            <input
                              type="checkbox"
                              checked={formData[field.id]?.includes(opt.option_value)}
                              onChange={() => handleCheckboxChange(field.id, opt.option_value)}
                              className="accent-yellow-500"
                              required
                            />
                            {opt.option_value}
                          </label>
                        ))}
                      </div>
                    )}

                    {field.type === "radio" && (
                      <div className="flex flex-wrap gap-2">
                        {field.options.map((opt) => (
                          <label key={opt.id} className="flex items-center gap-1 text-gray-200">
                            <input
                              type="radio"
                              name={`radio-${field.id}`}
                              checked={formData[field.id] === opt.option_value}
                              onChange={() => handleFormChange(field.id, opt.option_value)}
                              className="accent-yellow-500"
                              required
                            />
                            {opt.option_value}
                          </label>
                        ))}
                      </div>
                    )}

                    {field.type === "select" && (
                      <select
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFormChange(field.id, e.target.value)}
                        className="p-2 rounded bg-gray-800 text-white"
                        required
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((opt) => (
                          <option key={opt.id} value={opt.option_value}>
                            {opt.option_value}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-yellow-500 text-black px-4 py-2 rounded mt-2 self-start"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          )}

          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2 flex flex-col justify-start">
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              {product.product_name}
            </h1>

            <p className="text-yellow-400 font-bold text-lg mb-1">
              Price:{" "}
              <span className="font-semibold text-red-400">
                ${totalPrice.toFixed(2)}
              </span>{" "}
              <span className="text-sm text-gray-400">(x {quantity})</span>
            </p>

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
      <HomeFooter />
      <ToastContainer />
      </Container>
    </div>
  );
}
