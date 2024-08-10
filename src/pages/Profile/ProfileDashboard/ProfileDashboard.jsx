import ProfileStatCard from "../../../components/Profile/ProfileStatCard/ProfileStatCard";

const ProfileDashboard = () => {
    return (
        <div className="grid grid-cols-3 gap-5">
            <ProfileStatCard />
            <ProfileStatCard />
            <ProfileStatCard />
        </div>
    );
};

export default ProfileDashboard;