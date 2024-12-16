import { z } from "zod";

const createAdmin = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
  }),
});

const createVendor = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  vendor: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
  }),
});

const createCustomer = z.object({
  password: z.string(),
  customer: z.object({
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email(),
    name: z.string({
      required_error: "Name is required!",
    }),
  }),
});

// const updateStatus = z.object({
//     body: z.object({
//         status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
//     })
// })

export const userValidation = {
  createAdmin,
  createVendor,
  createCustomer,
  // createDoctor,
  // createPatient,
  // updateStatus
};
