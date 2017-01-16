import Vue from 'vue';
import store from './../../store';

export default () => {
  store.dispatch('getBaptims');
  loadBaptismsLocal
};