import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddProduct = () => {
    const url = "http://localhost:4000";
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const onSubmitHandler = async(event) => {
        event.preventDefault();

        if(!image){
            toast.error("Image is Unavailable..");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/product/add-product`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: ""
                })
                setImage(false);
                toast.success(response.data.message || "Product added successfully");
            }
            else {
                toast.error(response.data.message || "Failed to add product");
                console.log("Server res -> ", response.data);
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Request failed";
            toast.error(errorMessage);
            console.error("Request error:", error)
        }
    }


  return (
    <div className="">
        <h1 className="mb-6 text-2xl font-semibold text-yellow-300">Add New Product</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
            <div className="flex flex-col gap-2">
                <p className="text-amber-200 font-semibold">Upload Image</p>
                <label htmlFor="image" className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-4 py-4 text-sm text-slate-200 transition hover:border-yellow-300 hover:bg-slate-900">
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            className="h-24 w-24 rounded-xl object-cover object-center"
                        />
                    ) : (
                        <div className="flex items-center gap-3 text-slate-400">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-200">
                                +
                            </span>
                            <span>Tap to choose an image</span>
                        </div>
                    )}
                    <span className="text-slate-300">{image ? 'Change image' : 'Upload image'}</span>
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="sr-only"
                />
            </div>
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                placeholder="Product Name"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-200 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
                required
            />

            <textarea
                name="description"
                value={data.description}
                onChange={onChangeHandler}
                placeholder="Product Description"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-200 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
                rows={4}
                required
            />
            <input
                type="number"
                name="price"
                value={data.price}
                onChange={onChangeHandler}
                placeholder="Product Price"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-200 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
                required
            />
            <input
                type="text"
                name="category"
                value={data.category}
                onChange={onChangeHandler}
                placeholder="Product Category"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-200 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
                required
            />

            <button
                type="submit"
                className="rounded-lg bg-yellow-500/90 cursor-pointer px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
                ADD
            </button>
        </form>
    </div>
  )
}

export default AddProduct
