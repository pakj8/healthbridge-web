import { gql } from "@apollo/client";

export const GET_PATIENTDETAILS_BY_PATIENTID = gql`
  query getPatientByPatientId($patientId: ID) {
    getPatientByPatientId(patientId: $patientId) {
      patientId
      firstName
      lastName
    }
  }
`;
