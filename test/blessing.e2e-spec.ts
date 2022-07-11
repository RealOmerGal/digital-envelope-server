import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Blessing } from '../src/blessing/blessing.entity';

describe('Blessing Module', () => {
  let app: INestApplication;
  let eventId;
  let blessingId;
  const text = 'AUTO_ADDED_BLESSING';
  const createdBy = 'TESTING MODULE';
  const paymentId = 1;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('creates a new event and a new blessing attached to it', () => {
    request(app.getHttpServer())
      .post('/event')
      .send({ name: 'AUTO_ADDED', estimatedGuests: 150 })
      .expect(201)
      .then((res) => {
        eventId = res.body.id;
      });

    return request(app.getHttpServer())
      .post('/blessing' + eventId)
      .send({ createdBy, text, paymentId })
      .expect(201)
      .then((res) => {
        blessingId = res.body.id;
        expect(blessingId).toBeDefined();
      });
  });
  it("finds the created blessing when looking for event's blessings", async () => {
    const res = await request(app.getHttpServer()).get('/blessing/' + eventId);
    res.body.map((blessing: Blessing) => {
      if (blessing.id === blessingId) return expect(true);
    });
  });
  expect(false);
});
