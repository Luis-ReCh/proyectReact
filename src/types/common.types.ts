export interface Post {
  id?: string;
  postAuthor: string;
  postAuthorId: string;
  postContent: string;
  postDateDay: string;
  postDateMonth: string;
  postImageURL: string;
  postReadTime: string;
  postRelevance: string;
  postTitle: string;
  postTags: [string];
  //   postComments: [{
  //     commentAuthorId: {type: String},
  //     commentAuthorImg: {type: String},
  //     commentAuthorName: {type: String},
  //     commentDate: {type: String},
  //     commentText: {type: String},
  //   }],
  //   postLikes: {
  //     likeCounter: {type: Number},
  //     likes:[{
  //       likeAuthorId: {type: String},
  //     }]
  //   }
}

export interface User {
  userEducationtype: String;
  userEmail: String;
  userImage: String;
  userJoined: String;
  userLastname: String;
  userLocation: String;
  userName: String;
  userNickName: String;
  userPassword: String;
}
