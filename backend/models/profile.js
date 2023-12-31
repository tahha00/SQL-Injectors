const db = require('../database/connect');


class Bookings {
    constructor({ booking_id, class_name, class_time, venue_name}) {
        this.id = booking_id;
        this.name = class_name;
        this.classstart = class_time;
        this.venuename = venue_name;
    }


    static async getBookingsByUserId(id) {
        const response = await db.query("SELECT booking.booking_id, class.class_name, booking.class_time, venue.venue_name FROM booking JOIN class ON booking.class_id = class.class_id JOIN venue ON class.venue_id = venue.venue_id WHERE booking.user_id = $1;", [id]);
        return response.rows.map(row => new Bookings(row));
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM booking WHERE booking_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Booking not found")
        }
        return new Bookings(response.rows[0]);
    }

    async destroy(){
        let response = await db.query("DELETE FROM booking WHERE booking_id = $1 RETURNING *;", [this.id])
        return new Bookings(response.rows[0])
    }
}

module.exports= Bookings
