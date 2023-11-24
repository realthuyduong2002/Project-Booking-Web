
import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
/**
 * @swagger
 *   /api/auth/register:
    post:
      tags:
        - "auth"
      summary: "Register a new user."
      description: "This endpoint allows users to register new accounts."
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                  description: "The user's username."
                email:
                  type: string
                  description: "The user's email address."
                password:
                  type: string
                  description: "The user's password."
      responses:
        201:
          description: "User has been created."
        400:
          description: "Bad request."
        500:
          description: "Internal server error."
 */

router.post("/login", login); // Define the login route
/**
 * @swagger
 * 
 *  /api/auth/login:
    post:
      tags:
        - auth
      summary: Login an existing user
      description: Login into system
      operationId: login
      requestBody:
        description: Information login
        content:
          application/json:
            schema:
              type: object
              required:
                - username
                - password
              properties:
                username:
                  type: string
                  description: The user's username
                  example: su
                password:
                  type: string
                  description: The user's password
                  example: 123
        required: true
      responses:
        "200":
          description: Login successful.
          content:
            application/json:
              schema:
                type: object
                properties:
                  access_token:
                    type: string
                  user:
                    type: object
                    properties:
                      id:
                        type: string
                      username:
                        type: string
                      email:
                        type: string
                      isAdmin:
                        type: boolean
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: The error message.
        "404":
          description: User not found.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: The error message.

 */
export default router;
