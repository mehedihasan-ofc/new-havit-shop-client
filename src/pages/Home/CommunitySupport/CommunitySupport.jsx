import { FaHandsHoldingCircle } from "react-icons/fa6";
import CharityImg from "../../../assets/charity/charity.jpeg";
import { useNavigate } from "react-router-dom";

const CommunitySupport = () => {
    
    const navigate = useNavigate();
    
    return (
        <div style={
            {
                height: "60vh",
                background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${CharityImg}) no-repeat center / cover`,
                margin: "40px 0px"
            }
        }>
            <div className="my-container text-white">
                <div className="flex justify-between items-center h-[60vh]">
                    <div className="w-4/5 mx-auto text-center space-y-5">
                        <div className="flex items-center justify-center gap-3">
                            <FaHandsHoldingCircle size={24} />
                            <p className="text-lg">Non profit Charity Fundation</p>
                        </div>
                        <h2 className="text-4xl font-semibold">Raise Your Helping Hand</h2>
                        <p>Extend a helping hand to those in need. Your donation of money or blood can make a significant impact on the lives of the less fortunate. Join us in our mission to provide support and hope to those who need it most. Together, we can make a difference.</p>

                        <button onClick={() => navigate('/non-profit-charity-fundation')} className="border px-10 py-2 hover:text-black hover:bg-white transition duration-300 ease-in-out">Explore All Causes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunitySupport;