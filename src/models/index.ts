import home from './home';
import {DvaLoadingState} from 'dva-loading-ts';

export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
};

const models = [home];

export default models;
