// Main Handler

import { success, failure, notFound, created} from "./libs/Res";
import * as DB from "./libs/db";
import uuid from 'uuid'


export const createConfig = async (event, context) => {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuid.v1(),
      name: data.app_name,
      maintenance: false
    }
  }

  try {
    await DB.call("put", params);
    return created(params.Item);
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }

}

export const getConfig = async (event, context) => {
  const params = {
    TableName : process.env.TABLE_NAME,
    Key: {
      id: event.pathParameters.id
    }  
  }

  try {
    let res = await DB.call('get', params)

    if(res.Item){
      return success(res.Item)
    }else{
      return notFound({
        status : false,
        message: 'Item not found'
      })
    }
  } catch (e) {
    console.log(e)
    return failure({
      status : false
    })
    
  }
}