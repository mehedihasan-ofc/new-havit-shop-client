import { useState } from "react";
import SVG from "../../../../assets/svg/img-status-7.svg";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import useProducts from "../../../../hooks/useProducts";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CreateCampaign = () => {
  const [axiosSecure] = useAxiosSecure();

  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [expiredDate, setExpiredDate] = useState("");

  const { data: products = [], isLoading: loading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://server.havitshopbd.com/products/non-discounted');
      return res.json();
    }
  });

  // State to manage form submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that at least one product is selected
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product for the campaign.");
      return;
    }

    // Convert the expiredDate to ISO string
    const isoExpiredDate = new Date(expiredDate).toISOString();

    // Prepare the campaign data
    const campaignData = {
      title,
      subtitle,
      discountType,
      discountValue: Number(discountValue),
      expiredDate: isoExpiredDate, // Use ISO string for expiredDate
      products: selectedProducts,
    };

    try {
      // Set loading state to true while submitting the campaign
      setIsSubmitting(true);

      const { data } = await axiosSecure.post("/campaign", campaignData);

      if (data.insertedId) {
        toast.success("Campaign created successfully!", {
          position: "top-right",
          autoClose: 1000,
          pauseOnHover: false,
        });

        // Reset form data after successful campaign creation
        setTitle("");
        setSubtitle("");
        setDiscountType("");
        setDiscountValue("");
        setExpiredDate("");
        setSelectedProducts([]);
        setSearchQuery("");
      } else {
        toast.error(data?.message, {
          position: "top-right",
          autoClose: 1600,
        });
        setTitle("");
        setSubtitle("");
        setDiscountType("");
        setDiscountValue("");
        setExpiredDate("");
        setSelectedProducts([]);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("An error occurred while creating the campaign.");
    } finally {
      // Reset loading state
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <MySpinner />;
  }

  return (
    <div className="border shadow max-w-4xl mx-auto bg-white rounded-md p-8">
      <div className="relative">
        <img className="absolute top-0 right-0" src={SVG} alt="background" />
        <form onSubmit={handleSubmit} className="space-y-6 max-w-full">
          <h2 className="text-xl font-semibold text-center mb-4">Create Campaign</h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Campaign Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter campaign title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="subtitle">
              Campaign Subtitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subtitle"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter campaign subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="discountType">
              Discount Type <span className="text-red-500">*</span>
            </label>
            <select
              id="discountType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose discount type
              </option>
              <option value="tk">Tk</option>
              <option value="percent">Percent</option>
            </select>
          </div>

          {/* Discount Value */}
          {discountType && (
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="discountValue">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="discountValue"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder={`Enter discount in ${discountType === "tk" ? "Tk" : "Percent"}`}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                required
              />
            </div>
          )}

          {/* Expired Date */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="expiredDate">
              Expired Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="expiredDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={expiredDate}
              onChange={(e) => setExpiredDate(e.target.value)}
              required
            />
          </div>

          {/* Select Products */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="searchProducts">
              Select Products <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="searchProducts"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary mb-4"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="h-60 overflow-y-auto border border-gray-300 shadow rounded p-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const hasDiscount = product.price < product.regularPrice;
                  const discountPercentage = Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);

                  return (
                    <div key={product._id} className="flex items-center rounded-md shadow-sm border px-3 py-2 gap-3 mb-2">
                      <input
                        type="checkbox"
                        id={product._id}
                        value={product._id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product._id]);
                          } else {
                            setSelectedProducts(
                              selectedProducts.filter((id) => id !== product._id)
                            );
                          }
                        }}
                      />
                      <label htmlFor={product._id} className="flex items-center gap-3">
                        <img src={product.images[0]?.url} alt={product.name} className="w-10 h-10 rounded" />
                        <span className="truncate">{product.name}</span>
                        <span className="font-medium">৳{product.price}</span>
                        {hasDiscount && (
                          <div className="flex items-center gap-2">
                            <div className="bg-secondary text-primary px-2 rounded">
                              <span className="text-xs line-through">৳{product.regularPrice.toFixed(2)}</span>
                            </div>
                            <div className="bg-[#f74b81] text-white px-2">
                              <span className="text-xs font-medium">{discountPercentage}% OFF</span>
                            </div>
                          </div>
                        )}
                        <span className="font-normal text-sm">Sold: {product.soldCount}</span>
                        <span className="font-normal text-sm">Stock: {product.availableStock}</span>
                      </label>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No products found.</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <Button type="submit" className="rounded-none bg-primary font-medium px-10" loading={isSubmitting}>
              {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;