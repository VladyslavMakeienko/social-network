import profileReducer, {
  addPostActionCreator,
  deletePost,
} from "./profile-reducer";

let state = {
  postData: [
    { id: "1", message: "Hi, how are you?", likesCount: 15 },
    { id: "2", message: "It's my first post", likesCount: 20 },
  ],
};

test("length of posts should be incremented", () => {
  // 1. test data
  let action = addPostActionCreator("i-love-js.com");

  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postData.length).toBe(3);
});

test("message of new post should be correct", () => {
  // 1. test data
  let action = addPostActionCreator("i-love-js.com");

  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postData[2].message).toBe("i-love-js.com");
});

test("after deleting length of messages should be decrement", () => {
  // 1. test data
  let action = deletePost(2);

  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postData.length).toBe(1);
});

test("after deleting length of messages should be decrement", () => {
  // 1. test data
  let action = deletePost(1000);

  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postData.length).toBe(2);
});
