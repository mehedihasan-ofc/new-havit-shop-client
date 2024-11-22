// Import the nowOffers data
import { nowOffers } from "../../../database/data";

const NowOffers = () => {
    return (
        <div className="my-container my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">
                {nowOffers.map((offer) => (
                    <div key={offer._id} className="shadow rounded overflow-hidden">
                        <img src={offer.categoryImage} alt={offer.categoryName} className="w-full h-48 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NowOffers;