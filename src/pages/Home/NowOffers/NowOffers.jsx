import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useNoc from "../../../hooks/useNoc";

const NowOffers = () => {

    const [noc, loading] = useNoc();

    if (loading) {
        return <MySpinner />;
    }
    
    return (
        <div className="my-container my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">
                {noc.map((offer) => (
                    <div key={offer._id} className="shadow rounded overflow-hidden">
                        <img src={offer.image} alt={offer._id} className="w-full h-48 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NowOffers;