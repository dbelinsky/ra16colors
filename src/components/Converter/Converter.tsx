import React, { useState } from 'react';


const Converter = () => {
  const [input, setValue] = useState({
    input: '',
    isCorrectRGB: false
  });

  const hexToRGB = (value: string): void => {
    let val: string = value;

    val = (value[0] === '#') ? value.slice(1) : value;

    if ([3, 6].indexOf(val.length) === -1) {
      setValue({
        ...input,
        isCorrectRGB: false
      })
      return
    }

    if (val.length === 3) val = val.split('').map(item => item.repeat(2)).join('');

    let resArr: number[] | undefined;
    if (val !== null && val !== undefined) {
      resArr = val.match(/.{2}/g)?.map(item => parseInt(`0x${item}`, 16))
    }

    if (resArr === undefined) {
      setValue({
        ...input,
        isCorrectRGB: false
      })
      return
    }

    const isNanInclude = resArr.includes(NaN);

    setValue({
      input: !isNanInclude ? `rgb(${resArr[0]}, ${resArr[1]}, ${resArr[2]})` : val,
      isCorrectRGB: !isNanInclude ? true : false
    })

  };

  const rgbArr: string[] = input.input.slice(4).slice(0, -1).split(',');
  const rgbArrWithCorrection: number[] = rgbArr.map(item => parseInt(item) - 50);
  const rgbArrWithCorrectionToString: string = `rgb(
    ${rgbArrWithCorrection[0]},
    ${rgbArrWithCorrection[1]},
    ${rgbArrWithCorrection[2]}
  )`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    hexToRGB(e.target.value);

  }

  return (
    <div className='container' style=
      {
        {background: `${input.isCorrectRGB ? input.input : 'red'}`}
      }>
      <div className='converter'>
        <input onChange={handleChange} id="input" type="text" />
        <div className='result' style=
          {
            {
              background: `${input.isCorrectRGB ? rgbArrWithCorrectionToString : '#6e1616'}`,
              color: "white"
            }
          }
        >
          {input.isCorrectRGB ? input.input : 'Ошибка!'}
        </div>
      </div>
    </div>
  )
}


export default Converter;
