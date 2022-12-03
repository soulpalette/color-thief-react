import * as React from 'react';
import {
  getColorsPaletteFromImgUrl,
  reducer,
  initialReducerState
} from '../utils';
import { ColorFormats, ReducerState, ArrayRGB } from '../types';

/**
 * React Hook to get palette color from img url
 */
export default function usePalette<
  F extends ColorFormats,
  S extends ReducerState<F extends 'rgbArray' ? ArrayRGB[] : string[]>
>(
  imgSrc: string,
  colorCount = 2,
  format: F,
  options: { crossOrigin?: string; quality?: number } = {}
): S {
  const { crossOrigin = null, quality = 10 } = options;

  const [state, dispatch] = React.useReducer(reducer, <S>initialReducerState);

  React.useEffect(() => {
    dispatch({ type: 'start', payload: null });

    getColorsPaletteFromImgUrl(imgSrc, colorCount, format, crossOrigin, quality)
      .then((color) => {
        dispatch({ type: 'resolve', payload: color });
      })
      .catch((ex) => {
        dispatch({ type: 'reject', payload: ex });
      });
  }, [imgSrc]);

  return <S>state;
}
