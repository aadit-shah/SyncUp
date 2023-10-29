import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";




// Gets all events that user is not subscribed too
// export const availableEvents = query({
// args: {},
// handler: async (ctx) => {
// const identity = await ctx.auth.getUserIdentity();
// // if (!identity) {
// // throw new Error("Unauthenticated call to mutation");
// // }
// return await ctx.db.query("events").filter((q) => ).collect();
// },
// });


// List subscribed events for user
export const myEvents = query({
args: {userId: v.int64()},
handler: async (ctx) => {
const subscribed = [];


const events = await ctx.db.query("events").collect();
for(e in events){
if(e["HostUser"].UserId == args.userId){
subscribed.push(e)
}
else{
for(user in e["Users"]){
if(user.UserId == args.userId){
subscribed.push(e)
}
}
}
}
return subscribed
},
});


// Number of Attendees for each event*/
export const getNumAttendees = query({
args: {},
handler: async (ctx) => {
const events = await ctx.db.query("events").collect();
return events.map(events => ({"event": events.Name, "num_attendees" : events.Attendees.length}))
},
});


// Host User Create a New Event
export const createEvent = mutation({
args: { eventId: v.number(), currentUser : v.object()},
handler: async (ctx, args) => {
const identity = await ctx.auth.getUserIdentity();
// if (!identity) {
// throw new Error("Unauthenticated call to mutation");
// }
const event = await ctx.db.query("events").filter((q) => q.eq(q.field("EventId"), args.eventId)).unique();
event["Users"].push(args.currentUser);
await ctx.db.replace(event._id, event);
},
});
// // Host User Modify an Existing Event


// export const modifyEvent = mutation({
// args: { id: v.id("events") },
// handler: async (ctx, args) => {
// await ctx.db.delete(args.id);
// },
// });


// Host User Delete an Event


export const deleteEvent = mutation({
args: { id: v.id("events") },
handler: async (ctx, args) => {
await ctx.db.delete(args.id);
},
});


// Other User Subscribe to An Event


export const subscribeToEvent = mutation({
args: { eventId: v.number()},
handler: async (ctx, args) => {
const identity = await ctx.auth.getUserIdentity();
// if (!identity) {
// throw new Error("Unauthenticated call to mutation");
// }
const event = await ctx.db.query("events").filter((q) => q.eq(q.field("EventId"), args.eventId)).unique();
const currentUser = {
UserId: 123,
UserName: 'asdf'
};
event["Users"].push(currentUser);
await ctx.db.replace(event._id, event);
},
});
