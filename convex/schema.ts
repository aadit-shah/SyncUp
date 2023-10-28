import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    EventId: v.float64(),
    Location: v.string(),
    Name: v.string(),
    Notes: v.string(),
    Sport: v.string(),
    Time: v.string(),
    Users: v.array(
      v.object({
        UserId: v.float64(),
        UserName: v.string(),
      })
    ),
  }),
  users: defineTable({
    Email: v.string(),
    UserId: v.float64(),
    UserName: v.string(),
  }),
});