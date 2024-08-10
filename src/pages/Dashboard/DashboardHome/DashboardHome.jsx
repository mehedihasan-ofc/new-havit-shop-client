import StatsCard from "../../../components/Dashboard/Card/StatsCard/StatsCard";

const DashboardHome = () => {
    return (
        <div className="grid grid-cols-3 gap-5">
            <StatsCard stats={1} />
            <StatsCard stats={2} />
            <StatsCard stats={3} />
            <StatsCard stats={4} />
            <StatsCard stats={5} />
            <StatsCard stats={6} />
        </div>
    );
};

export default DashboardHome;