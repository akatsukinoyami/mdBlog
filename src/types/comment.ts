import type User from "./user";

export default interface Comment {
  user: User,
  created_at: string,
  content: string,
}