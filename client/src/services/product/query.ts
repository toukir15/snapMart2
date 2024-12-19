
export const getProducts = async (shopId: string) => {
  try {
    const fetchOption = {
      next: {
        tags: ["products"],
      },
    };

    const res = await fetch(
      `http://localhost:5000/api/v1/product?shopId=${shopId}`,
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
      `http://localhost:5000/api/v1/product/flash-sale`,
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
