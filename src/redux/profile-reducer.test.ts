import { ProfileType } from "./../types/types";
import profileReducer, { actions } from "./profile-reducer";

let state = {
  postData: [
    { id: 1, message: "Hi, how are you?", likesCount: 15 },
    { id: 2, message: "It's my first post", likesCount: 20 },
  ],
  profile: null,
  status: "",
  newPostText: "",
};

test("length of posts should be incremented", () => {
  // 1. test data
  let action = actions.addPostActionCreator("i-love-js.com");

  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postData.length).toBe(3);
});

test("message of new post should be correct", () => {
  // 1. test data
  let action = actions.addPostActionCreator("i-love-js.com");

  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postData[2].message).toBe("i-love-js.com");
});

test("after deleting length of messages should be decrement", () => {
  // 1. test data
  let action = actions.deletePost(2);

  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postData.length).toBe(1);
});

test("after deleting length of messages should be decrement", () => {
  // 1. test data
  let action = actions.deletePost(1000);

  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postData.length).toBe(2);
});
