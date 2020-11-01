import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {RootState} from '.';
import http from './../config/http';

//轮播图
const CAROUSEL_URL = '/carousel';
//猜你喜欢
const GUESS_URL = '/guess';
// 列表
const CHANNEL_URL = '/channel';
export interface IGuess {
  id: string;
  title: string;
  image: string;
}

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}

export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

export interface IPagination {
  current: number;
  total: number;
  hasMore: boolean;
}

export interface HomeState {
  carousels: ICarousel[];
  guess: IGuess[];
  channel: IChannel[];
  pagination: IPagination;
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
    fetchChannel: Effect;
  };
}

const initState: HomeState = {
  carousels: [],
  guess: [],
  channel: [],
  pagination: {
    current: 1,
    total: 0,
    hasMore: true,
  },
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initState,
  reducers: {
    setState(state = initState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(http.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(http.get, GUESS_URL);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
    *fetchChannel({callback, playload}, {call, put, select}) {
      const {
        channel,
        pagination,
      }: {channel: IChannel[]; pagination: IPagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = 1;
      if (playload && playload.loadMore) {
        page = pagination.current + 1;
      }
      const {data} = yield call(http.get, CHANNEL_URL, {params: {page}});
      let newChannels: IChannel[] = data.result;
      if (playload && playload.loadMore) {
        newChannels = channel.concat(newChannels);
      }
      let AsyncPagination: IPagination = data.pagination;
      yield put({
        type: 'setState',
        payload: {
          channel: newChannels,
          pagination: {
            current: AsyncPagination.current,
            total: AsyncPagination.total,
            hasMore: newChannels.length < AsyncPagination.total,
          },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default homeModel;
