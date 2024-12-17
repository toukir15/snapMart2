"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuponServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createCupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cupon.create({
        data: payload,
    });
    return result;
});
// const deleteFromDB = async (id: string): Promise<Patient | null> => {
//   const result = await prisma.$transaction(async (tx) => {
//     // delete medical report
//     await tx.medicalReport.deleteMany({
//       where: {
//         patientId: id,
//       },
//     });
//     // delete patient health data
//     await tx.patientHealthData.delete({
//       where: {
//         patientId: id,
//       },
//     });
//     const deletedPatient = await tx.patient.delete({
//       where: {
//         id,
//       },
//     });
//     await tx.user.delete({
//       where: {
//         email: deletedPatient.email,
//       },
//     });
//     return deletedPatient;
//   });
//   return result;
// };
// const softDelete = async (id: string): Promise<Patient | null> => {
//   return await prisma.$transaction(async (transactionClient) => {
//     const deletedPatient = await transactionClient.patient.update({
//       where: { id },
//       data: {
//         isDeleted: true,
//       },
//     });
//     await transactionClient.user.update({
//       where: {
//         email: deletedPatient.email,
//       },
//       data: {
//         status: UserStatus.DELETED,
//       },
//     });
//     return deletedPatient;
//   });
// };
exports.CuponServices = {
    createCupon,
};
