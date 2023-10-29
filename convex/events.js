import { query } from "./_generated/server";


// Gets all events that user is not subscribed too
// export const availableEvents = query({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     // if (!identity) {
//     //     throw new Error("Unauthenticated call to mutation");
//     // }
//     return await ctx.db.query("events").filter((q) => ).collect();
//   },
// });

// List subscribed events for user
export const myEvents = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("events").collect();
    },
});

// Number of Attendees for each event*/
export const getNumAttendees = query({
    args: {},
    handler: async (ctx) => {
      const events  = await ctx.db.query("events").collect();
      return events.map(events => ({"event": events.Name, "num_attendees" : events.Attendees.length}))
    },
});

// Host User Create a New Event
export const 
// Hose User Modify an Existing Event

// Host User Delete an Event

// Other User Subscribe to An Event 