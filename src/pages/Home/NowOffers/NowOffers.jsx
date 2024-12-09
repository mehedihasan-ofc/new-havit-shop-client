import useNoc from "../../../hooks/useNoc";

const NowOffers = () => {

    const [noc] = useNoc();

     // Early return if no categories exist
     if (!noc || noc.length === 0) return null;
    
    return (
        <div className="my-container">
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