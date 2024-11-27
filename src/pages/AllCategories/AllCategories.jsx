import { Link } from "react-router-dom";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import useCategories from "../../hooks/useCategories";

const AllCategories = () => {
    const [categories, loading] = useCategories();

    // Define your color palette
    const colors = ['#F2FCE4', '#FFFCEB', '#ECFFEC', '#FEEFEA', '#FFF3EB', '#FFF3FF'];

    // Function to randomly select a color
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    if (loading) {
        return <MySpinner />;
    }

    return (
        <div className="my-container mb-5">
            <PageHeader title="All Categories" />

            <p className="mb-6 text-center sm:text-left">
                We found <span className="text-primary">{categories?.length}</span> items for you!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {categories?.map((category) => (
                    <div key={category?._id}>
                        <Link to={`/products/categories/${category?._id}`}>
                            <div
                                className="flex flex-col items-center justify-center h-28 sm:h-32 text-center cursor-pointer border border-[#F4F6FA] hover:border-[#3BB77E] rounded-lg p-3 sm:p-4 transition duration-300"
                                style={{ backgroundColor: getRandomColor() }}
                            >
                                <img
                                    className="w-12 h-12 sm:w-16 sm:h-16 mb-2 object-contain transition-transform duration-200 transform hover:scale-110"
                                    src={category?.image}
                                    alt={category?.name}
                                />
                                <p className="text-xs sm:text-sm font-medium">{category?.name}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCategories;