import useRoles from "../../../../hooks/useRoles";

const AllRoles = () => {

    const [rolesData, isLoading, refetch] = useRoles();

    console.log(rolesData);

    return (
        <div>
            AllRoles
        </div>
    );
};

export default AllRoles;