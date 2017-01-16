import models from './models/index.js';
import store from './../store'

export function componentProperties({model}){

	console.log(`Services::defaultModel::componentProperties from Model: ${model}`);
	console.log(`Existing models:models[model]`,models)
    return models[model];
}

export function getAllItems({model}){

    console.log(`Services::defaultModel::getAllItems from Model: ${model}`);
    // console.log(`Services::defaultModel::getAllItems from Model: ${store.state[model].list}`);
    return store.state[model].list;
}

export function getAll({model}){

    console.log(`Services::defaultModel::getAll from Model: ${model}`);
    return store.getters[`${model}/getAllData`];
}

export function getSingleItem({model,payload}){

    console.log(`Services::defaultModel::getSingleItem from Model: ${model}`);
    console.log(`Services::defaultModel::getSingleItem with payload: ${payload}`);
    return store.dispatch(`${model}/getSingleItem`,payload);
}


export function hasItems({model}){

    console.log(`Services::defaultModel::hasItems from Model: ${model}`);
	// console.log(`Services::defaultModel::hasItems from Model: ${store.state[model].list}`);
    return store.state[model].list.length>0;
}

export function loadDefaultData({model}){

	console.log(`Services::defaultModel::loadDefaultData from Model: ${model}`);
    store.dispatch(`${model}/loadItemsDefault`);
}

export function loadLocalData({model, data}){

    console.log(`Services::defaultModel::loadLocalData from Model: ${model}`);
    console.log(`Services::defaultModel::loadLocalData with data ${data}`);
    store.dispatch(`${model}/loadItemsLocal`,data)
}

export default {
  getAllItems,
  componentProperties,
  loadDefaultData,
  loadLocalData,
  hasItems,
  getAll,
  getSingleItem
};
