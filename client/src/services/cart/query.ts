export const getCart = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["cart"],
      },
    };

    const res = await fetch(`http://localhost:5000/api/v1/cart`, fetchOption);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch products: ${errorData.message || res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

