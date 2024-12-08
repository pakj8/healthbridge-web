import { gql } from "@apollo/client";

export const GET_FOLLOWUP_QUESTIONS = gql`
  query getFollowUpQuestions($input: UserInput!) {
    getFollowUpQuestions(input: $input)
  }
`;

// export const GET_ADVICE = gql`
//   query getAdvice($input: FollowUpAnswersInput!) {
//     getAdvice(input: $input)
//   }
// `;
