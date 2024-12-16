"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createAdmin = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "Password is required",
    }),
    admin: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        email: zod_1.z.string({
            required_error: "Email is required!",
        }),
    }),
});
const createVendor = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "Password is required",
    }),
    vendor: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        email: zod_1.z.string({
            required_error: "Email is required!",
        }),
    }),
});
const createCustomer = zod_1.z.object({
    password: zod_1.z.string(),
    customer: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .email(),
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
    }),
});
// const updateStatus = z.object({
//     body: z.object({
//         status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
//     })
// })
exports.userValidation = {
    createAdmin,
    createVendor,
    createCustomer,
    // createDoctor,
    // createPatient,
    // updateStatus
};
