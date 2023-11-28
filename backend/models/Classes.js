const db= require('../database/connect')


class Class {
    constructor({class_name, venue_name, score_out_of_five, photo_url, class_date}){
        this.name=class_name;
        this.venue=venue_name;
        this.review=score_out_of_five;
        this.photo=photo_url;
        this.date=class_date;
    }


    static async showAll(){
        const response = await db.query('SELECT class.class_name, venue.venue_name, review.score_out_of_five, class_photo.photo_url, class.class_date FROM class INNER JOIN venue ON (class.venue_id = venue.venue_id) LEFT JOIN review ON (class.class_id = review.class_id) LEFT JOIN class_photo ON (class.class_id = class_photo.class_id)')
        return response.rows.map(p => new Class(p))
    } 

    static async getOneById(id){
        const response = await db.query('SELECT class.class_name, venue.venue_name, review.score_out_of_five, class_photo.photo_url, class.class_date FROM class INNER JOIN venue ON (class.venue_id = venue.venue_id) LEFT JOIN review ON (class.class_id = review.class_id) LEFT JOIN class_photo ON (class.class_id = class_photo.class_id) WHERE class.class_id=$1', [id])

        return new Class(response.rows[0])
    }

    static async getItemsByFilters(id) {

          const query = await db.query('SELECT class.class_name, venue.venue_name, review.score_out_of_five, class_photo.photo_url, class.class_date FROM class INNER JOIN venue ON (class.venue_id = venue.venue_id) LEFT JOIN review ON (class.class_id = review.class_id) LEFT JOIN class_photo ON (class.class_id = class_photo.class_id) WHERE class.venue_id=$1', [id]);
        
          return query.rows.map(p => new Class(p))
      }
    
}

module.exports = Class ;