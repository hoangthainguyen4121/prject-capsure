import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateToDoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos' 

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const newTodo: CreateToDoRequest = JSON.parse(event.body)
      const userId = getUserId(event);
      const item = await createTodo(newTodo, userId);
  
      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          item
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message
      }
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
