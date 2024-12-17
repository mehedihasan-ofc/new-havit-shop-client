import { features } from "../../../../database/data"

const CreateRole = () => {
    
    console.log(features);
    
    return (
        <div>
            CreateRole {features?.length}
        </div>
    );
};

export default CreateRole;