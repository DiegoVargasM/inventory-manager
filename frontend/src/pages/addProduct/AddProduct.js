import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/products/productSlice";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  // from redux store
  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity } = product;

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    // select image
    setProductImage(e.target.files[0]);
    // preview image
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // unique sku generator
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    // we use formData to be able to pick the image file on the backend
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;