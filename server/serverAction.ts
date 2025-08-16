"use server";

import { envConfig } from "@/lib/envConfig";



// const BASE_URL = envConfig.SERVER_BASE_URL; // Can be dynamic
const BASE_URL = envConfig.LOCAL_BASE_URL; // Can be dynamic

// GET ALL DATA
export const getData = async (endpoint: string, token?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      cache: "no-store",

    });

    const data = await res.json();
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};

// GET SINGLE DATA
export const getSingleData = async (endpoint: string, id: string, token?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      cache: "no-store",

    });
    const data = await res.json();
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};

// CREATE DATA
export const createData = async (endpoint: string, data: any, token?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `${token}` }) },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};

// UPDATE DATA
export const updateData = async (endpoint: string, id: string, data: any, token?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `${token}` }),
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};

// DELETE DATA
export const deleteData = async (endpoint: string, id: string, token?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: `${token}` }),
      },
    });
    const response = await res.json();
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};

// GET SETTINGS
export const getSettings = async () => {
  try {
    const res = await fetch(`${BASE_URL}/settings`, { cache: "no-store" });
    const data = await res.json();
    return data?.data?.[0];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};

type TPassword = {
  oldPassword: string;
  newPassword: string;
};

export const updatePassword = async (endpoint: string, data: TPassword, token: string) => {
  try {
    console.log(data, `${BASE_URL}${endpoint}`);
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `${token}` }),
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};

// UPDATE DATA
export const resetPassword = async (endpoint: string, data: any, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `${token}` }),
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};