import { Cupon } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCupon = async (payload: Cupon) => {
  const result = await prisma.cupon.create({
    data: payload,
  });
  return result;
};

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

export const CuponServices = {
  createCupon,
};
