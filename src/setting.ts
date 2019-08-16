
export enum OPERATOR {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  LEFT_PAREN = '(',
  RIGHT_PAREN = ')'
}

export const MINUS: string = OPERATOR.SUBTRACT;

export enum NUMBER {
  ZERO = '0',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  POINT = '.'
}

export enum BUTTON_TYPE {
  NUMBER = '10',
  PI = '11',
  OPERATOR = '20',
  LEFT_PAREN = '21',
  RIGHT_PAREN = '22',
  INVERSION = '23',
  EQUAL = '80',
  CLEAR = '90',
  ALL_CLEAR = '91',
  BACKSPACE = '92'
}

export interface ButtonParams {
  text: string,
  type: BUTTON_TYPE,
  order: number,
  keyCodeList: string[],
  value?: NUMBER | OPERATOR,
  size?: number
}

export const BUTTONS: ButtonParams[] = [
  {
    text: NUMBER.ZERO,
    value: NUMBER.ZERO,
    type: BUTTON_TYPE.NUMBER,
    order: 21,
    keyCodeList: ['48', '96']
  },
  {
    text: NUMBER.ONE,
    value: NUMBER.ONE,
    type: BUTTON_TYPE.NUMBER,
    order: 17,
    keyCodeList: ['49', '97']
  },
  {
    text: NUMBER.TWO,
    value: NUMBER.TWO,
    type: BUTTON_TYPE.NUMBER,
    order: 18,
    keyCodeList: ['50', '98']
  },
  {
    text: NUMBER.THREE,
    value: NUMBER.THREE,
    type: BUTTON_TYPE.NUMBER,
    order: 19,
    keyCodeList: ['51', '99']
  },
  {
    text: NUMBER.FOUR,
    value: NUMBER.FOUR,
    type: BUTTON_TYPE.NUMBER,
    order: 13,
    keyCodeList: ['52', '100']
  },
  {
    text: NUMBER.FIVE,
    value: NUMBER.FIVE,
    type: BUTTON_TYPE.NUMBER,
    order: 14,
    keyCodeList: ['53', '101']
  },
  {
    text: NUMBER.SIX,
    value: NUMBER.SIX,
    type: BUTTON_TYPE.NUMBER,
    order: 15,
    keyCodeList: ['54', '102']
  },
  {
    text: NUMBER.SEVEN,
    value: NUMBER.SEVEN,
    type: BUTTON_TYPE.NUMBER,
    order: 9,
    keyCodeList: ['55', '103']
  },
  {
    text: NUMBER.EIGHT,
    value: NUMBER.EIGHT,
    type: BUTTON_TYPE.NUMBER,
    order: 10,
    keyCodeList: ['56', '104']
  },
  {
    text: NUMBER.NINE,
    value: NUMBER.NINE,
    type: BUTTON_TYPE.NUMBER,
    order: 11,
    keyCodeList: ['57', '105']
  },
  {
    text: NUMBER.POINT,
    value: NUMBER.POINT,
    type: BUTTON_TYPE.NUMBER,
    order: 22,
    keyCodeList: ['110', '190']
  },
  {
    text: '\u03C0', // π
    type: BUTTON_TYPE.PI,
    order: 1,
    keyCodeList: ['80']
  },
  {
    text: '\uff0B', //＋
    value: OPERATOR.ADD,
    type: BUTTON_TYPE.OPERATOR,
    order: 20,
    keyCodeList: ['107', 'shift187']
  },
  {
    text: '\uFF0D',// －
    value: OPERATOR.SUBTRACT,
    type: BUTTON_TYPE.OPERATOR,
    order: 16,
    keyCodeList: ['109', '189']
  },
  {
    text: '\u00D7',// ×
    value: OPERATOR.MULTIPLY,
    type: BUTTON_TYPE.OPERATOR,
    order: 12,
    keyCodeList: ['106', 'shift186']
  },
  {
    text: '\u00F7',// ÷
    value: OPERATOR.DIVIDE,
    type: BUTTON_TYPE.OPERATOR,
    order: 8,
    keyCodeList: ['111', '191']
  },
  {
    text: '(',
    value: OPERATOR.LEFT_PAREN,
    type: BUTTON_TYPE.LEFT_PAREN,
    order: 5,
    keyCodeList: ['shift56']
  },
  {
    text: ')',
    value: OPERATOR.RIGHT_PAREN,
    type: BUTTON_TYPE.RIGHT_PAREN,
    order: 6,
    keyCodeList: ['shift57']
  },
  {
    text: '+/-',
    type: BUTTON_TYPE.INVERSION,
    order: 7,
    keyCodeList: ['73']
  },
  {
    text: '\uFF1D',// ＝
    type: BUTTON_TYPE.EQUAL,
    order: 23,
    keyCodeList: ['13'],
    size: 2
  },
  {
    text: '\u2190',// ←
    type: BUTTON_TYPE.BACKSPACE,
    order: 2,
    keyCodeList: ['8']
  },
  {
    text: 'C',
    type: BUTTON_TYPE.CLEAR,
    order: 3,
    keyCodeList: ['46']
  },
  {
    text: 'AC',
    type: BUTTON_TYPE.ALL_CLEAR,
    order: 4,
    keyCodeList: ['27']
  }
];
