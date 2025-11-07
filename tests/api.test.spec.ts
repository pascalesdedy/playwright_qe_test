import { test,expect } from "@playwright/test"
import {createUserPayload, updateUserPayload, registerPayload, missingPasswordPayload} from "../lib/payload"
import dotenv from 'dotenv'; 

dotenv.config(); 
const BASE_URL = process.env.BASE_URL;

test("get user detail by id", async ({request}) => {
    const response = await request.get(BASE_URL + "/users/2");
    const responseJson = await response.json();

    expect(response.status()).toEqual(200);
    expect(responseJson).toHaveProperty("data");
    expect(responseJson.data.id).toEqual(2);
    expect(responseJson.data.email).toEqual("janet.weaver@reqres.in");
})

test("Get detail of not exist user", async({request}) => {
    const response = await request.get(BASE_URL + "/users/23");
    const responseJson = await response.json();

    expect(response.status()).toEqual(404);
    expect(responseJson).toEqual({});
});

test("create user", async ({request}) => {
    const response = await request.post(BASE_URL + "/users", createUserPayload);
    const responseJson = await response.json();

    expect(response.status()).toEqual(201);
    expect(responseJson.name).toEqual("morpheus");
    expect(responseJson.job).toEqual("leader");
    expect(responseJson).toHaveProperty("createdAt");
})

test("update user", async ({request}) => {
    const response = await request.put(BASE_URL + "/users/2", updateUserPayload);
    const responseJson = await response.json();

    expect(response.status()).toEqual(200);
    expect(responseJson.name).toEqual("claire");
    expect(responseJson.job).toEqual("worker");
    expect(responseJson).toHaveProperty("updatedAt");
})

test("delete user by id", async({request}) => {
    const response = await request.delete(BASE_URL + "/users/2");

    expect(response.status()).toEqual(204);
})

test("register new user", async({request}) => {
    const response = await request.post(BASE_URL + "/register", registerPayload);
    const responseJson = await response.json();

    expect(response.status()).toEqual(200);
    expect(responseJson).toHaveProperty("id");
    expect(responseJson).toHaveProperty("token");
})

test("Register user with missing password field", async({request}) => {
    const response = await request.post(BASE_URL + "/register", missingPasswordPayload);
    const responseJson = await response.json();

    expect(response.status()).toEqual(400);
    expect(responseJson).toHaveProperty("error");
    expect(responseJson.error).toEqual("Missing password");
})