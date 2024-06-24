"use client";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function APanelCustomersEditPage({ params }: { params: { customerid: string } }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("male");
    const [maritalStatus, setMaritalStatus] = useState("single");
    const [city, setCity] = useState("");
    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
    const [link, setLink] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [passportIssueDate, setPassportIssueDate] = useState("");
    const [passportExpiryDate, setPassportExpiryDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [cnicNumber, setCnicNumber] = useState("");
    const [cnicExpiryDate, setCnicExpiryDate] = useState("");
    const [numberOfFlights, setNumberOfFlights] = useState("");
    const [airlinePreference, setAirlinePreference] = useState("");
    const [deitryRequirements, setDeitryRequirements] = useState("");
    const [seatPreference, setSeatPreference] = useState("");
    const [sendingSMSAndEmail, setSendingSMSAndEmail] = useState(false);
    const [reminderForDOBAndPassportExpiry, setReminderForDOBAndPassportExpiry] = useState(false);

    const convertImageToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setDob("");
        setGender("male");
        setMaritalStatus("single");
        setCity("");
        setCompany("");
        setDesignation("");
        setProfilePicture("");
        setAddress("");
        setPhoneNumber("");
        setEmail("");
        setEmergencyContactNumber("");
        setLink("");
        setPassportNumber("");
        setPassportIssueDate("");
        setPassportExpiryDate("");
        setNationality("");
        setCnicNumber("");
        setCnicExpiryDate("");
        setNumberOfFlights("");
        setAirlinePreference("");
        setDeitryRequirements("");
        setSeatPreference("");
        setSendingSMSAndEmail(false);
        setReminderForDOBAndPassportExpiry(false);
    }

    const getCustomer = async () => {
        const ref = doc(db, "customers", params.customerid);
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
            const data = docSnap.data();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setDob(data.dob);
            setGender(data.gender);
            setMaritalStatus(data.maritalStatus);
            setCity(data.city);
            setCompany(data.company);
            setDesignation(data.designation);
            setProfilePicture(data.profilePicture);
            setAddress(data.address);
            setPhoneNumber(data.phoneNumber);
            setEmail(data.email);
            setEmergencyContactNumber(data.emergencyContactNumber);
            setLink(data.link);
            setPassportNumber(data.passportNumber);
            setPassportIssueDate(data.passportIssueDate);
            setPassportExpiryDate(data.passportExpiryDate);
            setNationality(data.nationalty);
            setCnicNumber(data.cnicNumber);
            setCnicExpiryDate(data.cnicExpiryDate);
            setNumberOfFlights(data.numberOfFlights);
            setAirlinePreference(data.airlinePreference);
            setDeitryRequirements(data.deitryRequirements);
            setSeatPreference(data.seatPreference);
            setSendingSMSAndEmail(data.sendingSMSAndEmail);
            setReminderForDOBAndPassportExpiry(data.reminderForDOBAndPassportExpiry);
        }
    }

    useEffect(() => {
        getCustomer();
    }, []);

    const editCustomer = async (e: any) => {
        e.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            gender: gender,
            maritalStatus: maritalStatus,
            city: city,
            company: company,
            designation: designation,
            profilePicture: profilePicture,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            emergencyContactNumber: emergencyContactNumber,
            link: link,
            passportNumber: passportNumber,
            passportIssueDate: passportIssueDate,
            passportExpiryDate: passportExpiryDate,
            nationality: nationality,
            cnicNumber: cnicNumber,
            cnicExpiryDate: cnicExpiryDate,
            numberOfFlights: numberOfFlights,
            airlinePreference: airlinePreference,
            deitryRequirements: deitryRequirements,
            seatPreference: seatPreference,
            sendingSMSAndEmail: sendingSMSAndEmail,
            reminderForDOBAndPassportExpiry: reminderForDOBAndPassportExpiry,
        }

        try {
            await updateDoc(doc(db, "customers", params.customerid), data);
            clearForm();

            window.location.href = "/apanel/customers";
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }


    return (
        <div className="flex flex-col space-y-5 p-4 overflow-y-auto h-full no-scrollbar">
            <h1 className="text-2xl font-bold">Edit customer {params.customerid}</h1>
            <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
                <legend className="text-lg font-bold">Personal</legend>
                <Input placeholder="First name" className="w-[49%]" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input placeholder="Last name" className="w-[49%]" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <Input type="date" placeholder="Date of birth" className="w-[24%]" value={dob} onChange={(e) => setDob(e.target.value)} />
                <div className="w-[24%]">
                    <Select value={gender} onValueChange={(value) => setGender(value)}>
                        <SelectTrigger>
                            <SelectValue>{gender}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[24%]">
                    <Select value={maritalStatus} onValueChange={(value) => setMaritalStatus(value)}>
                        <SelectTrigger>
                            <SelectValue>{maritalStatus}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[24%]">
                    <Input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <Input placeholder="Company" className="w-[32.5%]" value={company} onChange={(e) => setCompany(e.target.value)} />
                <Input placeholder="Designation" className="w-[32.5%]" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                <Input type="file" placeholder="Profile picture" className="w-[32.5%]" onChange={async (e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    const base64 = await convertImageToBase64(file);
                    setProfilePicture(base64);
                }} />
            </fieldset>
            <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
                <legend className="text-lg font-bold">Contact</legend>
                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <Input type="tel" placeholder="Phone number" className="w-[49%]" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <Input type="email" placeholder="Email" className="w-[49%]" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="tel" placeholder="Emergency contact number" className="w-[49%]" value={emergencyContactNumber} onChange={(e) => setEmergencyContactNumber(e.target.value)} />
                <Input placeholder="Link" className="w-[49%]" value={link} onChange={(e) => setLink(e.target.value)} />
            </fieldset>
            <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
                <legend className="text-lg font-bold">Travel</legend>
                <Input placeholder="Passport number" className="w-[24%]" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} />
                <Input type="date" placeholder="Passport issue date" className="w-[24%]" value={passportIssueDate} onChange={(e) => setPassportIssueDate(e.target.value)} />
                <Input type="date" placeholder="Passport expiry date" className="w-[24%]" value={passportExpiryDate} onChange={(e) => setPassportExpiryDate(e.target.value)} />
                <div className="w-[24%]">
                    <Input placeholder="Nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
                </div>
                <Input type="number" placeholder="CNIC number" className="w-[32.5%]" value={cnicNumber} onChange={(e) => setCnicNumber(e.target.value)} />
                <Input type="date" placeholder="CNIC expiry date" className="w-[32.5%]" value={cnicExpiryDate} onChange={(e) => setCnicExpiryDate(e.target.value)} />
                <Input type="number" placeholder="Number of Flights" className="w-[32.5%]" value={numberOfFlights} onChange={(e) => setNumberOfFlights(e.target.value)} />
                <Input placeholder="Airline preference" className="w-[32.5%]" value={airlinePreference} onChange={(e) => setAirlinePreference(e.target.value)} />
                <Input placeholder="Deitry requirements" className="w-[32.5%]" value={deitryRequirements} onChange={(e) => setDeitryRequirements(e.target.value)} />
                <Input placeholder="Seat preference" className="w-[32.5%]" value={seatPreference} onChange={(e) => setSeatPreference(e.target.value)} />
            </fieldset>
            <div className="flex items-center">
                <Input type="checkbox" className="w-[20px] h-[20px]"
                    checked={sendingSMSAndEmail}
                    onChange={(e) => setSendingSMSAndEmail(e.target.checked)}
                />
                <Label className="ml-2">I authorize you to sending SMS and Email from this website</Label>
            </div>
            <div className="flex items-center">
                <Input type="checkbox" className="w-[20px] h-[20px]"
                    checked={reminderForDOBAndPassportExpiry}
                    onChange={(e) => setReminderForDOBAndPassportExpiry(e.target.checked)}
                />
                <Label className="ml-2">Reminder for date of birth and passport expiry (by SMS and Email)</Label>
            </div>
            <Button className="mt-4 w-[200px] bg-gray-900 hover:bg-gray-800"
                onClick={editCustomer}
            >Edit customer</Button>
        </div>
    );
}