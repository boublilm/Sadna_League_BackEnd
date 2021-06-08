const league = require("../project/service/league");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", league);

test("getDetails of league route works", done => {
    request(app)
      .get("/getDetails")
      // .expect("Content-Type", /text/)
    //   .expect({ name: "frodo" })
      .expect(200, done);
  });
  

  // test("getAllGames in the league route works", done => {
  //   request(app)
  //     .get("/getAllGames")
  //   //   .expect("Content-Type", /json/)
  //     .expect(201, done);
  // });
//   test("testing route works", done => {
//     request(app)
//       .post("/test")
//       .type("form")
//       .send({ item: "hey" })
//       .then(() => {
//         request(app)
//           .get("/test")
//           .expect({ array: ["hey"] }, done);
//       });
//   });