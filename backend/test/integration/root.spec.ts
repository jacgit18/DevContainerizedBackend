import app from "../../src/app.js"
import chai from "chai"
import chaiHttp from "chai-http"
import "mocha"

chai.use(chaiHttp)
const expect = chai.expect

describe("Root", () => {
  it("should respond with 404 not found", () => {
    return chai.request(app).get("/")
      .then(res => {
        expect(res.status).to.equal(404)
      })
  })
})
