import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../helpers/todos'
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Get todos
    try {
      const userId = getUserId(event)
      const items = await getTodosForUser(userId)

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          items: items
        })
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message
      }
    }
  })
   
handler.use(
  cors({
    credentials: true
  })
)