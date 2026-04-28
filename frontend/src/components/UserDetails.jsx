import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const UserDetails = () => {

    const { backendUrl, token, setToken, userData, setUserData, loadUserProfileData, } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("phone", userData.phone);
            formData.append("gender", userData.gender);
            formData.append("dob", userData.dob);
            formData.append('address', userData.address);

            if (image) {
                formData.append("image", image);
            }

            const { data } = await axios.post(
                `${backendUrl}/api/user/update-profile`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            if (data.success) {
                toast.success(data.message);
                loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            }
        } catch (error) {
            toast.error(data.message);
        }
    }

    return (
        <div className=" h-screen mt-32 min-h-screen w-full bg-linear-to-br flex items-center justify-center px-4 overflow-hidden">

            <div className="max-w-3xl w-full bg-gray-900 p-6 rounded-3xl shadow-lg">
                <h2 className="text-2xl text-yellow-300 font-bold mb-4">User Details</h2>

                {
                    isEdit ?
                        <label htmlFor="image">
                            <div className="inline-block  relative cursor-pointer">
                                <img className="w-32 h-32 cursor-pointer rounded-full opacity-80" src={image ? URL.createObjectURL(image) : userData?.image || null} alt={userData?.name} />
                                <img className="w-28 h-28 cursor-pointer rounded-full absolute bottom-6 right-8" src={!image ? 'https://th.bing.com/th/id/OIP.Bl6dInu-pv4nnfv-QAxgSwHaHa' : null} alt="edit" />
                            </div>
                        </label>
                        : <img className="w-36 rounded" src={userData?.image || null} alt={userData?.name} />
                }

                {
                    isEdit ? (
                        
                    ) : ()
                    
                }

            </div>

        </div>
    )
}

export default UserDetails
