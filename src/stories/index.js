import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import '@storybook/addon-console';

import Slider, { createPoint } from '../';

const topFn = (nFactor, trackWidth) => {
  /**
   * 0 <= nFactor <= 1
   * 1: Thumb is exactly on this point
   * 0: Thumb is out of front (rear) zone
   *
   * trackWidth - width of the slider track
   *
   */
  return (
    <div
      style={{
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#82afc9cc',
        position: 'relative',
        left: -25,
        bottom: nFactor * 50 + 58,
        fontSize: 50,
        textAlign: 'center',
      }}
    >
      ☂
    </div>
  );
};

const bottomFn = (nFactor, trackWidth) => {
  return (
    <div
      style={{
        height: 50,
        width: 50,
        // borderRadius: 50,
        // backgroundColor: '#c9c782cc',
        bottomRadius: '4px solid red',
        position: 'relative',
        left: -25,
        bottom: 5,
        fontSize: 40,
        textAlign: 'center',
        // color: '#ff0202',
      }}
    >
      {nFactor > 0.9 ? '⚑' : '⚐'}
    </div>
  );
};

const onChange = data => console.log('onChange', data);

storiesOf('Responsive Slider', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <div style={{ padding: 100 }}>{storyFn()}</div>)
  .add('Slider default', () => (
    <div>
      <Slider />
    </div>
  ))
  .add('Slider x9', () => (
    <div>
      <Slider
        snapMagnet={number('snapMagnet', 10)}
        speed={number('speed', 0.75)}
        frontZone={number('frontZone %', 50)}
        rearZone={number('rearZone %', 50)}
        points={new Array(9)
          .fill(0)
          .map((v, ind, arr) => createPoint({ ind, total: arr.length }))}
        onChange={onChange}
        debug
      />
    </div>
  ))
  .add('Slider x18', () => (
    <div>
      <Slider
        snapMagnet={number('snapMagnet', 10)}
        speed={number('speed', 0.75)}
        frontZone={number('frontZone %', 50)}
        rearZone={number('rearZone %', 50)}
        points={new Array(18)
          .fill(0)
          .map((v, ind, arr) => createPoint({ ind, total: arr.length }))}
        onChange={onChange}
      />
    </div>
  ))
  .add('Slider custom render', () => (
    <div>
      <Slider
        snapMagnet={number('snapMagnet', 10)}
        speed={number('speed', 0.75)}
        frontZone={number('frontZone %', 20)}
        rearZone={number('rearZone %', 20)}
        points={new Array(11).fill(0).map((v, ind, arr) =>
          createPoint({
            ind,
            total: arr.length,
            top: topFn,
            bottom: bottomFn,
          })
        )}
        onChange={onChange}
        debug
      />
    </div>
  ))
  .add('with custom styles', () => (
    <div>
      <Slider
        points={new Array(9)
          .fill(0)
          .map((v, ind, arr) => createPoint({ ind, total: arr.length }))}
        onChange={onChange}
        styles={{
          slider: { height: 80, marginBottom: 40, paddingTop: 40 },
          track: { backgroundColor: '#ab7676' },
          activeTrack: { backgroundColor: '#745c9f' },
          thumb: {
            backgroundColor: 'white',
            borderLeft: '#745c9f solid 6px',
            borderRight: '#ab7676 solid 6px',
            width: 18,
          },
        }}
      />
    </div>
  ));
