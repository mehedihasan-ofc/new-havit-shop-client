import svg1 from "../../../assets/promises/icon-1.svg";
import svg2 from "../../../assets/promises/icon-2.svg";
import svg3 from "../../../assets/promises/icon-3.svg";
import svg4 from "../../../assets/promises/icon-4.svg";
import svg5 from "../../../assets/promises/icon-5.svg";

const OurPromises = () => {
    return (
        <div className="my-container my-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <div className="bg-[#F4F6FA] px-4 py-5 rounded shadow">
                    <div className="flex justify-between items-center gap-4">
                        <img className="w-12" src={svg1} alt="Best prices & offers" />
                        <div className="space-y-1">
                            <h4 className="font-sans text-sm font-semibold">Best prices</h4>
                            <p className="font-serif text-xs text-[#adadad]">Orders $50 or more</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F4F6FA] px-4 py-5 rounded shadow">
                    <div className="flex justify-between items-center gap-4">
                        <img className="w-12" src={svg2} alt="Best prices & offers" />
                        <div className="space-y-1">
                            <h4 className="font-sans text-sm font-semibold">Free delivery</h4>
                            <p className="font-serif text-xs text-[#adadad]">24/7 amazing services</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F4F6FA] px-4 py-5 rounded shadow">
                    <div className="flex justify-between items-center gap-4">
                        <img className="w-12" src={svg3} alt="Best prices & offers" />
                        <div className="space-y-1">
                            <h4 className="font-sans text-sm font-semibold">Best prices</h4>
                            <p className="font-serif text-xs text-[#adadad]">Orders $50 or more</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F4F6FA] px-4 py-5 rounded shadow">
                    <div className="flex justify-between items-center gap-4">
                        <img className="w-12" src={svg4} alt="Best prices & offers" />
                        <div className="space-y-1">
                            <h4 className="font-sans text-sm font-semibold">Best prices</h4>
                            <p className="font-serif text-xs text-[#adadad]">Orders $50 or more</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F4F6FA] px-4 py-5 rounded shadow">
                    <div className="flex justify-between items-center gap-4">
                        <img className="w-12" src={svg5} alt="Best prices & offers" />
                        <div className="space-y-1">
                            <h4 className="font-sans text-sm font-semibold">Best prices</h4>
                            <p className="font-serif text-xs text-[#adadad]">Orders $50 or more</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OurPromises;