const ProductCard = ({ product }) => {
    return (
        <div className="border rounded p-4 shadow">
            <img
                src={product.images[0].url}
                alt={product.images[0].description}
                className="w-full h-40 object-cover rounded"
            />
            <h5 className="text-lg font-semibold mt-2">{product.name}</h5>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold">Tk {product.price.toFixed(2)}</span>
                <button className="bg-blue-500 text-white py-1 px-3 rounded">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;