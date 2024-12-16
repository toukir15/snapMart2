import { revalidateTag } from "next/cache";


export const getProducts = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["products"],
      },
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzM2NTU1OTAsImV4cCI6MTczNDI2MDM5MH0.2wQUBf8jALe7IlaAGCYUCh_iRA3jWHJqPdBD0a5Ab5w`, // Replace YOUR_ACCESS_TOKEN with the actual token
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `http://localhost:5000/api/v1/product`,
      fetchOption
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch products: ${errorData.message || res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throwing to let the calling function handle it
  }
};

export const getProduct = async (id: string) => {
  const fetchOption = {
    next: {
      tags: ["product"],
    },
  };
  const res = await fetch(
    `http://localhost:5000/api/v1/product/${id}`,
    fetchOption
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
};

export const getFlashSaleProducts = async () => {
  // const accessToken = cookies().get("accessToken")?.value;
  // console.log({a})

  try {
    const fetchOption = {
      next: {
        tags: ["flash_sale"],
      },
    };

    const res = await fetch(
      `https://snapmartserver.vercel.app/api/v1/product/flash-sale`,
      fetchOption
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch flash sale products: ${errorData.message || res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["brand"],
      },
    };

    const res = await fetch(
      `http://localhost:5000/api/v1/product/brand`,
      fetchOption
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch flash sale products: ${errorData.message || res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSuggestedProduct = async (id: string) => {
  try {
    const fetchOption = {
      next: {
        tags: ["suggested_product"],
      },
    };

    const res = await fetch(
      `http://localhost:5000/api/v1/product/suggested/${id}`,
      fetchOption
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch flash sale products: ${errorData.message || res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
