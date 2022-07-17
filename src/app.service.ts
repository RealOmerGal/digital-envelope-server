import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}
  async paidGuestsCount(eventId: number) {
    const res = await this.entityManager.query(
      `SELECT event."estimatedGuests" AS Max, COUNT(blessing.id)::int AS Current
      FROM event
      INNER JOIN blessing
      ON event.id = blessing."eventId"
      WHERE blessing."eventId" = $1
    GROUP BY event."estimatedGuests"
  `,
      [eventId],
    );
    return res[0];
  }

  async totalAmount(eventId: number) {
    const res = await this.entityManager.query(
      `
      SELECT SUM(payment.amount)
      FROM payment
      INNER JOIN blessing 
      ON payment.id = blessing."paymentId"
      INNER JOIN event
      ON event.id = blessing."eventId"
      WHERE event.id = $1
    `,
      [eventId],
    );
    return res[0];
  }

  async averagePerGuest(eventId: number) {
    const res = await this.entityManager.query(
      `SELECT AVG(payment.amount::numeric)::int
       FROM payment
       INNER JOIN blessing
       ON blessing."paymentId" = payment.id
       INNER JOIN event
       ON blessing."eventId"  = event.id
       WHERE event.id = $1`,
      [eventId],
    );
    return res[0];
  }

  top3Guests(eventId: number) {
    return this.entityManager.query(
      `SELECT blessing."createdBy", payment.amount
      FROM blessing
      INNER JOIN payment
      ON payment.id = blessing."paymentId"
      INNER JOIN event
      ON event.id = blessing."eventId"
      WHERE event.id = $1
      ORDER BY payment.amount DESC
      LIMIT 3`,
      [eventId],
    );
  }
}
