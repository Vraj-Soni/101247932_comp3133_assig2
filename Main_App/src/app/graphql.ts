// // 1
// export const CREATE_LINK_MUTATION = gql`
//   # 2
//   mutation CreateLinkMutation($description: String!, $url: String!) {
//     createLink(description: $description, url: $url) {
//       id
//       createdAt
//       url
//       description
//     }
//   }
// `;

// //3
// export interface CreateLinkMutationResponse {
//   createLink: Link;
//   loading: boolean;
// }