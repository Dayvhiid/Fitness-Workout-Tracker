import request from 'supertest';
import app from '../index.js';
let token;

beforeAll(async () => {
  const res = await request(app).post('/api/auth/login').send({
    email: "test@example.com",
    password: "password123"
  });
  token = res.body.token;
});

describe("Workout Routes", () => {
  it("should create a workout", async () => {
    const res = await request(app)
      .post('/api/workouts')
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Leg Day",
        date: "2025-08-04",
        exercises: [
          { name: "Squats", sets: 3, reps: 12 }
        ]
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Leg Day");
  });
});
