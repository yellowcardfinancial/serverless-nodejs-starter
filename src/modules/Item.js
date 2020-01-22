import * as db from "../libs/Db";

export function saveItem(item) {
	return db.call("put", process.env.ITEM_TABLE || 'yellowcard-item-dev', item)
		.then(() => item)
		.catch(e => {
			console.error(e);
			throw 'ItemNotSaved';
		});
}

export async function getItem(id) {
	try {
		let res = await db.call("get", process.env.ITEM_TABLE || 'yellowcard-item-dev', { id });
		if (res && res.Item) {
			return res.Item;
		}
		throw 'Not Retrieved';
	} catch (e) {
		console.error(e);
		throw 'ItemNotRetrieved';
	}
};

export async function getItems() {
	try {
		let res = await db.call("scan", process.env.ITEM_TABLE || 'yellowcard-item-dev');
		if (res && res.Items) {
			return res.Items;
		}
		throw 'No Items Retrieved';
	} catch (e) {
		console.error(e);
		throw 'ItemsNotRetrieved';
	}
};

export async function updateItem(id, data) {
	try {
		let res = await db.call("get", process.env.ITEM_TABLE || 'yellowcard-item-dev', { id });
		if (!(res && res.Item)) throw `Item with id ${id} not found`;

		let item = Object.assign(res.Item, data );

		return await db.call("put", process.env.ITEM_TABLE || 'yellowcard-item-dev', item);
	} catch (e) {
		console.error(e);
		throw e;
	}
};
