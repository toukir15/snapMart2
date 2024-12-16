"use server";
// import axiosInstance from "@/src/lib/axiosInstance";
import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
// import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/axiosInstance";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// export const userRegister = async (userData: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.post("/auth/register", userData);
//     return data.data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

export const userLogin = async (userData: any) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", userData);
        if (data.success) {
            const cookieStore = await cookies()
            cookieStore.set("accessToken", data?.data?.accessToken)
        }
        return data.data;
    } catch (error: any) {
        throw new Error(error.status);
    }
};

// export const refreshToken = async () => {
//   try {
//     const { data } = await axiosInstance.post("/auth/refresh-token");

//     if (data.success) {
//       cookies().set("accessToken", data?.data?.accessToken);
//     }
//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// export const editProfile = async (userData: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.post("/auth/edit-profile", userData);
//     if (data.success) {
//       cookies().set("accessToken", data?.data?.accessToken);
//       cookies().set("refreshToken", data?.data?.refreshToken);
//     }

//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// export const sendForgetEmail = async (forgetData: any) => {
//   try {
//     const { data } = await axiosInstance.post(
//       "/auth/send-forget-email",
//       forgetData
//     );
//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// export const changePassword = async (userData: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.patch(
//       "/auth/change-password",
//       userData
//     );
//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// export const forgetPassword = async (passwordData: FieldValues) => {
//   try {
//     const response = await fetch(
//       "http://localhost:5000/api/v1/auth/forget-password",
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: passwordData.token,
//         },
//         body: JSON.stringify({ newPassword: passwordData.newPassword }),
//       }
//     );

//     if (!response.ok) {
//       // Extract error details if the response is not ok
//       const errorDetails = await response.json();
//       throw new Error(errorDetails.message || "Failed to update password");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     throw new Error(
//       error.message || "An error occurred while resetting the password"
//     );
//   }
// };

export const getCurrentUser = async () => {
    // Access cookies synchronously
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return null; // Return null if no access token is found
    }

    // Decode the token (synchronously)
    const decodedToken: any = jwtDecode(accessToken);

    // Map the decoded token to the user object
    const decodedUser = {
        id: decodedToken?.id,
        name: decodedToken?.name,
        role: decodedToken?.role,
        email: decodedToken?.email,
        profilePhoto: decodedToken?.profilePhoto,
    };

    return decodedUser;
};
// export const logout = () => {
//   cookies().delete("accessToken");
//   cookies().delete("refreshToken");
// };
