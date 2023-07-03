const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'
let TOKEN 
let userId

beforeAll(async()=>{
    const user = {
        email: "quilimacox1@gmail.com",
        password: "1234"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)
    
    TOKEN = res.body.token
})

test("GET -> 'URL_BASE', should return status code 200 and res.body to have length 1",async()=>{
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("POST -> 'URL_BASE' should return status code 201 and res.body.firstName === body.firstName", async()=>{
    const userCreate = {
        firstName: "Gabi",
        lastName: "Lopez",
        email: "gabi@gmail.com",
        password: "12345",
        phone: "+1234567890"
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(userCreate)

    userId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(userCreate.firstName)
})

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.firstName = body.firstName", async()=>{
    const userUpdate = {
        firstName: "Gabi"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .send(userUpdate)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(userUpdate.firstName)

})

test("POST 'BASE_URL/login', should return status code 200 res.body.email === body.email and token defined", async()=>{
    const userLogin = {
        email: "gabi@gmail.com",
        password: "12345",
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)

    expect(res.status).toBe(200)
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
})

test("POST 'BASE_URL/login', should return status code 401", async()=>{
    const userLogin = {
        email: "gabi@gmail.com",
        password: "invalid password",
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)

    expect(res.status).toBe(401)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async()=>{
    
    const res = await request(app)
        .delete(`${BASE_URL}/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})

