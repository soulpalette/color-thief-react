import * as React from 'react';
import {
  getPredominantColorFromImgURL,
  reducer,
  initialReducerState
} from '../utils';
import { ColorFormats, ReducerState, ArrayRGB } from '../types';

/**
 * React Hook to use get color from img url
 */
export default function useColor<
  F extends ColorFormats,
  S extends ReducerState<F extends 'rgbArray' ? ArrayRGB : string>
>(
  imgSrc: string,
  format: F,
  options: { crossOrigin?: string; quality?: number } = {}
): S {
  const { crossOrigin = null, quality = 10 } = options;

  const [state, dispatch] = React.useReducer(reducer, <S>initialReducerState);

  React.useEffect(() => {
    dispatch({ type: 'start', payload: null });

    getPredominantColorFromImgURL(imgSrc, format, crossOrigin, quality)
      .then((color) => {
        dispatch({ type: 'resolve', payload: color });
      })
      .catch((ex) => {
        dispatch({ type: 'reject', payload: ex });
      });
  }, [imgSrc]);

  return <S>state;
}
