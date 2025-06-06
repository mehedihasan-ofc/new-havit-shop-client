import { Link } from "react-router-dom";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import useCategories from "../../hooks/useCategories";

const AllCategories = () => {
    const [categories, loading] = useCategories();

    const colors = [
        '#F5F7FA',
        '#DDEEFF',
        '#FFEEDD',
        '#E3FFE8',
        '#FFDDE3',
        '#E8E0FF',
    ];

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
                                className="flex flex-col items-center justify-center rounded px-4 py-6 transition duration-300 hover:text-primary"
                                style={{ backgroundColor: getRandomColor() }}
                            >
                                <div className="w-14 h-14 mb-4">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={category.image}
                                        alt={category.name}
                                    />
                                </div>
                                <p className="text-center text-sm font-semibold leading-snug">
                                    {category.name}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCategories;