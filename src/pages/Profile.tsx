import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, ChangeEvent } from "react";

const dummyValue = {
    fullName: "John Doe",
    email: "john@example.com",
    password: "sadfasf",
    mobileNumber: "1234567890",
};

const dummyAddress = [
    {
        address: "1234 Main St",
        city: "San Francisco",
        state: "CA",
        type: "Home",
    },
    {
        address: "5678 Work Ave",
        city: "San Francisco",
        state: "CA",
        type: "Work",
    },
];

function Profile() {
    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [isPersonalOpen, setIsPersonalOpen] = useState(true);
    const [isAddressOpen, setIsAddressOpen] = useState(true);
    const [formData, setFormData] = useState(dummyValue);
    const [addressData, setAddressData] = useState(dummyAddress);
    const [editAddressIndex, setEditAddressIndex] = useState<number | null>(null);

    const handlePersonalChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSavePersonal = () => {
        setEditPersonalDetails(false);
        console.log("Personal Details Saved:", formData);
    };

    const handleAddressChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { id, value } = e.target;
        setAddressData((prev) =>
            prev.map((addr, i) =>
                i === index ? { ...addr, [id]: value } : addr
            )
        );
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        setAddressData((prev) =>
            prev.map((addr, i) =>
                i === index ? { ...addr, type: value } : addr
            )
        );
    };

    const handleSaveAddress = (index: number) => {
        setEditAddressIndex(null);
        console.log("Address Saved:", addressData[index]);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen bg-white text-gray-800 items-center">
                <div className="flex-1 flex flex-col gap-[25px] px-4 py-8 md:px-16 lg:px-64 !mt-[60px] w-[60%] max-[768px]:w-[80%] max-[400px]:w-[90%]">
                    <nav aria-label="breadcrumb" className="w-full max-w-[800px] mx-auto mb-8 !mt-[25px]">
                        <ol className="flex flex-wrap items-center rounded-md bg-slate-50 px-4 py-2 text-sm">
                            <li className="flex items-center gap-1 cursor-pointer text-slate-500 hover:text-slate-800 transition-colors">
                                <a href="/">Home</a>
                                <span className="pointer-events-none mx-2 text-slate-800">/</span>
                            </li>
                            <li className="flex items-center gap-1 cursor-pointer text-black hover:text-slate-800 transition-colors">
                                <a href="/profile">Profile</a>
                                <span className="pointer-events-none mx-2 text-slate-800">/</span>
                            </li>
                        </ol>
                    </nav>

                    <div className="max-w-[775px] mx-auto space-y-6 flex flex-col gap-[25px]">
                        <div className="border border-[#acabab] !py-[25px] !px-[25px]">
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer !mb-[10px]"
                                onClick={() => setIsPersonalOpen(!isPersonalOpen)}
                            >
                                <h2 className="text-lg font-semibold">Personal Details</h2>
                                <span className="text-lg">{isPersonalOpen ? "−" : "+"}</span>
                            </div>

                            {isPersonalOpen && (
                                <div className="p-4 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p
                                            onClick={() => setEditPersonalDetails(!editPersonalDetails)}
                                            className="!mb-[15px] !p-[5px] text-sm text-[#A03037] font-semibold cursor-pointer hover:underline"
                                        >
                                            {editPersonalDetails ? "Cancel" : "Edit"}
                                        </p>
                                        {editPersonalDetails && (
                                            <button
                                                onClick={handleSavePersonal}
                                                className="rounded cursor-pointer border !px-6 !py-2 text-sm text-white bg-[#3371B5] hover:bg-[#2a5a93] transition-colors"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                    <form className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="fullName" className="text-xs text-gray-500 mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                onChange={handlePersonalChange}
                                                id="fullName"
                                                value={formData.fullName}
                                                disabled={!editPersonalDetails}
                                                className={`!pl-[10px] w-full p-3 h-12 border border-[#DCDCDC] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#A03037] ${!editPersonalDetails ? "bg-[#F5F5F5] text-[#878787]" : "bg-white text-black"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="email" className="text-xs text-gray-500 mb-1">
                                                Email ID
                                            </label>
                                            <input
                                                onChange={handlePersonalChange}
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                disabled={!editPersonalDetails}
                                                className={`!pl-[10px] w-full p-3 h-12 border border-[#DCDCDC] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#A03037] ${!editPersonalDetails ? "bg-[#F5F5F5] text-[#878787]" : "bg-white text-black"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="password" className="text-xs text-gray-500 mb-1">
                                                Password
                                            </label>
                                            <input
                                                onChange={handlePersonalChange}
                                                id="password"
                                                type="password"
                                                value={formData.password}
                                                disabled={!editPersonalDetails}
                                                className={`!pl-[10px] w-full p-3 h-12 border border-[#DCDCDC] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#A03037] ${!editPersonalDetails ? "bg-[#F5F5F5] text-[#878787]" : "bg-white text-black"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="mobileNumber" className="text-xs text-gray-500 mb-1">
                                                Mobile Number
                                            </label>
                                            <input
                                                onChange={handlePersonalChange}
                                                id="mobileNumber"
                                                type="text"
                                                value={formData.mobileNumber}
                                                disabled={!editPersonalDetails}
                                                className={`!pl-[10px] w-full p-3 h-12 border border-[#DCDCDC] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#A03037] ${!editPersonalDetails ? "bg-[#F5F5F5] text-[#878787]" : "bg-white text-black"
                                                    }`}
                                            />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        <div className="border border-[#acabab] !py-[25px] !px-[25px] !mb-[50px]">
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer"
                                onClick={() => setIsAddressOpen(!isAddressOpen)}
                            >
                                <h2 className="text-lg font-semibold">Address Details</h2>
                                <span className="text-lg">{isAddressOpen ? "-" : "+"}</span>
                            </div>

                            {isAddressOpen && (
                                <div className="p-4 space-y-6">
                                    <div className="flex justify-end !mb-[10px]">
                                        <button className="!px-6 cursor-pointer !py-2 text-sm text-[#A03037] border border-[#A03037] rounded hover:bg-[#A03037] hover:text-white transition-colors">
                                            Add New Address
                                        </button>
                                    </div>
                                    {addressData.map((address, index) => (
                                        <div key={index} className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <p className="text-lg font-semibold">
                                                        {index + 1}. {address.type}
                                                    </p>
                                                    <p
                                                        onClick={() =>
                                                            setEditAddressIndex(editAddressIndex === index ? null : index)
                                                        }
                                                        className="text-sm text-[#A03037] font-semibold cursor-pointer hover:underline"
                                                    >
                                                        {editAddressIndex === index ? "Cancel" : "Edit"}
                                                    </p>
                                                </div>
                                                {editAddressIndex === index && (
                                                    <button
                                                        onClick={() => handleSaveAddress(index)}
                                                        className="!px-6 !py-2 text-sm text-white bg-[#3371B5] rounded hover:bg-[#2a5a93] transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                            </div>
                                            <form className="flex flex-col gap-4">
                                                <div className="flex flex-col">
                                                    <label
                                                        htmlFor={`address-${index}`}
                                                        className="text-xs text-gray-500 mb-1"
                                                    >
                                                        Address
                                                    </label>
                                                    <textarea
                                                        onChange={(e) => handleAddressChange(e, index)}
                                                        id="address"
                                                        disabled={editAddressIndex !== index}
                                                        value={address.address}
                                                        className={`!pl-[10px] !pt-[10px] w-full p-3 h-20 border border-[#DCDCDC] rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#A03037] ${editAddressIndex !== index
                                                            ? "bg-[#F5F5F5] text-[#878787]"
                                                            : "bg-white text-black"
                                                            }`}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
                                                    <div className="flex flex-col">
                                                        <label
                                                            htmlFor={`city-${index}`}
                                                            className="text-xs text-gray-500 mb-1"
                                                        >
                                                            City/Town
                                                        </label>
                                                        <input
                                                            onChange={(e) => handleAddressChange(e, index)}
                                                            id="city"
                                                            type="text"
                                                            value={address.city}
                                                            disabled={editAddressIndex !== index}
                                                            className={`!pl-[10px] w-full p-3 h-12 border border-[#DCDCDC] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#A03037] ${editAddressIndex !== index
                                                                ? "bg-[#F5F5F5] text-[#878787]"
                                                                : "bg-white text-black"
                                                                }`}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label
                                                            htmlFor={`state-${index}`}
                                                            className="text-xs text-gray-500 mb-1"
                                                        >
                                                            State
                                                        </label>
                                                        <input
                                                            onChange={(e) => handleAddressChange(e, index)}
                                                            id="state"
                                                            type="text"
                                                            value={address.state}
                                                            disabled={editAddressIndex !== index}
                                                            className={`!pl-[10px] w-full p-3 h-12 border border-[#DCDCDC] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#A03037] ${editAddressIndex !== index
                                                                ? "bg-[#F5F5F5] text-[#878787]"
                                                                : "bg-white text-black"
                                                                }`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-6">
                                                    {["Home", "Work", "Other"].map((type) => (
                                                        <label key={type} className="flex items-center gap-1 cursor-pointer">
                                                            <input
                                                                onChange={(e) => handleRadioChange(e, index)}
                                                                type="radio"
                                                                name={`addressType-${index}`}
                                                                value={type}
                                                                checked={address.type === type}
                                                                disabled={editAddressIndex !== index}
                                                                className="accent-[#A03037] focus:ring-[#A03037] !pl-[10px] "
                                                            />
                                                            <span className="text-sm">{type}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </form>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Profile;