'use server';

import { WritePostFormValues } from "./WritePostForm";

export const createPost = async (values: WritePostFormValues) => {
  // create d'un post 
  console.log("I'm on the server !");
};
