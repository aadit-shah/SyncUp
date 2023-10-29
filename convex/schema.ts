import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    Attendees: v.array(
      v.object({
        UserId: v.float64(),
        UserName: v.string(),
      })
    ),
    Available: v.boolean(),
    EventId: v.float64(),
    HostUser: v.object({
      UserId: v.float64(),
      UserName: v.string(),
    }),
    Location: v.string(),
    Name: v.string(),
    Notes: v.string(),
    Sport: v.string(),
    Time: v.string(),
  }),
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
  users: defineTable({
    Email: v.string(),
    UserId: v.float64(),
    UserName: v.string(),
  }),
});