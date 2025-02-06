export const getBrands = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["brand"],
      },
    };

    const res = await fetch(
      `http://localhost:5000/api/v1/brand`,
      fetchOption
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch brands: ${errorData.message || res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};
