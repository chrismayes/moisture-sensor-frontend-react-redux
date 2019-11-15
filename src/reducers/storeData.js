// import defaultState from '../defaultState';

export default function storeData(state = {}, action) {
  switch (action.type) {
    case 'WATER_LEVEL':
      const maxPinValue = 800;
      const fullySaturated = 400;
      const reading = action.data.analog_in_0;
      const level = maxPinValue - reading > 0 ? maxPinValue - reading : 0;
      const percent = Math.ceil(level / fullySaturated * 100);
      const waterLevel = percent < 100 ? percent : 100;
      return { ...state, reading, level, percent: waterLevel };

    default:
      return state;
  }
}
