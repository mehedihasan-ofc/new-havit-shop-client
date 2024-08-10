import Marquee from "react-fast-marquee";

const BreakingMarquee = () => {
    return (
        <div className="py-2 bg-secondary">
            <div className="my-container">
                <Marquee>
                    I can be a React component, multiple React components, or just some text.
                </Marquee>
            </div>
        </div>
    );
};

export default BreakingMarquee;