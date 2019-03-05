// Main Handler

import { success, failure } from "./Res";
import * as Example from './Example';

export const hello = async (event, context) => {
	
  try {
    let res = await Example.message({ time: 1, copy: `Your function in ${process.env.APP_NAME} executed successfully!`});
    if(res) { return success(res) }
    else throw 'Your function failed! :('
  } 
  
  catch (e) { return failure({ message: e }) }

};

