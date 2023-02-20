// import { ImageActionType } from "@/types/Image";
// import {
//   insert,
//   insertAtIndex,
//   removeAtIndex,
//   updateAtIndex,
// } from "../utils/array";

// export type ImageAction =
//   | { type: ImageActionType.INIT; images: String[]}
//   | { type: ImageActionType.CREATE; image: string }
//   | { type: ImageActionType.DELETE; image: string }
//   | { type: ImageActionType.UPDATE; image: string };

// export function reactionsReducer(
//   state: String[],
//   action: ImageAction
// ): String[] {
//   switch (action.type) {
//     case ImageActionType.INIT:
//       return [...action.images];
//     case ImageActionType.CREATE:
//       const parentIndex = state.findIndex(
//         (image) => image === action.reaction.parentId
//       );

//       return action.reaction.parentId
//         ? insertAtIndex<String>(state, parentIndex + 1, action.reaction)
//         : insert<String>(state, action.reaction);
//     case ImageActionType.DELETE:
//       const deletedIndex = state.findIndex(
//         (reaction) => reaction.id === action.reaction.id
//       );

//       return removeAtIndex<String>(state, deletedIndex);

//     case ImageActionType.UPDATE:
//       const updatedIndex = state.findIndex(
//         (reaction) => reaction.id === action.reaction.id
//       );

//       return updateAtIndex<String>(state, updatedIndex, action.reaction);
//     default:
//       throw new Error("Reaction Reducer Unhandled Error");
//   }
// }
