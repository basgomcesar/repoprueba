import request from "supertest";
import { app } from "../../src/infrastructure/api/app";


describe("Rover API - Acceptance Tests", () => {

  it("should process instructions correctly", async () => {
    const res = await request(app)
      .get("/rover?instructions=MMMMDMMMIIM");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      resultado: "2:4:O",
    });
  });

  it("should handle rotation only", async () => {
    const res = await request(app)
      .get("/rover?instructions=IIII");

    expect(res.status).toBe(200);
    expect(res.body.resultado).toBe("0:0:N");
  });

  it("should return error for invalid instruction", async () => {
    const res = await request(app)
      .get("/rover?instructions=MMXMM");

    expect(res.status).toBe(400);
  });

  it("should return error if instructions missing", async () => {
    const res = await request(app)
      .get("/rover");
    expect(res.body.resultado).toBe("0:0:N");
  });
  it("should return error for number instruction", async () => {
    const res = await request(app)
      .get("/rover?instructions=123");
    expect(res.status).toBe(400);
  });

});
