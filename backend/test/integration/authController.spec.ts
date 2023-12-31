import { expect } from 'chai';
// import chai from "chai"

import chaiHttp from "chai-http";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import "mocha";

import config from "../../config/config.js";
import sgMail from "../../libs/sgMail.js";
import app from "../../src/app.js";
import { verifyJwt } from "../../src/auth/jwtUtil.js";
import { db } from "../../src/data/db.js";
import userData from "../../src/data/userData.js";
import { addFixtures, flushFixtures, getFixture } from "../fixtures/index.js";

chai.use(chaiHttp)

const expects = expect
// const expect = chai.expect


describe("authController", () => {

  let adminUserAuth: string

  beforeEach(async () => {
    await addFixtures()
    // @ts-ignore
    sgMail.flushEmails()
  })

  afterEach(async () => {
    await flushFixtures()
    // @ts-ignore
    sgMail.flushEmails()
  })

  describe("login", () => {

    it("Password of wrong data format shouldn't succeed", async () => {
      const userCreds = {
        email: "Alfredo@tracflo.io",
        password: 123456789
      }
      const response = await chai.request(app).post(`/v2/login/auth`).send(userCreds)
      expects(response.status).to.equal(400)
    })

    it("Email of wrong data format shouldn't succeed", async () => {
      const userCreds = {
        email: 374832749,
        password: "123456789"
      }
      const response = await chai.request(app).post(`/v2/login/auth`).send(userCreds)
      expects(response.status).to.equal(400)
    })

    it('email does not exist, shouldnt succeed', async () => {
      const userCreds = {
        email: 'me@me.com',
        password: "123456789"
      }
      const response = await chai.request(app).post(`/v2/login/auth`).send(userCreds)
      expects(response.status).to.equal(401)
    })

    it('email exists but password is incorrect, shouldnt succeed', async () => {
      const correctUserObject = {
        email: 'me@me.com',
        password: "123456789",
        date_created: new Date(),
        date_modified: new Date(),
        first_name: 'Me',
        last_name: 'AlsoMe',
        phone: null,
        avatar_url: null,
      }
      // encrypted password cannot be done with fixtures, have to add via api method.
      const userObj = await userData.createUser(correctUserObject)
      const incorrectUserCreds = {
        email: userObj.email,
        password: 'notcorrectpassword'
      }
      const response = await chai.request(app).post(`/v2/login/auth`).send(incorrectUserCreds)
      expects(response.status).to.equal(401)
    })

    it('email and password exists, should succeed', async () => {
      const password = "123456789"
      const correctUserObject = {
        email: 'me@me.com',
        password,
        date_created: new Date(),
        date_modified: new Date(),
        first_name: 'Me',
        last_name: 'AlsoMe',
        phone: null,
        avatar_url: null,
      }
      // encrypted password cannot be done with fixtures, have to add via api method.
      await userData.createUser(correctUserObject)
      const response = await chai.request(app).post(`/v2/login/auth`).send(correctUserObject)
      expects(response.status).to.equal(200)
      expects(response?.body?.success).to.equal(true)
      expects(response.body.data.jwt).to.not.be.undefined
      expects(() => verifyJwt(response.body.data.jwt)).to.not.throw('identity could not be authenticated')
      const jwtUserInfo = verifyJwt(response.body.data.jwt)
      const userInfoFields = ['email', 'id', 'first_name', 'last_name']
      for (let userInfoField of userInfoFields) {
        // @ts-ignore
        expects(jwtUserInfo[userInfoField]).to.not.be.undefined
      }
    })

    it('Not super admin returns with is_admin is false', async () => {
      const password = "123456789"
      const correctUserObject = {
        email: 'me@me.com',
        password,
        date_created: new Date(),
        date_modified: new Date(),
        first_name: 'Me',
        last_name: 'AlsoMe',
        phone: null,
        avatar_url: null,
      }
      // encrypted password cannot be done with fixtures, have to add via api method.
      await userData.createUser(correctUserObject)
      const response = await chai.request(app).post(`/v2/login/auth`).send(correctUserObject)
      expects(response.status).to.equal(200)
      expects(response?.body?.success).to.equal(true)
      expects(response.body.data.jwt).to.not.be.undefined
      expects(() => verifyJwt(response.body.data.jwt)).to.not.throw('identity could not be authenticated')
      const jwtUserInfo = verifyJwt(response.body.data.jwt)
      const userInfoFields = ['email', 'id', 'first_name', 'last_name']
      for (let userInfoField of userInfoFields) {
        // @ts-ignore
        expects(jwtUserInfo[userInfoField]).to.not.be.undefined
      }
      expects(jwtUserInfo.is_admin).to.equal(false)
    })

    it('Super admin returns with is_admin is true', async () => {
      const password = "123456789"
      const correctUserObject = {
        email: 'me@me.com',
        password,
        date_created: new Date(),
        date_modified: new Date(),
        first_name: 'Me',
        last_name: 'AlsoMe',
        phone: null,
        avatar_url: null,
      }
      // encrypted password cannot be done with fixtures, have to add via api method.
      const user = await userData.createUser(correctUserObject)
      await db('tf_admin').insert({tfuser_id: user.id})
      const response = await chai.request(app).post(`/v2/login/auth`).send(correctUserObject)
      expects(response.status).to.equal(200)
      expects(response?.body?.success).to.equal(true)
      expects(response.body.data.jwt).to.not.be.undefined
      expects(() => verifyJwt(response.body.data.jwt)).to.not.throw('identity could not be authenticated')
      const jwtUserInfo = verifyJwt(response.body.data.jwt)
      const userInfoFields = ['email', 'id', 'first_name', 'last_name']
      for (let userInfoField of userInfoFields) {
        // @ts-ignore
        expects(jwtUserInfo[userInfoField]).to.not.be.undefined
      }
      expects(jwtUserInfo.is_admin).to.equal(true)
    })
  })

  describe('resetPassword',  () => {
    it('returns error if email is the wrong format', async () => {
      const email: number = 12345
      const response = await chai.request(app).post(`/v2/reset-password`).send({email})
      expects(response.status).to.equal(400)
      // no emails should have been sent
      // @ts-ignore
      expects(sgMail.sentEmails.length).to.equal(0)
    })

    it('returns successfully if email is not in the database', async () => {
      const email: string = 'fakeemailnotindatabase@notin.com'
      const response = await chai.request(app).post(`/v2/reset-password`).send({email})
      expects(response.status).to.equal(200)
      // no emails should have been sent
      // @ts-ignore
      expects(sgMail.sentEmails.length).to.equal(0)
    })

    it('returns error if SendGrid throws', async () => {
      const {email} = getFixture('tfuser', 'last_name', 'makeSendGridThrow')
      const response = await chai.request(app).post(`/v2/reset-password`).send({email})
      expects(response.status).to.equal(500)
      // no emails should have been sent
      // @ts-ignore
      expects(sgMail.sentEmails.length).to.equal(0)
    })

    it('returns error if SendGrid returns error status', async () => {
      const {email} = getFixture('tfuser', 'last_name', 'makeSendGridError')
      const response = await chai.request(app).post(`/v2/reset-password`).send({email})
      expects(response.status).to.equal(500)
      // tried sending an email, possibly sent
      // @ts-ignore
      expects(sgMail.sentEmails.length).to.equal(1)
    })

    it('returns successfully with email in database', async () => {
      const {email, id} = getFixture('tfuser', 'email', 'superadmin@email.com')
      const response = await chai.request(app).post(`/v2/reset-password`).send({email})
      expects(response.status).to.equal(200)
      // sent email
      // @ts-ignore
      expects(sgMail.sentEmails.length).to.equal(1)
      // @ts-ignore
      const jwtSent: string = sgMail.sentEmails[0].dynamicTemplateData.link.split('reset-password/')[1]
      const jwtData: Jwt = jwt.verify(jwtSent, config.JWT_SECRET as string, {complete: true})
      const payload = jwtData.payload as JwtPayload
      expects(payload.id).to.equal(id)
      // making sure that it does not return the default expiry, should be 5 min long
      const millisToMinutes = (millis: number) => {
        return millis / 1000 / 60
      }
      const expiresInMins: number = millisToMinutes((payload.exp ?? 0) * 1000 - (new Date()).getTime())
      expects(expiresInMins).to.be.greaterThan(4)
      expects(expiresInMins).to.be.lessThan(6)
    })
  })
})
