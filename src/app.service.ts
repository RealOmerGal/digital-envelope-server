import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}
  paidGuestsCount(eventId: number) {
    return this.entityManager.query(
      `SELECT event."estimatedGuests" AS Max,COUNT(blessing.id) AS Current
      FROM event
      INNER JOIN blessing
      ON event.id = blessing."eventId"
      WHERE blessing."eventId" = $1
    GROUP BY event."estimatedGuests"
  `,
      [eventId],
    );
  }

  totalAmount(eventId: number) {
    return this.entityManager.query(
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
  }
}
