import { gql } from "@apollo/client";

export const GET_ADVISE = gql`
  mutation getAdvice($input: FollowUpAnswersInput) {
    getAdvice(input: $input)
  }
`;
