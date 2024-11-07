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
        <div className="my-container">
            <PageHeader title="All Categories" />

            <p className="mb-6">
                We found <span className="text-primary">{categories?.length}</span> items for you!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    categories?.map(category => (
                        <div
                            key={category?._id}
                            className="flex flex-col items-center justify-center h-32 text-center cursor-pointer border border-[#F4F6FA] hover:border-[#3BB77E] rounded-lg p-4 transition duration-300"
                            style={{ backgroundColor: getRandomColor() }}
                        >
                            <img
                                className="w-16 h-16 mb-2 object-contain transition-transform duration-200 transform hover:scale-110"
                                src={category?.image}
                                alt={category?.name}
                            />
                            <p className="text-sm font-medium">{category?.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllCategories;
