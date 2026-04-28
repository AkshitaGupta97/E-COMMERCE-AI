import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Crect width='320' height='320' fill='%232a3340'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%23cbd5e1'%3ENo Image%3C/text%3E%3C/svg%3E";

const UserDetails = () => {
  const { backendUrl, token, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  // ✅ local form state (FIX)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    address: ""
  });

  // ✅ sync with userData
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
        dob: userData.dob || "",
        address: userData.address || ""
      });
    }
  }, [userData]);

  // ✅ update profile
  const updateUserProfileData = async () => {
    try {
      const dataToSend = new FormData();

      dataToSend.append("name", formData.name || "");
      dataToSend.append("phone", formData.phone || "");
      dataToSend.append("gender", formData.gender || "");
      dataToSend.append("dob", formData.dob || "");
      dataToSend.append("address", formData.address || "");

      if (image) {
        dataToSend.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Unable to update profile.");
    }
  };

  // ✅ FIX: local change handler
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] w-full mt-28 bg-slate-950/95 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl rounded-4xl border border-slate-700 bg-slate-900/95 p-6 shadow-2xl shadow-slate-900/40 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-amber-300">User Details</h2>
            <p className="mt-2 text-sm text-slate-400">Update your profile information and contact details.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsEdit((prev) => !prev)}
            className="rounded-full bg-blue-600 px-5 cursor-pointer py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
          >
            {isEdit ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-700 bg-slate-950/80 p-5 text-center shadow-inner shadow-slate-900/30">
            <label htmlFor="image" className="cursor-pointer">
              <img
                className="h-40 w-40 rounded-full border border-slate-700 object-cover transition duration-300 hover:scale-105"
                src={image ? URL.createObjectURL(image) : userData?.image || placeholderSrc}
                alt={userData?.name || "Profile"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholderSrc;
                }}
              />
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || false)}
            />
            <p className="text-sm text-slate-400">Click image to upload a new profile photo.</p>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 rounded-3xl border border-slate-700 bg-slate-950/80 p-5 text-slate-200 shadow-inner shadow-slate-900/20 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Name</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                ) : (
                  <p className="text-lg font-medium text-amber-200">{userData?.name || "Not set"}</p>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Email</p>
                <p className="text-lg font-medium text-blue-300">{userData?.email || "Not set"}</p>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-slate-700 bg-slate-950/80 p-5 text-slate-200 shadow-inner shadow-slate-900/20 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Phone</p>
                {isEdit ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                ) : (
                  <p className="text-lg text-blue-300">{userData?.phone || "Not set"}</p>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Address</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleFieldChange("address", e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                ) : (
                  <p className="text-lg text-blue-300">{userData?.address || "Not set"}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-slate-700 bg-slate-950/80 p-5 text-slate-200 shadow-inner shadow-slate-900/20 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Gender</p>
                {isEdit ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => handleFieldChange("gender", e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-lg text-blue-300">{userData?.gender || "Not set"}</p>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Date of Birth</p>
                {isEdit ? (
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleFieldChange("dob", e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                ) : (
                  <p className="text-lg text-blue-300">{userData?.dob || "Not set"}</p>
                )}
              </div>
            </div>

            {isEdit && (
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEdit(false);
                    setImage(false);
                    loadUserProfileData();
                  }}
                  className="rounded-2xl border border-slate-700 cursor-pointer bg-slate-800 px-5 py-3 text-sm text-slate-200 transition hover:bg-slate-700"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={updateUserProfileData}
                  className="rounded-2xl bg-cyan-500 px-5 cursor-pointer py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
