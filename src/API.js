// Main Handler

import { success, failure, notFound, created} from "./libs/Res";
import * as DB from "./libs/db";
import uuid from 'uuid'


export async function createConfig (event, context) {
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

export async function getConfig (event, context) {
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
        message: 'App not found'
      })
    }
  } catch (e) {
    console.log(e)
    return failure({
      status : false
    })
    
  }
}

export async function updateMaintenanceFalse  (event, context) {
  const params = {
    TableName : process.env.TABLE_NAME,
    Key : {
      id : event.pathParameters.id
    },
    UpdateExpression : "SET maintenance = :maintenance",
    ExpressionAttributeValues : {
      ":maintenance" : false
    },
    ReturnValues : "ALL_NEW"
  }

  try {
    let res = await DB.call('update', params)

    return success({
      status : true,
      data: res.Attributes
    })
  } catch (e) {
    console.log(e)
    return failure({
      status : false,
      message: "Internal Server Error"
    })
    
  }
}

export async function updateMaintenanceTrue (event, context) {
  const params = {
    TableName : process.env.TABLE_NAME,
    Key : {
      id : event.pathParameters.id
    },
    UpdateExpression : "SET maintenance = :maintenance",
    ExpressionAttributeValues : {
      ":maintenance" : true
    },
    ReturnValues : "ALL_NEW"
  }

  try {
    let res = await DB.call('update', params)
    return success({
      status : true,
      data: res.Attributes
    })
  } catch (e) {
    console.log(e)
    return failure({
      status : false,
      message: "Internal Server Error"
    })
    
  }
}