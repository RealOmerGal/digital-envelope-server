import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Event Module', () => {
    let app: INestApplication;
    let eventId;
    const name = 'AUTO_ADDED_EVENT';
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('creates a new event', () => {
        return request(app.getHttpServer())
            .post('/event')
            .send({ name })
            .expect(201)
            .then((res) => {
                const { id, name } = res.body;
                expect(id).toBeDefined();
                expect(name).toEqual(name);
                eventId = id;
            });
    });

    it('finds the created event', () => {
        return request(app.getHttpServer())
            .get('/event/' + eventId)
            .expect(200)
            .then((res) => {
                expect(res.body.id).toEqual(eventId);
            });
    });

    it('updates name of the created event', () => {
        const newName = 'UPDATED_EVENT'
        return request(app.getHttpServer())
            .patch('/event/' + eventId)
            .send({ name: newName })
            .then((res) => {
                expect(res.body.id).toEqual(eventId);
                expect(res.body.name).toEqual(newName);
            });
    });

    it('closes an active event', () => {
        return request(app.getHttpServer())
            .patch('/event/' + eventId)
            .send({ closed: true })
            .then((res) => {
                expect(res.body.id).toEqual(eventId);
                expect(res.body.closed).toEqual(true);
            });
    });

});
